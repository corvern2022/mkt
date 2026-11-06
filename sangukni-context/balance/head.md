# 삼국냥전 캐릭터(영웅) 밸런스 감사 — 2e04f7f

읽기 전용 감사. 게임 파일은 수정하지 않았음. 스크래치 스크립트: `roster.mts`(스탯 덤프), `sim.mts`(콘텐츠 전투 솔로 DPS), `fsim.mts`(필드 전투 솔로 DPS), `team.mts`(버프/생존 팀 시뮬), `agg.js`/`gen.js`(집계).

## 0. 전제 — 실제로 쓰이는 전투 코드 (확정)
| 경로 | 사용 여부 | 근거 |
|---|---|---|
| 필드 전투 `fieldPoc.ts` → `castFieldSkill`(fieldSkills.ts) → `contentBattle.cast` | **사용 (메인)** | main.ts → fieldRenewal, fieldLobby.ts:73 |
| 콘텐츠 전투 `contentBattle.ts` (`cast`, `stepBattle`) | **사용** (던전/보스/탑/성문/이벤트/진영) | contentSession.ts:58 |
| `ui/dom/battle.ts` + `v3CombatRuntime.ts` + `combatProfiles.ts`의 effects | **죽은 코드** (`mountBattle` 호출부 없음) | main.ts 주석, grep |
| `launchSkills.json`, `HERO_META.skillDesc`, `SYNERGY`, 각성(awaken) | 런타임 수치로 안 쓰임 / UI 미노출 | grep |

스킬 계수는 **`contentBattle.ts:448~855 cast()` 하나가 진실**이다. 필드에서는 같은 cast를 쓰되 공격력이 역할 계수로 변환된다(`fieldEncounter.ts:18-27`).

핵심 공식 (확정):
- ATK = baseAtk × lvMul(L) × (1+0.07×(saved★−1)) × 룬/장비 ATK% × 도감(≤+4.92%) — gameState.ts:1011-1017. 여포 ★5만 ×1.25 (heroGrowth.ts:20).
- HP = 등급기본(SSR 21000 / SR 14000 / R·N·C 9000) × 클래스(방패1.7 도사1.05 궁수0.8 기타0.95) × 같은 성장배수 — gameState.ts:1023.
- lvMul = max(1+0.0707(L−1), 1.0724^(L−1)) → Lv30 ×7.6, Lv50 ×30.7, Lv100 ×1012. 레벨캡 = 20+출석일(≤100).
- 스킬 배수 dm = promotionDamage(승급) 1→1.5, 지원 hm 1→1.3 (heroGrowth.ts:17-18). 패시브는 ★3, ★5 효과는 ★5(SSR만 `five`, 나머지 `maxPromotion`).
- 기력: 콘텐츠 9/s + 평타당 9, 필드 8/s + 평타당 18. 모든 영웅 기력 100 → 시전 주기 대체로 5.5~6.5초(10회/분). 예외: 태사자(+30 환급, 14~15회/분), 관우(2.15초 시퀀스 동안 충전 정지, 7회/분).
- **필드 공격력 변환**: 기병(rogue) ATK×49/9=**5.44**, 방패(tank) ×31/7=**4.43**, 궁수·책사·도사 ×24/8=**3.0** (fieldEncounter.ts:21-22). 게다가 기병 평타 쿨 0.9 vs 1.15 (fieldPoc.ts:314), 군중전 시 기병·방패 평타 3타깃(fieldPoc.ts:123). 책사(마법딜러)는 fieldRole이 `healer`로 매핑됨(fieldLobby.ts:48).

측정 방법:
- **필드 단일(확정)**: 실제 `createFieldEncounter(challenge)`+`stepFieldBattle`, 영웅 1명 vs 보스 더미(무피해·HP 매틱 복구) 60초. Lv30★3 실스탯.
- **콘텐츠 단일/8마리/보스(확정)**: `createBattle`+`stepBattle`, ATK 1000 정규화 → "키트 지수", 표에는 ×baseAtk/20 환산(동일 레벨·별에서의 실효 DPS 비율). 단일=적 1(일반), AoE=탑 2층 8마리 불사 더미, 보스=보스전 모드 1마리.
- **팀 버프/생존(확정)**: 기준 딜러 4명 + 대상 1명의 팀 피해 증가율, 대상+궁수 3명 vs 8마리(공격 2200) 전멸 시간(90초 제한).
- 한계(추정 요소): 불사 더미라 처치 연동 효과(조운·사마 기력 환급, 요화 연장, 처치형 장판 손실)는 과소/과대 반영. 하후돈 분노(피격 필요)는 0 반영(실전 +20~60% 추가 가능).

