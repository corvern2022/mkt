# 폰트 정리 — Codex 전달 명세 (기준 189d5b5)

## 원칙
- 폰트는 **'Samguk Round'(나눔스퀘어라운드 400/700/800) 하나**만 쓴다.
- 이번 작업은 **폰트 종류 통일만** 한다. 글자 크기·굵기·레이아웃은 바꾸지 않는다. 2단계 항목은 화면별로 따로 진행한다.
- 넘침이 생기면 글자를 줄이지 않는다. 그 칸의 높이나 폭을 고친다.

## 현재 상태 (확인 완료)
- `src/fonts.css`가 `body *`에 새 폰트를 `!important`로 적용하고 있어 화면 대부분은 이미 새 폰트다.
- 게임 코드에 쓰인 한글 963자는 서브셋에 모두 들어 있다. 빠진 글자가 다른 폰트로 대체되는 일은 없다.
- 폰트 지정 끝에 `!important`가 붙은 곳만 전역 규칙을 이겨서 다른 폰트로 보인다. `!important`가 없는 예전 지정 수십 곳은 이미 무시되고 있어 화면에 영향이 없다.

## 1단계: 화면에 실제로 다른 폰트가 나오는 곳 (필수)
아래 줄에서 폰트 종류 지정만 지운다. 같은 줄의 크기·굵기·줄 높이는 그대로 둔다.

| 위치 | 현재 지정 | 보이는 곳 | 바꾸는 방법 |
|---|---|---|---|
| `ui/dom/guideStory.css:25` | system-ui !important | 필드 대사 본문 | font-family 삭제 |
| `ui/dom/heroLookout.css:11` | 'Cafe24 Ssurround' !important | 영웅 화면 정보 영역 | font-family 삭제 |
| `ui/dom/heroLookout.css:23` | 'Cafe24 Ssurround' !important | 영웅 성장 버튼 | font-family 삭제 |
| `ui/dom/heroLookout.css:38` | font: bold 17px 'Cafe24 Ssurround' !important | 영웅 등급 배지 | `font-weight:700;font-size:17px`로 풀어 쓴다 |
| `ui/dom/heroDetail.css:1` | -apple-system… !important | 영웅 상세 정보 | font-family 삭제 |
| `ui/dom/heroDetail.css:31` | font: 700 13px -apple-system… !important | 영웅 상세 탭 | `font-weight:700;font-size:13px`로 풀어 쓴다 |
| `ui/dom/summonPanel.css:16` | system-ui !important | 소환 화면 버튼 | font-family 삭제 |
| `ui/dom/summonPanel.css:72` | system-ui !important | 소환 포스터 제목 | font-family 삭제, 굵기는 900 대신 800 |
| `ui/dom/summonPanel.css:73` | system-ui !important | 소환 포스터 설명 | font-family 삭제 |
| `ui/dom/adventureWindows.css:45` | font: 600 11px/1.5 system-ui !important | 7일 성장 여정 초선 배너 | `font-weight:700;font-size:11px;line-height:1.5`로 풀어 쓴다 |
| `ui/dom/gameWindowPolish.css:192` | system-ui !important | 보상 리본 | font-family 삭제 |
| `ui/dom/fieldLifePanel.css:3` | Arial !important | 생활(제작) 숫자 | font-family 삭제 |

**주의:**
- `heroLookout.css`의 Cafe24는 폰트 파일 선언이 이미 없어서, 실제로는 기기의 기본 폰트로 나오고 있다.
- `font:` 축약형 안에 폰트 이름이 들어 있으면 한 줄로 그냥 지우지 말고, 굵기·크기·줄 높이 속성으로 나눠 다시 쓴다. 이렇게 해야 크기가 바뀌지 않는다.

## 2단계: 정리 (화면 변화 없음)
- `!important`가 없는 예전 폰트 지정(`'Cafe24 Ssurround'`, `system-ui`, `-apple-system`, `Noto Sans KR`, `Arial`)을 `var(--game-font)`로 바꾸거나 지운다.
  - 대상: CSS 약 20개 파일, TS 인라인 `fontFamily` 약 170곳(`battle.ts`, `panels.ts`, `overlay.ts`, `settings.ts`, `campaignMap.ts`, `tutorial.ts`, `dungeonBattle.ts`, `dungeonHub.ts`, `battleView.ts`, `currencyFlight.ts`, `fieldTitle.ts`, `battleArrival.ts`, `heroart.ts`, `prologueScreen.ts` 등).
  - `poc/*Review.ts` 같은 검토용 페이지는 제외한다.
- `poc/field.css:1`의 Google Fonts(Noto Sans KR) import를 지운다. 빌드 결과(`dist/main-*.css`)에도 들어가 외부 요청을 만들고 있다.
- 사용하지 않는 `assets/cafe24-ssurround.woff`(약 400KB)와 `CAFE24-SSURROUND-NOTICE.txt`를 지운다. 1단계를 마친 뒤 사용처가 0곳인지 확인하고 지운다.

## 3단계: 가독성 (화면별로 따로, 이번 범위 아님)
- 대사 본문이 굵기 400이라 얇아 보인다. 대사창만 따로 확인한 뒤 굵기를 정한다.
- 파티 슬롯 숫자와 '합류'가 7~8px이다. 일괄로 12px로 키우지 않는다. 그 칸 디자인에 맞춰 아이콘으로 바꾸거나 위치를 옮기는 안을 사용자 승인 후 진행한다.
- 7~9px 지정이 약 100곳 있다. 목록만 만들어 보고하고, 화면별로 승인받은 뒤 고친다.

## 검수 (1단계 완료 조건)
1. 화면 크기: 390×844, 320×740
2. 캡처 화면: 첫 대사, 필드 HUD, 영웅 화면, 영웅 상세, 소환, 소환 결과, 보상 창, 7일 성장 여정, 상점, 설정
   - 1단계 적용 전과 후를 나란히 첨부한다.
3. 자동 검사:
   - 보이는 모든 글자의 실제 적용 폰트(`getComputedStyle().fontFamily`)의 첫 항목이 'Samguk Round'인 곳이 100%여야 한다. 현재는 대사 본문 등이 걸린다.
   - 글자가 칸 밖으로 넘치는 요소(`scrollWidth>clientWidth`, `scrollHeight>clientHeight`, 의도된 스크롤 영역 제외)가 1단계 적용 전보다 늘면 안 된다.
4. 테스트·빌드가 통과해야 하고, 배포본에 위 변경이 반영됐는지 확인한다.
