# 영웅 스킬 v9 명세 검증 리포트 — `cc29b76b`

- 생성: 2026-10-08T00:42:49.914Z (8.3s)
- 명세: `src/data/heroSkillSpec.v9.json` (source sha256 `2cc6c0a8f2a2…`)

## 합계

| 항목 | PASS | 전체 |
|---|---|---|
| 영웅×단계 (85×3) | 165 | 255 |
| 개별 검사 | 658 | 774 |
| 모든 단계 통과 영웅 | 35 | 85 |
| E1 스킬 치명타 | 47 | 49 |
| 설명문 숫자 (영웅×단계) | 255 | 255 |
| 미검사(관측 불가) 항목 | - | 40 |

## 영웅별 요약

| # | 영웅 | 등급 | ★0 | ★3 | ★5 | 설명문 0/3/5 | E1 |
|---|---|---|---|---|---|---|---|
| 1 | 여포냥 `yeo` | SSR | ✅ 3/3 | ❌ 4/5 | ❌ 6/7 | ✅ ✅ ✅ | ✅ |
| 2 | 관우냥 `gwan` | SSR | ✅ 1/1 | ✅ 2/2 | ✅ 3/3 | ✅ ✅ ✅ | ✅ |
| 3 | 제갈냥 `je` | SSR | ✅ 7/7 | ✅ 8/8 | ✅ 10/10 | ✅ ✅ ✅ | - |
| 4 | 황충냥 `hwangchung` | SSR | ❌ 3/4 | ❌ 4/5 | ❌ 5/6 | ✅ ✅ ✅ | ✅ |
| 5 | 주유냥 `juyu` | SSR | ✅ 3/3 | ✅ 4/4 | ✅ 5/5 | ✅ ✅ ✅ | ✅ |
| 6 | 하후돈냥 `hahudon` | SSR | ❌ 1/2 | ❌ 1/2 | ❌ 2/3 | ✅ ✅ ✅ | - |
| 7 | 조운냥 `joun` | SSR | ✅ 2/2 | ✅ 3/3 | ❌ 2/4 | ✅ ✅ ✅ | ✅ |
| 8 | 장비냥 `jang` | SSR | ✅ 3/3 | ✅ 4/4 | ❌ 6/8 | ✅ ✅ ✅ | ✅ |
| 9 | 조조냥 `jo` | SSR | ✅ 3/3 | ✅ 4/4 | ❌ 6/7 | ✅ ✅ ✅ | - |
| 10 | 화타냥 `hwata` | SSR | ✅ 1/1 | ✅ 2/2 | ❌ 1/3 | ✅ ✅ ✅ | - |
| 11 | 사마냥 `sama` | SSR | ✅ 2/2 | ✅ 3/3 | ❌ 2/3 | ✅ ✅ ✅ | ✅ |
| 12 | 장각냥 `janggak` | SSR | ✅ 2/2 | ✅ 5/5 | ✅ 5/5 | ✅ ✅ ✅ | ✅ |
| 13 | 동탁냥 `dong` | SSR | ❌ 1/3 | ❌ 1/4 | ❌ 2/5 | ✅ ✅ ✅ | - |
| 14 | 대교냥 `daegyo` | SSR | ✅ 3/3 | ❌ 3/4 | ❌ 3/5 | ✅ ✅ ✅ | - |
| 15 | 마초냥 `macho` | SSR | ✅ 4/4 | ✅ 5/5 | ❌ 7/8 | ✅ ✅ ✅ | ✅ |
| 16 | 태사자냥 `taesaja` | SSR | ✅ 2/2 | ✅ 3/3 | ✅ 5/5 | ✅ ✅ ✅ | ✅ |
| 17 | 손책냥 `sonchaek` | SSR | ✅ 3/3 | ✅ 4/4 | ✅ 5/5 | ✅ ✅ ✅ | ✅ |
| 18 | 초선냥 `choseon` | SSR | ✅ 4/4 | ❌ 4/5 | ❌ 4/6 | ✅ ✅ ✅ | - |
| 19 | 견희냥 `gyeonhui` | SSR | ✅ 3/3 | ❌ 3/4 | ❌ 3/5 | ✅ ✅ ✅ | - |
| 20 | 하후연 `hahuyeon` | SSR | ✅ 2/2 | ✅ 3/3 | ✅ 3/3 | ✅ ✅ ✅ | - |
| 21 | 유비냥 `yu` | SSR | ✅ 2/2 | ✅ 3/3 | ❌ 4/5 | ✅ ✅ ✅ | - |
| 22 | 손권냥 `songwon` | SSR | ✅ 3/3 | ❌ 3/4 | ❌ 4/7 | ✅ ✅ ✅ | - |
| 23 | 전위냥 `jeonwi` | SSR | ✅ 3/3 | ❌ 3/4 | ❌ 5/6 | ✅ ✅ ✅ | ✅ |
| 24 | 방통냥 `bangtong` | SSR | ✅ 2/2 | ✅ 3/3 | ❌ 3/4 | ✅ ✅ ✅ | - |
| 25 | 장료냥 `jangryo` | SR | ✅ 2/2 | ✅ 3/3 | ✅ 4/4 | ✅ ✅ ✅ | ✅ |
| 26 | 감녕냥 `gamnyeong` | SR | ✅ 3/3 | ❌ 3/4 | ❌ 4/5 | ✅ ✅ ✅ | ✅ |
| 27 | 육손냥 `yuksun` | SR | ✅ 5/5 | ✅ 5/5 | ✅ 5/5 | ✅ ✅ ✅ | ✅ |
| 28 | 곽가냥 `gwakga` | SR | ✅ 2/2 | ✅ 4/4 | ✅ 4/4 | ✅ ✅ ✅ | - |
| 29 | 순욱냥 `sunuk` | SR | ✅ 1/1 | ✅ 2/2 | ✅ 3/3 | ✅ ✅ ✅ | - |
| 30 | 허저냥 `heo` | SR | ✅ 2/2 | ✅ 2/2 | ✅ 4/4 | ✅ ✅ ✅ | ✅ |
| 31 | 손상냥 `son` | SR | ✅ 1/1 | ✅ 2/2 | ❌ 2/3 | ✅ ✅ ✅ | ✅ |
| 32 | 안량냥 `sr_anryang` | SR | ✅ 3/3 | ✅ 4/4 | ✅ 4/4 | ✅ ✅ ✅ | ✅ |
| 33 | 우길냥 `sr_ugil` | SR | ✅ 3/3 | ❌ 3/4 | ❌ 3/5 | ✅ ✅ ✅ | - |
| 34 | 원술냥 `sr_wonsul` | SR | ✅ 1/1 | ✅ 2/2 | ✅ 3/3 | ✅ ✅ ✅ | - |
| 35 | 노숙냥 `nosuk` | SR | ✅ 2/2 | ✅ 2/2 | ✅ 2/2 | ✅ ✅ ✅ | - |
| 36 | 공손찬냥 `sr_gongsonchan` | SR | ✅ 3/3 | ❌ 3/4 | ❌ 3/4 | ✅ ✅ ✅ | ✅ |
| 37 | 화웅냥 `hwaung` | SR | ✅ 2/2 | ❌ 2/3 | ❌ 3/4 | ✅ ✅ ✅ | - |
| 38 | 황개냥 `hwang` | SR | ✅ 3/3 | ✅ 3/3 | ❌ 3/4 | ✅ ✅ ✅ | ✅ |
| 39 | 소교냥 `sogyo` | SR | ✅ 2/2 | ❌ 2/3 | ❌ 2/3 | ✅ ✅ ✅ | - |
| 40 | 축융냥 `sr_chukyung` | SR | ❌ 1/3 | ❌ 1/3 | ❌ 1/3 | ✅ ✅ ✅ | ❌ |
| 41 | 문추냥 `sr_munchu` | SR | ❌ 2/3 | ❌ 3/4 | ❌ 3/5 | ✅ ✅ ✅ | - |
| 42 | 원소냥 `wonso` | SR | ✅ 1/1 | ✅ 1/1 | ✅ 2/2 | ✅ ✅ ✅ | - |
| 43 | 맹획냥 `sr_maenghoek` | SR | ✅ 2/2 | ❌ 2/3 | ❌ 2/4 | ✅ ✅ ✅ | - |
| 44 | 유표냥 `sr_yupyo` | SR | ✅ 1/1 | ✅ 2/2 | ✅ 3/3 | ✅ ✅ ✅ | - |
| 45 | 호야냥 `m3` | R | ✅ 1/1 | ✅ 2/2 | ❌ 3/4 | ✅ ✅ ✅ | ✅ |
| 46 | 요화냥 `r_yohwa` | R | ✅ 2/2 | ✅ 2/2 | ✅ 3/3 | ✅ ✅ ✅ | - |
| 47 | 이유냥 `r_iyu` | R | ✅ 2/2 | ✅ 2/2 | ❌ 2/3 | ✅ ✅ ✅ | - |
| 48 | 태산냥 `m1` | R | ✅ 2/2 | ✅ 3/3 | ✅ 3/3 | ✅ ✅ ✅ | - |
| 49 | 하후은냥 `r_hahueun` | R | ✅ 1/1 | ✅ 2/2 | ✅ 3/3 | ✅ ✅ ✅ | ✅ |
| 50 | 이전냥 `r_ijeon` | R | ❌ 2/3 | ❌ 3/4 | ❌ 3/4 | ✅ ✅ ✅ | ✅ |
| 51 | 장량냥 `r_jangryang` | R | ✅ 3/3 | ❌ 3/4 | ❌ 2/5 | ✅ ✅ ✅ | ✅ |
| 52 | 단아냥 `m5` | R | ✅ 2/2 | ❌ 1/2 | ❌ 1/2 | ✅ ✅ ✅ | - |
| 53 | 관평냥 `r_gwanpyeong` | R | ✅ 2/2 | ✅ 3/3 | ✅ 3/3 | ✅ ✅ ✅ | ✅ |
| 54 | 고순냥 `r_gosun` | R | ✅ 2/2 | ✅ 3/3 | ✅ 3/3 | ✅ ✅ ✅ | ✅ |
| 55 | 한당냥 `r_handang` | R | ✅ 2/2 | ❌ 2/3 | ❌ 2/3 | ✅ ✅ ✅ | ✅ |
| 56 | 장보냥 `r_jangbo` | R | ❌ 0/2 | ❌ 1/3 | ❌ 2/4 | ✅ ✅ ✅ | ❌ |
| 57 | 채모냥 `r_chaemo` | R | ✅ 2/2 | ✅ 3/3 | ✅ 3/3 | ✅ ✅ ✅ | ✅ |
| 58 | 주창냥 `r_juchang` | R | ✅ 2/2 | ❌ 2/3 | ❌ 3/4 | ✅ ✅ ✅ | ✅ |
| 59 | 왕랑냥 `r_wangrang` | R | ✅ 1/1 | ✅ 1/1 | ❌ 1/2 | ✅ ✅ ✅ | - |
| 60 | 순우경냥 `r_sunugyeong` | R | ✅ 2/2 | ❌ 2/3 | ❌ 2/4 | ✅ ✅ ✅ | - |
| 61 | 정보냥 `r_jeongbo` | R | ✅ 2/2 | ❌ 2/3 | ❌ 4/5 | ✅ ✅ ✅ | - |
| 62 | 호표기냥 `n_hopyo` | N | ✅ 1/1 | ✅ 2/2 | ✅ 3/3 | ✅ ✅ ✅ | ✅ |
| 63 | 강동 해적냥 `n_pirate` | N | ✅ 2/2 | ✅ 3/3 | ❌ 3/4 | ✅ ✅ ✅ | ✅ |
| 64 | 서량 기병냥 `n_cavalry` | N | ✅ 2/2 | ✅ 3/3 | ✅ 4/4 | ✅ ✅ ✅ | ✅ |
| 65 | 독사냥 `n_snake` | N | ✅ 4/4 | ❌ 3/4 | ❌ 3/4 | ✅ ✅ ✅ | ✅ |
| 66 | 형주 수군 궁수냥 `n_hyeongju` | N | ✅ 4/4 | ✅ 4/4 | ✅ 4/4 | ✅ ✅ ✅ | ✅ |
| 67 | 황건 역사냥 `n_giant` | N | ✅ 1/1 | ❌ 0/1 | ❌ 0/1 | ✅ ✅ ✅ | ✅ |
| 68 | 곰냥 `n_bear` | N | ✅ 2/2 | ✅ 3/3 | ❌ 3/4 | ✅ ✅ ✅ | ✅ |
| 69 | 늑대냥 `n_wolf` | N | ✅ 1/1 | ✅ 2/2 | ✅ 2/2 | ✅ ✅ ✅ | - |
| 70 | 위 방패 대장냥 `n_guard` | N | ✅ 2/2 | ❌ 2/3 | ❌ 2/4 | ✅ ✅ ✅ | ✅ |
| 71 | 멧돼지냥 `n_boar` | N | ✅ 4/4 | ✅ 4/4 | ✅ 4/4 | ✅ ✅ ✅ | ✅ |
| 72 | 산월 주술사냥 `n_shaman` | N | ✅ 2/2 | ✅ 2/2 | ✅ 2/2 | ✅ ✅ ✅ | - |
| 73 | 남만 등갑병냥 `n_deunggap` | N | ❌ 1/2 | ❌ 1/2 | ❌ 2/3 | ✅ ✅ ✅ | - |
| 74 | 청주병냥 `c_cheongju` | C | ✅ 2/2 | ✅ 2/2 | ✅ 2/2 | ✅ ✅ ✅ | ✅ |
| 75 | 백이병냥 `c_baeki` | C | ✅ 2/2 | ✅ 3/3 | ❌ 2/3 | ✅ ✅ ✅ | ✅ |
| 76 | 황건 궁수냥 `c_hwanggeon` | C | ✅ 1/1 | ❌ 0/1 | ❌ 1/2 | ✅ ✅ ✅ | ✅ |
| 77 | 흑산적냥 `c_heuksan` | C | ✅ 1/1 | ✅ 2/2 | ❌ 2/3 | ✅ ✅ ✅ | ✅ |
| 78 | 위 궁노병냥 `c_wi_archer` | C | ✅ 1/1 | ✅ 1/1 | ✅ 1/1 | ✅ ✅ ✅ | ✅ |
| 79 | 수군 궁수냥 `c_sugun` | C | ✅ 1/1 | ✅ 1/1 | ✅ 1/1 | ✅ ✅ ✅ | ✅ |
| 80 | 단양병냥 `c_danyang` | C | ✅ 1/1 | ❌ 0/1 | ❌ 0/1 | ✅ ✅ ✅ | ✅ |
| 81 | 산월 전사냥 `c_sanwol` | C | ✅ 2/2 | ✅ 3/3 | ❌ 3/4 | ✅ ✅ ✅ | ✅ |
| 82 | 무당비군냥 `c_mudang` | C | ✅ 3/3 | ✅ 4/4 | ✅ 4/4 | ✅ ✅ ✅ | ✅ |
| 83 | 허창 수비병냥 `c_heochang` | C | ✅ 1/1 | ✅ 2/2 | ✅ 2/2 | ✅ ✅ ✅ | - |
| 84 | 서량 보병냥 `c_seoryang` | C | ✅ 2/2 | ✅ 2/2 | ✅ 4/4 | ✅ ✅ ✅ | - |
| 85 | 익주 둔전병냥 `c_ikju` | C | ✅ 1/1 | ❌ 1/2 | ❌ 1/2 | ✅ ✅ ✅ | - |

