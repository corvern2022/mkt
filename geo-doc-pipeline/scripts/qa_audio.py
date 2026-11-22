#!/usr/bin/env python3
"""Narration QA: transcribe every scene MP3 locally (faster-whisper) and diff against the script.

Scenes whose word-error-rate exceeds --max-wer are flagged; with --regen they are re-synthesised
(new seed for clone engines) up to --tries times, so you never have to listen line by line.
Writes out/qa_report.json.  Exit code 1 if anything still fails.
"""
from __future__ import annotations

import argparse
import json
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from whisper_utils import transcribe_words, wer  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent


def check(max_wer: float):
    tl = json.loads((ROOT / "src/timeline.json").read_text())
    rows = []
    for s in tl["scenes"]:
        if not s.get("audio"):
            continue
        heard, _ = transcribe_words(str(ROOT / "public" / s["audio"]))
        score, diff = wer(s["text"], heard)
        rows.append({"id": s["id"], "wer": round(score, 3), "ok": score <= max_wer,
                     "expected": s["text"], "heard": heard, "diff": diff})
        print(f"[{'OK ' if score <= max_wer else 'BAD'}] {s['id']}  WER={score:.2%}  {'' if score <= max_wer else diff}")
    return rows


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--max-wer", type=float, default=0.12)
    ap.add_argument("--regen", action="store_true", help="re-synthesise failing scenes")
    ap.add_argument("--tries", type=int, default=3)
    a = ap.parse_args()

    rows = check(a.max_wer)
    for attempt in range(a.tries if a.regen else 0):
        bad = [r["id"] for r in rows if not r["ok"]]
        if not bad:
            break
        print(f"-- regenerating {bad} (attempt {attempt + 1}/{a.tries})")
        # bump the clone seed so the retake differs
        sp = ROOT / "src/script.json"
        spec = json.loads(sp.read_text())
        eng = (spec.get("tts") or {}).get("engine", "edge")
        if eng in ("qwen3", "voicebox"):
            spec["tts"][eng]["seed"] = int(spec["tts"][eng].get("seed", 42)) + 1
            sp.write_text(json.dumps(spec, ensure_ascii=False, indent=2))
        subprocess.run([sys.executable, str(ROOT / "scripts/generate_audio.py"), "--only", *bad], check=True)
        rows = check(a.max_wer)

    out = ROOT / "out"
    out.mkdir(exist_ok=True)
    (out / "qa_report.json").write_text(json.dumps(rows, ensure_ascii=False, indent=2))
    sys.exit(0 if all(r["ok"] for r in rows) else 1)


if __name__ == "__main__":
    main()
