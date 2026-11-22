# Codex 전달 — 검수 도구 2종 + 녹화 결과 (기준 31c2b53)

두 패치 모두 **새 파일만 추가**합니다. 31c2b53에 함께 `git apply --check` 통과 확인.

## 1. 영웅 스킬 검수 화면 — `review85/skill-review.patch`
- 추가: `ait-app/skill-review.html`, `src/poc/skillReview.ts`, `src/poc/skillReview.css`, `src/data/heroSkillV9.json`
- 실행: `npx vite` → `/skill-review.html?hero=yeo&star=5`
- 기능: 85종 선택 · v9 0/3/5성 문구 · 0/3/5성 전환 · 실제 필드 엔진 전투 · 속도/멈춤/다시 보기 · 시전별 이벤트 검사(피해%·DoT·상태·회복/보호막) · v9 기대값 ✓/✗ · 피해 미터
- 개발 서버 전용 (vite.config 빌드 입력에 추가하지 않음). 상세: `review85/README-codex.md`
- **요청:** 적용 후 사용자가 직접 열 수 있게 개발 서버 주소로 공유해 주세요. `character85Review.ts`는 어떤 HTML에도 연결되지 않고, 띄우는 `/dungeon-motion-review.html`도 없습니다 → 이 화면으로 대체하거나 연결을 고쳐 주세요.

## 2. v9 스킬 명세 + 자동 검증 — `spec85/hero-skill-spec-v9.patch`
- 추가: `src/data/heroSkillSpec.v9.json`(케이스 459 / 기대 759), 하네스, node:test
- 판정 기준 19건 확정(모호 허용 0개). `character-skills-v9.md` 11장 / `spec85/README-codex.md` 6장
- 31c2b53 기준선: 영웅×단계 12/255, 개별 188/803, 스킬 치명타 0/49. `npm test`에 포함되므로 v9 반영 전까지 빨간 것이 정상
- 검수 화면(1)은 이 JSON이 있으면 자동으로 읽어 ✓/✗ 표시

## 3. 녹화 결과에서 나온 수정 요청
| # | 항목 | 내용 |
|---|---|---|
| R1 | 손책 5성 | 0·3성은 피해 56·보호막 280·도발 정상. 5성은 피해 이벤트 없음, 보호막 수치 0 1건만. v9도 5성에 180% 피해·보호막 유지 → 5성 분기 버그로 추정. `v3CombatRuntime.ts:58` / `contentBattle.ts` 손책 경로 확인 |
| R2 | 이미지 디코드 실패 | 헤드리스에서 큰 PNG 로딩 중 간헐적 `EncodingError`로 필드 준비 전체 실패(조조·마초·고순에서 1회씩, 재시도 시 정상). 실기기 재현 여부 확인, 그림 1장 실패가 화면 전체를 막지 않도록 처리 |
| R3 | 5성 SSR 한정 | `rarity===3` 조건 제거 — 모든 등급 5성 효과 해금 (판정 기준 18) |
| R4 | 3성 공통 ×1.05 | 제거 (판정 기준 19) |

녹화 갤러리(사용자 공유 시 열람 가능): https://claude.ai/artifact/Kok8htoXgat8K1akrN6vVY
