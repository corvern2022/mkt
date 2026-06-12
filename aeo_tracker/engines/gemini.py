"""Google Gemini + Google Search grounding 어댑터.

인용 포맷: candidates[0].groundingMetadata.groundingChunks[].web.{uri, title}.
uri는 vertexaisearch 리다이렉트 URL일 수 있어 title(도메인명)을 보조로 저장한다.
"""
from __future__ import annotations

import os

import requests

from .base import Engine, EngineResult, REQUEST_TIMEOUT, make_citations


class GeminiEngine(Engine):
    name = "gemini"
    api_key_env = "GEMINI_API_KEY"

    def search(self, query: str) -> EngineResult:
        model = os.environ.get("GEMINI_MODEL", "gemini-2.5-flash")
        resp = requests.post(
            f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent",
            headers={"x-goog-api-key": self.api_key},
            json={
                "contents": [{"parts": [{"text": query}]}],
                "tools": [{"google_search": {}}],
            },
            timeout=REQUEST_TIMEOUT,
        )
        resp.raise_for_status()
        data = resp.json()

        candidate = (data.get("candidates") or [{}])[0]
        parts = candidate.get("content", {}).get("parts") or []
        answer = "\n".join(p.get("text", "") for p in parts if p.get("text"))

        pairs: list[tuple[str, str | None]] = []
        grounding = candidate.get("groundingMetadata") or {}
        for chunk in grounding.get("groundingChunks") or []:
            web = chunk.get("web") or {}
            uri = web.get("uri", "")
            title = web.get("title")
            # grounding redirect URL이면 title이 실제 도메인명이므로 그걸 우선 사용
            if "vertexaisearch.cloud.google.com" in uri and title and "." in title:
                pairs.append((f"https://{title}/", title))
            elif uri:
                pairs.append((uri, title))

        return EngineResult(
            answer_text=answer,
            citations=make_citations(pairs),
            raw=data,
            model=model,
        )
