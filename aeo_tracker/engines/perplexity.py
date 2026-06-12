"""Perplexity sonar 어댑터.

인용 포맷: 응답 최상위 `search_results` [{title, url, date}] (신형) 또는
`citations` [url, ...] (구형). 둘 다 처리한다.
"""
from __future__ import annotations

import os

import requests

from .base import Engine, EngineResult, REQUEST_TIMEOUT, SYSTEM_HINT, make_citations


class PerplexityEngine(Engine):
    name = "perplexity"
    api_key_env = "PERPLEXITY_API_KEY"

    def search(self, query: str) -> EngineResult:
        model = os.environ.get("PERPLEXITY_MODEL", "sonar")
        resp = requests.post(
            "https://api.perplexity.ai/chat/completions",
            headers={"Authorization": f"Bearer {self.api_key}"},
            json={
                "model": model,
                "messages": [
                    {"role": "system", "content": SYSTEM_HINT},
                    {"role": "user", "content": query},
                ],
                "max_tokens": 1024,
            },
            timeout=REQUEST_TIMEOUT,
        )
        resp.raise_for_status()
        data = resp.json()

        answer = data["choices"][0]["message"]["content"]
        pairs: list[tuple[str, str | None]] = []
        for sr in data.get("search_results") or []:
            pairs.append((sr.get("url", ""), sr.get("title")))
        if not pairs:
            for url in data.get("citations") or []:
                pairs.append((url, None))

        return EngineResult(
            answer_text=answer,
            citations=make_citations(pairs),
            raw=data,
            model=data.get("model", model),
        )
