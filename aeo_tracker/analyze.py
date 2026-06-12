"""측정 지표 계산 (브리프 3.2).

- 공백률: 인용 0개 OR (인용 ≤1개 AND 얼버무림 패턴) 인 응답 비율
- 인용 집중도: 상위 3개 도메인 점유율 + HHI
- 도메인 유형 분포: ugc / media / official_data / other
- 엔진 간 차이: 같은 쿼리의 엔진별 인용 도메인 평균 Jaccard 유사도
- 공백률 높은 쿼리 Top 리스트 (→ 모듈 1 콘텐츠 공장의 생산 주제)

원문이 DB에 raw로 있으므로 휴리스틱을 고쳐도 전체 재분석 가능하다.
"""
from __future__ import annotations

import re
from collections import Counter, defaultdict
from itertools import combinations

from . import db
from .domains import classify

# 구체적 답 없이 일반론으로 얼버무리는 응답 감지 패턴
HEDGE_PATTERNS = [
    r"i (do not|don't) have (specific|up-to-date|current|access)",
    r"i could(n't| not) find",
    r"i('m| am) (unable|not able) to",
    r"as of my (last|knowledge)",
    r"it depends on",
    r"i recommend (checking|consulting|visiting)",
    r"information (is|may be) (limited|not available|unavailable)",
    r"there (is|was) no (specific|reliable|publicly available) (information|data)",
    r"varies (widely|greatly|depending)",
]
HEDGE_RE = re.compile("|".join(HEDGE_PATTERNS), re.IGNORECASE)


def is_gap(citation_count: int, answer_text: str | None) -> bool:
    if citation_count == 0:
        return True
    if citation_count <= 1 and answer_text and HEDGE_RE.search(answer_text):
        return True
    return False


def _hhi(counter: Counter) -> float:
    total = sum(counter.values())
    if not total:
        return 0.0
    return round(sum((c / total) ** 2 for c in counter.values()) * 10000)


def _top3_share(counter: Counter) -> float:
    total = sum(counter.values())
    if not total:
        return 0.0
    return round(sum(c for _, c in counter.most_common(3)) / total * 100, 1)


