"""Spell out numerals so clone TTS engines don't garble them ("130,000" → "one hundred thirty thousand").

Voicebox/Qwen clones misread digits (e.g. "100" → "paying", "1880s" → noise). The script keeps digits
for subtitles; only the text sent to TTS (and the QA comparison) goes through spoken().
"""
from __future__ import annotations

import re

_ONES = "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split()
_TENS = "_ _ twenty thirty forty fifty sixty seventy eighty ninety".split()


def _two(n: int) -> str:
    if n < 20:
        return _ONES[n]
    t, o = divmod(n, 10)
    return _TENS[t] + (f"-{_ONES[o]}" if o else "")


def _three(n: int) -> str:
    h, r = divmod(n, 100)
    parts = []
    if h:
        parts.append(f"{_ONES[h]} hundred")
    if r or not h:
        parts.append(_two(r))
    return " ".join(parts)


def int_words(n: int) -> str:
    if n == 0:
        return "zero"
    out = []
    for scale, name in ((10**9, "billion"), (10**6, "million"), (1000, "thousand")):
        if n >= scale:
            q, n = divmod(n, scale)
            out.append(f"{_three(q)} {name}")
    if n:
        out.append(_three(n))
    return " ".join(out)


def year_words(y: int) -> str:
    hi, lo = divmod(y, 100)
    if lo == 0:
        return f"{_two(hi)} hundred"
    return f"{_two(hi)} {('oh-' + _ONES[lo]) if lo < 10 else _two(lo)}"


def _plural(w: str) -> str:
    return w[:-1] + "ies" if w.endswith("y") else w + "s"


def _num(m: re.Match) -> str:
    raw, suffix = m.group(1), m.group(2) or ""
    if "." in raw:
        a, b = raw.split(".")
        word = f"{int_words(int(a.replace(',', '')))} point {' '.join(_ONES[int(d)] for d in b)}"
    else:
        n = int(raw.replace(",", ""))
        is_year = "," not in raw and 1100 <= n <= 2099
        word = year_words(n) if is_year else int_words(n)
        if suffix == "s":
            last = word.split(" ")[-1].split("-")[-1]
            word = word[: len(word) - len(last)] + _plural(last)
            suffix = ""
    if suffix == "%":
        return f"{word} percent"
    return word + suffix


_RE = re.compile(r"(?<![\w.])(\d[\d,]*(?:\.\d+)?)(%|s\b)?")


def spoken(text: str) -> str:
    return _RE.sub(_num, text)


if __name__ == "__main__":
    for s in ["130,000 people", "In the 1880s", "100 miles", "40,000.", "70 percent", "90%", "1885", "2.09", "two or 3 times"]:
        print(s, "→", spoken(s))
