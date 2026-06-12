"""MOCK=1용 가짜 엔진. API 키 없이 전체 파이프라인(저장→분석→리포트)을 검증한다."""
from __future__ import annotations

import hashlib

from .base import Engine, EngineResult, make_citations

_FAKE_SOURCES = [
    ("https://www.reddit.com/r/example/post1", "Reddit thread"),
    ("https://coingecko.com/en/coins/example", "CoinGecko"),
    ("https://www.coindesk.com/markets/example", "CoinDesk article"),
    ("https://english.visitkorea.or.kr/page", "Visit Korea"),
    ("https://someblog.tistory.com/123", "Korean blog"),
    ("https://www.investopedia.com/terms/example", "Investopedia"),
]


class MockEngine(Engine):
    api_key_env = "MOCK"

    def __init__(self, name: str):
        self.name = name

    @property
    def api_key(self) -> str:
        return "mock"

    def search(self, query: str) -> EngineResult:
        # 쿼리+엔진 해시로 결정적이지만 다양한 패턴 생성 (공백 응답 포함)
        h = int(hashlib.md5(f"{self.name}:{query}".encode()).hexdigest(), 16)
        n_citations = h % 5  # 0~4개 (0이면 공백 케이스)
        start = h % len(_FAKE_SOURCES)
        pairs = [_FAKE_SOURCES[(start + i) % len(_FAKE_SOURCES)] for i in range(n_citations)]
        if n_citations == 0:
            answer = "I don't have specific up-to-date information on that. Generally, it depends."
        else:
            answer = f"Mock answer for: {query} (cited {n_citations} sources)"
        return EngineResult(
            answer_text=answer,
            citations=make_citations(pairs),
            raw={"mock": True, "engine": self.name, "query": query},
            model=f"mock-{self.name}",
        )
