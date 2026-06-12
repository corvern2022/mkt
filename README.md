# Growth Engine — AI 인용 추적기 PoC (모듈 2)

> 두 후보 버티컬(크립토/토큰화 주식 vs K-버티컬)의 AEO 기회 크기를 2주간 측정해서, 엔진을 붙일 첫 앱을 데이터로 결정한다.

원본 브리프: [docs/growth-engine-poc-brief.md](docs/growth-engine-poc-brief.md)
진행 상황 / 남은 일: [PROGRESS.md](PROGRESS.md)

---

## 🏠 집에서 이어하기 (퀵스타트)

```bash
git clone https://github.com/corvern2022/mkt.git
cd mkt
python -m venv .venv
# Windows: .venv\Scripts\activate / Mac·Linux: source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # API 키 4개 채우기

# 스모크 테스트 (버티컬당 2쿼리만, 키 있는 엔진만 실행)
QUERY_LIMIT=2 python -m aeo_tracker.runner

# API 키 없이 파이프라인만 검증 (가짜 응답 사용)
MOCK=1 python -m aeo_tracker.runner

# 리포트 생성 → report/index.html 브라우저로 열기
python -m aeo_tracker.report
```

윈도우 PowerShell에서 env 지정은: `$env:QUERY_LIMIT=2; python -m aeo_tracker.runner`

**자동 수집을 켜려면** (서버 0원, GitHub Actions cron):
GitHub 리포 → Settings → Secrets and variables → Actions 에서 아래 4개 시크릿 등록.
등록된 키의 엔진만 실행되므로 일부만 넣어도 동작한다.

| Secret | 발급처 |
|---|---|
| `PERPLEXITY_API_KEY` | perplexity.ai/settings/api |
| `OPENAI_API_KEY` | platform.openai.com |
| `GEMINI_API_KEY` | aistudio.google.com/apikey |
| `ANTHROPIC_API_KEY` | console.anthropic.com |

등록 후 Actions 탭 → `daily-citation-tracking` → **Run workflow**로 수동 1회 돌려서 확인.
이후 매일 07:20 KST(22:20 UTC)에 자동 실행되고, 결과 DB와 리포트가 리포에 자동 커밋된다.

---

## 동작 방식

```
config/queries.json (2버티컬 × 45쿼리)
        │
        ▼
aeo_tracker/runner.py ──→ 엔진 어댑터 4종 (병렬, 엔진당 1스레드)
        │                   ├ perplexity.py  (sonar, citations)
        │                   ├ openai_engine.py (Responses API + web_search)
        │                   ├ gemini.py      (Google Search grounding)
        │                   └ anthropic_engine.py (web_search tool)
        ▼
data/citations.db (SQLite: runs / queries / responses / citations)
  · 응답 원문은 gzip BLOB으로 무조건 raw 저장 → 나중에 재파싱 가능
        │
        ▼
aeo_tracker/analyze.py ──→ aeo_tracker/report.py ──→ report/index.html
```

### 측정 지표 (브리프 3.2)
- **공백률**: 인용 0개이거나, 인용이 빈약하고 얼버무림 패턴이 감지된 응답 비율
- **인용 집중도**: 상위 3개 도메인 점유율 + HHI
- **도메인 유형 분포**: UGC / 대형 미디어 / 공식·데이터 / 기타 ([domains.py](aeo_tracker/domains.py)의 분류표, 재분류 가능)
- **엔진 간 차이**: 같은 쿼리의 엔진별 인용 도메인 Jaccard 유사도
- **공백률 높은 쿼리 Top 리스트** → 모듈 1(콘텐츠 공장)의 1순위 생산 주제

### 사전 등록 의사결정 규칙 (브리프 3.3 — 변경 금지)
1. 공백률 차이 ≥ 10%p → 공백률 높은 버티컬 선택
2. 비슷하면 → 인용 집중도 낮은 쪽 + UGC 비중 높은 쪽
3. 정성 체크: 인용 강자가 레딧/개인 블로그면 진입 가능, 공식 거래소/대형 미디어면 진입 곤란

---

## 비용 가드

호출량: 2버티컬 × 45쿼리 × 4엔진 = 360콜/일. 예산 한도 **월 5만 원**.

| 엔진 | 대략 단가 | 월 추정 (90콜/일) |
|---|---|---|
| Gemini 2.5 Flash + grounding | 무료 티어 1,500건/일 내 | ~0원 |
| Perplexity sonar | ~$5/1k req + 토큰 | ~$15 |
| OpenAI web search | 토큰 + 검색 과금 | ~$20~60 (모델/요금제 따라 큼) |
| Anthropic web search | $10/1k 검색 + 토큰 | ~$30 |

**초과 조짐이 보이면 줄이는 순서** (브리프: 쿼리 수나 엔진 수 축소):
1. `.env` 또는 워크플로의 `QUERY_LIMIT`으로 버티컬당 쿼리 수 축소 (예: 30)
2. `ENGINES=gemini,perplexity` 처럼 비싼 엔진 제외
3. 크론을 격일로 (`.github/workflows/daily.yml`의 cron 수정)

엔진별 일일 비용은 runner가 매 실행 끝에 응답 토큰 기준 추정치를 로그로 출력한다.

## 환경변수

| 변수 | 기본값 | 설명 |
|---|---|---|
| `ENGINES` | (키 있는 전부) | 쉼표 구분: `perplexity,openai,gemini,anthropic` |
| `QUERY_LIMIT` | 없음(전체 45) | 버티컬당 쿼리 수 제한 |
| `MOCK` | 0 | 1이면 API 호출 없이 가짜 응답으로 전체 파이프라인 실행 |
| `DB_PATH` | data/citations.db | SQLite 경로 |
| `OPENAI_MODEL` | gpt-4o-mini | |
| `GEMINI_MODEL` | gemini-2.5-flash | |
| `ANTHROPIC_MODEL` | claude-haiku-4-5 | |
| `PERPLEXITY_MODEL` | sonar | |

## 원칙 (브리프 6)

- 운영 손이 안 가는 구조 최우선. 실패한 콜은 2회 재시도 후 스킵, DB에 error로 기록만 (알림 없음).
- 서버 없음. GitHub Actions cron + 리포에 DB 커밋.
- 이 코드는 모듈 2의 영구 부품. 어댑터 분리는 지키되 과한 추상화는 하지 않는다.
