# 삼국냥전 cc29b76b 코드 검수 (독립 검증, 읽기 전용)

- 대상: `/home/user/sg-cc29` (detached `cc29b76bf0f9`), 기준 `31c2b53`. 경로는 `ait-app/src/` 기준.
- 범위: codex-next-batch / codex-wording-final / codex-ios-perf / codex-ui-polish + codex-play-feedback-1007(0~18장, 앞의 4개 문서와 충돌하면 이 문서가 우선). 경제 수치는 currency-fix-proposal-v3 기준.
- 방법: 테스트·타입 검사·빌드 실행, 코드 읽기, Node로 함수 직접 실행(formatAmount·확률 표시·가이드 순서), 빌드된 CSS의 캐스케이드 확인. 브라우저·실기기 확인은 하지 않았음.
- 워크트리는 수정하지 않음(`git status` 0줄). 빌드 결과는 scratch `r1008/audit/dist`에 둠.
- 표기: **[확정]**은 코드 실행이나 빌드 산출물로 재현한 것, **[추정]**은 코드를 읽고 판단한 것.

## 요약

| 판정 | 개수 |
|---|---|
| 구현 확인 (코드 근거 있음, 일부는 "코드 기준"으로 화면은 미확인) | 56 |
| 부분 | 16 |
| 미구현 | 12 |
| 문서와 다름 (사용자 결정이나 피드백 우선으로 의도된 것 포함) 6 + 문서끼리 충돌 1 | 7 |
| 검증 불가 (실기기·화면·서버 필요) | 10 |
| 기타 (감사 재현 1, 경제 v3 검증 생략 1) | 2 |

**핵심 [확정] 결함 7건.** 모두 play-feedback 18장 "[확정]" 항목인데 아직 고쳐지지 않았습니다.
1. `formatAmount` 소수 오차가 그대로입니다. 2,300,000 → "2.29M", 1,150,000 → "1.14M"으로 나옵니다(18-5).
2. 확률 창에 긴 소수가 남아 있습니다. "1.17647%", "2.91667%", "0.06522%"(18-11).
3. 초보 모집 배너에 "SSR 확정까지 N회"와 "40회 안에 SSR 확정"이 함께 나옵니다(18-12).
4. 가이드 독 반짝임이 그려지지 않습니다. 빌드 CSS에서 `content:none`이 뒤에 있어 이깁니다(18-8).
5. 튜토리얼 중에도 설정의 '데이터 초기화'가 '기타' 안에 보입니다(18-3).
6. 보상을 받을 수 있는 가이드 독에 포인터·빨간 점·펄스가 없습니다(18-1).
7. 10연 결과 '확인' 버튼에 안내 대상이 없습니다(18-2 일부).

5624b4f(상자 복구)에서는 정확성 버그를 찾지 못했습니다. 중복 지급, 재접속 재지급, 경쟁 조건 모두 해당 없습니다.

## 테스트 결과

| 항목 | 명령 | 결과 | Codex 주장 | 일치 |
|---|---|---|---|---|
| Node 테스트 | `npm test` → `node --import scripts/test-resolve.mjs --test …` | tests 1326 / **pass 1325 / fail 0 / skipped 1** (`wire fixtures validate against the existing server shared contracts # SKIP`) / 152.7초 | 1,325 통과, 1 skip | 일치 |
| Vitest | 같은 러너의 vitest 단계 | Test Files 3 passed / **Tests 13 passed** | 13 통과 | 일치 |
| 타입 검사 | `npx tsc --noEmit` | 오류 0 (EXIT 0) | 통과 | 일치 |
| 빌드 | `npx vite build --outDir <scratch>` | 성공 5.16초. 경고는 dynamic import 중복(panels.ts, fieldFeatures.ts)뿐. `main-BjLVHshN.css`, `main-Cvgi1kwZ.js` | CSS `main-BjLVHshN.css` | CSS 해시 일치 |
| prebuild 이미지 검사 | `prepare-field-image-assets.mjs --check` | EXIT 0, "Public assets 1814.1 → 799.8 MiB" | — | — |
| 캠페인 감사 | `node --import scripts/test-resolve.mjs qa/campaign-audit.mjs` | `dialogueLines 151, findings []` | findings 0 | 일치. 단, 범위가 좁음(아래 참고) |
| 가이드 대사 감사 | `qa/guide-story-audit.mjs` | PASS | — | — |
| v9 영웅 스킬 명세 테스트 | `heroSkillSpec.v9.test.mjs` / `.harness.mjs` / `data/heroSkillSpec.v9.json` | **없음** (패치 미적용, 예상대로) | — | — |

## 문서별 체크리스트

### A. codex-play-feedback-1007.md (가장 우선)

