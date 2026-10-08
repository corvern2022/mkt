# 영웅 스킬 v9 명세 자동 검증 하네스 — Codex 전달용

`character-skills-v9.md`(85종, 0성/3성/5성)를 기계가 검사할 수 있는 명세로 옮기고, 실제 전투 엔진(`contentBattle.ts`의 `cast()`)에서 스킬을 한 번 쓰게 해 결과를 명세와 비교합니다.

- **31c2b53(예전 스킬)에서는 대부분 실패하는 것이 정상입니다.** v9를 구현하면 통과해야 합니다.
- 구현이 안 된 영웅은 건너뛰지 않고 **실패**로 남겨, 진행 상황이 숫자로 보이게 했습니다.

## 1. 패치 내용 (새 파일 3개, 기존 게임 파일 수정 없음)

| 파일 | 내용 |
|---|---|
| `ait-app/src/data/heroSkillSpec.v9.json` | 85명 × 0/3/5성 기대 효과 (계수·지속·대상 수·대상 규칙·모호 표시) |
| `ait-app/src/engine/__tests__/heroSkillSpec.v9.harness.mjs` | 전투 구성 → 스킬 1회 강제 시전 → 이벤트·상태 수집 → 명세 비교 (테스트와 독립 실행기가 함께 사용) |
| `ait-app/src/engine/__tests__/heroSkillSpec.v9.test.mjs` | node:test 테스트 (영웅×단계 255개 + E1 1개 + 설명문 85개) |

## 2. 적용

```bash
cd <repo 루트>
git apply hero-skill-spec-v9.patch
```

## 3. 실행

```bash
cd ait-app
# 전체 (영웅 255건 + E1 + 설명문 85건)
node --import ./scripts/test-resolve.mjs --test src/engine/__tests__/heroSkillSpec.v9.test.mjs

# 일부 영웅만
HERO_SKILL_SPEC_HEROES=yeo,gwan node --import ./scripts/test-resolve.mjs --test src/engine/__tests__/heroSkillSpec.v9.test.mjs

# 요약 JSON 위치 지정 (기본값: <OS 임시폴더>/hero-skill-spec-v9-summary.json)
HERO_SKILL_SPEC_SUMMARY=/tmp/spec-summary.json node --import ./scripts/test-resolve.mjs --test src/engine/__tests__/heroSkillSpec.v9.test.mjs
```

- `npm test`(scripts/run-tests.mjs)도 이 테스트를 자동으로 포함합니다. v9 구현 전까지는 전체 테스트가 빨간색입니다.
- 전체 실행 시간은 약 10초입니다.

### 독립 실행기 (node:test 없이, 리포트 파일 생성)

```bash
cd ait-app
node --import ./scripts/test-resolve.mjs <경로>/run-spec.mjs "$PWD" <라벨> <출력폴더>
# 예: report-<라벨>.json, report-<라벨>.md 생성. 라벨을 생략하면 git 짧은 해시.
```

## 4. 실패 메시지 읽는 법

```
gwan ★3 [base] damage 600% ×성장1.2 [line]: expected 5명, got 0명 일치; 불일치 E0=600%, E1=600%, ...
```

- `gwan ★3`: 영웅 id와 단계(0/3/5)
- `[base]`: 케이스 이름. `base`는 기본 장면이고, 나머지는 특정 조건을 보는 장면입니다.
  - 예: `boss`, `kill`, `faction`, `dispel`, `duo`, `lowhp`, `break`
- `damage 600% ×성장1.2`: 기대값입니다. 계수 × 성장 배율(아래 6장)입니다.
- `[line]`: 대상 규칙입니다.
- `got`: 실제로 측정한 값입니다.
  - 피해는 시전자 공격력 대비 %입니다.
  - 회복·보호막은 받는 사람 최대 체력 대비 %입니다.
- `(모호 항목)` / `_(모호)_`: 기획 표기가 불완전해 하네스가 값을 정한 항목입니다(6장). 허용값은 하나뿐입니다.
- `unexpected …`: 명세에 없는 효과가 나온 경우입니다.
  - 예: 예전 스킬의 보호막이 아직 남아 있음.
  - `base` 케이스에서만 검사합니다.