def compute_metrics(conn=None) -> dict:
    conn = conn or db.connect()
    rows = conn.execute(
        """SELECT r.id, r.engine, r.status, r.answer_text, r.created_at,
                  runs.run_date, q.vertical, q.text AS query_text, q.id AS query_id
           FROM responses r
           JOIN runs ON runs.id = r.run_id
           JOIN queries q ON q.id = r.query_id
           WHERE r.status = 'ok'"""
    ).fetchall()
    citation_rows = conn.execute(
        "SELECT response_id, domain, rank FROM citations ORDER BY response_id, rank"
    ).fetchall()

    citations_by_response: dict[int, list] = defaultdict(list)
    for c in citation_rows:
        citations_by_response[c["response_id"]].append(c)

    verticals: dict[str, dict] = {}
    # (vertical, query_id, run_date) -> {engine: set(domains)} — 엔진 간 차이용
    engine_domains: dict[tuple, dict[str, set]] = defaultdict(dict)
    daily: dict[tuple, list] = defaultdict(list)  # (vertical, run_date) -> [is_gap,...]
    engine_gap: dict[tuple, list] = defaultdict(list)  # (vertical, engine) -> [is_gap,...]
    query_stats: dict[tuple, dict] = {}

    for r in rows:
        v = r["vertical"]
        if v not in verticals:
            verticals[v] = {
                "responses": 0, "gaps": 0,
                "domain_counter": Counter(), "type_counter": Counter(),
            }
        vd = verticals[v]
        cits = citations_by_response.get(r["id"], [])
        gap = is_gap(len(cits), r["answer_text"])

        vd["responses"] += 1
        vd["gaps"] += int(gap)
        for c in cits:
            if c["domain"]:
                vd["domain_counter"][c["domain"]] += 1
                vd["type_counter"][classify(c["domain"])] += 1

        daily[(v, r["run_date"])].append(gap)
        engine_gap[(v, r["engine"])].append(gap)
        engine_domains[(v, r["query_id"], r["run_date"])][r["engine"]] = {
            c["domain"] for c in cits if c["domain"]
        }

        qs = query_stats.setdefault((v, r["query_id"]), {
            "query": r["query_text"], "vertical": v, "responses": 0, "gaps": 0,
            "domains": Counter(),
        })
        qs["responses"] += 1
        qs["gaps"] += int(gap)
        for c in cits:
            if c["domain"]:
                qs["domains"][c["domain"]] += 1

    # 엔진 간 평균 Jaccard (버티컬별)
    jaccard: dict[str, list] = defaultdict(list)
    for (v, _, _), by_engine in engine_domains.items():
        engines = [e for e, s in by_engine.items()]
        for e1, e2 in combinations(engines, 2):
            s1, s2 = by_engine[e1], by_engine[e2]
            if s1 or s2:
                jaccard[v].append(len(s1 & s2) / len(s1 | s2))

    result = {"verticals": {}, "decision": None}
    for v, vd in verticals.items():
        total = vd["responses"]
        type_total = sum(vd["type_counter"].values())
        gap_queries = sorted(
            (qs for (vv, _), qs in query_stats.items() if vv == v),
            key=lambda q: (-(q["gaps"] / q["responses"] if q["responses"] else 0), q["query"]),
        )
        result["verticals"][v] = {
            "responses": total,
            "gap_rate": round(vd["gaps"] / total * 100, 1) if total else 0.0,
            "top3_share": _top3_share(vd["domain_counter"]),
            "hhi": _hhi(vd["domain_counter"]),
            "type_distribution": {
                t: round(vd["type_counter"][t] / type_total * 100, 1) if type_total else 0.0
                for t in ("ugc", "media", "official_data", "other")
            },
            "engine_jaccard": round(
                sum(jaccard[v]) / len(jaccard[v]), 3) if jaccard[v] else None,
            "engine_gap_rates": {
                e: round(sum(g) / len(g) * 100, 1)
                for (vv, e), g in sorted(engine_gap.items()) if vv == v
            },
            "top_domains": [
                {"domain": d, "count": c, "type": classify(d)}
                for d, c in vd["domain_counter"].most_common(15)
            ],
            "daily_gap_rate": [
                {"date": date, "gap_rate": round(sum(g) / len(g) * 100, 1), "n": len(g)}
                for (vv, date), g in sorted(daily.items()) if vv == v
            ],
            "top_gap_queries": [
                {
                    "query": q["query"],
                    "gap_rate": round(q["gaps"] / q["responses"] * 100, 1),
                    "responses": q["responses"],
                    "top_domains": [d for d, _ in q["domains"].most_common(3)],
                }
                for q in gap_queries[:20]
            ],
        }

    result["decision"] = _apply_decision_rules(result["verticals"])
    return result


def _apply_decision_rules(verticals: dict) -> dict:
    """사전 등록 의사결정 규칙 (브리프 3.3). 해석 변경 금지."""
    if len(verticals) < 2:
        return {"verdict": "데이터 부족 (버티컬 2개 필요)", "rule": None}
    (v1, d1), (v2, d2) = list(verticals.items())[:2]
    diff = d1["gap_rate"] - d2["gap_rate"]
    if abs(diff) >= 10:
        winner = v1 if diff > 0 else v2
        return {
            "verdict": winner,
            "rule": f"공백률 차이 {abs(diff):.1f}%p ≥ 10%p → 공백률 높은 쪽",
        }
    # 비슷하면: 집중도 낮은 쪽 + UGC 비중 높은 쪽 (각 1점)
    score = {v1: 0, v2: 0}
    score[v1 if d1["hhi"] < d2["hhi"] else v2] += 1
    score[v1 if d1["type_distribution"]["ugc"] > d2["type_distribution"]["ugc"] else v2] += 1
    if score[v1] == score[v2]:
        return {
            "verdict": "판정 보류 (집중도/UGC 신호 상충 — 정성 체크 필요)",
            "rule": "공백률 비슷 → 집중도·UGC 기준, 신호 상충",
        }
    winner = v1 if score[v1] > score[v2] else v2
    return {
        "verdict": winner,
        "rule": "공백률 비슷 → 인용 집중도 낮은 쪽 + UGC 비중 높은 쪽",
    }