## 실패 상세 (영웅 ★단계: expected X, got Y)

### 여포냥 `yeo` ★3 — 1건 실패 / 5

- [base] **dot burn 20%/s × 3s (성장 1.2)**: expected 대상별 총 60%, got E0: 총 60% / 3틱 / 3.075s (틱당 20%); E1: 총 60% / 3틱 / 3.075s (틱당 20%); E2: 총 60% / 3틱 / 3.075s (틱당 20%)

### 여포냥 `yeo` ★5 — 1건 실패 / 7

- [base] **dot burn 20%/s × 3s (성장 1.3)**: expected 대상별 총 60%, got E0: 총 60% / 3틱 / 3.075s (틱당 20%); E1: 총 60% / 3틱 / 3.075s (틱당 20%); E2: 총 60% / 3틱 / 3.075s (틱당 20%)

### 황충냥 `hwangchung` ★0 — 1건 실패 / 4

- [base] **damage 550% [lowest-hp]**: expected 1명, got 0명 일치; 불일치 E1=500%

### 황충냥 `hwangchung` ★3 — 1건 실패 / 5

- [base] **damage 550% ×성장1.2 [lowest-hp]**: expected 1명, got 0명 일치; 불일치 E1=600%

### 황충냥 `hwangchung` ★5 — 1건 실패 / 6

