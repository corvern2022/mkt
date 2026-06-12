"""Anthropic web search tool 어댑터.

인용 포맷: content[] 중 type=text 블록의 citations[]
(type=web_search_result_location, {url, title}). 보조로
type=web_search_tool_result 블록의 결과 목록도 수집한다 (실제 인용 우선).
"""
from __future__ import annotations

import os

import requests

from .base import Engine, EngineResult, REQUEST_TIMEOUT, make_citations


class AnthropicEngine(Engine):
    name = "anthropic"
    api_key_env = "ANTHROPIC_API_KEY"

    def search(self, query: str) -> EngineResult:
        model = os.environ.get("ANTHROPIC_MODEL", "claude-haiku-4-5")
        resp = requests.post(
            "https://api.anthropic.com/v1/messages",
            headers={
                "x-api-key": self.api_key,
                "anthropic-version": "2023-06-01",
            },
            json={
                "model": model,
                "max_tokens": 1024,
                "messages": [{"role": "user", "content": query}],
                "tools": [{
                    "type": "web_search_20250305",
                    "name": "web_search",
                    "max_uses": 3,
                }],
            },
            timeout=REQUEST_TIMEOUT,
        )
        resp.raise_for_status()
        data = resp.json()

        answer_parts: list[str] = []
        cited: list[tuple[str, str | None]] = []
        searched: list[tuple[str, str | None]] = []
        for block in data.get("content") or []:
            btype = block.get("type")
            if btype == "text":
                answer_parts.append(block.get("text", ""))
                for cit in block.get("citations") or []:
                    if cit.get("type") == "web_search_result_location":
                        cited.append((cit.get("url", ""), cit.get("title")))
            elif btype == "web_search_tool_result":
                content = block.get("content")
                if isinstance(content, list):
                    for r in content:
                        if r.get("type") == "web_search_result":
                            searched.append((r.get("url", ""), r.get("title")))

        # 답변에 실제로 인용된 출처를 우선, 없으면 검색 결과로 폴백
        pairs = cited if cited else searched
        return EngineResult(
            answer_text="\n".join(answer_parts),
            citations=make_citations(pairs),
            raw=data,
            model=data.get("model", model),
        )
