"""Local speech-to-text helpers (faster-whisper, CPU, free).

Linux/Windows stand-in for mlx-whisper. Used for:
  * word timings when a TTS engine doesn't report them (voice clones)
  * QA: transcribe generated narration and diff it against the script
"""
from __future__ import annotations

import os
import re
import subprocess
from functools import lru_cache

import numpy as np

WHISPER_MODEL = os.environ.get("WHISPER_MODEL", "base.en")

_NUM = {
    "zero": "0", "one": "1", "two": "2", "three": "3", "four": "4", "five": "5", "six": "6",
    "seven": "7", "eight": "8", "nine": "9", "ten": "10", "twenty": "20", "thirty": "30",
    "forty": "40", "fifty": "50", "sixty": "60", "seventy": "70", "eighty": "80", "ninety": "90",
    "hundred": "100",
}


def load_audio(path: str, sr: int = 16000) -> np.ndarray:
    """Decode any audio with ffmpeg → mono float32 (avoids PyAV version issues)."""
    raw = subprocess.run(
        ["ffmpeg", "-v", "error", "-i", str(path), "-f", "s16le", "-ac", "1", "-ar", str(sr), "-"],
        capture_output=True, check=True,
    ).stdout
    return np.frombuffer(raw, np.int16).astype(np.float32) / 32768.0


@lru_cache(maxsize=2)
def _model(name: str):
    from faster_whisper import WhisperModel
    return WhisperModel(name, device="cpu", compute_type="int8")


def transcribe_words(path: str, prompt: str | None = None, model: str = WHISPER_MODEL):
    """→ (text, [{text, start, end}]) with word-level timestamps in seconds."""
    segs, _ = _model(model).transcribe(load_audio(path), word_timestamps=True, initial_prompt=prompt)
    words, texts = [], []
    for s in segs:
        texts.append(s.text)
        for w in s.words or []:
            words.append({"text": w.word.strip(), "start": round(w.start, 3), "end": round(w.end, 3)})
    return " ".join(t.strip() for t in texts), words


def tokens(text: str) -> list[str]:
    t = text.lower().replace("%", " percent ").replace("u.s.", "us").replace("—", " ")
    out = []
    for w in re.split(r"\s+", t):
        w = re.sub(r"[^a-z0-9']", "", w)
        if w:
            out.append(_NUM.get(w, w))
    return out


def wer(ref: str, hyp: str) -> tuple[float, list[str]]:
    """Word error rate + a short list of the differing words."""
    r, h = tokens(ref), tokens(hyp)
    d = [[0] * (len(h) + 1) for _ in range(len(r) + 1)]
    for i in range(len(r) + 1):
        d[i][0] = i
    for j in range(len(h) + 1):
        d[0][j] = j
    for i in range(1, len(r) + 1):
        for j in range(1, len(h) + 1):
            d[i][j] = min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (r[i - 1] != h[j - 1]))
    diff = sorted(set(r) ^ set(h))
    return (d[-1][-1] / max(1, len(r))), diff
