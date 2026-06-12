"""엔진 어댑터 베이스. 각 어댑터는 search(query) -> EngineResult 하나만 구현한다."""
from __future__ import annotations

import os
from abc import ABC, abstractmethod
from dataclasses import dataclass, field

from ..util import extract_domain

# AI 검색에게 우리가 원하는 형태: 짧고 구체적인 답 + 출처
SYSTEM_HINT = (
    "Answer the user's question concisely with specific, up-to-date facts. "
    "Cite your sources."
)

REQUEST_TIMEOUT = 120  # seconds


@dataclass
class EngineResult:
    answer_text: str
    citations: list[dict] = field(default_factory=list)  # {rank, url, domain, title}
    raw: dict = field(default_factory=dict)
    model: str = ""


def make_citations(urls_with_titles: list[tuple[str, str | None]]) -> list[dict]:
    """(url, title) 리스트 → 중복 URL 제거된 citation dict 리스트 (등장 순서 = rank)."""
    seen: set[str] = set()
    citations: list[dict] = []
    for url, title in urls_with_titles:
        if not url or url in seen:
            continue
        seen.add(url)
        citations.append({
            "rank": len(citations) + 1,
            "url": url,
            "domain": extract_domain(url),
            "title": title,
        })
    return citations


class Engine(ABC):
    name: str = ""
    api_key_env: str = ""

    @property
    def api_key(self) -> str:
        return os.environ.get(self.api_key_env, "")

    @abstractmethod
    def search(self, query: str) -> EngineResult:
        """쿼리 1건 실행. 실패 시 예외를 던진다 (재시도는 runner 담당)."""
