#!/usr/bin/env python3
"""Topic research via Agent-Reach (free, no keys): what already exists on YouTube for a topic.

  python3 scripts/research.py "why is canada empty" "canada population border" --limit 10 --subs 3

Writes research/<slug>/
  videos.json      search hits (title, channel, views, duration, url)
  subs/<id>.txt    full captions of the top-N most viewed videos (raw source material)
  brief.md         competitor table + saturation signal + a fact-grounding prompt for script writing

Be gentle: scraping too much at once gets the IP rate-limited (the tool's author got blocked for 1h).
"""
from __future__ import annotations

import argparse
import json
import re
import subprocess
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def ar(*args: str) -> dict:
    p = subprocess.run(["agent-reach", *args], capture_output=True, text=True, timeout=180)
    try:
        return json.loads(p.stdout)
    except json.JSONDecodeError:
        return {"ok": False, "error": (p.stderr or p.stdout)[-500:]}


def slugify(s: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")[:60]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("queries", nargs="+")
    ap.add_argument("--limit", type=int, default=10)
    ap.add_argument("--subs", type=int, default=3, help="download captions of the N most viewed videos")
    ap.add_argument("--pause", type=float, default=2.0, help="seconds between requests (avoid IP bans)")
    a = ap.parse_args()

    out = ROOT / "research" / slugify(a.queries[0])
    (out / "subs").mkdir(parents=True, exist_ok=True)

    seen: dict[str, dict] = {}
    for q in a.queries:
        r = ar("youtube", "search", q, "--limit", str(a.limit))
        if not r.get("ok"):
            print(f"! search failed for {q!r}: {r.get('error')}")
        for it in r.get("items") or []:
            raw = it.get("raw") or {}
            vid = raw.get("id") or it["url"]
            seen.setdefault(vid, {"id": vid, "title": it["title"], "channel": it.get("author"),
                                  "views": raw.get("view_count") or 0, "duration": raw.get("duration") or 0,
                                  "url": it["url"], "snippet": it.get("text", ""), "query": q})
        time.sleep(a.pause)

    vids = sorted(seen.values(), key=lambda v: v["views"], reverse=True)
    (out / "videos.json").write_text(json.dumps(vids, ensure_ascii=False, indent=2))

    for v in vids[: a.subs]:
        r = ar("youtube", "subtitle", v["url"], "--lang", "en,en-orig")
        text = (r.get("result") or {}).get("text") if isinstance(r.get("result"), dict) else None
        text = text or r.get("text") or "\n".join(i.get("text", "") for i in r.get("items") or [])
        if text:
            (out / "subs" / f"{v['id']}.txt").write_text(text)
            v["subs"] = f"subs/{v['id']}.txt"
        else:
            code = (r.get("error") or {}).get("code", "?")
            print(f"! captions unavailable for {v['id']} ({code})"
                  + (" — YouTube blocks this IP as a bot; run from your home PC or pass cookies" if code == "PLATFORM_BLOCKED" else ""))
        time.sleep(a.pause)

    top = vids[:5]
    big = [v for v in vids if v["views"] >= 500_000]
    signal = ("CROWDED — several 500k+ videos already; you need a sharper angle or a different hook"
              if len(big) >= 2 else "OPEN-ISH — few big hits; topic still has room" if big else "UNTESTED — no big hits found")
    md = [f"# Research brief: {', '.join(a.queries)}", "",
          f"**Saturation:** {signal}  ({len(big)} videos ≥ 500k views of {len(vids)} found)", "",
          "| views | len | channel | title |", "|---:|---:|---|---|"]
    for v in vids:
        md.append(f"| {v['views']:,} | {v['duration'] // 60}:{v['duration'] % 60:02d} | {v['channel']} | [{v['title']}]({v['url']}) |")
    md += ["", "## Top titles (study the hook, don't copy it)", *[f"- {v['title']}" for v in top], "",
           "## Script-writing prompt (fact grounding)",
           "> Write the narration using ONLY facts that appear in the files under `subs/` and `videos.json`.",
           "> If a claim isn't in the research, leave it out or mark it [VERIFY]. Do not reuse other creators' sentences.",
           "", f"Captions saved: {sum(1 for v in vids if v.get('subs'))} → `subs/`"]
    (out / "brief.md").write_text("\n".join(md))
    print(f"wrote {out}/brief.md  ({len(vids)} videos, saturation: {signal.split(' —')[0]})")


if __name__ == "__main__":
    main()