| # | 항목 | 판정 | 근거 file:line | 메모 |
|---|---|---|---|---|
| 0 | 소프트 튜토리얼 (화면 막지 않음) | 구현 확인 | ui/dom/tutorialSpotlight.css:1, :17-18 | 레이어 전체가 `pointer-events:none`. 어둡게 처리는 `first-summon-focus`(metric summon)일 때만. `.tutorial-shade` 없음 |
| 0 | 1-3~1-4 보물상자 1회 | 구현 확인 | engine/fieldGuideV6.ts:6, :20 (claimed===9); state/gameState.ts:1834, :1841-1842 | 가이드 9(1-3 보스 뒤 이름) 다음, 1-4 보스 전에 등장. 보상은 사료 +20(사료 상자와 같음, inventoryPanel.ts:27) |
| 0 | 1-6 첫 소환 후 도둑냥 1회 | 구현 확인 | fieldGuideV6.ts:7, :20 (claimed===18); fieldLobby.ts:155-156 | -205 '동료 5명 편성' 다음 순서. 가이드 도둑은 도망가지 않음(fieldView.ts:1009 `!discovery.guided`) |
| 0/15 | 데미지 미터는 파티 재시작 전까지 누적 | 구현 확인 | engine/fieldDamageMeter.ts:4-17; engine/fieldContinuity.ts:6, :9, :36, :55; engine/fieldEncounter.ts:78; fieldLobby.ts:275 | 지역 이동·보스 진입·승리 후 순환에서는 유지. 편성 변경·패배·부활 버튼에서는 0으로. 30초 창 방식이 아님 |
| 1 | 프롤로그 칸 고정 (flex-start, 12px 간격, 4:3, 캡션 2줄 고정) | 구현 확인 | ui/dom/prologueScreen.ts:127-131, :171-185 | 화면 y좌표 ±2px 검수는 검증 불가 |
| 2 | 대화창 고정 높이·위치, 버튼 '다음' 통일 | 구현 확인 | ui/dom/guideStory.css:2 (height 152px), :8 (width 72px); guideStory.ts:9 (항상 '다음') | `place()` 재계산 제거. ui-polish C(내용에 맞춘 높이)와는 다르지만 이 문서가 우선 |
| 3 | 대화 중 전투 계속, 멈춤은 syncOverlayPause 한 곳 | 구현 확인 | fieldLobby.ts:249-257 (`.guide-story`는 멈춤 조건에 없음), :560 (`setPaused`→startupPaused→sync) | fieldRenewal.ts:87/92의 직접 호출도 이 래퍼를 거침 |
| 4 | 보스 등장 띠 연출 | 부분 | fieldLobby.ts:278-285; ui/dom/fieldPlayFeedback.css:1-9 | 어두운 띠, 붉은 선 2줄, 이름 크게·'보스 등장' 작게, 0.2/1.2/0.2초, 동작 줄이기 구현. **보스 이름 흔들림 없음**, 보스 초상 없음 |
| 5 | 보스 격파 → '격파!' 띠 | 구현 확인 | fieldLobby.ts:177 | 클리어 보상 팝업 제목이 '보상'으로 고정돼 지역명("1-1 숲길 클리어")은 화면에서 사라짐(본문 첫 줄에도 없음) |
| 6 | 보상 팝업 제목 "보상" 통일 | 구현 확인 | ui/dom/overlay.ts:707 (`opts.title` 무시) | showReward 밖의 다른 창은 '오프라인 보상'(panels.ts:943), '소환 보상'(summonPanel.ts:50)으로 남음. 부록 A 목록 밖 |
| 7 | 포인터를 금화 아이콘이 아닌 손으로, 가운데 아래, 누르기·파동 | 부분 | tutorialSpotlight.ts:9 (SVG 손); tutorialPlacement.ts:6-14; tutorialSpotlight.css:4-5 (누름 90%), :20, :23 (파동) | 금화 발 아님. '다가감 0.25초' 단계 없음. 배치 후보가 모두 겹치면 포인터를 숨김(tutorialSpotlight.ts:48). 원화(고양이 손 512px)는 아직 없음 |
| 8.1 | 막 레이어 제거, 어두운 배경은 첫 소환만 | 구현 확인 | tutorialSpotlight.css:1, :18; tutorialSpotlight.ts:22 | |
| 8.2 | 누를 곳 하나 + 짧은 말풍선 | 구현 확인 | tutorialSpotlight.ts:16-17, :27 | |
| 8.3 | X(닫기)·전투 버튼은 안내하지 않음 | 구현 확인 | panels.ts:388-390 (레벨업·승급 버튼만), :81-82 (전투·편성은 대상 아님) | |
| 8.4 | 지역 이동·보스 버튼은 가이드를 따름 | 구현 확인 | state/gameState.ts:1609 `canTravelField`; fieldLobby.ts:288, :519 | |
| 8.5 | 대화 중 화면 터치 무시 제거 | 구현 확인 [추정] | poc/fieldView.ts·fieldLobby.ts에 `.guide-story` 터치 차단 없음 (grep) | 실제 터치는 검증 불가 |
| 9 | 지역 이동 때 아군 위치·HP·기력 유지, 적은 다시 생길 때 교체 | 부분 | engine/fieldContinuity.ts:5-48; fieldLobby.ts:242 | 같은 맵이면 상태 전체 유지. 맵이 바뀌면 HP·기력은 유지하지만 `preserveArtifacts:false`라서 주운 아이템·보급수레·발견물을 지움(9.4 요구와 다름) |
| 10 | 말풍선 문구는 가이드 metric 기준, 레벨업 단계에 '편성' 강조 없음 | 구현 확인 | tutorialSpotlight.ts:27; panels.ts:388-390 | "Lv.1Lv.1", "1"이 나올 경로 없음 |
| 11 | 보스 버튼 `.lobby-hunt{grid-area:1/1}` + `border-radius:inherit` | 구현 확인 | fieldHudLayout.css:403, :407 | 31c2b53 대비 CSS 차이는 이 2줄과 우편 빨간 점(:409-410)뿐. min-height·padding·폭·top 값은 같음 → **크기·위치 변경 없음** |
| 12 | 가이드 9 = 집사 이름, Lv.2 팝업 제거 | 구현 확인 | fieldGuideV6.ts:36; fieldLobby.ts:346-347, :401, :500-503 | 프로필 직접 탭은 Lv.2 이상에서만 열림(:213, 프로필 자체가 이름 단계 전에는 숨김) |
| 13 | 대장 사료 대사 2줄 삭제 | 구현 확인 | data/guideStory.ts (해당 문자열 0건) | |
| 14.1-2 | 상자·도둑 가이드 확정 등장 1회, 포인터로 위치 안내 | 구현 확인 | gameState.ts:1834; fieldLobby.ts:154, :559 (발견물 rect를 포인터 대상으로) | |
| 14.3 | 다른 등장 확률은 그대로, 상자 단계에서 20스테이지 해금 처리 | 구현 확인 | gameState.ts:1692; fieldView.ts:312-316 (28초·확률 변경 없음) | |
| 15 | 미터 UI (오른쪽 위, 접힘 기본, 0.5초, 초상·막대·%) | 구현 확인 | ui/dom/fieldDamageMeter.ts:6-29; fieldDamageMeter.css:1 | 숫자는 `formatAmount(…,true)`(쉼표 전체)라서 K/M 압축 규칙은 쓰지 않음. 15.4(콘텐츠 기여도와 일치)는 검증 불가 |
| 16 | 소환 배너 높이 고정, 탭 미리보기 1장 | 구현 확인 | summonPanel.css:86-87; summonPanel.ts:15, :95 | |
| 17a | 메인 캔버스 `willReadFrequently` 제거 | 미구현 | poc/fieldView.ts:124 (DEV 플래그 없으면 true) | 이 장은 '측정 후 확정' 조건. Safari JSON 미첨부 |
| 17b | WebGL 복사 제거 | 부분 | monsterEffekseer.ts:6 (false로 바뀜); fieldStatusEffekseer.ts:50 (여전히 `preserveDrawingBuffer:true`) | |
| 17c,f | 가림 레이어 clip, 고정 간격 시뮬레이션 | 검증 불가 | — | 코드로 판단하지 못함 |
| 17d | `ctx.filter` 제거 | 미구현 | approvedFrameRenderer.ts:117, :128, :153; productionRigRenderer.ts:76 | |
| 17e | `shadowBlur` 제거 | 미구현 | basicProjectileVisual.ts:22 | |
| 17g | 출시 빌드에서 0.1초마다 JSON.stringify 끄기 | 부분 | fieldView.ts:689 (DEV 한정) / :719-721 (출시 빌드에서도 실행) | |
| 17h | 데미지 숫자 캐시 | 미구현 [추정] | fieldView.ts의 strokeText 경로 그대로 | |
| 18-1 | 보상 대기 중이면 가이드 독 '받기'에 포인터·빨간 점·커졌다 작아지기 | **미구현 [확정]** | fieldLobby.ts:485 (`guideProgress<q.target`일 때만 대상 지정); :479 (튜토리얼 중 `rewardCount=0`); :559 (kill·cleared 단계에서는 스포트라이트 꺼짐); fieldHudLayout.css:384 (`animation:none!important`) | 10연 직후·처치 완료 직후에 가리키는 곳이 없음 |
| 18-2 | 우편 받기 / 10회 소환 / 결과 확인 / 편성에 learning-target | 부분 | panels.ts:981 (우편 ✓), summonPanel.ts:101 (10회 ✓), panels.ts:222, :232 (편성 ✓); **summonReveal.ts:38 '확인' ✗** | |
| 18-3 | 데이터 초기화: 튜토리얼 중 숨김, 이후 '기타' 안, 확인창 | **부분 [확정]** | settings.ts:182 (다시보기만 숨김), :189-200 (`extras.append(danger)` 조건 없음), :194 (확인창 ✓) | |
| 18-4 | 레벨업 토스트가 보스 격파에 가려지지 않음 | 구현 확인 (코드) | fieldLobby.ts:173, :177 (격파는 띠, 토스트와 분리), :328-331 | 화면 확인은 검증 불가 |
| 18-5 | formatAmount 정수 계산 | **미구현 [확정]** | utils/formatAmount.ts:7 | 아래 버그 1 |
| 18-6 | 말풍선 "Lv.1Lv.1"·빈 말풍선 | 구현 확인 | tutorialSpotlight.ts:27 | |
| 18-7 | 320px에서 포인터가 '필요·보유' 글자를 가리지 않음 | 구현 확인 (코드) | tutorialPlacement.ts:5, :16-17; tutorialSpotlight.ts:31-43 (텍스트 상자를 장애물로 등록) | 화면 확인은 검증 불가 |
| 18-8 | 가이드 독 반짝임 복구 | **미구현 [확정]** | tutorialSpotlight.css:11 vs fieldHudLayout.css:79 | 아래 버그 4 |
| 18-9 | 옛 링 규칙 삭제 | 미구현 | fieldHudLayout.css:112-119 그대로 | :384의 `outline:none!important`로 덮어 결과적으로 링은 0 |
| 18-10 | 하후연 → 하후연냥 | 구현 확인 | data/v3Characters.json:514 | 남은 곳: data/combatProfiles.ts:307 `displayName:'하후연'`(냥 없는 유일한 항목, battle.ts:1655 격자에서만 쓰임 [추정: 현재 앱에서 노출 안 됨]) |
| 18-11 | 확률 소수 둘째 자리 내림 | **미구현 [확정]** | summonPanel.ts:36 `Number(row.rate.toFixed(5))` | 실제 출력: 1.17647 / 2.91667 / 0.06522 |
| 18-12 | "SSR 확정까지 N회"만 남김 | **미구현 [확정]** | summonPanel.ts:91-92 (strong=`SSR 확정까지 ${remaining}회`, small=`40회 안에 SSR 확정`) | |
| 18-13 | 하드 안내를 탭 바로 아래로 | 구현 확인 | fieldFeatures.ts:57, :64 (11da276) | 하드 옵션 disabled 처리도 함께 |