- `⚠ 스펙에 없는 상태`: 경고일 뿐이며 실패로 세지 않습니다.

### 전투 장면 (결정적)

| 항목 | 값 |
|---|---|
| 모드 | `daily/레벨`. 기존 무리는 지우고 허수아비로 교체 |
| 시전자 | 공격력 100, 최대 체력 10000, 체력 55%, 위치 (50,34), `promotion=단계`, 스킬 레벨 = min(5, 단계+1) |
| 치명타 | 계수 측정 중에는 꺼 둠 (`baseCrit=-10`, `baseCritDamage=1`) |
| 아군 4명 | 진영 없는 더미. 공격력 60/95/80/70, 체력 10/20/30/40%(성장 ×1.3 회복이 상한에 걸리지 않게). 일반 공격 없음, 위치 고정 |
| 적 5명 | 묶음(`bind`, source `harness-freeze`)으로 고정. 공격 안 함 |
| 적 최대 체력 | 1e7 × [1, 1.4, 1.2, 1.1, 1.3] |
| 적 체력 | E2만 80% |
| 적 공격력 | [110, 130, 120, 150, 100] |

배치는 다음 중 하나입니다.
- `cluster`: 반경 약 4 안에 밀집 (기본)
- `line`: 시전자 앞 일직선, 간격 2
- `spread`: 넓게 퍼짐 (끌어모으기 검사)
- `single`: 1명
- `boss`: 보스 1명
- `cluster7`: 7명

대상 규칙(`select`)이 가리키는 기대 대상은 아래와 같습니다.

| 규칙 | 대상 |
|---|---|
| nearest | E0 |
| highest-hp | E1 |
| lowest-hp | E2 |
| highest-atk | E3, E1 |
| rear / farthest | E4 |
| lowest-hp-ally | ally-1 |
| highest-atk-ally-excl-self | ally-2 (자신 제외 확인용으로 시전자 공격력 100이 가장 높음) |
| front-allies | 시전자, ally-1, ally-2 |

허용 오차: 계수 ±2%(상대), 지속시간 ±0.1초, 대상 수 정확히 일치, 상태 수치 ±0.005, 기력 ±0.6.

## 5. 하네스가 기대하는 엔진 계약 (구현 시 지켜 주세요)

1. **이벤트 phase**
   - 장판 틱: `phase:'zoneTick'`, 그리고 `zone.radius` 큐 (범위 +50% 같은 비교에 사용)
   - 화상·독·저주 틱: `phase:'dot'`
   - 반사·반격: `label:'reflect'` / `label:'counter'`
   - 피해 공유: `phase:'chainTransfer'`
   - 이 밖의 시전자 피해는 모두 "직접 피해"로 셉니다.
2. **상태 키** (`Status.key`)
   - 버프: `attack`, `speed`, `moveSpeed`, `reduction`(방어력 증가·받는 피해 감소, `armor`도 허용), `crit`, `critDamage`, `skillPower`, `immune`, `invulnerable`, `statusResistance`
   - 디버프: `attackDown`, `defenseDown`, `vulnerable`(받는 피해 증가·표식, 조조는 `joMark`도 허용), `slow`, `attackSlow`, `stun`, `taunt`(손책 결투는 `sonchaekChallenge`도 허용), `charm`, `bind`, `chain`, `accuracyDown`, `healDown`, `burn`, `poison`(우길 저주는 `curse`/`poison`/`burn` 허용), `frost`
   - 상태의 `source`는 시전자 id 또는 시전자 소환수 id여야 합니다.
3. **상시 효과(오라)·진영 보너스**
   - 받는 아군·적의 `effects`에 Status로 보여야 합니다. 지금의 `approved-faction-aura`·`approved-je-aura` 방식과 같습니다.
   - 예를 들어 초선 공격속도 +12%를 `choseonAura()`처럼 계산식 안에서만 처리하면, 하네스는 0%로 봅니다.
