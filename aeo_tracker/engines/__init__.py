"""엔진 어댑터 레지스트리. API 키가 설정된 엔진만 활성화된다."""
from __future__ import annotations

import os

from .base import Engine
from .perplexity import PerplexityEngine
from .openai_engine import OpenAIEngine
from .gemini import GeminiEngine
from .anthropic_engine import AnthropicEngine
from .mock import MockEngine

ALL_ENGINES: dict[str, type[Engine]] = {
    "perplexity": PerplexityEngine,
    "openai": OpenAIEngine,
    "gemini": GeminiEngine,
    "anthropic": AnthropicEngine,
}


def active_engines() -> list[Engine]:
    """ENGINES env로 필터링, MOCK=1이면 가짜 엔진만, 키 없는 엔진은 자동 제외."""
    if os.environ.get("MOCK") == "1":
        return [MockEngine(name) for name in ALL_ENGINES]

    wanted = None
    if os.environ.get("ENGINES"):
        wanted = {e.strip().lower() for e in os.environ["ENGINES"].split(",") if e.strip()}

    engines: list[Engine] = []
    for name, cls in ALL_ENGINES.items():
        if wanted is not None and name not in wanted:
            continue
        engine = cls()
        if engine.api_key:
            engines.append(engine)
        else:
            print(f"[skip] {name}: API 키 없음")
    return engines