- [base] **damage 550% ×성장1.3 [lowest-hp]**: expected 1명, got 0명 일치; 불일치 E1=650%

### 하후돈냥 `hahudon` ★0 — 1건 실패 / 2

- [base] **basic sweep 50%**: expected 4명, got 0명 (일반 공격 피해 계수 100%)
- [base] ⚠ reactive damage 44 events

### 하후돈냥 `hahudon` ★3 — 1건 실패 / 2

- [base] **basic sweep 50% ×성장1.2**: expected 4명, got 0명 (일반 공격 피해 계수 127%,100%)
- [base] ⚠ reactive damage 44 events

### 하후돈냥 `hahudon` ★5 — 1건 실패 / 3

- [base] **basic sweep 50% ×성장1.3**: expected 4명, got 0명 (일반 공격 피해 계수 127%,100%)
- [base] ⚠ reactive damage 44 events

### 조운냥 `joun` ★5 — 2건 실패 / 4

- [base] **damage 420% ×성장1.3 [nearest]**: expected 3명, got 0명 일치; 불일치 E0=682.5%, E1=682.5%, E2=682.5%
- [single] **damage 420% ×성장1.3**: expected 1명, got 0명 일치; 불일치 E0=682.5%

### 장비냥 `jang` ★5 — 2건 실패 / 8