### B. codex-ui-polish.md

| 항목 | 판정 | 근거 | 메모 |
|---|---|---|---|
| A1 튜토리얼 중 다시보기·초기화 숨김, 이후 '기타', 다시보기 확인창 | 부분 | settings.ts:177 (확인창 ✓), :181-182, :199-200 | 18-3과 같은 결함 |
| A2 '삼국냥전 v0.5', 계정 표시 숨김 | 구현 확인 | settings.ts:185-186 | |
| B 지역 배너: 상단 얇은 띠 1.2초, 대화 중이면 생략 | 구현 확인 | fieldLobby.ts:190-197; fieldLobby.css:49 (max-height 40px) | |
| C 대사창 높이를 내용에 맞춤 | 문서와 다름 | guideStory.css:2 | 피드백 2장(고정 높이)이 우선 |
| D 팝업 1초 간격, 레벨업은 토스트 | 구현 확인 | fieldLobby.ts:72-75, :173, :328-331 | |
| E1 NEW만, 중복은 "카드 +1" | 구현 확인 | summonReveal.ts:31-33; summonPanel.ts:45 | |
| E2 결과를 등급순으로 | 부분 | summonPanel.ts:43 ('최근 결과'만 정렬) / **summonReveal.ts:28 (공개 연출은 뽑은 순서 그대로)**; gameState.ts:1573-1581 | Codex는 "다시 열지 않음"으로 둠 |
| E3 SR 이상 뒤집힘 강조 | 구현 확인 (코드) | summonReveal.css:17-19, :24-26 | 화면은 검증 불가 |
| E4 0.6%, 등급별 묶음 SSR부터 | 부분 | summonPanel.ts:34 (등급 역순), :36 | 0.6은 됨. 1.17647 등은 남음(18-11) |
| F1 한 줄 "초선냥 영입까지 n/60" | 문서와 다름 | growthEventPanel.ts:17-18 | 사용자 결정(한 줄 '초선냥 영입', 진한 보라)대로 구현. 진행 칩 '미션 수령 n/60'. growthJourney.css:4 (#7937fa→#4e2bb8), `white-space:nowrap` ✓ |
| F2 "전체 미션 0/70" | 구현 확인 | growthEventPanel.ts:26 | |
| F3 "몬스터 N마리 처치" | 구현 확인 | growthEventPanel.ts:56 | |
| F4 "또는 몬스터 N마리 처치" | 구현 확인 | growthEventPanel.ts:59-60 | |
| G1 '<' 두 개 정리 | 검증 불가 | — | 코드로 판단 못 함 |
| G2 방어력 0% | 구현 확인 | panels.ts:329, :345 | |
| G3 "사료 부족" | 검증 불가 | — | |
| H 하드 탭 회색 + 해금 안내 | 구현 확인 | fieldFeatures.ts:56-57, :64 | |
| I 가이드 독 "호야냥 Lv.2", "받을 보상 n개" | 구현 확인 | fieldGuideV6.ts:37; fieldLobby.ts:479-481 | 튜토리얼 중에는 n개 표시를 끔 |

### C. codex-next-batch.md (+ 경제 v3)

| 항목 | 판정 | 근거 | 메모 |
|---|---|---|---|
| §1 강제 튜토리얼 (막기) | 문서와 다름 | — | 피드백 0·8장(소프트)으로 대체. 이동·보스 게이트만 남김 (gameState.ts:1609, :1881; fieldLobby.ts:288, :519) |
| §1 단계 흐름 1-1~1-6 → 18번째 10연 | 구현 확인 | data/referenceGuide.ts:80-84 (실행 덤프: 17=1-6 보스, 18=10회 소환) | 9번은 사료→이름(피드백 12), 15번은 금화 상자 |
| §1 재접속 이어하기 | 구현 확인 [추정] | fieldGuide 저장 (gameState.ts:2560 이후 `fieldGuide`) | Codex 자연 145에서도 확인했다고 주장 |
| §1 기존 계정 보충 지급 | 검증 불가 | gameState.ts:1673 `advanced-opening-repair-v1` | |
| §3 스포트라이트 + 포인터 | 구현 확인 | 위 7·8 | 금화 발 대신 손 SVG(피드백 7 우선) |
| §3 반짝임 스윕 1.2초 × 3회, 8초 휴지 | **미구현 [확정]** | tutorialSpotlight.css:11-12 (11.6초 주기로 정의돼 있으나 그려지지 않음) | 버그 4 |
| §3 빨간 점 | 부분 | fieldHudLayout.css:409-410 (우편), growthJourney.css:20 (일차) | 탭 아이콘 전체·가이드 독에는 없음 |
| §3 보스 버튼 커졌다 작아지기 | 문서와 다름 | tutorialSpotlight.css:13 `animation:none` | 사용자 제약(보스 버튼 크기·위치 유지) |
| §3 링·외곽선·label 말풍선 삭제 | 부분 | 결과적으로 0(fieldHudLayout.css:384-385, tutorialSpotlight.css:6-7). 규칙 자체는 :112-119에 남음 | 18-9 |
| §3 동작 줄이기 | 구현 확인 | tutorialSpotlight.css:8, :24, :27-28; summonReveal.css:26; fieldPlayFeedback.css:6, :9 | |
| 확정3 소환 가이드 36개 교체 | 구현 확인 | 1000단계 중 metric summon은 18번 하나 (덤프) | |
| 확정6 숫자 표기 (내림) | 부분 | utils/formatAmount.ts | 버그 1 |
| 확정7 환불, 확정8 픽업 4주 | 검증 불가 | summonPanel.ts:73-76 (기간 경계마다 다시 그림) | 서버·운영값 필요 |
| 확정9 궁수냥·역사냥 합류 배너 → 편성창 | 구현 확인 | fieldLobby.ts:372 (배너 1초), :374-376 (1초 뒤 편성창, 같은 가이드이고 모달이 없을 때만) | 1e62fb1. 수동으로 독을 누르면 먼저 열리고 타이머는 건너뜀 → 창 중복 없음 |
| 경제 v3: 가이드 보석 100단계당 1,000 | 구현 확인 (경제 v3 기준) | 덤프: 1000단계 보석 합 10,000, 단계당 10 | 가이드 행 tickets는 모두 0. 소환권은 별도 지급표 |
| 경제 v3: 소환 포인트 소환권 주 1회 10장 | 구현 확인 (경제 v3 기준) | data/balance/economy.json `mileage.ticketExchangesPerWeek:1, ticketQuantity:10` | |
| 경제 v3: 일일 150 / 출석 250 / 상점 한도 | 검증 생략 (경제 v3 기준) | — | 이번 범위에서 보지 않음 |
| 작업 6 두 경로 실터치 / 작업 7 30일 측정 | 검증 불가 | — | Codex도 30일 측정 미완료라고 함 |

### D. codex-ios-perf.md

| 항목 | 판정 | 근거 | 메모 |
|---|---|---|---|
| 1-1 실루엣 경계 미리 계산 + 128px 대체 경로 | 구현 확인 | ui/dom/standingPartySprite.ts:1, :15-26; data/silhouetteBounds.json | 화면 픽셀 동일은 Codex도 미통과로 보고 |
| 1-2 프레임 재인코딩 제거 | 구현 확인 | poc/fieldView.ts:449-450 (`precut-v1/{id}/{frame}.png` 직접 decode) | (a)안 |
| 1-3 저장 예약 400ms / 즉시 저장 / 키 하나 | 구현 확인 | state/saveScheduler.ts:3-7; gameState.ts:2551-2557, :2591; persistence.ts:113-115 | 처치 저장 '5초 묶음'은 따로 없고 400ms 묶음으로 대신함. `writeDualSave`가 저장할 때마다 V3 키를 `JSON.parse`함(persistence.ts:112) — 작은 비용 |
| 1-4 decode 선행, 모달 닫힐 때 해제, 웹툰 현재+다음 장 | 부분 | utils/imageWaitTiming.ts (계측만) | Codex는 기기 측정 뒤에 할 일로 둠 |
| 2-1 무손실 WebP + 픽셀 차이 0 검사 | 미구현 | scripts/에 webp 변환 없음 | |
| 2-2 0/1/2단계 나눠 받기 | 부분 | ui/dom/startupAssetRequirements.ts | 40MB 이하 기준은 검증 불가 |
| 2-3 해시 파일명 + immutable | 부분 | scripts/split-cdn-release.mjs:2 | CDN 응답 헤더는 검증 불가 |
| 3 측정 도구 (탭 지연 10건, 50ms 표식, 메모리, 이미지 수·용량, [결과 복사]) | 구현 확인 (코드) | utils/performanceAudit.ts:13-24 | 실제 클립보드 내용은 Codex도 검증 실패 |
| 측정 기준 (구형 100ms, 50fps, 40MB, 10초) | 검증 불가 | — | 실제 아이폰 필요 |

### E. codex-wording-final.md

| 항목 | 판정 | 근거 | 메모 |
|---|---|---|---|
| "캠페인 문구 감사 잔여 0" | 재현됨, 범위 한정 | qa/campaign-audit.mjs → findings [] | 감사 범위는 480 좌표, 사냥 목표, 하드 게이트, 대사 구조, **역사적 금지어 3개**뿐. 최종본 912줄 전체를 대조하지 않음 |
| 0-4 하후연 이름 | 구현 확인 / 잔여 1 | v3Characters.json:514 / combatProfiles.ts:307 | |
| 이름 정하기 창 | 구현 확인 | fieldLobby.ts:214-225 | '확인/변경', placeholder '이름', 힌트 유지 |
| 패배·부활·더 강해지기·물약·1분 문구 | 구현 확인 | fieldLobby.ts:179, :276, :239, :314, :243 | |
| `:251` "가이드 보상을 먼저 받으세요" | 문서와 다름 | fieldLobby.ts:289 "몬스터 처치 목표를 완료하세요" | |
| `:252` "몬스터 N마리 남음" | 문서와 다름 | fieldLobby.ts:290 "몬스터 N마리 추가 처치" | |
| 보상 없는 '안내 완료' 팝업 생략 | 구현 확인 | fieldLobby.ts:395 | |
| 가이드 detail 명사형 (1~44, -201~-204) | 구현 확인 (표본) | 덤프 1~52단계 | |
| 소환 초보 모집 기본 화면 "40회 안에 SSR 확정" | 문서끼리 충돌 | summonPanel.ts:92 | 문구 최종본은 이 문구를 기본 화면에 두라고 하고, 피드백 18-12는 지우라고 함. 피드백이 우선이므로 지워야 함 |
| 성장 여정 :65 긴 안내 | 구현 확인 | growthEventPanel.ts:66 ('이용 안내' 접힘 안) | 공통 규칙 8 충족 |
| 상점 "판매 준비 중 / 지급 준비 중 / 현재 구매할 수 없습니다" | 검증 불가 | panels.ts:875-876, :909, :912 | 화면에 노출되는지 확인하지 못함 [추정: 패키지 레일이 비어 있어 노출 경로 없음, fieldLobby.ts:312] |
| '집사 레벨 상승' 모달 | 검증 불가 | overlay.ts:731 ← battle.ts:2927 | 필드 앱에서는 토스트를 씀. battle.ts는 옛 화면 [추정] |
| 2~5부 전체 | 검증 불가 | — | 실행 화면 전수가 필요. Codex도 "소스 486 추적을 화면 PASS로 올리지 않음"이라고 함 |

## 집중 확인 항목 답변

- **첫 10연 이후 가이드 대상 전환:** 가이드 18(10회 소환)을 10/10 채우면 `fieldLobby.ts:485`의 `guideProgress<q.target` 조건 때문에 HUD 대상이 사라집니다. 소환 창의 10회 버튼 대상도 같은 조건으로 꺼지고(summonPanel.ts:101), 결과 '확인' 버튼은 대상이 아닙니다(summonReveal.ts:38). 그래서 **10연 직후 가이드 18을 받을 때까지 포인터가 없습니다.** 받은 뒤에는 -205 '동료 5명 편성'(영웅 탭, '편성하기')으로 정상 전환됩니다.
- **첫 10연까지 걸린 시간:** 코드로는 잴 수 없습니다. Codex 자연145 기록은 10분 52.520초인데, 캡처·판단 시간이 포함돼 있어 순수 플레이 시간이 아닙니다(Codex도 그렇게 적음).
- **1-30 클리어 → 이벤트 해금:** `gameState.ts:1671` `fieldEducationOpen` → `fieldGuideV6.ts:26-33`(`clearedStage<30`이면 false. 받은 기록이 있으면 true, 없으면 현재 단계가 -203일 때만). 레일 버튼은 `fieldLobby.ts:523`에서 `fieldFeatureOpen('missions')`도 함께 봅니다. 근거 값은 `starOfStage(30)`(stageStars)와 `fieldGuide.rewarded`이고 둘 다 저장되므로 **재접속해도 유지됩니다** [추정, 코드]. 주의할 점: -203은 -202 미션과 -204 출석 교육을 마친 뒤에야 현재 단계가 됩니다. 그 전에 1-30을 깨면 이벤트 버튼이 바로 보이지 않습니다.
- **출석·성장 여정:** -204 '출석 보상 받기'는 claimed≥24일 때 열립니다(fieldGuideV6.ts:10, 1-11 부근). 성장 여정 배너는 위 F1과 같습니다.
- **보스 버튼 CSS diff:** `git diff 31c2b53 cc29b76b -- fieldHudLayout.css`에서 `.lobby-hunt-control>.lobby-hunt{grid-area:1 / 1}` 추가, `border-radius:inherit` 추가, 우편 빨간 점 2줄이 전부입니다. 카드는 `partyRoster.css`의 명단 카드 footer가 30→36px로 바뀌어 초상 영역이 6px 줄었습니다. 바깥 aspect-ratio는 같습니다. 필드 하단 파티 카드는 바뀌지 않았습니다.

## 5624b4f (가이드 50 상자 복구) 리뷰

- **변경 내용:** `beginFieldDiscovery`에서 `lifetime:chest===0` 조건 하나만 지웠습니다(gameState.ts:1827-1835). 회귀 테스트 2개를 추가했습니다(state/__tests__/fieldChestLessonRecovery.test.mjs).
- **중복 지급:** 없음. `FieldDiscoveryClaim`은 종류마다 티켓 1개만 둡니다. 새로 발급하면 이전 id가 무효가 되고, `take`할 때 삭제됩니다(engine/fieldDiscoveryReward.ts:25-40). 받으면 `fieldGuideEvent('chest')`로 진행이 1이 되고, `fieldGuideProgress()<1` 조건이 꺼져 복구 경로가 닫힙니다.
- **재접속 재지급:** 없음. 티켓은 메모리에만 있습니다. 재접속하면 새 티켓 1개가 나오고, 받기 전까지 진행 0은 유지됩니다. 보상은 1회입니다.
- **경쟁 조건:** `ensureDiscovery`는 발견물이 화면에 있으면 새로 발급하지 않습니다(fieldView.ts:310). 보이는 상자의 티켓이 무효가 되는 경로는 보스 진입으로 발견물이 지워질 때뿐이고, 그건 의도된 복구 대상입니다. 쿨다운 값도 다시 쓰지 않습니다(`next`가 null이면 fieldLife를 그대로 둠).
- **남은 점 [추정, 버그 아님]:**
  - 조건이 `claimed===49 && key==='launch-plan:0050'`으로 고정돼 있습니다. 1000단계 중 chest/golden metric은 50번 하나뿐이라 지금은 충분합니다. 나중에 상자 단계를 추가하면 같은 막힘이 다시 생깁니다.
  - 복구 발급 때마다 `save()`가 불리지만 바뀐 상태가 없어 무해합니다.
  - 자동 보스가 켜져 있으면 상자가 다시 사라질 수 있다는 점은 Codex도 경계로 남겼습니다.

## 발견한 버그

| # | 위치 | 확정/추정 | 재현 조건 | 수정 제안 |
|---|---|---|---|---|
| 1 | utils/formatAmount.ts:7 | 확정 | `formatAmount(2300000)`→"2.29M", 1150000→"1.14M", 4350000→"4.34M", 8200000→"8.19M", -2300000→"-2.29M" (Node로 직접 실행) | `const amount=Math.floor(Math.abs(n)/(unit/scale))/scale` (unit/scale이 정수 10·10,000·10,000,000이라 나눗셈 오차 없음). 경계값 단위 테스트 추가 |
| 2 | ui/dom/summonPanel.ts:36 | 확정 | 확률 창: 일반 SR 1.17647%, R 2.91667%, 픽업 SSR 0.06522% | `Math.floor(rate*100)/100`(소수 둘째 자리 내림) 뒤 `Number()`로 끝자리 0 제거 |
| 3 | ui/dom/summonPanel.ts:92 | 확정 | 초보 모집 배너에 strong "SSR 확정까지 N회" + small "40회 안에 SSR 확정" | 초보 배너일 때는 small을 비우거나 확률 창으로 옮김 |
| 4 | ui/dom/tutorialSpotlight.css:11 vs ui/dom/fieldHudLayout.css:79 | 확정 (빌드 CSS 위치 77285 vs 215256, 둘 다 최상위, 선택자 동일) | fieldRenewal.ts가 fieldLobby(→tutorialSpotlight.css)를 :10에서, fieldHudLayout.css를 :17에서 import → 나중 규칙 `content:none`이 이김 → 반짝임 의사 요소가 생성되지 않음 | fieldHudLayout.css:79 삭제, 또는 tutorialSpotlight.css 쪽 선택자 우선순위를 올림 |
| 5 | ui/dom/settings.ts:199-200 | 확정 (코드) | 튜토리얼(1-1~1-6) 중 설정 → '기타'를 열면 '데이터 초기화'가 보임 | `if(!game.fieldForcedTutorialActive())extras.append(danger)` (확인창은 이미 있음) |
| 6 | ui/dom/fieldLobby.ts:479, :485, :559 | 확정 (코드) | 가이드 목표를 채운 뒤(처치 완료, 10연 완료 등) 가이드 독에 포인터·말풍선·빨간 점이 없음. 튜토리얼 중에는 '받을 보상'도 0 | 진행 ≥ 목표이면 learningTarget을 `.lobby-guide`로 지정('보상 받기'). kill·cleared 단계에서도 보상 대기 중이면 스포트라이트를 켬 |
| 7 | ui/dom/summonReveal.ts:38 | 확정 (코드) | 첫 10연 결과 '확인'에 안내 없음 (18-2) | 튜토리얼 summon 단계일 때 확인 버튼에 `learning-target` 추가 |
| 8 | ui/dom/summonReveal.ts:28 | 확정 (코드) | 공개 연출 결과가 뽑은 순서대로 나옴 (E2) | `results`를 등급 순서로 복사·정렬한 뒤 그림 |
| 9 | poc/fieldView.ts:719-721 | 확정 (코드) | 출시 빌드에서도 0.1초마다 `JSON.stringify` 2회 + dataset 기록 | `import.meta.env.DEV` 조건 추가 (17g) |
| 10 | fieldLobby.ts:242 → fieldView.ts:1094 | 추정 | 다른 지도로 이동할 때 주운 아이템·보급수레·발견물이 지워짐 (9.4) | 맵 전환 때도 아이템과 수레 상태를 보존하거나, 의도된 예외로 명시 |
| 11 | data/combatProfiles.ts:307 | 확정 (데이터) / 노출 추정 | displayName '하후연' (냥 없는 유일한 항목) | '하후연냥' |

## Codex 주장과 다른 점

1. **테스트·빌드·감사 수치는 모두 일치합니다.** Node 1,325/1 skip, Vitest 13, tsc·build 통과, campaign findings 0, CSS 해시 `main-BjLVHshN.css` 동일.
2. **"캠페인 문구 감사 잔여 0"은 범위가 좁습니다.** 감사 스크립트 자체가 "not full wording or runtime certification"이라고 적고 있습니다. 문구 최종본 전체 반영의 근거가 되지 않습니다. 2~5부는 미검증이고, 문서와 다른 문구 2건(fieldLobby.ts:289-290)이 있습니다.
3. **Codex 잔여 표(four-doc-remaining-gates-after144)에 18장 [확정] 결함이 빠져 있습니다.** formatAmount(18-5), 확률 소수(18-11), SSR 문구 중복(18-12), 반짝임(18-8), 초기화 노출(18-3), 독 포인터(18-1)가 남은 조건으로 적혀 있지 않습니다. 4f9cbf1 "숫자표기 실제 320/390 증거"가 있다고 했지만 공통 함수의 반올림 오차는 그대로입니다.
4. **반짝임:** Codex는 "자유완료 sweep 미검증"으로 남겼지만, 정적 분석으로는 현재 빌드에서 **그려질 수 없습니다** [확정].
5. **E2 정렬:** Codex는 "좋은카드정렬/NEW확인은 다시 열지 않음"이라고 했지만, 소환 공개 연출(summonReveal)은 정렬하지 않습니다. 정렬은 '최근 결과' 창에만 있습니다.
6. **이벤트 해금 재접속 유지:** Codex 근거는 이전 소스(e) 기준의 자연 A 검수입니다. 현재 코드에서도 저장 값(stageStars, rewarded)으로 판정하므로 유지될 것으로 봅니다 [추정]. 단, -202·-204 교육이 남아 있으면 1-30을 깨도 이벤트 버튼이 바로 보이지 않을 수 있습니다.
7. **5624b4f:** Codex 설명(조건 하나 제거, 쿨다운 불변, 1회 지급)은 코드와 맞습니다.
