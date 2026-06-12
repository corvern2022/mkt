# 그로스 엔진 프로젝트: AI 인용 추적기 PoC 브리프

> 작성일: 2026-06-12 / 1인 사이드 프로젝트 (본업 병행) / 글로벌 타겟

---

## 1. 프로젝트 배경

### 큰 그림
- 앱 마케팅 비용(CPI)이 너무 비싸다. 한국 기준 비게임 3~5천 원, 금융앱 1만 원 이상.
- 목표: **광고비 0원으로 앱을 키우는 "그로스 엔진"** 을 만든다. 엔진은 내가 만들 모든 앱이 공통으로 꽂아 쓰는 자산이다. 앱은 죽어도 엔진은 남는다.
- 방식: AI 에이전트로 콘텐츠를 무한 생산/배포하고, AEO(AI 검색 최적화)를 선점하고, 커뮤니티에 확산한다.
- 타겟: **글로벌 (영어 콘텐츠)**. 배포 채널은 전채널(레딧, X, 쓰레드, 인스타, 자체 블로그/도메인).

### 엔진 전체 아키텍처 (4모듈)
| 모듈 | 역할 | 상태 |
|---|---|---|
| 1. 콘텐츠 공장 | 앱 DB를 입력받아 채널별 포맷(카드뉴스, 쓰레드 타래, SEO 블로그 글, FAQ 스키마 페이지)으로 자동 생성 | 2단계 |
| 2. AEO 자산화 + 인용 추적기 | 구조화 데이터(JSON-LD) 자산화 + AI 답변에 내/타 도메인이 인용되는지 매일 추적 | **이번 PoC** |
| 3. 배포 + 승인 큐 | 생성은 전자동, 발행은 반자동. 커뮤니티 채널은 사람이 승인 버튼만 누르는 큐 (자동 살포 금지, 계정 밴 방지) | 2단계 |
| 4. 추천 루프 | 유저별 개인화 공유 리포트 생성 | 보류 (v2) |

### 지금까지의 의사결정 (이미 결론난 것, 다시 논의 불필요)
- 시니어 음성 컴패니언 앱: **폐기**. 라이브 운영 부담이 1인 사이드 프로젝트에 부적합, 음성 클립 가설이 약함.
- 한국 데이터 MCP 커넥터: **폐기**. 무료 오픈소스 포화 상태.
- 토스 미니앱 시리즈(편의점탐정 등 국내용): 글로벌 피벗으로 **보류**.
- 첫 타자 앱: **미정**. 후보 2개 중 감으로 못 고르겠음 → 이번 PoC의 측정 데이터로 결정한다.

---

## 2. 이번 PoC의 목적

**두 후보 버티컬의 AEO 기회 크기를 2주간 측정해서, 엔진을 붙일 첫 앱을 데이터로 결정한다.**

### 후보 버티컬
1. **크립토/토큰화 주식** (기존 "밤주식탐정"의 글로벌 버전. Hyperliquid 데이터 파이프라인 경험 보유)
2. **K-버티컬** (한국 편의점/빵집/여행 정보를 영어로. 기존 크롤러 설계 재활용 가능. 한국 거주자라는 데이터 해자)

### 핵심 가설
- 영어권 AI 검색(AEO)에서 크립토 쿼리는 CoinGecko류 강자가 인용을 독점하고 있을 것이다.
- K-버티컬 쿼리는 구조화된 영어 소스가 없어 AI가 빈약한 답을 하는 "공백"이 많을 것이다.
- → 측정으로 확인한다. 가설이 틀리면 데이터를 따른다.

---

## 3. 시스템 동작 사양

### 3.1 매일 할 일 (자동)
1. 버티컬별 영어 쿼리 30~50개(아래 시드 참고, 확장 필요)를 4개 AI 검색 엔진에 던진다.
   - Perplexity API (sonar 계열, 인용 출처 반환)
   - OpenAI API (web search 사용, 인용 반환)
   - Google Gemini API (Google Search grounding, groundingMetadata 반환)
   - Anthropic API (web search tool, 인용 반환)
2. 각 응답에서 **인용된 도메인 목록 + 인용 순서/위치**를 파싱한다.
3. 원문 응답 전체와 파싱 결과를 DB에 저장한다 (날짜, 엔진, 쿼리, 도메인, 순위).

호출량 추정: 2개 버티컬 × 40쿼리 × 4엔진 × 1회/일 = 320콜/일. 예산 한도: **월 5만 원 이내** (초과 시 쿼리 수나 엔진 수 축소).

