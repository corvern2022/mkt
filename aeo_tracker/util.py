"""공통 유틸: .env 로더, 도메인 추출. 외부 의존성 없음."""
from __future__ import annotations

import os
import sys
from pathlib import Path
from urllib.parse import urlparse

PROJECT_ROOT = Path(__file__).resolve().parents[1]


def utf8_stdout() -> None:
    """Windows 콘솔(cp949)에서 한글 출력 깨짐 방지."""
    for stream in (sys.stdout, sys.stderr):
        if stream and hasattr(stream, "reconfigure"):
            stream.reconfigure(encoding="utf-8", errors="replace")


def load_env(path: Path | None = None) -> None:
    """단순 .env 로더. 이미 설정된 환경변수는 덮어쓰지 않는다."""
    env_path = path or PROJECT_ROOT / ".env"
    if not env_path.exists():
        return
    for line in env_path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, value = line.partition("=")
        key, value = key.strip(), value.strip().strip('"').strip("'")
        if key and value and key not in os.environ:
            os.environ[key] = value


def extract_domain(url: str) -> str:
    """URL에서 등록 도메인 추출. www. 제거, 소문자화."""
    try:
        host = urlparse(url).netloc.lower()
    except ValueError:
        return ""
    if not host:
        return ""
    host = host.split(":")[0]
    if host.startswith("www."):
        host = host[4:]
    return host
