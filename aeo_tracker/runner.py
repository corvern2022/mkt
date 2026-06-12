"""일일 수집 러너: 쿼리 × 엔진 전부 실행해서 DB에 저장.

- 엔진당 1스레드 병렬 (엔진 내부는 순차 + 0.5초 간격, 레이트리밋 예방)
- 실패한 콜은 2회 재시도 후 스킵, DB에 error로 기록만 (알림 폭탄 금지 — 브리프 6)
- 같은 날 재실행하면 이미 성공한 (쿼리, 엔진) 조합은 건너뛴다 (중복 과금 방지)

실행: python -m aeo_tracker.runner
"""
from __future__ import annotations

import json
import os
import threading
import time
import traceback
from concurrent.futures import ThreadPoolExecutor

from . import db
from .engines import active_engines
from .engines.base import Engine
from .util import PROJECT_ROOT, load_env, utf8_stdout

RETRIES = 2          # 첫 시도 + 재시도 2회 = 최대 3회
RETRY_WAIT = 10      # seconds
CALL_INTERVAL = 0.5  # 엔진 내 콜 간격

_db_lock = threading.Lock()


def load_queries() -> dict[str, list[str]]:
    path = PROJECT_ROOT / "config" / "queries.json"
    queries = json.loads(path.read_text(encoding="utf-8"))
    limit = os.environ.get("QUERY_LIMIT")
    if limit:
        n = int(limit)
        queries = {v: texts[:n] for v, texts in queries.items()}
    return queries


def run_engine(conn, run_id: int, engine: Engine, query_rows: list, done: set) -> dict:
    """한 엔진의 전체 쿼리를 순차 실행. 반환: 통계 dict."""
    stats = {"engine": engine.name, "ok": 0, "error": 0, "skipped": 0, "citations": 0}
    for row in query_rows:
        if (row["id"], engine.name) in done:
            stats["skipped"] += 1
            continue
        result = None
        error_msg = None
        started = time.time()
        for attempt in range(1 + RETRIES):
            try:
                result = engine.search(row["text"])
                break
            except Exception as e:  # noqa: BLE001 — 어떤 실패든 기록 후 스킵
                error_msg = f"{type(e).__name__}: {e}"
                if attempt < RETRIES:
                    time.sleep(RETRY_WAIT * (attempt + 1))
        latency_ms = int((time.time() - started) * 1000)

        with _db_lock:
            if result is not None:
                db.save_response(
                    conn, run_id, row["id"], engine.name, result.model,
                    "ok", None, latency_ms, result.answer_text, result.raw,
                    result.citations,
                )
                stats["ok"] += 1
                stats["citations"] += len(result.citations)
            else:
                db.save_response(
                    conn, run_id, row["id"], engine.name, None,
                    "error", error_msg, latency_ms, None, None, None,
                )
                stats["error"] += 1
                print(f"[error] {engine.name} / {row['text'][:50]}: {error_msg}")
        time.sleep(CALL_INTERVAL)
    return stats


def main() -> None:
    utf8_stdout()
    load_env()
    engines = active_engines()
    if not engines:
        print("활성 엔진 없음 — .env에 API 키를 넣거나 MOCK=1로 실행하세요.")
        return

    conn = db.connect()
    queries = load_queries()
    db.seed_queries(conn, queries)
    query_rows = conn.execute(
        "SELECT id, vertical, text FROM queries WHERE active=1 ORDER BY vertical, id"
    ).fetchall()

    # 오늘 이미 성공한 (query, engine) 조합은 스킵 → 재실행 안전
    today = db.utcnow()[:10]
    done = {
        (r["query_id"], r["engine"])
        for r in conn.execute(
            """SELECT r.query_id, r.engine FROM responses r
               JOIN runs ON runs.id = r.run_id
               WHERE runs.run_date = ? AND r.status = 'ok'""",
            (today,),
        )
    }

    run_id = db.start_run(conn, notes=f"engines={','.join(e.name for e in engines)}")
    print(f"run #{run_id}: {len(query_rows)}쿼리 × {len(engines)}엔진 "
          f"(오늘 기성공 {len(done)}건 스킵 예정)")

    with ThreadPoolExecutor(max_workers=len(engines)) as pool:
        futures = [
            pool.submit(run_engine, conn, run_id, engine, query_rows, done)
            for engine in engines
        ]
        all_stats = []
        for f in futures:
            try:
                all_stats.append(f.result())
            except Exception:  # noqa: BLE001
                traceback.print_exc()

    db.finish_run(conn, run_id)
    print("\n=== 수집 완료 ===")
    for s in all_stats:
        print(f"  {s['engine']:<12} ok={s['ok']} error={s['error']} "
              f"skipped={s['skipped']} citations={s['citations']}")


if __name__ == "__main__":
    main()
