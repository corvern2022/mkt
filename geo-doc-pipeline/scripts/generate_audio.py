#!/usr/bin/env python3
"""Generate narration MP3s + timeline.json from src/script.json.

Data-driven: edit src/script.json (any number of scenes) and re-run.
No API keys. Engine is chosen by script.json "tts.engine" (or --engine):
  edge (default) | qwen3 (local voice clone) | voicebox (your Voicebox app)   — see tts_engines.py

Outputs
  public/audio/<scene_id>.mp3
  src/timeline.json   (exact durations in seconds and frames, word timings,
                       subtitle line timings, cue frames, global start frames)
"""
from __future__ import annotations

import argparse
import asyncio
import json
import math
import re
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import tts_engines  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
SCRIPT = ROOT / "src" / "script.json"
TIMELINE = ROOT / "src" / "timeline.json"
AUDIO_DIR = ROOT / "public" / "audio"


def measure_duration(path: Path) -> float:
    """Exact audio length. Prefer ffprobe, fall back to mutagen."""
    try:
        out = subprocess.run(
            ["ffprobe", "-v", "error", "-show_entries", "format=duration",
             "-of", "default=nw=1:nk=1", str(path)],
            capture_output=True, text=True, check=True,
        ).stdout.strip()
        return float(out)
    except Exception:
        from mutagen.mp3 import MP3
        return float(MP3(str(path)).info.length)


def norm(w: str) -> str:
    return re.sub(r"[^a-z0-9%]", "", w.lower())


def tts_config(spec: dict, engine_override: str | None) -> tuple[str, dict]:
    tts = spec.get("tts") or {}
    engine = engine_override or tts.get("engine", "edge")
    cfg = dict(tts.get(engine) or {})
    if engine == "edge":  # backwards compatible top-level keys
        cfg.setdefault("voice", spec.get("voice", "en-US-AndrewNeural"))
        cfg.setdefault("rate", spec.get("rate", "+0%"))
    return engine, cfg


async def synth(engine: str, cfg: dict, text: str, out: Path, sid: str = "") -> list[dict]:
    from numwords import spoken
    tts_text = spoken(text)  # clone voices garble digits; subtitles keep the digits
    if engine == "files":
        words = tts_engines.synth_files(sid, out, cfg, ROOT)
    elif engine == "edge":
        words = await tts_engines.synth_edge(tts_text, out, cfg)
    elif engine == "qwen3":
        words = tts_engines.synth_qwen3(tts_text, out, cfg, ROOT)
    elif engine == "voicebox":
        words = tts_engines.synth_voicebox(tts_text, out, cfg)
    else:
        raise SystemExit(f"unknown tts engine '{engine}'")
    if not words:  # clone engines don't report timings → align with local whisper
        from whisper_utils import transcribe_words
        _, words = transcribe_words(str(out), prompt=text)
    return words


def time_lines(lines, words, duration):
    """Assign start/end seconds to each subtitle line using word boundaries."""
    timed, wi = [], 0
    for i, line in enumerate(lines):
        n = len([t for t in line["en"].split() if norm(t)])
        seg = words[wi: wi + n]
        start = seg[0]["start"] if seg else duration * i / len(lines)
        wi += n
        timed.append({**line, "start": round(start, 3)})
    for i, t in enumerate(timed):
        nxt = timed[i + 1]["start"] if i + 1 < len(timed) else duration
        t["end"] = round(nxt, 3)
    return timed


def resolve_cues(cues: dict, words):
    """Map cue -> seconds (start of first word matching the cue keyword)."""
    out = {}
    for key, kw in (cues or {}).items():
        k = norm(kw)
        hit = next((w for w in words if norm(w["text"]) == k), None) \
            or next((w for w in words if k in norm(w["text"])), None)
        out[key] = hit["start"] if hit else 0.0
        if not hit:
            print(f"  ! cue '{key}' keyword '{kw}' not found; using 0s", file=sys.stderr)
    return out


async def main(only: list[str] | None, skip_existing: bool, engine_override: str | None):
    spec = json.loads(SCRIPT.read_text(encoding="utf-8"))
    fps = spec["fps"]
    lead, tail = spec.get("leadInSec", 0.5), spec.get("tailSec", 0.8)
    engine, cfg = tts_config(spec, engine_override)
    AUDIO_DIR.mkdir(parents=True, exist_ok=True)

    old = {}
    if TIMELINE.exists():
        old = {s["id"]: s for s in json.loads(TIMELINE.read_text())["scenes"]}

    scenes, cursor = [], 0
    for sc in spec["scenes"]:
        sid = sc["id"]
        if not sc.get("lines"):  # silent card (title, chapter break, ...)
            frames = math.ceil(sc.get("durationSec", 3) * fps)
            scenes.append({"id": sid, "type": sc["type"], "text": "", "audio": None,
                           "audioDurationSec": 0, "audioDurationFrames": 0, "leadInFrames": 0,
                           "durationFrames": frames, "startFrame": cursor, "words": [],
                           "lines": [], "cues": {}, "params": sc.get("params", {})})
            print(f"[{sid}] silent {frames} frames")
            cursor += frames
            continue
        mp3 = AUDIO_DIR / f"{sid}.mp3"
        text = " ".join(l["en"] for l in sc["lines"])
        prev = old.get(sid, {})
        same = mp3.exists() and prev.get("text") == text and prev.get("engine", "edge") == engine
        reuse = (skip_existing and same) or (only and sid not in only and sid in old)
        if reuse:
            words = prev["words"]
            print(f"[{sid}] reuse existing audio")
        else:
            print(f"[{sid}] TTS[{engine}]: {text}")
            words = await synth(engine, cfg, text, mp3, sid)
        dur = measure_duration(mp3)
        frames = math.ceil((lead + dur + tail) * fps)
        scenes.append({
            "id": sid,
            "type": sc["type"],
            "text": text,
            "engine": engine if not reuse else prev.get("engine", engine),
            "audio": f"audio/{sid}.mp3",
            "audioDurationSec": round(dur, 3),
            "audioDurationFrames": math.ceil(dur * fps),
            "leadInFrames": round(lead * fps),
            "durationFrames": frames,
            "startFrame": cursor,
            "words": words,
            "lines": time_lines(sc["lines"], words, dur),
            "cues": resolve_cues(sc.get("cues"), words),
            "params": sc.get("params", {}),
        })
        print(f"   -> {dur:.3f}s audio, {frames} frames ({frames / fps:.2f}s scene)")
        cursor += frames

    timeline = {
        "title": spec["title"],
        "episode": spec.get("episode", ""),
        "fps": fps, "width": spec["width"], "height": spec["height"],
        "transitionFrames": spec.get("transitionFrames", 12),
        "totalFrames": cursor,
        "totalSec": round(cursor / fps, 3),
        "scenes": scenes,
    }
    TIMELINE.write_text(json.dumps(timeline, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"timeline.json: {len(scenes)} scenes, {cursor} frames = {cursor / fps:.2f}s")


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--only", nargs="*", help="regenerate only these scene ids")
    ap.add_argument("--skip-existing", action="store_true", help="reuse mp3s whose text+engine are unchanged")
    ap.add_argument("--engine", choices=["edge", "qwen3", "voicebox", "files"], help="override script.json tts.engine")
    a = ap.parse_args()
    asyncio.run(main(a.only, a.skip_existing, a.engine))