4. **기력**: `Fighter.energy`의 증가를 스냅숏으로 측정합니다. 기본 회복(초당 9)은 빼고 셉니다.
5. **소환수**: `owner = 시전자 id`, `summonUntil`, 공격력 비율(`attack / 시전자 attack`)을 확인합니다.
6. **E1**: 스킬 직접 피해는 일반 공격과 같은 치명타 판정(`baseCrit`/`baseCritDamage`/`crit`/`critDamage`)을 써야 합니다. 지속 피해(`dot`/`zoneTick`)는 치명타가 없어야 합니다.

## 6. 판정 기준 (v9 모호점 19건 최종 결정 반영)

`heroSkillSpec.v9.json`에는 다른 해석 값(`accept`)이나 범위(`range`/`amountRange`)가 **하나도 없습니다**. 모든 기대값은 아래 결정으로 고정했습니다.

| # | 항목 | 고정 기대값 |
|---|---|---|
| 1 | 조운, 적 1명 | 3연 찌르기 총 420% (9회 아님) |
| 2 | 황충 | 현재 HP%가 가장 낮은 적 대상. 피해 × (1 + 0.5 × 잃은 HP 비율), 최대 +50%. 기본 장면 E2(80%) → 550%, 체력 10% 단일 → 725%, 체력 100% 단일 → 500%, 보스 → 650% |
| 3 | 원소·태산 3★ "보호막 +20%" | 보호막량 × 1.2 (원소 18%, 태산 21.6%) |
| 4 | 전위 5★ 반사 | 감소 적용 후 실제 받은 피해의 20%, 타격당 전위 공격력 300% 상한. 검사: 1000 타격 → 받은 650 → 반사 130, 100000 타격 → 300 |
| 5 | 관우 | 타당 200%. 3★ 방깎(받는 피해 +20%)은 타격 즉시 적용, 5★ +30%는 2타부터. 0★ 600%, 3★ 680%, 5★ 824% (대상별 합계 × 성장) |
| 6 | 사마 5★ | 스택은 시전 후 추가 → 첫 시전 +0% (320%) |
| 7 | 이유 3★ "회복 +10%" | 상대값 → 16.5% |
| 8 | 유표·한당 기력 | 시전당 1회 (+5) |
| 9 | 손상 5★ "뒤쪽 적" | 관통선 2번째 대상부터 +20% → 첫 대상 240%, 나머지 4명 288% |
| 10 | 황개 5★ 폭발 | 배 종착점 기준 표준 소범위 안의 모든 적에게 100%. 폭발 타격은 `zone{x,y,radius}` 큐를 가져야 하고, 그 반경 안 생존 적 전원이 맞아야 함. 경로 160%는 폭발 타격을 빼고 따로 검사 |
| 11 | 위 궁노병 5★ +20% | 첫 대상 포함 → 5명 모두 120% |
| 12 | 흑산적 5★ | 뒤 대상도 120% |
| 13 | 방통 5★ +12% | 분담·전이 피해에는 미적용 → 공유 200 그대로 |
| 14 | 산월 전사 +30% | 곱연산 → 143% |
| 15 | 등갑병 독 −50% · 피해감소 −20% | 곱연산 → 독 틱 ×0.4 |
| 16 | 육손 0★ 전파 | 1회 (3★부터 4회) |
| 17 | G1 성장 | 0/3/5단계 ×1.0/×1.2/×1.3. DoT·장판·최대 체력 비례 피해를 포함한 모든 피해, 회복, 보호막, 소환수 공격 비율에 적용. 버프/디버프 %, 지속시간, 비율형 반사·공유 피해에는 미적용 |
| 18 | 5★ 해금 | 모든 등급에서 해금. 현재 엔진의 `rarity===3`(SSR 한정) 조건은 버그로 보고 기대값을 설정 |
| 19 | 범용 3★ ×1.05 | 기대값에 포함하지 않음 (현재 엔진에 남아 있으면 3·5★ 피해가 ×1.05로 측정되어 실패) |

### 결정 목록 밖이라 하네스가 정한 값

모두 고정값입니다. 다르게 정하면 JSON을 고쳐 주세요.

