# 삼국냥전 — Claude 작업 컨텍스트 (2026-10-08 기준, 이전 세션에서 이어받음)

이 폴더는 이전 Claude 세션의 기억을 옮긴 것입니다. 새 세션은 **이 파일을 먼저 끝까지 읽고**, 필요한 상세는 아래 문서를 읽으세요. 이전 세션의 scratchpad는 사라졌으니, 여기 있는 파일만 근거로 쓰세요.

## 1. 역할
- 게임: 삼국냥전 (저장소 `corvern2022/sangukni-game`, 앱 `ait-app/`, 진입 `src/fieldRenewal.ts`). `client/`는 폐기된 코드입니다. 절대 참조하지 마세요.
- 사용자: 기획자 겸 PM입니다. 보고는 **한국어**로, **확정(검증)**과 **추정**을 나눠서 합니다. 확인하지 않은 것은 PASS라고 하지 않습니다.
- Codex: 전투 엔진, 화면 흐름, 새 시스템, **병합·배포** 담당입니다.
- Claude 담당(10/8 합의, `docs/collab-rules-1008.md`):
  - 문구·대사, Claude 담당 파일 안의 작은 버그
  - 밸런스 데이터(**사용자가 승인한 값만**)
  - 검증 도구
  - 플레이·밸런스·문구 최종 검수
- 파일 담당: 한 파일은 한쪽만 고칩니다. 상대 파일은 "수정 요청"(파일:줄 · 현재 · 바꿀 내용 · 이유)으로 넘깁니다.
  - Claude 파일: `guideStory.ts`, 가이드 원본 csv와 `scripts/plan-launch-guide.py`(생성물은 스크립트로만 다시 만듦), `utils/formatAmount.ts`, `summonPanel.ts`, `settings.ts`, `data/balance/*.json`, 검증 도구 파일, 문구 테스트
  - 나머지는 모두 Codex 파일입니다.
- 브랜치 규칙:
  - Claude는 Codex 최신 커밋에서 `claude/<주제>-<날짜>` 브랜치를 따서 작업합니다.
  - 테스트·타입 검사·빌드를 통과시킨 뒤 푸시하고, 초안 PR을 Codex 브랜치로 엽니다.
  - `docs/handoff/claude-latest.md` 핸드오프 노트를 갱신합니다.
  - 병합은 Codex가 merge로 합니다.

## 2. 지켜야 할 사용자 규칙
- 게임 수치는 사용자 승인 없이 바꾸지 않습니다. 제안은 표로 보여 주고 승인을 받습니다.
- 사용자가 하나만 바꾸라고 하면 그것만 바꿉니다. 예: "조조만 말한 거잖아".
- 공용 작업 폴더, 원화, 사용자 저장 데이터는 건드리지 않습니다. 공개 플레이 주소의 초기화 버튼은 누르지 않습니다. 초기화 검증은 로컬에서만 합니다.
- 비밀값은 환경 설정으로만 받습니다. 사용자에게 키를 붙여 넣으라고 하지 않습니다.
- 대사는 말끝을 '냥'·'냥냥'으로 끝내지 않습니다('냥'은 이름에만 씁니다). 가이드 대사는 "상황 → 캐릭터 반응 → 할 일" 순서로, 게임 속 대화처럼 자연스럽게 씁니다.
- 초기화 버튼은 테스트 편의를 위해 그대로 둡니다(출시 전에 다시 결정).
- 이번 범위에서 제외: 실제 iPhone 검수, 결제·환불, 쿠폰.
- Codex가 검수 증거 파일(스크린샷 등)을 저장소에 커밋하는 것은 중단시켰습니다. 검수는 Claude가 합니다.

## 3. 현재 상태 (10/8)
- Codex 브랜치: `codex/ftue-feedback-20261007`. 최신 `8225069b`이고 기능 코드는 `cc29b76b`와 같습니다.
- 공개 플레이 주소: https://alert-adaptive-provision-lobby.trycloudflare.com/?onboarding=qa
- Codex에 보낸 최신 지시서: `docs/codex-dev-order-1008.md`(1~6순위)와 `docs/collab-rules-1008.md`
- Claude PR: https://github.com/corvern2022/sangukni-game/pull/3
  - 브랜치 `claude/text-bugs-20261008`, 커밋 `5bcc2c1`
  - 지시서 1-4·1-5·1-6 수정: 금액 축약 오차, 소환 확률 소수, SSR 보장 문구 중복
  - 초안 PR이고, Codex가 병합하기를 기다리는 중입니다.