- [base] **heal 10% [self]**: expected 1회, got 0회 일치 (0명); 측정 caster(jang)=10%
- [base] **summon ×1 10s 공격 80%**: expected 1기, got v8-helper-jang-10: 공격 80%, 10s

### 조조냥 `jo` ★5 — 1건 실패 / 7

- [faction] **start energy**: expected caster=+10, hahudon=+10, sama=+10, ally-1=+0, got caster=+0, hahudon=+0, sama=+0, ally-1=+0

### 화타냥 `hwata` ★5 — 2건 실패 / 3

- [base] **heal 10% [all-allies]**: expected 5회, got 0회 일치 (0명); 측정 ally-1=32.5%, ally-2=32.5%, ally-3=32.5%, ally-4=32.5%, ally-1=32.5%, caster(hwata)=10%, ally-1=10%, ally-2=10%
- [cleanse] **cleanse 1개 [healed]**: expected 4명 × 1, got ally-1=2, ally-2=1, ally-3=1, ally-4=1

### 사마냥 `sama` ★5 — 1건 실패 / 3

- [base] **damage 320% ×성장1.3 [lowest-hp]**: expected 1명, got 0명 일치; 불일치 E2=436.8%

### 동탁냥 `dong` ★0 — 2건 실패 / 3

- [base] **taunt taunt 3s**: expected 5명, got E0=✓/3s
- [base] **displace 끌어당김**: expected 4명, got E1 18.0278→18.0278, E2 18.0278→18.0278, E3 21.5407→21.5407, E4 25.2982→25.2982

### 동탁냥 `dong` ★3 — 3건 실패 / 4

- [base] **taunt taunt 3s**: expected 5명, got E0=✓/3s
- [base] **displace 끌어당김**: expected 4명, got E1 18.0278→18.0278, E2 18.0278→18.0278, E3 21.5407→21.5407, E4 25.2982→25.2982
- [break] **damage 5% of casterMaxHp ×성장1.2**: expected 5명, got 0명 일치; 불일치 E0=5%, E1=5%, E2=5%, E3=5%, E4=5%

### 동탁냥 `dong` ★5 — 3건 실패 / 5

- [base] **taunt taunt 3s**: expected 5명, got E0=✓/3s
- [base] **displace 끌어당김**: expected 4명, got E1 18.0278→18.0278, E2 18.0278→18.0278, E3 21.5407→21.5407, E4 25.2982→25.2982
- [break] **damage 10% of casterMaxHp ×성장1.3**: expected 5명, got 0명 일치; 불일치 E0=10%, E1=10%, E2=10%, E3=10%, E4=10%

### 대교냥 `daegyo` ★3 — 1건 실패 / 4

- [break] **heal 5%**: expected 1회, got 0회 일치 (0명); 측정 ally-1=5%, caster(daegyo)=3.6%, ally-1=3.6%, ally-2=3.6%, ally-3=3.6%, ally-4=3.6%, caster(daegyo)=3.6%, ally-1=3.6%

### 대교냥 `daegyo` ★5 — 2건 실패 / 5

- [break] **heal 5%**: expected 1회, got 0회 일치 (0명); 측정 ally-1=5%, caster(daegyo)=3.9%, ally-1=3.9%, ally-2=3.9%, ally-3=3.9%, ally-4=3.9%, caster(daegyo)=3.9%, ally-1=3.9%
- [revive] **heal 30% (부활)**: expected 1회, got 0회 일치 (0명); 측정 ally-4=30%, caster(daegyo)=3.9%, ally-1=3.9%, ally-2=3.9%, ally-3=3.9%, ally-4=3.9%, caster(daegyo)=3.9%, ally-1=3.9%

### 마초냥 `macho` ★5 — 1건 실패 / 8

- [base] **zone  30%/s × 3s (성장 1.3)**: expected 대상별 총 90%, got E0: 총 90% / 3틱 / 3.075s (틱당 30%); E1: 총 90% / 3틱 / 3.075s (틱당 30%); E2: 총 90% / 3틱 / 3.075s (틱당 30%)

### 초선냥 `choseon` ★3 — 1건 실패 / 5

- [base] **aura speed**: expected caster=12%, ally-1=12%, ally-2=12%, got caster=0%, ally-1=0%, ally-2=0%

### 초선냥 `choseon` ★5 — 2건 실패 / 6

- [base] **damage 8% of targetMaxHp ×성장1.3 [highest-atk]**: expected 2명, got 0명 일치; 불일치 E1=13.52%, E3=13.52%
- [base] **aura speed**: expected caster=12%, ally-1=12%, ally-2=12%, got caster=0%, ally-1=0%, ally-2=0%

### 견희냥 `gyeonhui` ★3 — 1건 실패 / 4