- **조운 5★ 공격력 +25%:** "스킬 사용 후"이므로 이번 시전 타격에는 미적용 (420%).
- **호야 3★ 잃은 체력 비례 +15%:** 결정#2와 같은 선형식 ×(1+0.15×잃은 비율). 체력 10% 대상 → 227%.
- **소교 3★ 대교 동반 "+2%":** %p로 보아 8% (heroes-v9 note "8×5").
- **독사 3★ "독 걸린 적에게 +8%":** 스킬 직격은 독 부여 전이라 60%.
- **백이병 5★:** heroes-v9 note대로 추가 피해 20+40% → 192%.
- **황건 역사·황건 궁수·단양병 3★ "공격력 +X%":** 능력치 보정으로 보고 스킬 계수에 넣지 않음 (미검사 항목).
- **감녕 5★ 분배 보호막 8% 상한:** 상한값이라 성장 미적용.
- **강동 해적 5★ 흡수 보호막 30%:** 보호막이므로 G1 성장 적용.

### 남은 `ambiguous:true` 13건

값은 고정했고 `accept`/`range`는 없습니다. 기획 표기만 불완전한 항목입니다.
- 하후돈 3★ 비례식 (미검사)
- 감녕 5★ 보호막 제거 범위 (대상만 검사)
- 공손찬·이전 화살 대상 미기재 (대상 규칙 미검사)
- 축융 덫 1개당 1명
- 등갑병 5★ "주변 아군" 범위

## 7. 31c2b53 기준선 (예전 스킬, 결정 반영 후)

| 항목 | 통과 / 전체 |
|---|---|
| 영웅×단계 | **12 / 255** (모든 단계 통과 영웅 0명) |
| 개별 검사 | **188 / 803** |
| E1 스킬 치명타 | **0 / 49** |
| 설명문 숫자 | **35 / 255** |
| 미검사 (관측 불가) | 40 |
| node:test | 341개 중 14개 통과, 327개 실패 |

- 통과한 영웅×단계: 조조★0·★3, 초선★0, 손권★0, 방통★0·★3, 이유★0, 채모★0, 왕랑★0, 순우경★0, 정보★0, 곰★0.
- 방통★5는 결정#13 때문에 이제 실패합니다. 현재 엔진은 공유 피해에 +12%를 붙여 224가 나옵니다.

상세는 `report-31c2b53.md`와 `report-31c2b53.json`에 있습니다.

## 8. 설명문 검사

- 표시 텍스트는 `V3_CHARACTER_BY_ID[id]`의 `active`(0성) / `passive`(3성) / `star5`(5성)입니다. `v3Characters.ts`가 `approvedCharacterBalance`와 `releaseRuntimeCharacterText`를 합친 결과입니다.
- 이 텍스트의 숫자 집합이 v9 문장의 숫자 집합과 같아야 통과합니다. 문장 맨 앞의 "스킬명:"은 무시합니다.
- 메시지 예:

  ```
  yeo ★0 설명문: expected 숫자 [480, 4, 40], got [105, 30, 4, 35, 15, 4] (누락 480,40) (불필요 105,30,35,15)
  ```

- v9 10장에 따라 설명문을 스킬 정의 테이블에서 생성하게 바꾸면, 하네스의 표시 텍스트 출처(`checkDescriptionText`)만 그 생성기로 바꾸면 됩니다.

## 9. 명세 수정 방법

- `heroSkillSpec.v9.json`을 직접 고쳐도 됩니다.
- 원본 생성 스크립트 `build-spec.mjs`(이 폴더)를 고친 뒤 다시 만들어도 됩니다.

  ```bash
  node build-spec.mjs <ait-app 경로>
  ```

  `character-skills-v9.md`의 sha256이 JSON의 `source`에 기록됩니다.
- 기대 효과 하나의 형식은 아래와 같습니다.

  ```json
  {"kind":"damage","coef":4.8,"unit":"atk","targets":5,"select":"all-in-radius","side":"enemy","growth":true}
  ```

  - `kind`는 다음 중 하나입니다: damage, zone, dot, shield, heal, buff, debuff, stun, taunt, charm, slow, summon, energy, cleanse, dispel, displace, 그리고 probe 계열.
  - 기대값은 하나로 고정합니다(`accept`/`range` 사용 안 함). 기획 표기가 불완전한 항목은 `ambiguous:true`와 `note`로 표시합니다.
  - 관측할 수 없는 항목은 `observable:false`로 표시합니다.
