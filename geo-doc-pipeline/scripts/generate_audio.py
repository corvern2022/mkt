#!/usr/bin/env python3
"""Generate narration MP3s + timeline.json from src/script.json.

Data-driven: edit src/script.json (any number of scenes) and re-run.
No API keys: uses Microsoft Edge's free read-aloud voice via `edge-tts`.

Outputs
  public/audio/<scene_id>.mp3
  src/timeline.json   (exact durations in seconds and frames, word timings,
                       subtitle line timings, global start frames)
"""
from __future__ import annotations

import argparse
import asyncio
import json
import math
import os
import re
import ssl
import subprocess
import sys
from pathlib import Path

import edge_tts
import edge_tts.communicate as _comm

ROOT = Path(__file__).resolve().parent.parent
SCRIPT = ROOT / "src" / "script.json"
TIMELINE = ROOT / "src" / "timeline.json"
AUDIO_DIR = ROOT / "public" / "audio"
TICKS = 10_000_000  # edge-tts offsets are in 100ns ticks


def _configure_network() -> str | None:
    """Honour corporate/sandbox proxies + custom CA bundles if present."""
    ca = os.environ.get("SSL_CERT_FILE") or os.environ.get("REQUESTS_CA_BUNDLE")
    if ca and Path(ca).exists():
        _comm._SSL_CTX = ssl.create_default_context(cafile=ca)
    return os.environ.get("HTTPS_PROXY") or os.environ.get("https_proxy")


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


async def synth(text: str, voice: str, rate: str, out: Path, proxy: str | None):
    comm = edge_tts.Communicate(text, voice, rate=rate, boundary="WordBoundary", proxy=proxy)
    words = []
    with open(out, "wb") as f:
        async for chunk in comm.stream():
            if chunk["type"] == "audio":
                f.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                start = chunk["offset"] / TICKS
                words.append({
                    "text": chunk["text"],
                    "start": round(start, 3),
                    "end": round(start + chunk["duration"] / TICKS, 3),
                })
    return words


def time_lines(lines, words, duration):
    """Assign start/end seconds to each subtitle line using word boundaries."""
    timed, wi = [], 0
    for i, line in enumerate(lines):
        n = len([t for t in line["en"].split() if norm(t)])
        seg = words[wi: wi + n]
        if seg:
            start = seg[0]["start"]
        else:  # fallback: proportional
            start = duration * i / len(lines)
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


async def main(only: list[str] | None, skip_existing: bool):
    spec = json.loads(SCRIPT.read_text(encoding="utf-8"))
    fps = spec["fps"]
    lead, tail = spec.get("leadInSec", 0.5), spec.get("tailSec", 0.8)
    AUDIO_DIR.mkdir(parents=True, exist_ok=True)
    proxy = _configure_network()

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
        reuse = (skip_existing and mp3.exists() and sid in old and old[sid].get("text") == text) \
            or (only and sid not in only and sid in old)
        if reuse:
            words = old[sid]["words"]
            print(f"[{sid}] reuse existing audio")
        else:
            print(f"[{sid}] TTS {spec['voice']} {spec['rate']}: {text}")
            words = await synth(text, spec["voice"], spec["rate"], mp3, proxy)
        dur = measure_duration(mp3)
        frames = math.ceil((lead + dur + tail) * fps)
        scenes.append({
            "id": sid,
            "type": sc["type"],
            "text": text,
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
    ap.add_argument("--skip-existing", action="store_true", help="reuse mp3s whose text is unchanged")
    a = ap.parse_args()
    asyncio.run(main(a.only, a.skip_existing))
