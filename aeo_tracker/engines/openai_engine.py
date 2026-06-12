"""OpenAI Responses API + web_search 어댑터.

인용 포맷: output[] 중 type=message 항목의 content[].annotations[]
(type=url_citation, {url, title, start_index, end_index}).
계정/모델에 따라 tool type이 web_search 또는 web_search_preview라 폴백 처리한다.
"""
from __future__ import annotations

import os

import requests

from .base import Engine, EngineResult, REQUEST_TIMEOUT, make_citations


class OpenAIEngine(Engine):
    name = "openai"
    api_key_env = "OPENAI_API_KEY"

    def search(self, query: str) -> EngineResult:
        model = os.environ.get("OPENAI_MODEL", "gpt-4o-mini")
        last_error: Exception | None = None
        for tool_type in ("web_search", "web_search_preview"):
            resp = requests.post(
                "https://api.openai.com/v1/responses",
                headers={"Authorization": f"Bearer {self.api_key}"},
                json={
                    "model": model,
                    "tools": [{"type": tool_type}],
                    "tool_choice": "auto",
                    "input": query,
                },
                timeout=REQUEST_TIMEOUT,
            )
            if resp.status_code == 400 and "web_search" in resp.text:
                last_error = RuntimeError(f"tool {tool_type} rejected: {resp.text[:200]}")
                continue
            resp.raise_for_status()
            data = resp.json()
            return self._parse(data, model)
        raise last_error or RuntimeError("openai: no usable web_search tool type")

    @staticmethod
    def _parse(data: dict, model: str) -> EngineResult:
        answer_parts: list[str] = []
        pairs: list[tuple[str, str | None]] = []
        for item in data.get("output") or []:
            if item.get("type") != "message":
                continue
            for content in item.get("content") or []:
                if content.get("type") == "output_text":
                    answer_parts.append(content.get("text", ""))
                    for ann in content.get("annotations") or []:
                        if ann.get("type") == "url_citation":
                            pairs.append((ann.get("url", ""), ann.get("title")))
        return EngineResult(
            answer_text="\n".join(answer_parts),
            citations=make_citations(pairs),
            raw=data,
            model=data.get("model", model),
        )