### 3.2 측정 지표 (분석 단계)
- **공백률**: 인용 출처가 0개이거나, AI가 구체적 답 없이 일반론으로 얼버무린 응답의 비율 (쿼리별/버티컬별)
- **인용 집중도**: 상위 3개 도메인의 인용 점유율 (HHI식 계산도 병기)
- **도메인 유형 분포**: UGC(레딧/유튜브/블로그) vs 대형 미디어 vs 공식 사이트/데이터 사이트 비율
  - UGC 비중이 높으면 = 개인이 콘텐츠로 비집고 들어갈 여지가 큼
- **엔진 간 차이**: 같은 쿼리에 엔진별 인용 소스가 얼마나 다른지

### 3.3 사전 등록 의사결정 규칙 (나중에 입맛대로 해석 방지)
- 공백률 차이가 10%p 이상이면 → 공백률 높은 버티컬 선택
- 공백률이 비슷하면 → 인용 집중도 낮은 쪽 + UGC 비중 높은 쪽 선택
- 정성 체크: 인용 강자가 레딧/개인 블로그면 진입 가능, 공식 거래소/대형 미디어면 진입 곤란으로 판단

### 3.4 산출물
1. 일별 인용 로그 DB
2. 2주 후 버티컬 비교 리포트 (지표 + 추이 그래프, 정적 HTML이면 충분)
3. **공백률 높은 쿼리 Top 리스트** → 이게 그대로 모듈 1(콘텐츠 공장)의 1순위 생산 주제가 된다

---

## 4. 쿼리 시드 (각 40~50개로 확장할 것)

### K-버티컬 시드
```
what to buy at a Korean convenience store
best Korean convenience store snacks 2026
Korean convenience store 1+1 deals this month
must try foods at GS25
CU vs GS25 vs 7-Eleven in Korea
best bakeries in Seoul
Seoul bakery guide for tourists
what snacks to bring back from Korea
Korean convenience store ramen ranking
how much does food cost at Korean convenience stores
best things to eat in Seoul on a budget
limited edition Korean snacks this month
what to buy at Olive Young
Seoul cafe recommendations
Korea travel food itinerary 3 days
```

확장 방향: 계절/이벤트형(cherry blossom season, winter), 도시별(Busan, Jeju), 구매대행형(where to buy X online), 비교형(Korean vs Japanese convenience store).

### 크립토/토큰화 주식 시드
```
best platform to trade tokenized stocks
how to buy Tesla stock on chain
Hyperliquid tokenized equities
tokenized stocks vs real stocks
trade US stocks with crypto
best tokenized stock platforms 2026
are tokenized stocks safe
tokenized stock price tracker
24/7 stock trading with crypto
on-chain equities list
tokenized stock liquidity comparison
do tokenized stocks pay dividends
tokenized Nvidia stock where to buy
xStocks vs Hyperliquid equities
tokenized stock regulation 2026
```

확장 방향: 종목별(tokenized AAPL/TSLA/NVDA), 지역 규제형(tokenized stocks in EU/Asia), 가격/프리미엄형(tokenized stock premium discount).

---

## 5. 기술 스택 제안 (PoC 수준, 단순하게)

- 언어: Python (또는 TypeScript, 편한 쪽)
- 저장: SQLite 단일 파일 (PoC에 충분. 스키마: runs, queries, responses, citations)
- 스케줄: GitHub Actions cron 1일 1회 (서버 비용 0원) 또는 로컬 cron
- 리포트: 정적 HTML 생성 스크립트 (또는 Streamlit, 더 단순한 쪽)
- 시크릿: API 키 4종은 환경변수/GitHub Secrets
- 파싱 주의: 엔진마다 인용 반환 포맷이 다름. 엔진별 어댑터 패턴으로 분리할 것. 응답 원문은 무조건 raw 저장 (나중에 재파싱 가능하게)

## 6. 제약사항 / 원칙

- 1인 개발, 본업 병행. **운영 손이 안 가는 구조 최우선.** 실패한 콜은 재시도 후 스킵하고 로그만 남길 것 (알림 폭탄 금지).
- 고정비 최소화. 서버 띄우지 말 것.
- 이 PoC는 버리는 코드가 아니라 모듈 2의 영구 부품이 된다. 과도한 추상화는 말되, 어댑터 분리 정도의 기본 구조는 지킬 것.
- 글로벌/영어 기준. 쿼리도 응답 분석도 영어.

## 7. PoC 이후 로드맵 (참고용, 이번 작업 범위 아님)

1. 측정 결과로 첫 버티컬 확정
2. 모듈 1: 공백 쿼리 리스트부터 콘텐츠 자동 생산 (채널별 멀티 포맷)
3. 모듈 2 확장: 자체 도메인 + JSON-LD 구조화, "내 도메인 인용 등장" 추적 추가
4. 모듈 3: 채널 계정 워밍업은 PoC 기간에 병행 가능 (레딧 계정 카르마 쌓기, X/인스타 계정 개설)
