# Claude · Codex 협업 규칙 (10/8부터)

## 1. 역할

| | Claude | Codex |
|---|---|---|
| 개발 | 문구, 작은 버그(아래 담당 파일 안에서만), 밸런스 데이터(**승인된 값만**), 검증 도구 | 전투 엔진, 화면 흐름·안내, 새 시스템, 통합 |
| 검수 | 플레이, 밸런스, 문구 최종 검수 | 자기 수정에 필요한 테스트·타입 검사·빌드만. 대량 캡처와 증거 파일 커밋은 중단 |
| 병합·배포 | 하지 않음 | 담당. Claude 브랜치를 통합하고 플레이 주소 갱신 |

## 2. 파일 담당 (한 파일은 한쪽만 수정)

담당이 아닌 파일을 고쳐야 하면 직접 고치지 말고 **수정 요청**으로 넘깁니다. 요청 양식: 파일:줄 · 현재 · 바꿀 내용 · 이유.

**Claude 담당**
- `src/data/guideStory.ts`: 대사
- 가이드 원본 `guide-1000.csv`, `scripts/plan-launch-guide.py`, 그리고 여기서 생성되는 `launchGuide1000.json`과 `.generated.ts`(직접 고치지 않고 다시 생성)
- `src/utils/formatAmount.ts`와 그 테스트
- `src/ui/dom/summonPanel.ts`: 확률 표기, 보장 문구
- `src/ui/dom/settings.ts`
- `src/data/balance/*.json`: 사용자가 승인한 값만
- 새 검증 도구 파일: `heroSkillSpec.v9.*`, `skill-review.html`, `src/poc/skillReview.*`
- 문구를 비교하는 테스트: `playFeedbackDialogue.test.mjs`, `ftueHandoff2.test.mjs`

**Codex 담당** (위 목록에 없는 파일은 모두 Codex)
- `fieldLobby.ts`, `panels.ts`, `summonReveal.ts`, CSS 전부, `engine/*`, `state/gameState.ts`, `contentBattle.ts`, `v3CombatRuntime.ts`, `fieldEncounter.ts`, `fieldPoc.ts`

**경계에 걸린 항목 처리**
- `fieldLobby.ts` 안의 문구(예: `:289-290` 보스 버튼 토스트, 상자·도둑 대사를 부르는 부분)는 Claude가 `guideStory.ts`에 대사 묶음을 만들고, Codex에 "이 키를 이 시점에 불러 달라"고 수정 요청합니다.
- 지시서 1-1(토스트 비우기)은 `fieldLobby.ts`라서 Codex 담당입니다.

## 3. 브랜치와 통합

1. Codex 작업 브랜치: `codex/ftue-feedback-20261007`. 통합 기준입니다.
2. Claude는 Codex의 최신 커밋에서 `claude/<주제>-<날짜>` 브랜치를 따서 작업합니다.
   - 작업 단위마다 테스트·타입 검사·빌드를 통과시킨 뒤 푸시합니다.
3. Claude는 단위마다 **핸드오프 노트**를 남깁니다.
   - 위치: 브랜치의 `docs/handoff/claude-latest.md` 파일 하나를 덮어씁니다.
   - 내용: 기준 커밋, 커밋 번호, 변경 파일, 바뀐 기대값 테스트, Codex에 보내는 수정 요청
4. Codex는 그 브랜치를 자기 브랜치에 병합합니다(merge, rebase 금지).
   - 충돌이 나면 담당표 기준으로 담당자 쪽을 살립니다.
5. 병합이 끝나면 Codex는 "통합 커밋 번호"를 알려 줍니다. Claude는 그 커밋으로 검수합니다.

## 4. 수치 규칙
- Claude의 시뮬레이션 조정안은 **제안**입니다. 사용자가 승인한 표만 `balance/*.json`에 반영합니다.
- 수치 커밋 메시지에 "승인: 날짜·항목"을 적습니다.

## 5. 이번 결정
- 도둑냥이 훔친 물건: **짐 보따리**
- 지역 이름: **기존 이름 유지**
- 튜토리얼 중 초기화 버튼: 사용자가 이전에 "다시 넣어 달라"고 지시함 → **버튼은 유지.** 강제 튜토리얼(1-6까지) 중에만 숨길지는 사용자 확인 후 반영(그 전에는 지금 그대로 둡니다).
- 이번 범위 제외: iPhone 실기 검수, 결제, 쿠폰