- [base] **damage 100% ×성장1.2**: expected 5명, got 0명 일치; 불일치 E0=100%, E1=100%, E2=100%, E3=100%, E4=100%

### 견희냥 `gyeonhui` ★5 — 2건 실패 / 5

- [base] **damage 100% ×성장1.3**: expected 5명, got 0명 일치; 불일치 E0=100%, E1=100%, E2=100%, E3=100%, E4=100%
- [base] **zone  40%/s × 3s (성장 1.3)**: expected 대상별 총 120%, got E0: 총 182% / 3틱 / 3.075s (틱당 52%); E1: 총 182% / 3틱 / 3.075s (틱당 52%); E2: 총 182% / 3틱 / 3.075s (틱당 52%)

### 유비냥 `yu` ★5 — 1건 실패 / 5

- [faction] **start energy**: expected caster=+10, gwan=+10, jang=+10, ally-1=+0, got caster=+0, gwan=+0, jang=+0, ally-1=+0

### 손권냥 `songwon` ★3 — 1건 실패 / 4

- [block] **energy +3 [all-allies]**: expected 5명, got 기력 회복 없음

### 손권냥 `songwon` ★5 — 3건 실패 / 7

- [block] **energy +3 [all-allies]**: expected 5명, got 기력 회복 없음
- [faction] **faction maxHp bonus**: expected caster=12%, juyu=12%, daegyo=12%, ally-1=0%, got caster=0%, juyu=0%, daegyo=0%, ally-1=0%
- [faction] **start energy**: expected caster=+10, juyu=+10, daegyo=+10, ally-1=+0, got caster=+0, juyu=+0, daegyo=+0, ally-1=+0

### 전위냥 `jeonwi` ★3 — 1건 실패 / 4

- [struck] **energy +6 [self]**: expected 1명, got 기력 회복 없음

### 전위냥 `jeonwi` ★5 — 1건 실패 / 6

- [struck] **energy +6 [self]**: expected 1명, got 기력 회복 없음
- [struck] ⚠ reactive damage 3 events
- [reflect] ⚠ reactive damage 2 events

### 방통냥 `bangtong` ★5 — 1건 실패 / 4

- [share] **damage share 200 → 4명**: expected 4명 × 200, got E1=224.0, E2=224.0, E3=224.0, E4=224.0
- [share] ⚠ reactive damage 4 events

### 감녕냥 `gamnyeong` ★3 — 1건 실패 / 4

- [base] **shield 준 피해 35% [self]**: expected 1명, got 0명 일치; 측정 caster(gamnyeong)=109.2/4s

### 감녕냥 `gamnyeong` ★5 — 1건 실패 / 5

- [base] **shield 준 피해 35% [self]**: expected 1명, got 0명 일치; 측정 caster(gamnyeong)=118.3/4s

### 손상냥 `son` ★5 — 1건 실패 / 3

- [base] **damage 288% ×성장1.3 [line]**: expected 4명, got 1명 일치; 불일치 E1=312%, E2=312%, E3=312%

### 우길냥 `sr_ugil` ★3 — 1건 실패 / 4

- [spread] **healDown spread count**: expected ≥1, got 0

### 우길냥 `sr_ugil` ★5 — 2건 실패 / 5

- [spread] **healDown spread count**: expected ≥1, got 0
- [death] **debuff healDown 100% 3s [all-enemies]**: expected 5명 (E0,E1,E2,E3,E4), got E2=100%/2.95s, E3=100%/2.95s, E4=100%/2.95s

### 공손찬냥 `sr_gongsonchan` ★3 — 1건 실패 / 4

- [base] **buff speed 10% [self]**: expected 1명 (caster(sr_gongsonchan)), got 없음

### 공손찬냥 `sr_gongsonchan` ★5 — 1건 실패 / 4

- [base] **buff speed 10% [self]**: expected 1명 (caster(sr_gongsonchan)), got 없음

### 화웅냥 `hwaung` ★3 — 1건 실패 / 3

- [base] **shield 20% [self]**: expected 1명, got 0명 일치; 측정 caster(hwaung)=20%/4s

### 화웅냥 `hwaung` ★5 — 1건 실패 / 4

- [base] **shield 20% [self]**: expected 1명, got 0명 일치; 측정 caster(hwaung)=20%/4s

### 황개냥 `hwang` ★5 — 1건 실패 / 4

- [base] **splash 100%**: expected ≥1명, got 폭발 타격 없음

### 소교냥 `sogyo` ★3 — 1건 실패 / 3

- [duo] **heal 8% [all-allies]**: expected 5회, got 0회 일치 (0명); 측정 caster(sogyo)=9.2%, ally-1=9.2%, ally-2=9.2%, ally-3=9.2%, daegyo=9.2%

### 소교냥 `sogyo` ★5 — 1건 실패 / 3

- [duo] **heal 8% [all-allies]**: expected 5회, got 0회 일치 (0명); 측정 caster(sogyo)=9.8%, ally-1=9.8%, ally-2=9.8%, ally-3=9.8%, daegyo=9.8%

### 축융냥 `sr_chukyung` ★0 — 2건 실패 / 3

- [base] **damage 90%** _(모호)_: expected 3명, got 0명 일치
- [base] **unexpected zone**: expected 없음, got 3명 3틱 (틱당 90%)

### 축융냥 `sr_chukyung` ★3 — 2건 실패 / 3

- [base] **damage 90% ×성장1.2** _(모호)_: expected 3명, got 0명 일치
- [base] **unexpected zone**: expected 없음, got 3명 3틱 (틱당 108%)

### 축융냥 `sr_chukyung` ★5 — 2건 실패 / 3

- [base] **damage 90% ×성장1.3** _(모호)_: expected 5명, got 0명 일치
- [base] **unexpected zone**: expected 없음, got 5명 5틱 (틱당 117%)

### 문추냥 `sr_munchu` ★0 — 1건 실패 / 3