- 진행 중이던 작업 (이전 세션이 맡음, 새 세션은 중복 착수 금지):
  - 대사·가이드 문구 교체(`reports/wording-natural-spec.md` 구현)를 같은 브랜치에 커밋하는 중입니다.
  - 재화·난이도 수치 조정(30일 시뮬레이션). 결과는 승인용 표로 사용자에게 드릴 예정이고, 승인 전에는 반영하지 않습니다.

## 4. 검수 결과 요약 (cc29b76b)
- **v9 스킬 자동 검증**: 85명×0/3/5성 255개 중 165개 통과(이전 12), 스킬 치명타 47/49, 설명문 255/255. 상세: `spec85/report-cc29b76b.md`
- **코드 대조**(`reports/code-audit.md`): 확정 결함 7건이 남아 있었습니다.
  - 숫자 표기, 확률 소수, SSR 문구 중복 → Claude가 수정해 PR #3에 올림
  - 가이드 반짝임, 데이터 초기화 노출(그대로 두기로 함), 보상 안내 포인터, 10연 확인 버튼 포인터
- **실제 터치 플레이**(`reports/play-report.md`):
  - 궁수냥 합류 전에 편성 화면이 열립니다.
  - 편성 포인터가 사라지고, 1-7 이후 포인터가 없습니다.
  - 가이드 37에서 진행이 멈춥니다.
  - 도둑냥이 HUD 아래로 지나가서 터치가 막힙니다.
  - 보스를 이긴 뒤에도 '패배' 문구가 남습니다(`fieldLobby.ts:189`).
  - **초반 난이도**: 필드 아군 체력이 이전 대비 47~48% 낮고(`fieldEncounter.ts:18-31`) 1-19부터 연패합니다. 레벨 상한 30은 원인이 아닙니다.
- **재화**(`reports/econ-report.md`):
  - 소환 횟수: 열심 유저 첫날 92 / 2~7일 18.3 / 8~14일 10.6 / 15~30일 6.6회. 목표는 첫날 40~50, 2~7일 10~13, 2주 이후 열심 8~10·30분 5~6입니다.
  - 금화·사료가 크게 남습니다. 금화의 81%가 방치 보상에서 나옵니다.
  - 증표가 쌓이고, 일부 시드에서 진행이 멈춥니다. 사용자는 조정을 승인했지만, 구체 수치는 승인 전입니다.
- **문구**(`reports/wording-natural-spec.md`): 보물 상자·도둑냥 대사가 없고, 장 마무리 대사가 보스전보다 먼저 나옵니다. 결정: 도둑이 훔친 것은 '짐 보따리', 지역 이름은 그대로 둡니다.

## 5. 확정된 설계 문서 (우선순위 순)
1. `docs/growth-decisions.md`: 승급(레벨 상한 30/40/55/70/85/100, 배율 1/1.25/1.55/1.9/2.35/3.0, 카드 1/2/3/4/5), 조각 100개 = 카드 1장, 평판 6단계(의뢰로만 획득), 지역 SSR 영웅·평판 상점, 장비(4부위 C~SSR, +15, 실패 없음, 세트 없음)
2. `docs/character-skills-v9.md`: 85종 스킬, 진영 보너스 9장, 판정 기준 11장(19건)
3. `docs/codex-character-overhaul.md`
4. `docs/currency-fix-proposal-v3.md`: 재화
5. `docs/codex-next-batch.md`, `codex-ui-polish.md`, `codex-wording-final.md`, `codex-ios-perf.md`, `codex-play-feedback-1007.md`(사용자 플레이 피드백, 문서보다 우선)

## 6. 도구·산출물
- 밸런스 스튜디오(비공개 artifact): https://claude.ai/artifact/1RwDwnAQf9CAH45APAU3rn. 원본은 `tool/`(`studio.template.html`, `script.js`, `heroes-v9.json`)
- 85종 녹화 갤러리(artifact): https://claude.ai/artifact/Kok8htoXgat8K1akrN6vVY
- v9 스킬 자동 검증 패치: `spec85/hero-skill-spec-v9.patch`. 실행: `node --import ./scripts/test-resolve.mjs --test src/engine/__tests__/heroSkillSpec.v9.test.mjs`
- 영웅 검수 화면 패치: `review85/skill-review.patch`
- 환경 메모:
  - 테스트 실행기: `node --import ./scripts/test-resolve.mjs`
  - Playwright: `/opt/node-tools/node_modules/playwright`, Chromium: `/opt/pw-browsers/chromium`
  - 워크트리 하나가 약 2.3GB라 디스크를 주의하세요.

## 7. 아직 사용자 결정이 필요한 것
- 평타 단일·광역 규칙(`docs/growth-ideation.md` 3장, 제안만 한 상태)
- 업적 해금 시점
- 레벨 곡선, 장비 수치, 상점 가격, 상점 영웅 명단
- Safari `?perf=1` 측정
