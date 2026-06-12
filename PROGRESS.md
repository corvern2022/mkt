# 진행 상황

> 마지막 업데이트: 2026-06-12 (회사 PC에서 초기 구축, Claude Code 세션)

## ✅ 완료

- [x] 프로젝트 골격: 루트 패키지 `aeo_tracker/` (설치 불필요, `python -m`으로 바로 실행)
- [x] SQLite 스키마: runs / queries / responses / citations ([db.py](aeo_tracker/db.py))
  - 응답 원문은 gzip BLOB(`raw_gz`)으로 무조건 저장 → 휴리스틱 바꿔도 재파싱 가능
- [x] 엔진 어댑터 4종 (어댑터 패턴, [engines/](aeo_tracker/engines/))
  - perplexity (sonar, `search_results`/`citations` 양쪽 포맷 처리)
  - openai (Responses API, `web_search` → `web_search_preview` 폴백)
  - gemini (Google Search grounding, redirect URL이면 title의 도메인 사용)
  - anthropic (web search tool, 실제 인용 우선 / 검색결과 폴백)
  - mock (MOCK=1, 키 없이 파이프라인 검증용)
- [x] 쿼리 시드 확장: 버티컬당 45개 ([config/queries.json](config/queries.json))
- [x] 일일 러너: 엔진당 1스레드 병렬, 2회 재시도 후 스킵+로그만, 같은 날 재실행 시 기성공 건 스킵 ([runner.py](aeo_tracker/runner.py))
- [x] 지표 분석: 공백률 / 상위3 점유율+HHI / 도메인 유형 분포 / 엔진 간 Jaccard / 공백 쿼리 Top ([analyze.py](aeo_tracker/analyze.py))
- [x] 사전 등록 의사결정 규칙 코드화 (브리프 3.3 그대로, [analyze.py](aeo_tracker/analyze.py)의 `_apply_decision_rules`)
- [x] 정적 HTML 리포트 (Chart.js CDN, 다크 테마) → `report/index.html` + `metrics.json`
- [x] GitHub Actions 일일 크론 (07:20 KST), 결과 DB/리포트 자동 커밋 ([daily.yml](.github/workflows/daily.yml))
- [x] MOCK 파이프라인 엔드투엔드 검증

## ⏭️ 다음 할 일 (집에서)

1. **API 키 4종 발급/확인** → 로컬 `.env` + GitHub Secrets 등록
2. **실제 키로 스모크 테스트**: `QUERY_LIMIT=2 python -m aeo_tracker.runner`
   - 엔진별 인용 파싱이 실제 응답 포맷과 맞는지 확인 (API 포맷은 자주 바뀜 — raw_gz 저장돼 있으니 어긋나도 재파싱 가능)
   - 특히 openai 모델/툴 타입, anthropic 모델명이 계정에서 사용 가능한지
3. **Actions 수동 1회 실행** (Run workflow, query_limit=5 정도로) → 커밋 잘 되는지 확인
4. **풀 가동 시작** → D+14 (6/26경) 리포트 보고 버티컬 결정
5. (병행 가능, 브리프 7) 레딧 계정 카르마 쌓기, X/인스타 계정 개설

## 메모 / 열린 결정

- 비용: OpenAI/Anthropic 웹검색이 비쌈. 첫 2~3일 실비 보고 `QUERY_LIMIT`이나 `ENGINES` 조정 (README 비용 가드 참고)
- 공백 판정 휴리스틱(`HEDGE_PATTERNS`)은 실데이터 보고 튜닝. raw가 있으니 소급 적용됨
- 도메인 분류표([domains.py](aeo_tracker/domains.py))도 실데이터에서 `other` 비중 크면 보강
- DB가 리포에 커밋되는 구조 (2주 PoC엔 충분). 커지면 Releases나 별도 스토리지로