- [base] **displace 밀쳐냄**: expected 5명, got E0 4→4, E1 5.1478→5.1478, E2 5.1478→5.1478, E3 6.6708→6.6708, E4 7.6485→7.6485

### 문추냥 `sr_munchu` ★3 — 1건 실패 / 4

- [base] **displace 밀쳐냄**: expected 5명, got E0 4→4, E1 5.1478→5.1478, E2 5.1478→5.1478, E3 6.6708→6.6708, E4 7.6485→7.6485

### 문추냥 `sr_munchu` ★5 — 2건 실패 / 5

- [base] **displace 밀쳐냄**: expected 5명, got E0 4→4, E1 5.1478→5.1478, E2 5.1478→5.1478, E3 6.6708→6.6708, E4 7.6485→7.6485
- [duo] **buff attack 20% [self]**: expected 1명 (caster(sr_munchu)), got 없음

### 맹획냥 `sr_maenghoek` ★3 — 1건 실패 / 3

- [base] **buff attack 15% 3s [self]**: expected 1명 (caster(sr_maenghoek)), got 없음

### 맹획냥 `sr_maenghoek` ★5 — 2건 실패 / 4

- [base] **buff attack 15% 3s [self]**: expected 1명 (caster(sr_maenghoek)), got 없음
- [lastStand] **heal 50% [self]**: expected 1회, got 0회 일치 (0명); 측정 caster(sr_maenghoek)=50%

### 호야냥 `m3` ★5 — 1건 실패 / 4

- [faction] **start energy**: expected caster=+10, r_gosun=+10, m1=+10, ally-1=+0, got caster=+0, r_gosun=+0, m1=+0, ally-1=+0

### 이유냥 `r_iyu` ★5 — 1건 실패 / 3

- [immunity] **harmful status blocked**: expected 차단, got 적용됨

### 이전냥 `r_ijeon` ★0 — 1건 실패 / 3

- [base] **caster retreat**: expected 가장 가까운 적과 거리 +2 이상, got 4→4.4721

### 이전냥 `r_ijeon` ★3 — 1건 실패 / 4

- [base] **caster retreat**: expected 가장 가까운 적과 거리 +2 이상, got 4→4.4721

### 이전냥 `r_ijeon` ★5 — 1건 실패 / 4

- [base] **caster retreat**: expected 가장 가까운 적과 거리 +2 이상, got 4→4.4721

### 장량냥 `r_jangryang` ★3 — 1건 실패 / 4

- [spread] **poison spread count**: expected ≥1, got 0

### 장량냥 `r_jangryang` ★5 — 3건 실패 / 5

- [base] **damage 70% ×성장1.3**: expected 2명, got 0명 일치; 불일치 E0=98.28%, E1=98.28%
- [base] **dot poison 25%/s × 4s (성장 1.3)**: expected 대상별 총 100%, got E0: 총 137.8% / 4틱 / 4.0667s (틱당 35.1%); E1: 총 137.8% / 4틱 / 4.0667s (틱당 35.1%)
- [spread] **poison spread count**: expected ≥1, got 0

### 단아냥 `m5` ★3 — 1건 실패 / 2

- [base] **heal 26% [lowest-hp-ally]**: expected 1회, got 0회 일치 (0명); 측정 ally-1=30.4%

### 단아냥 `m5` ★5 — 1건 실패 / 2

- [base] **heal 26% [lowest-hp-ally]**: expected 1회, got 0회 일치 (0명); 측정 ally-1=32.6%

### 한당냥 `r_handang` ★3 — 1건 실패 / 3

- [twice] **energy +5 [self]**: expected 1명, got caster(r_handang)=+10

### 한당냥 `r_handang` ★5 — 1건 실패 / 3

- [twice] **energy +5 [self]**: expected 1명, got caster(r_handang)=+10

### 장보냥 `r_jangbo` ★0 — 2건 실패 / 2

- [base] **damage 160% [all-in-radius]**: expected 5명, got 0명 일치
- [base] **unexpected zone**: expected 없음, got 5명 5틱 (틱당 160%)

### 장보냥 `r_jangbo` ★3 — 2건 실패 / 3

- [base] **damage 160% ×성장1.2 [all-in-radius]**: expected 5명, got 0명 일치
- [base] **unexpected zone**: expected 없음, got 5명 5틱 (틱당 192%)

### 장보냥 `r_jangbo` ★5 — 2건 실패 / 4

- [base] **damage 160% ×성장1.3 [all-in-radius]**: expected 5명, got 0명 일치
- [base] **unexpected zone**: expected 없음, got 5명 5틱 (틱당 208%)

### 주창냥 `r_juchang` ★3 — 1건 실패 / 3

- [base] **buff reduction 10% 2s [self]**: expected 1명 (caster(r_juchang)), got 없음

### 주창냥 `r_juchang` ★5 — 1건 실패 / 4

- [base] **buff reduction 10% 2s [self]**: expected 1명 (caster(r_juchang)), got 없음

### 왕랑냥 `r_wangrang` ★5 — 1건 실패 / 2

- [base] **debuff vulnerable 8% 5s [highest-atk]**: expected 1명 (E3), got E3=8%/4s

### 순우경냥 `r_sunugyeong` ★3 — 1건 실패 / 3

- [base] **buff reduction 8% [self]**: expected 1명 (caster(r_sunugyeong)), got 없음

### 순우경냥 `r_sunugyeong` ★5 — 2건 실패 / 4

- [base] **shield 8% [lowest-hp-ally]**: expected 1명, got 0명 일치; 측정 caster(r_sunugyeong)=15.6%/4s, ally-1=8%/4s
- [base] **buff reduction 8% [self]**: expected 1명 (caster(r_sunugyeong)), got 없음

### 정보냥 `r_jeongbo` ★3 — 1건 실패 / 3

