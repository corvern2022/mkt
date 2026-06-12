"""SQLite 저장 계층. 스키마: runs / queries / responses / citations.

응답 원문(raw)은 gzip BLOB으로 무조건 저장한다 — 나중에 재파싱 가능하게 (브리프 5).
"""
from __future__ import annotations

import gzip
import json
import os
import sqlite3
from datetime import datetime, timezone
from pathlib import Path

from .util import PROJECT_ROOT

SCHEMA = """
CREATE TABLE IF NOT EXISTS runs (
    id INTEGER PRIMARY KEY,
    run_date TEXT NOT NULL,          -- YYYY-MM-DD (UTC)
    started_at TEXT NOT NULL,
    finished_at TEXT,
    notes TEXT
);
CREATE TABLE IF NOT EXISTS queries (
    id INTEGER PRIMARY KEY,
    vertical TEXT NOT NULL,
    text TEXT NOT NULL,
    active INTEGER NOT NULL DEFAULT 1,
    added_at TEXT NOT NULL,
    UNIQUE(vertical, text)
);
CREATE TABLE IF NOT EXISTS responses (
    id INTEGER PRIMARY KEY,
    run_id INTEGER NOT NULL REFERENCES runs(id),
    query_id INTEGER NOT NULL REFERENCES queries(id),
    engine TEXT NOT NULL,
    model TEXT,
    status TEXT NOT NULL,            -- ok | error
    error TEXT,
    latency_ms INTEGER,
    answer_text TEXT,
    raw_gz BLOB,                     -- gzip된 원문 JSON
    created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS citations (
    id INTEGER PRIMARY KEY,
    response_id INTEGER NOT NULL REFERENCES responses(id),
    rank INTEGER NOT NULL,           -- 응답 내 인용 순서 (1부터)
    url TEXT NOT NULL,
    domain TEXT NOT NULL,
    title TEXT
);
CREATE INDEX IF NOT EXISTS idx_responses_run ON responses(run_id);
CREATE INDEX IF NOT EXISTS idx_responses_query ON responses(query_id);
CREATE INDEX IF NOT EXISTS idx_citations_response ON citations(response_id);
CREATE INDEX IF NOT EXISTS idx_citations_domain ON citations(domain);
"""


def db_path() -> Path:
    return Path(os.environ.get("DB_PATH", PROJECT_ROOT / "data" / "citations.db"))


def connect(path: Path | None = None) -> sqlite3.Connection:
    p = path or db_path()
    p.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(p, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    conn.executescript(SCHEMA)
    return conn


def utcnow() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def seed_queries(conn: sqlite3.Connection, queries_by_vertical: dict[str, list[str]]) -> None:
    """config의 쿼리를 DB에 동기화. 추가된 쿼리는 insert, 빠진 쿼리는 비활성화."""
    now = utcnow()
    config_set = set()
    for vertical, texts in queries_by_vertical.items():
        for text in texts:
            config_set.add((vertical, text))
            conn.execute(
                "INSERT OR IGNORE INTO queries(vertical, text, active, added_at) VALUES(?,?,1,?)",
                (vertical, text, now),
            )
    for row in conn.execute("SELECT id, vertical, text FROM queries WHERE active=1"):
        if (row["vertical"], row["text"]) not in config_set:
            conn.execute("UPDATE queries SET active=0 WHERE id=?", (row["id"],))
    conn.commit()


def start_run(conn: sqlite3.Connection, notes: str = "") -> int:
    now = datetime.now(timezone.utc)
    cur = conn.execute(
        "INSERT INTO runs(run_date, started_at, notes) VALUES(?,?,?)",
        (now.strftime("%Y-%m-%d"), utcnow(), notes),
    )
    conn.commit()
    return cur.lastrowid


def finish_run(conn: sqlite3.Connection, run_id: int) -> None:
    conn.execute("UPDATE runs SET finished_at=? WHERE id=?", (utcnow(), run_id))
    conn.commit()


def save_response(
    conn: sqlite3.Connection,
    run_id: int,
    query_id: int,
    engine: str,
    model: str | None,
    status: str,
    error: str | None,
    latency_ms: int | None,
    answer_text: str | None,
    raw: dict | None,
    citations: list[dict] | None,
) -> int:
    raw_gz = gzip.compress(json.dumps(raw, ensure_ascii=False).encode("utf-8")) if raw else None
    cur = conn.execute(
        """INSERT INTO responses(run_id, query_id, engine, model, status, error,
           latency_ms, answer_text, raw_gz, created_at) VALUES(?,?,?,?,?,?,?,?,?,?)""",
        (run_id, query_id, engine, model, status, error, latency_ms, answer_text, raw_gz, utcnow()),
    )
    response_id = cur.lastrowid
    for c in citations or []:
        conn.execute(
            "INSERT INTO citations(response_id, rank, url, domain, title) VALUES(?,?,?,?,?)",
            (response_id, c["rank"], c["url"], c["domain"], c.get("title")),
        )
    conn.commit()
    return response_id


def load_raw(row_raw_gz: bytes) -> dict:
    """저장된 raw_gz BLOB을 dict로 복원 (재파싱용)."""
    return json.loads(gzip.decompress(row_raw_gz).decode("utf-8"))