- [base] **energy +3 [self]**: expected 1명, got caster(r_jeongbo)=+6

### 정보냥 `r_jeongbo` ★5 — 1건 실패 / 5

- [base] **energy +3 [self]**: expected 1명, got caster(r_jeongbo)=+6

### 강동 해적냥 `n_pirate` ★5 — 1건 실패 / 4

- [break] **shield 30 [self]**: expected 1명, got 0명 일치; 측정 caster(n_pirate)=30/4s

### 독사냥 `n_snake` ★3 — 1건 실패 / 4

- [base] **dot poison 20%/s × 4s (성장 1.2)**: expected 대상별 총 80%, got E0: 총 101.76% / 4틱 / 4.0667s (틱당 25.92%)

### 독사냥 `n_snake` ★5 — 1건 실패 / 4

- [base] **dot poison 20%/s × 6s (성장 1.3)**: expected 대상별 총 120%, got E0: 총 166.4% / 6틱 / 6.06s (틱당 28.08%)

### 황건 역사냥 `n_giant` ★3 — 1건 실패 / 1

- [base] **damage 110% ×성장1.2 [nearest]**: expected 3명, got 0명 일치; 불일치 E0=139.92%, E1=139.92%, E2=139.92%

### 황건 역사냥 `n_giant` ★5 — 1건 실패 / 1

- [base] **damage 110% ×성장1.3 [nearest]**: expected 4명, got 0명 일치; 불일치 E0=151.58%, E1=151.58%, E2=151.58%

### 곰냥 `n_bear` ★5 — 1건 실패 / 4

- [base] **shield 10% [self]**: expected 1명, got 0명 일치; 측정 caster(n_bear)=10%/4s

### 위 방패 대장냥 `n_guard` ★3 — 1건 실패 / 3

- [base] **buff reduction 8% 2s [self]**: expected 1명 (caster(n_guard)), got 없음

### 위 방패 대장냥 `n_guard` ★5 — 2건 실패 / 4

- [base] **buff reduction 8% 2s [self]**: expected 1명 (caster(n_guard)), got 없음
- [base] **buff reduction 5% 2s [nearby-allies]**: expected ≥1명, got 없음

### 남만 등갑병냥 `n_deunggap` ★0 — 1건 실패 / 2

- [poisonGuard] **dot taken ×0.4**: expected ×0.4, got 틱 없음

### 남만 등갑병냥 `n_deunggap` ★3 — 1건 실패 / 2

- [poisonGuard] **dot taken ×0.4**: expected ×0.4, got 틱 없음

### 남만 등갑병냥 `n_deunggap` ★5 — 1건 실패 / 3

- [poisonGuard] **dot taken ×0.4**: expected ×0.4, got 틱 없음

### 백이병냥 `c_baeki` ★5 — 1건 실패 / 3

- [finisher] **damage 192% ×성장1.3 [nearest]**: expected 1명, got 0명 일치; 불일치 E0=218.4%

### 황건 궁수냥 `c_hwanggeon` ★3 — 1건 실패 / 1

- [base] **damage 120% ×성장1.2 [nearest]**: expected 1명, got 0명 일치; 불일치 E0=151.2%

### 황건 궁수냥 `c_hwanggeon` ★5 — 1건 실패 / 2

- [base] **damage 120% ×성장1.3 [nearest]**: expected 1명, got 0명 일치; 불일치 E0=163.8%

### 흑산적냥 `c_heuksan` ★5 — 1건 실패 / 3

- [base] **damage 120% ×성장1.3 [behind-target]**: expected 1명, got 0명 일치

### 단양병냥 `c_danyang` ★3 — 1건 실패 / 1

- [base] **damage 100% ×성장1.2 [nearest]**: expected 2명, got 0명 일치; 불일치 E0=126%, E1=126%

### 단양병냥 `c_danyang` ★5 — 1건 실패 / 1

- [base] **damage 100% ×성장1.3 [nearest]**: expected 3명, got 0명 일치; 불일치 E0=136.5%, E1=136.5%, E2=136.5%

### 산월 전사냥 `c_sanwol` ★5 — 1건 실패 / 4

- [passive] **aura speed**: expected caster=8%, got caster=23%

### 익주 둔전병냥 `c_ikju` ★3 — 1건 실패 / 2

- [wounded] **heal 6% [self]**: expected 1회, got 0회 일치 (0명); 측정 caster(c_ikju)=6%

### 익주 둔전병냥 `c_ikju` ★5 — 1건 실패 / 2

- [wounded] **heal 6% [self]**: expected 1회, got 0회 일치 (0명); 측정 caster(c_ikju)=6%

## E1 스킬 치명타

- sr_chukyung E1: 직접 피해 없음
- r_jangbo E1: 직접 피해 없음

## 설명문 숫자 검사 (표시 텍스트 vs v9)

표시 텍스트: `V3_CHARACTER_BY_ID[id].active / passive / star5` (v3Characters.ts가 approvedCharacterBalance·releaseRuntimeCharacterText를 병합한 결과).


## 미검사 항목 (단일 시전 하네스로 관측 불가)

- yeo ★5 [ref] 5성 공격력 ×1.25는 heroGrowth 기본 능력치 보정(D1)이며 스킬 계수가 아님
- hahudon ★3 [rage] 체력이 낮을수록 공격력 증가(최대 +60%) — 비례식 미정
- hahudon ★5 [rage] 체력이 낮을수록 공격력 증가(최대 +60%) — 비례식 미정
- heo ★3 [counter] 공격받을 때 20% 확률 60% 반격 — 확률 효과라 단일 시전 하네스에서 미검사
- heo ★5 [counter] 공격받을 때 20% 확률 60% 반격 — 확률 효과라 단일 시전 하네스에서 미검사
- r_yohwa ★3 [extend] 적 처치 시 회전 +0.5초 — 처치 타이밍 의존, 미검사
- r_yohwa ★5 [extend] 적 처치 시 회전 +0.5초 — 처치 타이밍 의존, 미검사
- m1 ★5 [life] [채광 담당] 채광량 +25% — 생활 보너스, 전투 하네스 대상 아님
- m5 ★5 [life] [채집 담당] 약초 채집량 +25% — 생활 보너스
- n_hopyo ★0 [summoned] 보스가 소환한 적 +30% — 소환 적 표시 API 미정
- n_hopyo ★3 [summoned] 보스가 소환한 적 +30% — 소환 적 표시 API 미정
- n_hopyo ★5 [summoned] 보스가 소환한 적 +30% — 소환 적 표시 API 미정
- n_hyeongju ★3 [range] 사거리 +1 — 기본 공격 사거리, 스킬 하네스 대상 아님
- n_hyeongju ★5 [range] 사거리 +1 — 기본 공격 사거리, 스킬 하네스 대상 아님
- n_giant ★3 [statBonus] 3성 공격력 +6% — 능력치 보정(전투 밖 공격력), 스킬 계수 기대값에 넣지 않음
- n_giant ★5 [statBonus] 3성 공격력 +6% — 능력치 보정(전투 밖 공격력), 스킬 계수 기대값에 넣지 않음
- n_giant ★5 [life] [채광 담당] 채광량 +15%
- n_wolf ★5 [life] [채집 담당] 약초 채집량 +15%
- n_guard ★0 [rescue] 구출전 주민 받는 피해 -30% 4초 — rescue 모드 전용, 미검사
- n_guard ★3 [rescue] 구출전 주민 받는 피해 -30% 4초 — rescue 모드 전용, 미검사
- n_guard ★5 [rescue] 구출전 주민 받는 피해 -30% 4초 — rescue 모드 전용, 미검사
- n_deunggap ★3 [hp] 체력 +10% — 능력치 보정
- n_deunggap ★5 [hp] 체력 +10% — 능력치 보정
- c_cheongju ★3 [hp] 체력 +8% — 능력치 보정
- c_cheongju ★5 [hp] 체력 +8% — 능력치 보정
- c_hwanggeon ★3 [statBonus] 3성 공격력 +5% — 능력치 보정, 스킬 계수 기대값에 넣지 않음
- c_hwanggeon ★5 [statBonus] 3성 공격력 +5% — 능력치 보정, 스킬 계수 기대값에 넣지 않음
- c_wi_archer ★3 [range] 사거리 +0.5 — 기본 공격 사거리
- c_wi_archer ★5 [range] 사거리 +0.5 — 기본 공격 사거리
- c_sugun ★3 [range] 사거리 +1
- c_sugun ★5 [range] 사거리 +1
- c_danyang ★3 [statBonus] 3성 공격력 +5% — 능력치 보정, 스킬 계수 기대값에 넣지 않음
- c_danyang ★5 [statBonus] 3성 공격력 +5% — 능력치 보정, 스킬 계수 기대값에 넣지 않음
- c_danyang ★5 [life] [채광 담당] 채광량 +10%
- c_heochang ★0 [gate] 성문 방어전 성문 체력 3% 수리 — gate 모드 전용
- c_heochang ★3 [gate] 성문 방어전 성문 체력 3% 수리 — gate 모드 전용
- c_heochang ★5 [gate] 성문 방어전 성문 체력 5% 수리 — gate 모드 전용
- c_seoryang ★3 [hp] 체력 +8% — 능력치 보정
- c_seoryang ★5 [hp] 체력 +8% — 능력치 보정
- c_ikju ★5 [life] [채집 담당] 약초 채집량 +10%

## 명세 전역 모호점

- **G1 성장 계수 (결정#17)**: 단계 0/3/5 → ×1.0/×1.2/×1.3. DoT·장판·최대 체력 비례 피해를 포함한 모든 피해, 회복, 보호막, 소환수 공격 비율에 적용. 버프/디버프 %와 지속시간, 비율형 반사·공유 피해에는 미적용.
- **G2 "+X%" 가산/곱**: "피해 +X%"는 곱(×(1+X)) (결정#14·15; 청주병 120×1.15). "보호막 +20%"·"회복량 +10%"는 상대값(결정#3·7). 예외: 백이병 5성은 heroes-v9 note대로 추가 피해 20+40=60% → 192%, 소교 3성은 +2%p → 8%.
- **G6 엔진 조건 (결정#18·19)**: 5★ 효과는 모든 등급에서 해금(현재 rarity===3 SSR 한정 조건은 버그). 범용 3★ ×1.05 보너스는 기대값에 넣지 않음.
- **G3 상태 키 계약**: 하네스는 엔진 Status.key 이름을 사용: attack, speed, moveSpeed, reduction(=방어력 증가/받는 피해 감소, armor도 허용), crit, critDamage, skillPower, immune, invulnerable, statusResistance / attackDown, defenseDown, vulnerable(받는 피해 증가·표식), slow, attackSlow, stun, taunt, charm, bind, chain, accuracyDown, healDown, burn, poison, frost.
- **G4 이벤트 계약**: 장판 틱은 phase "zoneTick"(+zone.radius 큐), 화상·독 틱은 phase "dot", 반사/반격은 label "reflect"/"counter", 공유 피해는 phase "chainTransfer". 기력 회복은 Fighter.energy 증가로 측정(스냅숏), 오라·진영 보너스는 수혜자 Status 효과로 노출되어야 함.
- **G5 치명타**: 계수 측정 시 baseCrit=-10, baseCritDamage=1로 치명타를 무력화. E1(스킬 치명타)은 별도 engineRules 검사에서 baseCrit=1, baseCritDamage=2로 직접 피해 ×2, 지속 피해 ×1을 확인.
