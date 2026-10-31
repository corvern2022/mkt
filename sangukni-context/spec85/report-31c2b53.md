# 영웅 스킬 v9 명세 검증 리포트 — `31c2b53`

- 생성: 2026-10-07T09:13:11.934Z (7.2s)
- 명세: `src/data/heroSkillSpec.v9.json` (source sha256 `2cc6c0a8f2a2…`)

## 합계

| 항목 | PASS | 전체 |
|---|---|---|
| 영웅×단계 (85×3) | 12 | 255 |
| 개별 검사 | 188 | 803 |
| 모든 단계 통과 영웅 | 0 | 85 |
| E1 스킬 치명타 | 0 | 49 |
| 설명문 숫자 (영웅×단계) | 35 | 255 |
| 미검사(관측 불가) 항목 | - | 40 |

## 영웅별 요약

| # | 영웅 | 등급 | ★0 | ★3 | ★5 | 설명문 0/3/5 | E1 |
|---|---|---|---|---|---|---|---|
| 1 | 여포냥 `yeo` | SSR | ❌ 0/5 | ❌ 1/6 | ❌ 1/8 | ❌ ❌ ❌ | ❌ |
| 2 | 관우냥 `gwan` | SSR | ❌ 0/1 | ❌ 1/2 | ❌ 1/3 | ❌ ❌ ❌ | ❌ |
| 3 | 제갈냥 `je` | SSR | ❌ 4/7 | ❌ 5/8 | ❌ 7/10 | ❌ ✅ ✅ | - |
| 4 | 황충냥 `hwangchung` | SSR | ❌ 0/3 | ❌ 0/4 | ❌ 0/5 | ❌ ❌ ❌ | ❌ |
| 5 | 주유냥 `juyu` | SSR | ❌ 1/3 | ❌ 1/4 | ❌ 1/5 | ❌ ❌ ❌ | ❌ |
| 6 | 하후돈냥 `hahudon` | SSR | ❌ 0/2 | ❌ 0/2 | ❌ 0/3 | ❌ ❌ ❌ | - |
| 7 | 조운냥 `joun` | SSR | ❌ 1/2 | ❌ 1/3 | ❌ 2/4 | ❌ ✅ ✅ | ❌ |
| 8 | 장비냥 `jang` | SSR | ❌ 1/4 | ❌ 0/5 | ❌ 1/9 | ❌ ❌ ❌ | ❌ |
| 9 | 조조냥 `jo` | SSR | ✅ 3/3 | ✅ 4/4 | ❌ 4/7 | ✅ ✅ ❌ | - |
| 10 | 화타냥 `hwata` | SSR | ❌ 0/1 | ❌ 0/2 | ❌ 0/3 | ❌ ✅ ❌ | - |
| 11 | 사마냥 `sama` | SSR | ❌ 1/2 | ❌ 2/3 | ❌ 2/3 | ❌ ❌ ❌ | ❌ |
| 12 | 장각냥 `janggak` | SSR | ❌ 0/2 | ❌ 2/5 | ❌ 2/5 | ❌ ❌ ✅ | ❌ |
| 13 | 동탁냥 `dong` | SSR | ❌ 1/3 | ❌ 0/5 | ❌ 1/6 | ❌ ❌ ❌ | - |
| 14 | 대교냥 `daegyo` | SSR | ❌ 0/3 | ❌ 0/4 | ❌ 0/5 | ❌ ❌ ✅ | - |
| 15 | 마초냥 `macho` | SSR | ❌ 2/4 | ❌ 2/5 | ❌ 2/8 | ❌ ❌ ❌ | ❌ |
| 16 | 태사자냥 `taesaja` | SSR | ❌ 1/2 | ❌ 2/3 | ❌ 3/5 | ❌ ❌ ❌ | ❌ |
| 17 | 손책냥 `sonchaek` | SSR | ❌ 1/3 | ❌ 0/5 | ❌ 1/6 | ❌ ❌ ❌ | ❌ |
| 18 | 초선냥 `choseon` | SSR | ✅ 4/4 | ❌ 2/4 | ❌ 6/7 | ✅ ✅ ✅ | - |
| 19 | 견희냥 `gyeonhui` | SSR | ❌ 1/3 | ❌ 1/4 | ❌ 2/5 | ❌ ❌ ✅ | - |
| 20 | 하후연 `hahuyeon` | SSR | ❌ 0/3 | ❌ 0/4 | ❌ 0/4 | ❌ ❌ ❌ | - |
| 21 | 유비냥 `yu` | SSR | ❌ 1/3 | ❌ 2/4 | ❌ 1/6 | ❌ ✅ ❌ | - |
| 22 | 손권냥 `songwon` | SSR | ✅ 3/3 | ❌ 3/4 | ❌ 3/7 | ✅ ❌ ❌ | - |
| 23 | 전위냥 `jeonwi` | SSR | ❌ 2/3 | ❌ 1/4 | ❌ 1/6 | ❌ ❌ ❌ | ❌ |
| 24 | 방통냥 `bangtong` | SSR | ✅ 2/2 | ✅ 3/3 | ❌ 3/4 | ✅ ✅ ✅ | - |
| 25 | 장료냥 `jangryo` | SR | ❌ 0/2 | ❌ 0/4 | ❌ 1/5 | ❌ ❌ ❌ | ❌ |
| 26 | 감녕냥 `gamnyeong` | SR | ❌ 1/3 | ❌ 2/4 | ❌ 3/5 | ❌ ✅ ❌ | ❌ |
| 27 | 육손냥 `yuksun` | SR | ❌ 3/5 | ❌ 2/5 | ❌ 1/5 | ❌ ❌ ✅ | ❌ |
| 28 | 곽가냥 `gwakga` | SR | ❌ 1/2 | ❌ 0/4 | ❌ 0/4 | ❌ ❌ ❌ | - |
| 29 | 순욱냥 `sunuk` | SR | ❌ 0/1 | ❌ 1/2 | ❌ 1/3 | ❌ ✅ ❌ | - |
| 30 | 허저냥 `heo` | SR | ❌ 1/2 | ❌ 0/2 | ❌ 2/4 | ❌ ❌ ❌ | ❌ |
| 31 | 손상냥 `son` | SR | ❌ 0/1 | ❌ 0/2 | ❌ 0/3 | ❌ ❌ ❌ | ❌ |
| 32 | 안량냥 `sr_anryang` | SR | ❌ 1/3 | ❌ 1/4 | ❌ 0/4 | ❌ ❌ ❌ | ❌ |
| 33 | 우길냥 `sr_ugil` | SR | ❌ 0/4 | ❌ 0/5 | ❌ 1/6 | ❌ ❌ ❌ | - |
| 34 | 원술냥 `sr_wonsul` | SR | ❌ 0/1 | ❌ 0/2 | ❌ 0/3 | ✅ ❌ ❌ | - |
| 35 | 노숙냥 `nosuk` | SR | ❌ 1/2 | ❌ 1/2 | ❌ 0/2 | ❌ ❌ ❌ | - |
| 36 | 공손찬냥 `sr_gongsonchan` | SR | ❌ 0/3 | ❌ 0/4 | ❌ 0/4 | ❌ ❌ ❌ | ❌ |
| 37 | 화웅냥 `hwaung` | SR | ❌ 0/4 | ❌ 0/4 | ❌ 0/5 | ❌ ❌ ❌ | - |
| 38 | 황개냥 `hwang` | SR | ❌ 1/3 | ❌ 1/3 | ❌ 1/4 | ❌ ❌ ❌ | ❌ |
| 39 | 소교냥 `sogyo` | SR | ❌ 0/2 | ❌ 0/3 | ❌ 0/3 | ❌ ❌ ❌ | - |
| 40 | 축융냥 `sr_chukyung` | SR | ❌ 0/2 | ❌ 0/2 | ❌ 0/2 | ❌ ❌ ❌ | ❌ |
| 41 | 문추냥 `sr_munchu` | SR | ❌ 0/4 | ❌ 0/5 | ❌ 0/6 | ❌ ❌ ❌ | - |
| 42 | 원소냥 `wonso` | SR | ❌ 0/1 | ❌ 0/1 | ❌ 0/2 | ❌ ❌ ❌ | - |
| 43 | 맹획냥 `sr_maenghoek` | SR | ❌ 0/3 | ❌ 0/4 | ❌ 0/5 | ❌ ❌ ❌ | - |
| 44 | 유표냥 `sr_yupyo` | SR | ❌ 0/1 | ❌ 0/2 | ❌ 0/3 | ❌ ✅ ❌ | - |
| 45 | 호야냥 `m3` | R | ❌ 0/1 | ❌ 0/2 | ❌ 0/4 | ❌ ❌ ❌ | ❌ |
| 46 | 요화냥 `r_yohwa` | R | ❌ 1/2 | ❌ 1/2 | ❌ 2/3 | ❌ ❌ ✅ | - |
| 47 | 이유냥 `r_iyu` | R | ✅ 2/2 | ❌ 1/2 | ❌ 0/3 | ✅ ❌ ❌ | - |
| 48 | 태산냥 `m1` | R | ❌ 1/2 | ❌ 1/3 | ❌ 1/3 | ❌ ✅ ❌ | - |
| 49 | 하후은냥 `r_hahueun` | R | ❌ 0/1 | ❌ 0/2 | ❌ 0/3 | ❌ ❌ ❌ | ❌ |
| 50 | 이전냥 `r_ijeon` | R | ❌ 1/3 | ❌ 0/4 | ❌ 0/4 | ❌ ❌ ❌ | ❌ |
| 51 | 장량냥 `r_jangryang` | R | ❌ 1/3 | ❌ 0/4 | ❌ 0/5 | ❌ ❌ ❌ | ❌ |
| 52 | 단아냥 `m5` | R | ❌ 1/2 | ❌ 1/2 | ❌ 1/2 | ❌ ✅ ❌ | - |
| 53 | 관평냥 `r_gwanpyeong` | R | ❌ 0/2 | ❌ 0/3 | ❌ 0/3 | ❌ ❌ ❌ | ❌ |
| 54 | 고순냥 `r_gosun` | R | ❌ 0/2 | ❌ 1/4 | ❌ 0/3 | ❌ ❌ ❌ | ❌ |
| 55 | 한당냥 `r_handang` | R | ❌ 0/2 | ❌ 0/3 | ❌ 0/3 | ❌ ✅ ❌ | ❌ |
| 56 | 장보냥 `r_jangbo` | R | ❌ 0/1 | ❌ 0/2 | ❌ 0/3 | ❌ ❌ ❌ | ❌ |
| 57 | 채모냥 `r_chaemo` | R | ✅ 2/2 | ❌ 1/3 | ❌ 0/3 | ✅ ❌ ❌ | ❌ |
| 58 | 주창냥 `r_juchang` | R | ❌ 0/2 | ❌ 0/3 | ❌ 0/4 | ❌ ❌ ❌ | ❌ |
| 59 | 왕랑냥 `r_wangrang` | R | ✅ 1/1 | ❌ 0/1 | ❌ 0/2 | ✅ ❌ ❌ | - |
| 60 | 순우경냥 `r_sunugyeong` | R | ✅ 2/2 | ❌ 1/3 | ❌ 2/4 | ❌ ❌ ❌ | - |
| 61 | 정보냥 `r_jeongbo` | R | ✅ 2/2 | ❌ 0/3 | ❌ 4/7 | ❌ ❌ ❌ | - |
| 62 | 호표기냥 `n_hopyo` | N | ❌ 0/1 | ❌ 0/2 | ❌ 0/3 | ❌ ✅ ❌ | ❌ |
| 63 | 강동 해적냥 `n_pirate` | N | ❌ 0/2 | ❌ 0/3 | ❌ 0/4 | ❌ ✅ ❌ | ❌ |
| 64 | 서량 기병냥 `n_cavalry` | N | ❌ 1/2 | ❌ 1/3 | ❌ 1/4 | ❌ ❌ ❌ | ❌ |
| 65 | 독사냥 `n_snake` | N | ❌ 1/4 | ❌ 1/4 | ❌ 1/4 | ❌ ❌ ❌ | ❌ |
| 66 | 형주 수군 궁수냥 `n_hyeongju` | N | ❌ 0/4 | ❌ 0/4 | ❌ 0/4 | ❌ ❌ ❌ | ❌ |
| 67 | 황건 역사냥 `n_giant` | N | ❌ 0/1 | ❌ 0/1 | ❌ 0/1 | ❌ ❌ ❌ | ❌ |
| 68 | 곰냥 `n_bear` | N | ✅ 2/2 | ❌ 1/3 | ❌ 0/4 | ❌ ❌ ❌ | ❌ |
| 69 | 늑대냥 `n_wolf` | N | ❌ 0/2 | ❌ 0/3 | ❌ 0/3 | ❌ ❌ ❌ | - |
| 70 | 위 방패 대장냥 `n_guard` | N | ❌ 0/2 | ❌ 0/3 | ❌ 0/4 | ❌ ❌ ❌ | ❌ |
| 71 | 멧돼지냥 `n_boar` | N | ❌ 2/4 | ❌ 2/4 | ❌ 1/4 | ❌ ❌ ❌ | ❌ |
| 72 | 산월 주술사냥 `n_shaman` | N | ❌ 1/2 | ❌ 0/2 | ❌ 0/2 | ❌ ❌ ❌ | - |
| 73 | 남만 등갑병냥 `n_deunggap` | N | ❌ 1/2 | ❌ 1/2 | ❌ 0/3 | ❌ ❌ ❌ | - |
| 74 | 청주병냥 `c_cheongju` | C | ❌ 0/2 | ❌ 0/2 | ❌ 0/2 | ❌ ❌ ❌ | ❌ |
| 75 | 백이병냥 `c_baeki` | C | ❌ 0/2 | ❌ 0/3 | ❌ 0/3 | ❌ ❌ ❌ | ❌ |
| 76 | 황건 궁수냥 `c_hwanggeon` | C | ❌ 0/1 | ❌ 0/1 | ❌ 0/2 | ❌ ✅ ❌ | ❌ |
| 77 | 흑산적냥 `c_heuksan` | C | ❌ 0/1 | ❌ 0/2 | ❌ 0/3 | ❌ ❌ ❌ | ❌ |
| 78 | 위 궁노병냥 `c_wi_archer` | C | ❌ 0/1 | ❌ 0/1 | ❌ 0/1 | ❌ ❌ ❌ | ❌ |
| 79 | 수군 궁수냥 `c_sugun` | C | ❌ 0/1 | ❌ 0/1 | ❌ 0/1 | ❌ ❌ ✅ | ❌ |
| 80 | 단양병냥 `c_danyang` | C | ❌ 0/1 | ❌ 0/1 | ❌ 0/1 | ❌ ✅ ❌ | ❌ |
| 81 | 산월 전사냥 `c_sanwol` | C | ❌ 0/2 | ❌ 0/3 | ❌ 2/4 | ❌ ❌ ❌ | ❌ |
| 82 | 무당비군냥 `c_mudang` | C | ❌ 1/3 | ❌ 1/4 | ❌ 1/4 | ❌ ❌ ❌ | ❌ |
| 83 | 허창 수비병냥 `c_heochang` | C | ❌ 0/1 | ❌ 0/2 | ❌ 0/2 | ❌ ❌ ❌ | - |
| 84 | 서량 보병냥 `c_seoryang` | C | ❌ 0/2 | ❌ 0/2 | ❌ 1/4 | ❌ ❌ ❌ | - |
| 85 | 익주 둔전병냥 `c_ikju` | C | ❌ 0/1 | ❌ 0/2 | ❌ 1/2 | ❌ ❌ ❌ | - |

## 실패 상세 (영웅 ★단계: expected X, got Y)

### 여포냥 `yeo` ★0 — 5건 실패 / 5

- [base] **damage 480% [all-in-radius]**: expected 5명, got 0명 일치; 불일치 E0=105%, E1=105%, E2=105%, E3=105%, E4=105%
- [base] **zone targets**: expected 5, got 0
- [base] **zone  40%/s × 4s**: expected 대상별 총 160%, got 틱 없음
- [base] **unexpected dot**: expected 없음, got 5명 20틱 (틱당 30%)
- [base] **unexpected shield**: expected 없음, got caster(yeo)=15%

### 여포냥 `yeo` ★3 — 5건 실패 / 6

- [base] **damage 480% ×성장1.2 [all-in-radius]**: expected 5명, got 0명 일치; 불일치 E0=131.25%, E1=131.25%, E2=131.25%, E3=131.25%, E4=131.25%
- [base] **zone targets**: expected 5, got 0
- [base] **zone  40%/s × 4s (성장 1.2)**: expected 대상별 총 160%, got 틱 없음
- [base] **dot burn 20%/s × 3s (성장 1.2)**: expected 대상별 총 60%, got E0: 총 150% / 4틱 / 4.0667s (틱당 37.5%); E1: 총 150% / 4틱 / 4.0667s (틱당 37.5%); E2: 총 150% / 4틱 / 4.0667s (틱당 37.5%)
- [base] **unexpected shield**: expected 없음, got caster(yeo)=17.25%

### 여포냥 `yeo` ★5 — 7건 실패 / 8

- [base] **damage 480% ×성장1.3 [all-in-radius]**: expected 5명, got 0명 일치; 불일치 E0=157.5%, E1=157.5%, E2=157.5%, E3=157.5%, E4=157.5%
- [base] **zone targets**: expected 5, got 0
- [base] **zone  40%/s × 4s (성장 1.3)**: expected 대상별 총 160%, got 틱 없음
- [base] **dot burn 20%/s × 3s (성장 1.3)**: expected 대상별 총 60%, got E0: 총 180% / 4틱 / 4.0667s (틱당 45%); E1: 총 180% / 4틱 / 4.0667s (틱당 45%); E2: 총 180% / 4틱 / 4.0667s (틱당 45%)
- [base] **unexpected shield**: expected 없음, got caster(yeo)=19.5%
- [base] **buff crit 20% 5s [self]**: expected 1명 (caster(yeo)), got 없음
- [base] **buff critDamage 40% 5s [self]**: expected 1명 (caster(yeo)), got 없음

### 관우냥 `gwan` ★0 — 1건 실패 / 1

- [base] **damage 600% [line]**: expected 5명, got 0명 일치; 불일치 E0=480%
- [base] ⚠ 스펙에 없는 상태: defenseDown@E0

### 관우냥 `gwan` ★3 — 1건 실패 / 2

- [base] **damage 680% ×성장1.2 [line]**: expected 5명, got 0명 일치; 불일치 E0=600%, E1=600%, E2=600%, E3=600%, E4=600%

### 관우냥 `gwan` ★5 — 2건 실패 / 3

- [base] **damage 824% ×성장1.3 [line]**: expected 5명, got 0명 일치; 불일치 E0=720%, E1=720%, E2=720%, E3=720%, E4=720%
- [base] ⚠ 스펙에 없는 상태: stun@E0, stun@E1, stun@E2, stun@E3, stun@E4
- [dispel] **dispel 2개 (보호막 우선)**: expected 5명 × 2, got 해제 없음

### 제갈냥 `je` ★0 — 3건 실패 / 7

- [base] **debuff defenseDown 20% 6s [all-enemies]**: expected 5명 (E0,E1,E2,E3,E4), got E0=25%/6s, E1=25%/6s, E2=25%/6s, E3=25%/6s, E4=25%/6s
- [base] **buff skillPower 15% 6s [all-allies]**: expected 5명 (caster(je),ally-1,ally-2,ally-3,ally-4), got caster(je)=20%/6s, ally-1=20%/6s, ally-2=20%/6s, ally-3=20%/6s, ally-4=20%/6s
- [boss] **debuff defenseDown 20% 6s**: expected 1명, got E0=25%/6s

### 제갈냥 `je` ★3 — 3건 실패 / 8

- [base] **debuff defenseDown 20% 6s [all-enemies]**: expected 5명 (E0,E1,E2,E3,E4), got E0=25%/6s, E1=25%/6s, E2=25%/6s, E3=25%/6s, E4=25%/6s
- [base] **buff skillPower 15% 6s [all-allies]**: expected 5명 (caster(je),ally-1,ally-2,ally-3,ally-4), got caster(je)=20%/6s, ally-1=20%/6s, ally-2=20%/6s, ally-3=20%/6s, ally-4=20%/6s
- [boss] **debuff defenseDown 20% 6s**: expected 1명, got E0=25%/6s

### 제갈냥 `je` ★5 — 3건 실패 / 10

- [base] **debuff defenseDown 20% 6s [all-enemies]**: expected 5명 (E0,E1,E2,E3,E4), got E0=25%/6s, E1=25%/6s, E2=25%/6s, E3=25%/6s, E4=25%/6s
- [base] **buff skillPower 15% 6s [all-allies]**: expected 5명 (caster(je),ally-1,ally-2,ally-3,ally-4), got caster(je)=20%/6s, ally-1=20%/6s, ally-2=20%/6s, ally-3=20%/6s, ally-4=20%/6s
- [boss] **debuff defenseDown 20% 6s**: expected 1명, got E0=25%/6s

### 황충냥 `hwangchung` ★0 — 3건 실패 / 3

- [base] **damage 550% [lowest-hp]**: expected 1명, got 0명 일치; 불일치 E1=155%, E0=30%, E2=30%, E3=30%, E4=30%
- [single] **damage 500%**: expected 1명, got 0명 일치; 불일치 E0=155%
- [lowhp] **damage 725%**: expected 1명, got 0명 일치; 불일치 E0=155%

### 황충냥 `hwangchung` ★3 — 4건 실패 / 4

- [base] **damage 550% ×성장1.2 [lowest-hp]**: expected 1명, got 0명 일치; 불일치 E1=193.75%, E0=37.5%, E2=37.5%, E3=37.5%, E4=37.5%
- [single] **damage 500% ×성장1.2**: expected 1명, got 0명 일치; 불일치 E0=193.75%
- [lowhp] **damage 725% ×성장1.2**: expected 1명, got 0명 일치; 불일치 E0=193.75%
- [kill] **energy +50 [self]**: expected 1명, got 기력 회복 없음

### 황충냥 `hwangchung` ★5 — 5건 실패 / 5

- [base] **damage 550% ×성장1.3 [lowest-hp]**: expected 1명, got 0명 일치; 불일치 E1=232.5%, E0=45%, E2=45%, E3=45%, E4=45%
- [single] **damage 500% ×성장1.3**: expected 1명, got 0명 일치; 불일치 E0=232.5%
- [lowhp] **damage 725% ×성장1.3**: expected 1명, got 0명 일치; 불일치 E0=232.5%
- [kill] **energy +50 [self]**: expected 1명, got 기력 회복 없음
- [boss] **damage 650% ×성장1.3**: expected 1명, got 0명 일치; 불일치 E0=263.1%

### 주유냥 `juyu` ★0 — 2건 실패 / 3

- [base] **damage 200% [all-in-radius]**: expected 5명, got 0명 일치; 불일치 E0=70%, E1=70%, E2=70%, E3=70%, E4=70%
- [base] **zone  50%/s × 4s**: expected 대상별 총 200%, got E0: 총 110% / 4틱 / 4.0667s (틱당 27.5%); E1: 총 110% / 4틱 / 4.0667s (틱당 27.5%); E2: 총 110% / 4틱 / 4.0667s (틱당 27.5%)

### 주유냥 `juyu` ★3 — 3건 실패 / 4

- [base] **damage 200% ×성장1.2 [all-in-radius]**: expected 5명, got 0명 일치; 불일치 E0=87.5%, E1=87.5%, E2=87.5%, E3=87.5%, E4=87.5%
- [base] **zone  50%/s × 4s (성장 1.2)**: expected 대상별 총 200%, got E0: 총 137.5% / 4틱 / 4.0667s (틱당 34.38%); E1: 총 137.5% / 4틱 / 4.0667s (틱당 34.38%); E2: 총 137.5% / 4틱 / 4.0667s (틱당 34.38%)
- [base] **zone radius ×1.5**: expected ×1.5, got ×1 (15→15)

### 주유냥 `juyu` ★5 — 4건 실패 / 5

- [base] **damage 200% ×성장1.3 [all-in-radius]**: expected 5명, got 0명 일치; 불일치 E0=105%, E1=105%, E2=105%, E3=105%, E4=105%
- [base] **zone  50%/s × 4s (성장 1.3)**: expected 대상별 총 200%, got E0: 총 165% / 4틱 / 4.0667s (틱당 41.25%); E1: 총 165% / 4틱 / 4.0667s (틱당 41.25%); E2: 총 165% / 4틱 / 4.0667s (틱당 41.25%)
- [base] **zone radius ×1.5**: expected ×1.5, got ×1.2 (15→18)
- [burnAmp] **ally burn ×1.25 in zone**: expected ×1.25, got ×1

### 하후돈냥 `hahudon` ★0 — 2건 실패 / 2

- [base] **basic sweep 50%**: expected 4명, got 0명 (일반 공격 피해 계수 53.33%,100%)
- [base] **buff speed 50% 8s [self]**: expected 1명 (caster(hahudon)), got 없음
- [base] ⚠ 스펙에 없는 상태: attackDown@E0

### 하후돈냥 `hahudon` ★3 — 2건 실패 / 2

- [base] **basic sweep 50% ×성장1.2**: expected 4명, got 0명 (일반 공격 피해 계수 93.33%,140%)
- [base] **buff speed 50% 8s [self]**: expected 1명 (caster(hahudon)), got 없음
- [base] ⚠ 스펙에 없는 상태: attackDown@E0

### 하후돈냥 `hahudon` ★5 — 3건 실패 / 3

- [base] **basic sweep 50% ×성장1.3**: expected 4명, got 0명 (일반 공격 피해 계수 112%,140%)
- [base] **buff speed 50% 8s [self]**: expected 1명 (caster(hahudon)), got 없음
- [base] ⚠ 스펙에 없는 상태: attackDown@E0
- [lethal] **buff invulnerable/immortal 100% 5s [self]**: expected 1명 (caster(hahudon)), got 없음

### 조운냥 `joun` ★0 — 1건 실패 / 2

- [base] **damage 420% [nearest]**: expected 3명, got 0명 일치; 불일치 E0=120%, E1=120%, E2=120%

### 조운냥 `joun` ★3 — 2건 실패 / 3

- [base] **damage 420% ×성장1.2 [nearest]**: expected 3명, got 0명 일치; 불일치 E0=150%, E1=150%, E2=150%
- [single] **damage 420% ×성장1.2**: expected 1명, got 0명 일치; 불일치 E0=517.5%

### 조운냥 `joun` ★5 — 2건 실패 / 4

- [base] **damage 420% ×성장1.3 [nearest]**: expected 3명, got 0명 일치; 불일치 E0=225%, E1=225%, E2=225%
- [single] **damage 420% ×성장1.3**: expected 1명, got 0명 일치; 불일치 E0=776.25%

### 장비냥 `jang` ★0 — 3건 실패 / 4

- [base] **unexpected shield**: expected 없음, got caster(jang)=25%
- [base] **taunt taunt 3s**: expected 5명, got 없음
- [base] **buff reduction 25% 4s [self]**: expected 1명 (caster(jang)), got 없음
- [base] ⚠ 스펙에 없는 상태: stun@E0, stun@E1, stun@E2, stun@E3, stun@E4

### 장비냥 `jang` ★3 — 5건 실패 / 5

- [base] **damage 160% ×성장1.2 [all-in-radius]**: expected 5명, got 0명 일치; 불일치 E0=200%, E1=200%, E2=200%, E3=200%, E4=200%
- [base] **unexpected shield**: expected 없음, got caster(jang)=28.75%
- [base] **taunt taunt 3s**: expected 5명, got 없음
- [base] **buff reduction 25% 4s [self]**: expected 1명 (caster(jang)), got 없음
- [base] **debuff attackDown 15% [taunted]**: expected 5명, got 없음
- [base] ⚠ 스펙에 없는 상태: stun@E0, stun@E1, stun@E2, stun@E3, stun@E4

### 장비냥 `jang` ★5 — 8건 실패 / 9

- [base] **damage 160% ×성장1.3 [all-in-radius]**: expected 5명, got 0명 일치; 불일치 E0=240%, E1=240%, E2=240%, E3=240%, E4=240%
- [base] **unexpected shield**: expected 없음, got caster(jang)=32.5%
- [base] **heal 10% [self]**: expected 1회, got 0회 일치 (0명); 측정 회복 없음
- [base] **taunt taunt 3s**: expected 5명, got 없음
- [base] **buff reduction 25% 4s [self]**: expected 1명 (caster(jang)), got 없음
- [base] **debuff attackDown 15% [taunted]**: expected 5명, got 없음
- [base] **stun stun 1s**: expected 5명, got E0=✓/1.5s, E1=✓/1.5s, E2=✓/1.5s, E3=✓/1.5s, E4=✓/1.5s
- [base] **summon ×1 10s 공격 80%**: expected 1기, got 소환 없음

### 조조냥 `jo` ★5 — 3건 실패 / 7

- [faction] **aura crit (vs ally-1)**: expected caster=12%, hahudon=12%, sama=12%, got caster=9%, hahudon=9%, sama=9%
- [faction] **start energy**: expected caster=+10, hahudon=+10, sama=+10, ally-1=+0, got caster=+0, hahudon=+0, sama=+0, ally-1=+0
- [faction1] **aura crit (vs ally-1)**: expected caster=4%, got caster=3%

### 화타냥 `hwata` ★0 — 1건 실패 / 1

- [base] **heal 25% ×3회 [lowest-hp-ally]**: expected 3회, got 0회 일치 (0명); 측정 ally-1=12%, ally-2=12%, ally-1=12%

### 화타냥 `hwata` ★3 — 2건 실패 / 2

- [base] **heal 25% ×3회 [lowest-hp-ally]**: expected 3회, got 0회 일치 (0명); 측정 ally-1=13.8%, ally-2=13.8%, ally-1=13.8%
- [cleanse] **cleanse 1개 [healed]**: expected 3명 × 1, got ally-1=1, ally-2=1

### 화타냥 `hwata` ★5 — 3건 실패 / 3

- [base] **heal 25% ×5회 [lowest-hp-ally]**: expected 5회, got 0회 일치 (0명); 측정 ally-1=15.6%, ally-2=15.6%, ally-1=15.6%, ally-3=15.6%, ally-2=15.6%, caster(hwata)=5%, ally-1=5%, ally-2=5%
- [base] **heal 10% [all-allies]**: expected 5회, got 0회 일치 (0명); 측정 ally-1=15.6%, ally-2=15.6%, ally-1=15.6%, ally-3=15.6%, ally-2=15.6%, caster(hwata)=5%, ally-1=5%, ally-2=5%
- [cleanse] **cleanse 1개 [healed]**: expected 4명 × 1, got ally-1=1, ally-2=1, ally-3=1

### 사마냥 `sama` ★0 — 1건 실패 / 2

- [base] **damage 320% [lowest-hp]**: expected 1명, got 0명 일치; 불일치 E2=157.5%

### 사마냥 `sama` ★3 — 1건 실패 / 3

- [base] **damage 320% ×성장1.2 [lowest-hp]**: expected 1명, got 0명 일치; 불일치 E2=202.78%

### 사마냥 `sama` ★5 — 1건 실패 / 3

- [base] **damage 320% ×성장1.3 [lowest-hp]**: expected 1명, got 0명 일치; 불일치 E2=243.34%

### 장각냥 `janggak` ★0 — 2건 실패 / 2

- [base] **damage 240% [highest-hp]**: expected 1명, got 0명 일치; 불일치 E1=168%, E3=82%, E0=82%, E2=82%, E4=82%
- [base] **damage 150% [chain]**: expected 4명, got 0명 일치; 불일치 E1=168%, E3=82%, E0=82%, E2=82%, E4=82%

### 장각냥 `janggak` ★3 — 3건 실패 / 5

- [base] **damage 240% ×성장1.2 [highest-hp]**: expected 1명, got 0명 일치; 불일치 E1=210%, E3=102.5%, E0=102.5%, E2=102.5%, E4=102.5%
- [base] **damage 150% ×성장1.2 [chain]**: expected 4명, got 0명 일치; 불일치 E1=210%, E3=102.5%, E0=102.5%, E2=102.5%, E4=102.5%
- [boss] **debuff attackSlow 15% 2s**: expected 1명, got 없음

### 장각냥 `janggak` ★5 — 3건 실패 / 5

- [base] **damage 240% ×성장1.3 [highest-hp]**: expected 1명, got 0명 일치; 불일치 E1=252%, E3=147.6%, E0=147.6%, E2=147.6%, E4=147.6%, E6=147.6%
- [base] **damage 180% ×성장1.3 [chain]**: expected 5명, got 0명 일치; 불일치 E1=252%, E3=147.6%, E0=147.6%, E2=147.6%, E4=147.6%, E6=147.6%
- [boss] **debuff attackSlow 15% 2s**: expected 1명, got 없음

### 동탁냥 `dong` ★0 — 2건 실패 / 3

- [base] **taunt taunt 3s**: expected 5명, got E0=✓/3s
- [base] **displace 끌어당김**: expected 4명, got E1 18.0278→18.0278, E2 18.0278→18.0278, E3 21.5407→21.5407, E4 25.2982→25.2982

### 동탁냥 `dong` ★3 — 5건 실패 / 5

- [base] **shield 35% [self]**: expected 1명, got 0명 일치; 측정 caster(dong)=40%/5s
- [base] **unexpected heal**: expected 없음, got caster(dong)=5%
- [base] **taunt taunt 3s**: expected 5명, got E0=✓/3s
- [base] **displace 끌어당김**: expected 4명, got E1 18.0278→18.0278, E2 18.0278→18.0278, E3 21.5407→21.5407, E4 25.2982→25.2982
- [base] ⚠ 스펙에 없는 상태: slow@E0
- [break] **damage 5% of casterMaxHp ×성장1.2**: expected 5명, got 0명 일치

### 동탁냥 `dong` ★5 — 5건 실패 / 6

- [base] **shield 35% [self]**: expected 1명, got 0명 일치; 측정 caster(dong)=40%/5s
- [base] **unexpected heal**: expected 없음, got caster(dong)=5%
- [base] **taunt taunt 3s**: expected 5명, got E0=✓/3s
- [base] **displace 끌어당김**: expected 4명, got E1 18.0278→18.0278, E2 18.0278→18.0278, E3 21.5407→21.5407, E4 25.2982→25.2982
- [base] ⚠ 스펙에 없는 상태: slow@E0
- [break] **damage 10% of casterMaxHp ×성장1.3**: expected 5명, got 0명 일치

### 대교냥 `daegyo` ★0 — 3건 실패 / 3

- [base] **shield 12% [all-allies]**: expected 5명, got 0명 일치; 측정 caster(daegyo)=14%/5s, ally-1=14%/5s, ally-2=14%/5s, ally-3=14%/5s, ally-4=14%/5s
- [base] **heal 3% ×3틱 [all-allies]**: expected 15회, got 0회 일치 (0명); 측정 caster(daegyo)=4%, ally-1=4%, ally-2=4%, ally-3=4%, ally-4=4%, caster(daegyo)=4%, ally-1=4%, ally-2=4%
- [burnGuard] **dot taken ×0.5**: expected ×0.5, got ×1,×1

### 대교냥 `daegyo` ★3 — 4건 실패 / 4

- [base] **shield 12% [all-allies]**: expected 5명, got 0명 일치; 측정 caster(daegyo)=16.1%/5s, ally-1=16.1%/5s, ally-2=16.1%/5s, ally-3=16.1%/5s, ally-4=16.1%/5s
- [base] **heal 3% ×3틱 [all-allies]**: expected 15회, got 0회 일치 (0명); 측정 caster(daegyo)=4.6%, ally-1=4.6%, ally-2=4.6%, ally-3=4.6%, ally-4=4.6%, caster(daegyo)=4.6%, ally-1=4.6%, ally-2=4.6%
- [burnGuard] **dot taken ×0.5**: expected ×0.5, got ×1,×1
- [break] **heal 5%**: expected 1회, got 0회 일치 (0명); 측정 ally-1=5%, caster(daegyo)=4.6%, ally-1=4.6%, ally-2=4.6%, ally-3=4.6%, ally-4=4.6%, caster(daegyo)=4.6%, ally-1=4.6%

### 대교냥 `daegyo` ★5 — 5건 실패 / 5

- [base] **shield 12% [all-allies]**: expected 5명, got 0명 일치; 측정 caster(daegyo)=18.2%/5s, ally-1=18.2%/5s, ally-2=18.2%/5s, ally-3=18.2%/5s, ally-4=18.2%/5s
- [base] **heal 3% ×3틱 [all-allies]**: expected 15회, got 0회 일치 (0명); 측정 caster(daegyo)=5.2%, ally-1=5.2%, ally-2=5.2%, ally-3=5.2%, ally-4=5.2%, caster(daegyo)=5.2%, ally-1=5.2%, ally-2=5.2%
- [burnGuard] **dot taken ×0.5**: expected ×0.5, got ×1,×1
- [break] **heal 5%**: expected 1회, got 0회 일치 (0명); 측정 ally-1=5%, caster(daegyo)=5.2%, ally-1=5.2%, ally-2=5.2%, ally-3=5.2%, ally-4=5.2%, caster(daegyo)=5.2%, ally-1=5.2%
- [revive] **heal 30% (부활)**: expected 1회, got 0회 일치 (0명); 측정 ally-4=30%, caster(daegyo)=5.2%, ally-1=5.2%, ally-2=5.2%, ally-3=5.2%, ally-4=5.2%, caster(daegyo)=5.2%, ally-1=5.2%

### 마초냥 `macho` ★0 — 2건 실패 / 4

- [base] **damage 300% [line]**: expected 5명, got 0명 일치; 불일치 E0=180%, E1=180%, E2=180%, E3=180%, E4=180%
- [base] **caster dash & return**: expected 이동 후 원위치(±1.5), got 최대 이동 2.5, 종료 위치 차 2.5
- [base] ⚠ 스펙에 없는 상태: attack@macho

### 마초냥 `macho` ★3 — 3건 실패 / 5

- [base] **damage 300% ×성장1.2 [line]**: expected 5명, got 0명 일치; 불일치 E0=270%, E1=225%, E2=225%, E3=225%, E4=225%
- [base] **buff speed 20% 5s [self]**: expected 1명 (caster(macho)), got 없음
- [base] **caster dash & return**: expected 이동 후 원위치(±1.5), got 최대 이동 2.5, 종료 위치 차 2.5
- [base] ⚠ 스펙에 없는 상태: attack@macho

### 마초냥 `macho` ★5 — 6건 실패 / 8

- [base] **damage 300% ×성장1.3 [line]**: expected 5명, got 0명 일치; 불일치 E0=324%, E1=270%, E2=270%, E3=270%, E4=270%
- [base] **zone targets**: expected 5, got 0
- [base] **zone  30%/s × 3s (성장 1.3)**: expected 대상별 총 90%, got 틱 없음
- [base] **buff speed 20% 5s [self]**: expected 1명 (caster(macho)), got 없음
- [base] **slow slow 20%**: expected 5명, got 없음
- [base] **caster dash & return**: expected 이동 후 원위치(±1.5), got 최대 이동 2.5, 종료 위치 차 2.5
- [base] ⚠ 스펙에 없는 상태: attack@macho

### 태사자냥 `taesaja` ★0 — 1건 실패 / 2

- [base] **damage 300% [highest-hp]**: expected 1명, got 0명 일치; 불일치 E1=180%
- [base] ⚠ 스펙에 없는 상태: defenseDown@E1

### 태사자냥 `taesaja` ★3 — 1건 실패 / 3

- [base] **damage 300% ×성장1.2 [highest-hp]**: expected 1명, got 0명 일치; 불일치 E1=225%
- [base] ⚠ 스펙에 없는 상태: speed@taesaja

### 태사자냥 `taesaja` ★5 — 2건 실패 / 5

- [base] **damage 300% ×성장1.3 [highest-hp]**: expected 1명, got 0명 일치; 불일치 E1=270%
- [base] ⚠ 스펙에 없는 상태: slow@E1
- [sameTarget] **damage 330% ×성장1.3 [highest-hp]**: expected 1명, got 0명 일치; 불일치 E1=297%

### 손책냥 `sonchaek` ★0 — 2건 실패 / 3

- [base] **damage 180% [highest-hp]**: expected 1명, got 0명 일치; 불일치 E3=180%
- [base] **debuff taunt/sonchaekChallenge 6s [highest-hp]**: expected 1명 (E1), got E3=✓/6s

### 손책냥 `sonchaek` ★3 — 5건 실패 / 5

- [base] **damage 180% ×성장1.2 [highest-hp]**: expected 1명, got 0명 일치; 불일치 E3=225%
- [base] **shield 20% [self]**: expected 1명, got 0명 일치; 측정 caster(sonchaek)=23%/5s, ally-1=10%/4s
- [base] **unexpected shield**: expected 없음, got ally-1=10%
- [base] **debuff taunt/sonchaekChallenge 6s [highest-hp]**: expected 1명 (E1), got E3=✓/6s
- [base] **debuff defenseDown 15% [highest-hp]**: expected 1명 (E1), got 없음

### 손책냥 `sonchaek` ★5 — 5건 실패 / 6

- [base] **damage 180% ×성장1.3 [highest-hp]**: expected 1명, got 0명 일치; 불일치 E3=270%
- [base] **unexpected shield**: expected 없음, got ally-1=10%
- [base] **debuff taunt/sonchaekChallenge 6s [highest-hp]**: expected 1명 (E1), got E3=✓/6s
- [base] **debuff defenseDown 15% [highest-hp]**: expected 1명 (E1), got 없음
- [base] **debuff vulnerable 10% [highest-hp]**: expected 1명 (E1), got 없음

### 초선냥 `choseon` ★3 — 2건 실패 / 4

- [base] **damage 8% of targetMaxHp ×성장1.2 [highest-atk]**: expected 2명, got 0명 일치; 불일치 E1=8%, E3=8%
- [base] **aura speed**: expected caster=12%, ally-1=12%, ally-2=12%, got caster=0%, ally-1=0%, ally-2=0%

### 초선냥 `choseon` ★5 — 1건 실패 / 7

- [base] **aura speed**: expected caster=12%, ally-1=12%, ally-2=12%, got caster=0%, ally-1=0%, ally-2=0%

### 견희냥 `gyeonhui` ★0 — 2건 실패 / 3

- [base] **zone  40%/s × 3s**: expected 대상별 총 120%, got E0: 총 320% / 4틱 / 4.0667s (틱당 80%); E1: 총 320% / 4틱 / 4.0667s (틱당 80%); E2: 총 320% / 4틱 / 4.0667s (틱당 80%)
- [base] **slow slow/frost 30% 4s**: expected 5명, got E0=20%/1.1s, E1=20%/1.1s, E2=20%/1.1s, E3=20%/1.1s, E4=20%/1.1s

### 견희냥 `gyeonhui` ★3 — 3건 실패 / 4

- [base] **damage 100% ×성장1.2**: expected 5명, got 0명 일치; 불일치 E0=187.5%, E1=187.5%, E2=187.5%, E3=187.5%, E4=187.5%
- [base] **zone  40%/s × 3s (성장 1.2)**: expected 대상별 총 120%, got E0: 총 400% / 4틱 / 4.0667s (틱당 100%); E1: 총 400% / 4틱 / 4.0667s (틱당 100%); E2: 총 400% / 4틱 / 4.0667s (틱당 100%)
- [base] **slow slow/frost 30% 4s**: expected 5명, got E0=20%/1.1s, E1=20%/1.1s, E2=20%/1.1s, E3=20%/1.1s, E4=20%/1.1s

### 견희냥 `gyeonhui` ★5 — 3건 실패 / 5

- [base] **damage 100% ×성장1.3**: expected 5명, got 0명 일치; 불일치 E0=281.25%, E1=281.25%, E2=281.25%, E3=281.25%, E4=281.25%
- [base] **zone  40%/s × 3s (성장 1.3)**: expected 대상별 총 120%, got E0: 총 570% / 4틱 / 4.0667s (틱당 120%); E1: 총 570% / 4틱 / 4.0667s (틱당 120%); E2: 총 570% / 4틱 / 4.0667s (틱당 120%)
- [base] **slow slow/frost 30% 4s**: expected 5명, got E0=20%/1.1s, E1=20%/1.1s, E2=20%/1.1s, E3=20%/1.1s, E4=20%/1.1s

### 하후연 `hahuyeon` ★0 — 3건 실패 / 3

- [base] **unexpected skill damage**: expected 없음, got E0=95%, E1=95%, E2=95%
- [base] **zone targets**: expected 5, got 0
- [base] **zone  80%/s × 3s**: expected 대상별 총 240%, got 틱 없음
- [base] ⚠ 스펙에 없는 상태: speed@hahuyeon

### 하후연 `hahuyeon` ★3 — 4건 실패 / 4

- [base] **unexpected skill damage**: expected 없음, got E0=118.75%, E1=118.75%, E2=118.75%
- [base] **zone targets**: expected 5, got 0
- [base] **zone  80%/s × 3s (성장 1.2)**: expected 대상별 총 240%, got 틱 없음
- [base] **slow slow 20%**: expected 5명, got 없음
- [base] ⚠ 스펙에 없는 상태: speed@hahuyeon

### 하후연 `hahuyeon` ★5 — 4건 실패 / 4

- [base] **unexpected skill damage**: expected 없음, got E0=142.5%, E1=142.5%, E2=142.5%, E4=180%
- [base] **zone targets**: expected 5, got 0
- [base] **zone  80%/s × 5s (성장 1.3)**: expected 대상별 총 400%, got 틱 없음
- [base] **slow slow 20%**: expected 5명, got 없음
- [base] ⚠ 스펙에 없는 상태: speed@hahuyeon

### 유비냥 `yu` ★0 — 2건 실패 / 3

- [base] **unexpected shield**: expected 없음, got caster(yu)=20%, ally-1=20%, ally-2=20%, ally-3=20%, ally-4=20%
- [base] **heal 15% [all-allies]**: expected 5회, got 0회 일치 (0명); 측정 회복 없음

### 유비냥 `yu` ★3 — 2건 실패 / 4

- [base] **unexpected shield**: expected 없음, got caster(yu)=23%, ally-1=23%, ally-2=23%, ally-3=23%, ally-4=23%
- [base] **heal 15% [all-allies]**: expected 5회, got 0회 일치 (0명); 측정 회복 없음

### 유비냥 `yu` ★5 — 5건 실패 / 6

- [base] **unexpected shield**: expected 없음, got caster(yu)=26%, ally-1=26%, ally-2=26%, ally-3=26%, ally-4=26%
- [base] **heal 15% [all-allies]**: expected 5회, got 0회 일치 (0명); 측정 회복 없음
- [base] **aura armor/reduction**: expected caster=16%, ally-1=12%, ally-2=12%, got caster=14%, ally-1=12%, ally-2=12%
- [faction] **aura reduction/armor (vs ally-1)**: expected caster=12%, gwan=12%, jang=12%, got caster=6%, gwan=6%, jang=6%
- [faction] **start energy**: expected caster=+10, gwan=+10, jang=+10, ally-1=+0, got caster=+0, gwan=+0, jang=+0, ally-1=+0

### 손권냥 `songwon` ★3 — 1건 실패 / 4

- [block] **energy +3 [all-allies]**: expected 5명, got 기력 회복 없음

### 손권냥 `songwon` ★5 — 4건 실패 / 7

- [block] **energy +3 [all-allies]**: expected 5명, got 기력 회복 없음
- [faction] **aura statusResistance (vs ally-1)**: expected caster=20%, juyu=20%, daegyo=20%, got caster=15%, juyu=15%, daegyo=15%
- [faction] **faction maxHp bonus**: expected caster=12%, juyu=12%, daegyo=12%, ally-1=0%, got caster=9%, juyu=9%, daegyo=9%, ally-1=0%
- [faction] **start energy**: expected caster=+10, juyu=+10, daegyo=+10, ally-1=+0, got caster=+0, juyu=+0, daegyo=+0, ally-1=+0

### 전위냥 `jeonwi` ★0 — 1건 실패 / 3

- [base] **buff reduction 35% 4s [self]**: expected 1명 (caster(jeonwi)), got caster(jeonwi)=30%/4s

### 전위냥 `jeonwi` ★3 — 3건 실패 / 4

- [base] **damage 150% ×성장1.2 [all-in-radius]**: expected 5명, got 0명 일치; 불일치 E0=187.5%, E1=187.5%, E2=187.5%, E3=187.5%, E4=187.5%
- [base] **buff reduction 35% 4s [self]**: expected 1명 (caster(jeonwi)), got caster(jeonwi)=30%/4s
- [struck] **energy +6 [self]**: expected 1명, got 기력 회복 없음

### 전위냥 `jeonwi` ★5 — 5건 실패 / 6

- [base] **damage 150% ×성장1.3 [all-in-radius]**: expected 5명, got 0명 일치; 불일치 E0=225%, E1=225%, E2=225%, E3=225%, E4=225%
- [base] **buff reduction 35% 4s [self]**: expected 1명 (caster(jeonwi)), got caster(jeonwi)=30%/4s
- [struck] **energy +6 [self]**: expected 1명, got 기력 회복 없음
- [struck] ⚠ reactive damage 3 events
- [reflect] **reflect → E1**: expected 130, got 100.0
- [reflect] **reflect → E2**: expected 300, got 100.0
- [reflect] ⚠ reactive damage 2 events

### 방통냥 `bangtong` ★5 — 1건 실패 / 4

- [share] **damage share 200 → 4명**: expected 4명 × 200, got E1=224.0, E2=224.0, E3=224.0, E4=224.0
- [share] ⚠ reactive damage 4 events

### 장료냥 `jangryo` ★0 — 2건 실패 / 2

- [base] **damage 280% [rear]**: expected 1명, got 0명 일치; 불일치 E0=150%, E1=150%, E2=150%, E3=150%, E4=150%
- [base] **caster teleports behind E4**: expected y < 26.5, got 최소 y 34

### 장료냥 `jangryo` ★3 — 4건 실패 / 4

- [base] **damage 280% ×성장1.2 [rear]**: expected 1명, got 0명 일치; 불일치 E0=187.5%, E1=187.5%, E2=187.5%, E3=187.5%, E4=187.5%
- [base] **unexpected shield**: expected 없음, got caster(jangryo)=9.2%
- [base] **caster teleports behind E4**: expected y < 26.5, got 최소 y 34
- [kill] **energy +20 [self]**: expected 1명, got 기력 회복 없음

### 장료냥 `jangryo` ★5 — 4건 실패 / 5

- [base] **damage 280% ×성장1.3 [rear]**: expected 1명, got 0명 일치; 불일치 E0=225%, E1=225%, E2=225%, E3=225%, E4=225%
- [base] **unexpected shield**: expected 없음, got caster(jangryo)=10.4%
- [base] **caster teleports behind E4**: expected y < 26.5, got 최소 y 34
- [kill] **energy +20 [self]**: expected 1명, got 기력 회복 없음

### 감녕냥 `gamnyeong` ★0 — 2건 실패 / 3

- [base] **damage 260% [rear]**: expected 1명, got 0명 일치; 불일치 E4=250%
- [vsShield] **damage vs shield 520% [rear]**: expected 520%, got 3750%

### 감녕냥 `gamnyeong` ★3 — 2건 실패 / 4

- [base] **shield 준 피해 35% [self]**: expected 1명, got 0명 일치; 측정 caster(gamnyeong)=109.4/4s
- [vsShield] **damage vs shield 520% [rear]**: expected 624%, got 3812.5%

### 감녕냥 `gamnyeong` ★5 — 2건 실패 / 5

- [base] **damage 260% ×성장1.3 [rear]**: expected 1명, got 0명 일치; 불일치 E4=375%
- [base] **shield 준 피해 35% [self]**: expected 1명, got 0명 일치; 측정 caster(gamnyeong)=131.3/4s

### 육손냥 `yuksun` ★0 — 2건 실패 / 5

- [base] **damage 100% [nearest]**: expected 1명, got 0명 일치; 불일치 E0=75%
- [spread] **burn spread count**: expected 1, got 2

### 육손냥 `yuksun` ★3 — 3건 실패 / 5

- [base] **damage 100% ×성장1.2 [nearest]**: expected 1명, got 0명 일치; 불일치 E0=93.75%
- [base] **dot burn 30%/s × 3s (성장 1.2)**: expected 대상별 총 90%, got E0: 총 112.5% / 3틱 / 3.075s (틱당 37.5%)
- [spread] **burn spread count**: expected 4, got 2

### 육손냥 `yuksun` ★5 — 4건 실패 / 5

- [base] **damage 100% ×성장1.3 [nearest]**: expected 1명, got 0명 일치; 불일치 E0=112.5%
- [base] **dot burn 30%/s × 3s (성장 1.3)**: expected 대상별 총 90%, got E0: 총 135% / 3틱 / 3.075s (틱당 45%)
- [spread] **burn spread count**: expected 4, got 2
- [spread] **burn spread duration**: expected 3s, got 2.65,2.35

### 곽가냥 `gwakga` ★0 — 1건 실패 / 2

- [base] **debuff attackDown 20% 4s [highest-hp]**: expected 1명 (E1), got E1=22%/4s

### 곽가냥 `gwakga` ★3 — 4건 실패 / 4

- [base] **debuff attackDown 20% 4s [highest-hp]**: expected 1명 (E1), got E1=22%/5s
- [base] **debuff vulnerable 12% 4s [highest-hp]**: expected 1명 (E1), got E1=12%/5s
- [boss] **debuff attackDown 20% 6s**: expected 1명, got E0=22%/5s
- [boss] **debuff vulnerable 12% 6s**: expected 1명, got E0=12%/5s

### 곽가냥 `gwakga` ★5 — 4건 실패 / 4

- [base] **debuff attackDown 20% 4s [highest-hp]**: expected 1명 (E1), got E1=22%/5s
- [base] **debuff vulnerable 20% 4s [highest-hp]**: expected 1명 (E1), got E1=12%/5s
- [boss] **debuff attackDown 20% 6s**: expected 1명, got E0=22%/5s
- [boss] **debuff vulnerable 20% 6s**: expected 1명, got E0=12%/5s

### 순욱냥 `sunuk` ★0 — 1건 실패 / 1

- [base] **energy fill [highest-atk-ally-excl-self]**: expected ally-2 기력 100, got 최대 39

### 순욱냥 `sunuk` ★3 — 1건 실패 / 2

- [base] **energy fill [highest-atk-ally-excl-self]**: expected ally-2 기력 100, got 최대 39

### 순욱냥 `sunuk` ★5 — 2건 실패 / 3

- [base] **buff crit 20% 5s [highest-atk-ally-excl-self]**: expected 1명 (ally-2), got ally-2=10%/5s
- [base] **energy fill [highest-atk-ally-excl-self]**: expected ally-2 기력 100, got 최대 39

### 허저냥 `heo` ★0 — 1건 실패 / 2

- [base] **shield 15% [self]**: expected 1명, got 0명 일치; 측정 보호막 없음

### 허저냥 `heo` ★3 — 2건 실패 / 2

- [base] **damage 160% ×성장1.2 [all-in-radius]**: expected 5명, got 0명 일치; 불일치 E0=200%, E1=200%, E2=200%, E3=200%, E4=200%
- [base] **shield 15% [self]**: expected 1명, got 0명 일치; 측정 보호막 없음

### 허저냥 `heo` ★5 — 2건 실패 / 4

- [base] **damage 160% ×성장1.3 [all-in-radius]**: expected 5명, got 0명 일치; 불일치 E0=240%, E1=240%, E2=240%, E3=240%, E4=240%
- [base] **shield 25% [self]**: expected 1명, got 0명 일치; 측정 caster(heo)=28.6%/4s

### 손상냥 `son` ★0 — 1건 실패 / 1

- [base] **damage 240% [line]**: expected 5명, got 0명 일치; 불일치 E4=180%

### 손상냥 `son` ★3 — 2건 실패 / 2

- [base] **damage 240% ×성장1.2 [line]**: expected 5명, got 0명 일치; 불일치 E4=252%
- [base] **energy +25 [self]**: expected 1명, got 기력 회복 없음

### 손상냥 `son` ★5 — 3건 실패 / 3

- [base] **damage 240% ×성장1.3 [nearest]**: expected 1명, got 0명 일치; 불일치 E4=302.4%
- [base] **damage 288% ×성장1.3 [line]**: expected 4명, got 0명 일치; 불일치 E4=302.4%
- [base] **energy +25 [self]**: expected 1명, got 기력 회복 없음

### 안량냥 `sr_anryang` ★0 — 2건 실패 / 3

- [base] **damage 220% [nearest]**: expected 1명, got 0명 일치; 불일치 E0=170%
- [boss] **debuff defenseDown 30% 3s**: expected 1명, got E0=15%/3s

### 안량냥 `sr_anryang` ★3 — 3건 실패 / 4

- [base] **damage 220% ×성장1.2 [nearest]**: expected 1명, got 0명 일치; 불일치 E0=223.13%
- [boss] **debuff defenseDown 30% 3s**: expected 1명, got E0=15%/3s
- [duo] **aura speed**: expected caster=10%, got caster=0%

### 안량냥 `sr_anryang` ★5 — 4건 실패 / 4

- [base] **damage 220% ×성장1.3 [nearest]**: expected 1명, got 0명 일치; 불일치 E0=267.75%
- [base] **debuff defenseDown 25% 6s [nearest]**: expected 1명 (E0), got E0=15%/3s
- [boss] **debuff defenseDown 50% 6s**: expected 1명, got E0=15%/3s
- [duo] **aura speed**: expected caster=10%, got caster=0%

### 우길냥 `sr_ugil` ★0 — 4건 실패 / 4

- [base] **unexpected skill damage**: expected 없음, got E0=80%
- [base] **dot targets**: expected 2, got 1
- [base] **dot curse 30%/s × 4s**: expected 대상별 총 120%, got E0: 총 100% / 4틱 / 4.0667s (틱당 25%)
- [base] **debuff healDown 100% 4s**: expected 2명, got 없음

### 우길냥 `sr_ugil` ★3 — 5건 실패 / 5

- [base] **unexpected skill damage**: expected 없음, got E0=105%
- [base] **dot targets**: expected 2, got 1
- [base] **dot curse 30%/s × 4s (성장 1.2)**: expected 대상별 총 120%, got E0: 총 131.25% / 4틱 / 4.0667s (틱당 32.81%)
- [base] **debuff healDown 100% 4s**: expected 2명, got 없음
- [spread] **healDown spread count**: expected ≥1, got 0

### 우길냥 `sr_ugil` ★5 — 5건 실패 / 6

- [base] **unexpected skill damage**: expected 없음, got E0=126%
- [base] **dot targets**: expected 2, got 1
- [base] **debuff healDown 100% 4s**: expected 2명, got 없음
- [spread] **healDown spread count**: expected ≥1, got 0
- [death] **debuff healDown 100% 3s [all-enemies]**: expected 5명 (E0,E1,E2,E3,E4), got 없음

### 원술냥 `sr_wonsul` ★0 — 1건 실패 / 1

- [base] **buff attack 24% 4s [highest-atk-ally-excl-self]**: expected 1명 (ally-2), got caster(sr_wonsul)=24%/4s

### 원술냥 `sr_wonsul` ★3 — 2건 실패 / 2

- [base] **buff attack 24% 4s [highest-atk-ally-excl-self]**: expected 1명 (ally-2), got caster(sr_wonsul)=24%/4s
- [gunwoong] **buff attack 30% 4s [highest-atk-ally-excl-self]**: expected 1명 (r_gosun), got caster(sr_wonsul)=24%/4s

### 원술냥 `sr_wonsul` ★5 — 3건 실패 / 3

- [base] **buff attack 24% 4s [highest-atk-ally-excl-self]**: expected 1명 (ally-2), got caster(sr_wonsul)=24%/4s
- [base] **buff critDamage 30% [highest-atk-ally-excl-self]**: expected 1명 (ally-2), got 없음
- [gunwoong] **buff attack 30% 4s [highest-atk-ally-excl-self]**: expected 1명 (r_gosun), got caster(sr_wonsul)=24%/4s

### 노숙냥 `nosuk` ★0 — 1건 실패 / 2

- [base] **buff attack 10% 4s [all-allies]**: expected 5명 (caster(nosuk),ally-1,ally-2,ally-3,ally-4), got caster(nosuk)=14%/4s, ally-1=14%/4s, ally-2=14%/4s, ally-3=14%/4s, ally-4=14%/4s

### 노숙냥 `nosuk` ★3 — 1건 실패 / 2

- [base] **buff attack 10% 5s [all-allies]**: expected 5명 (caster(nosuk),ally-1,ally-2,ally-3,ally-4), got caster(nosuk)=14%/4s, ally-1=14%/4s, ally-2=14%/4s, ally-3=14%/4s, ally-4=14%/4s

### 노숙냥 `nosuk` ★5 — 2건 실패 / 2

- [base] **buff attack 10% 5s [all-allies]**: expected 5명 (caster(nosuk),ally-1,ally-2,ally-3,ally-4), got caster(nosuk)=14%/4s, ally-1=14%/4s, ally-2=14%/4s, ally-3=14%/4s, ally-4=14%/4s
- [base] **energy +12 [all-allies]**: expected 5명, got caster(nosuk)=+8, ally-1=+8, ally-2=+8, ally-3=+8, ally-4=+8

### 공손찬냥 `sr_gongsonchan` ★0 — 3건 실패 / 3

- [base] **damage 150%** _(모호)_: expected 1명, got 0명 일치
- [base] **taunt taunt 1s**: expected 1명, got 없음
- [base] **summon ×1 6s 공격 30%**: expected 1기, got helper-sr_gongsonchan-10: 공격 40%, 6s

### 공손찬냥 `sr_gongsonchan` ★3 — 4건 실패 / 4

- [base] **damage 150% ×성장1.2** _(모호)_: expected 1명, got 0명 일치
- [base] **taunt taunt 1s**: expected 1명, got 없음
- [base] **buff speed 10% [self]**: expected 1명 (caster(sr_gongsonchan)), got 없음
- [base] **summon ×1 6s 공격 30%**: expected 1기, got helper-sr_gongsonchan-10: 공격 40%, 6s

### 공손찬냥 `sr_gongsonchan` ★5 — 4건 실패 / 4

- [base] **damage 150% ×성장1.3** _(모호)_: expected 1명, got 0명 일치
- [base] **taunt taunt 1s**: expected ≥1명, got 없음
- [base] **buff speed 10% [self]**: expected 1명 (caster(sr_gongsonchan)), got 없음
- [base] **summon ×2 8s 공격 30%**: expected 2기, got helper-sr_gongsonchan-10: 공격 40%, 6s

### 화웅냥 `hwaung` ★0 — 4건 실패 / 4

- [base] **unexpected skill damage**: expected 없음, got E0=180%
- [base] **unexpected shield**: expected 없음, got caster(hwaung)=10%
- [base] **debuff attackDown 20% 4s [all-in-radius]**: expected 5명, got 없음
- [base] **taunt taunt 3s**: expected 5명, got 없음

### 화웅냥 `hwaung` ★3 — 4건 실패 / 4

- [base] **unexpected skill damage**: expected 없음, got E0=225%
- [base] **shield 20% [self]**: expected 1명, got 0명 일치; 측정 caster(hwaung)=14%/4s
- [base] **debuff attackDown 20% 4s [all-in-radius]**: expected 5명, got 없음
- [base] **taunt taunt 3s**: expected 5명, got 없음

### 화웅냥 `hwaung` ★5 — 5건 실패 / 5

- [base] **unexpected skill damage**: expected 없음, got E0=270%
- [base] **shield 20% [self]**: expected 1명, got 0명 일치; 측정 caster(hwaung)=14%/4s
- [base] **debuff attackDown 20% 4s [all-in-radius]**: expected 5명, got 없음
- [base] **taunt taunt 3s**: expected 5명, got 없음
- [base] **buff reduction/armor 20% 4s [all-allies]**: expected 5명 (caster(hwaung),ally-1,ally-2,ally-3,ally-4), got 없음

### 황개냥 `hwang` ★0 — 2건 실패 / 3

- [base] **damage 160% [line]**: expected 5명, got 0명 일치; 불일치 E0=90%, E1=90%, E2=90%, E3=90%, E4=90%
- [base] **dot burn 20%/s × 3s**: expected 대상별 총 60%, got E0: 총 45% / 3틱 / 3.075s (틱당 15%); E1: 총 45% / 3틱 / 3.075s (틱당 15%); E2: 총 45% / 3틱 / 3.075s (틱당 15%)

### 황개냥 `hwang` ★3 — 2건 실패 / 3

- [base] **damage 160% ×성장1.2 [line]**: expected 5명, got 0명 일치; 불일치 E0=112.5%, E1=112.5%, E2=112.5%, E3=112.5%, E4=112.5%
- [base] **dot burn 20%/s × 4s (성장 1.2)**: expected 대상별 총 80%, got E0: 총 75% / 4틱 / 4.0667s (틱당 18.75%); E1: 총 75% / 4틱 / 4.0667s (틱당 18.75%); E2: 총 75% / 4틱 / 4.0667s (틱당 18.75%)

### 황개냥 `hwang` ★5 — 3건 실패 / 4

- [base] **damage 160% ×성장1.3 [line]**: expected 5명, got 0명 일치; 불일치 E0=135%, E1=135%, E2=135%, E3=135%, E4=135%
- [base] **dot burn 20%/s × 4s (성장 1.3)**: expected 대상별 총 80%, got E0: 총 90% / 4틱 / 4.0667s (틱당 22.5%); E1: 총 90% / 4틱 / 4.0667s (틱당 22.5%); E2: 총 90% / 4틱 / 4.0667s (틱당 22.5%)
- [base] **splash 100%**: expected ≥1명, got 폭발 타격 없음

### 소교냥 `sogyo` ★0 — 2건 실패 / 2

- [base] **heal 6% [all-allies]**: expected 5회, got 0회 일치 (0명); 측정 caster(sogyo)=8%, ally-1=8%, ally-2=8%, ally-3=8%, ally-4=8%
- [base] **buff speed 15% 4s [all-allies]**: expected 5명 (caster(sogyo),ally-1,ally-2,ally-3,ally-4), got caster(sogyo)=18%/4s, ally-1=18%/4s, ally-2=18%/4s, ally-3=18%/4s, ally-4=18%/4s

### 소교냥 `sogyo` ★3 — 3건 실패 / 3

- [base] **heal 6% [all-allies]**: expected 5회, got 0회 일치 (0명); 측정 caster(sogyo)=9.2%, ally-1=9.2%, ally-2=9.2%, ally-3=9.2%, ally-4=9.2%
- [base] **buff speed 15% 4s [all-allies]**: expected 5명 (caster(sogyo),ally-1,ally-2,ally-3,ally-4), got caster(sogyo)=18%/4s, ally-1=18%/4s, ally-2=18%/4s, ally-3=18%/4s, ally-4=18%/4s
- [duo] **heal 8% [all-allies]**: expected 5회, got 0회 일치 (0명); 측정 caster(sogyo)=11.5%, ally-1=11.5%, ally-2=11.5%, ally-3=11.5%, daegyo=11.5%

### 소교냥 `sogyo` ★5 — 3건 실패 / 3

- [base] **heal 6% [all-allies]**: expected 5회, got 0회 일치 (0명); 측정 caster(sogyo)=10.4%, ally-1=10.4%, ally-2=10.4%, ally-3=10.4%, ally-4=10.4%
- [base] **buff speed 20% 4s [all-allies]**: expected 5명 (caster(sogyo),ally-1,ally-2,ally-3,ally-4), got caster(sogyo)=18%/4s, ally-1=18%/4s, ally-2=18%/4s, ally-3=18%/4s, ally-4=18%/4s
- [duo] **heal 8% [all-allies]**: expected 5회, got 0회 일치 (0명); 측정 caster(sogyo)=13%, ally-1=13%, ally-2=13%, ally-3=13%, daegyo=13%

### 축융냥 `sr_chukyung` ★0 — 2건 실패 / 2

- [base] **damage 90%** _(모호)_: expected 3명, got 0명 일치; 불일치 E0=140%
- [base] **slow slow 30% 2s**: expected 3명, got 없음

### 축융냥 `sr_chukyung` ★3 — 2건 실패 / 2

- [base] **damage 90% ×성장1.2** _(모호)_: expected 3명, got 0명 일치; 불일치 E0=183.75%
- [base] **slow slow 30% 2s**: expected 3명, got 없음

### 축융냥 `sr_chukyung` ★5 — 2건 실패 / 2

- [base] **damage 90% ×성장1.3** _(모호)_: expected 5명, got 0명 일치; 불일치 E0=220.5%
- [base] **slow slow 30% 2s**: expected 5명, got 없음

### 문추냥 `sr_munchu` ★0 — 4건 실패 / 4

- [base] **unexpected skill damage**: expected 없음, got E0=120%, E1=120%, E2=120%
- [base] **zone targets**: expected 5, got 0
- [base] **zone  70%/s × 3s**: expected 대상별 총 210%, got 틱 없음
- [base] **displace 밀쳐냄**: expected 5명, got E0 4→4, E1 5.1478→5.1478, E2 5.1478→5.1478, E3 6.6708→6.6708, E4 7.6485→7.6485

### 문추냥 `sr_munchu` ★3 — 5건 실패 / 5

- [base] **unexpected skill damage**: expected 없음, got E0=157.5%, E1=157.5%, E2=157.5%
- [base] **zone targets**: expected 5, got 0
- [base] **zone  70%/s × 3s (성장 1.2)**: expected 대상별 총 210%, got 틱 없음
- [base] **displace 밀쳐냄**: expected 5명, got E0 4→4, E1 5.1478→5.1478, E2 5.1478→5.1478, E3 6.6708→6.6708, E4 7.6485→7.6485
- [duo] **aura speed**: expected caster=10%, got caster=0%

### 문추냥 `sr_munchu` ★5 — 6건 실패 / 6

- [base] **unexpected skill damage**: expected 없음, got E0=189%, E1=189%, E2=189%
- [base] **zone targets**: expected 5, got 0
- [base] **zone  70%/s × 5s (성장 1.3)**: expected 대상별 총 350%, got 틱 없음
- [base] **displace 밀쳐냄**: expected 5명, got E0 4→4, E1 5.1478→5.1478, E2 5.1478→5.1478, E3 6.6708→6.6708, E4 7.6485→7.6485
- [duo] **buff attack 20% [self]**: expected 1명 (caster(sr_munchu)), got 없음
- [duo] **aura speed**: expected caster=10%, got caster=0%

### 원소냥 `wonso` ★0 — 1건 실패 / 1

- [base] **shield 15% [front-allies]**: expected 3명, got 0명 일치; 측정 caster(wonso)=18%/5s, ally-1=18%/5s, ally-2=18%/5s

### 원소냥 `wonso` ★3 — 1건 실패 / 1

- [base] **shield 18% [front-allies]**: expected 3명, got 0명 일치; 측정 caster(wonso)=24.84%/5s, ally-1=24.84%/5s, ally-2=24.84%/5s

### 원소냥 `wonso` ★5 — 2건 실패 / 2

- [base] **shield 18% [front-allies]**: expected 3명, got 0명 일치; 측정 caster(wonso)=28.08%/5s, ally-1=28.08%/5s, ally-2=28.08%/5s
- [base] **buff reduction 8% 3s [front-allies]**: expected 3명 (caster(wonso),ally-1,ally-2), got caster(wonso)=5%/3s, ally-1=5%/3s, ally-2=5%/3s

### 맹획냥 `sr_maenghoek` ★0 — 3건 실패 / 3

- [base] **unexpected skill damage**: expected 없음, got E0=120%, E1=120%, E2=120%
- [base] **shield 20% [self]**: expected 1명, got 0명 일치; 측정 보호막 없음
- [base] **taunt taunt 3s**: expected 5명, got E0=✓/2s, E1=✓/2s, E2=✓/2s

### 맹획냥 `sr_maenghoek` ★3 — 4건 실패 / 4

- [base] **unexpected skill damage**: expected 없음, got E0=157.5%, E1=157.5%, E2=157.5%
- [base] **shield 20% [self]**: expected 1명, got 0명 일치; 측정 보호막 없음
- [base] **taunt taunt 3s**: expected 5명, got E0=✓/2s, E1=✓/2s, E2=✓/2s
- [base] **buff attack 15% 3s [self]**: expected 1명 (caster(sr_maenghoek)), got 없음

### 맹획냥 `sr_maenghoek` ★5 — 5건 실패 / 5

- [base] **unexpected skill damage**: expected 없음, got E0=189%, E1=189%, E2=189%
- [base] **shield 20% [self]**: expected 1명, got 0명 일치; 측정 보호막 없음
- [base] **taunt taunt 3s**: expected 5명, got E0=✓/2s, E1=✓/2s, E2=✓/2s
- [base] **buff attack 15% 3s [self]**: expected 1명 (caster(sr_maenghoek)), got 없음
- [lastStand] **heal 50% [self]**: expected 1회, got 0회 일치 (0명); 측정 회복 없음

### 유표냥 `sr_yupyo` ★0 — 1건 실패 / 1

- [base] **shield 10% [lowest-hp-ally]**: expected 2명, got 0명 일치; 측정 ally-1=12%/4s, ally-2=12%/4s

### 유표냥 `sr_yupyo` ★3 — 2건 실패 / 2

- [base] **shield 10% [lowest-hp-ally]**: expected 2명, got 0명 일치; 측정 ally-1=13.8%/4s, ally-2=13.8%/4s
- [base] **energy +5 [self]**: expected 1명, got 기력 회복 없음

### 유표냥 `sr_yupyo` ★5 — 3건 실패 / 3

- [base] **shield 10% [lowest-hp-ally]**: expected 2명, got 0명 일치; 측정 ally-1=15.6%/4s, ally-2=15.6%/4s
- [base] **buff reduction 5% 3s [lowest-hp-ally]**: expected 2명 (ally-1,ally-2), got 없음
- [base] **energy +5 [self]**: expected 1명, got 기력 회복 없음

### 호야냥 `m3` ★0 — 1건 실패 / 1

- [base] **damage 200% [nearest]**: expected 1명, got 0명 일치; 불일치 E0=180%

### 호야냥 `m3` ★3 — 2건 실패 / 2

- [base] **damage 200% ×성장1.2 [nearest]**: expected 1명, got 0명 일치; 불일치 E0=225%
- [wounded] **damage 227% ×성장1.2 [nearest]**: expected 1명, got 0명 일치; 불일치 E0=241.2%

### 호야냥 `m3` ★5 — 4건 실패 / 4

- [base] **damage 200% ×성장1.3 ×1.04 [nearest]**: expected 1명, got 0명 일치; 불일치 E0=278.1%
- [wounded] **damage 227% ×성장1.3 ×1.04 [nearest]**: expected 1명, got 0명 일치; 불일치 E0=298.12%
- [faction] **aura attack (vs ally-1)**: expected caster=12%, r_gosun=12%, m1=12%, got caster=9%, r_gosun=9%, m1=9%
- [faction] **start energy**: expected caster=+10, r_gosun=+10, m1=+10, ally-1=+0, got caster=+0, r_gosun=+0, m1=+0, ally-1=+0

### 요화냥 `r_yohwa` ★0 — 1건 실패 / 2

- [base] **zone  50%/s × 4s**: expected 대상별 총 200%, got E0: 총 240% / 8틱 / 4s (틱당 30%); E1: 총 240% / 8틱 / 4s (틱당 30%); E2: 총 240% / 8틱 / 4s (틱당 30%)

### 요화냥 `r_yohwa` ★3 — 1건 실패 / 2

- [base] **zone  50%/s × 4s (성장 1.2)**: expected 대상별 총 200%, got E0: 총 315% / 8틱 / 4s (틱당 39.38%); E1: 총 315% / 8틱 / 4s (틱당 39.38%); E2: 총 315% / 8틱 / 4s (틱당 39.38%)

### 요화냥 `r_yohwa` ★5 — 1건 실패 / 3

- [base] **zone  50%/s × 4s (성장 1.3)**: expected 대상별 총 200%, got E0: 총 378% / 8틱 / 4s (틱당 47.25%); E1: 총 378% / 8틱 / 4s (틱당 47.25%); E2: 총 378% / 8틱 / 4s (틱당 47.25%)

### 이유냥 `r_iyu` ★3 — 1건 실패 / 2

- [base] **heal 16.5% [lowest-hp-ally]**: expected 1회, got 0회 일치 (0명); 측정 ally-1=17.25%

### 이유냥 `r_iyu` ★5 — 3건 실패 / 3

- [base] **heal 16.5% [lowest-hp-ally]**: expected 1회, got 0회 일치 (0명); 측정 ally-1=19.5%
- [cleanse] **cleanse 2개 (burn/poison) [lowest-hp-ally]**: expected 1명 × 2, got ally-1=1
- [immunity] **harmful status blocked**: expected 차단, got 적용됨

### 태산냥 `m1` ★0 — 1건 실패 / 2

- [base] **shield 18% [self]**: expected 1명, got 0명 일치; 측정 caster(m1)=24%/4s

### 태산냥 `m1` ★3 — 2건 실패 / 3

- [base] **shield 18% [self]**: expected 1명, got 0명 일치; 측정 caster(m1)=27.6%/4s
- [lowhp] **shield 21.6% [self]**: expected 1명, got 0명 일치; 측정 caster(m1)=33.12%/4s

### 태산냥 `m1` ★5 — 2건 실패 / 3

- [base] **shield 18% [self]**: expected 1명, got 0명 일치; 측정 caster(m1)=31.2%/4s
- [lowhp] **shield 21.6% [self]**: expected 1명, got 0명 일치; 측정 caster(m1)=37.44%/4s

### 하후은냥 `r_hahueun` ★0 — 1건 실패 / 1

- [base] **damage 160% [nearest]**: expected 1명, got 0명 일치; 불일치 E0=150%

### 하후은냥 `r_hahueun` ★3 — 2건 실패 / 2

- [base] **damage 160% ×성장1.2 [nearest]**: expected 1명, got 0명 일치; 불일치 E0=196.88%
- [duo] **damage 160% ×성장1.2 ×1.2 [nearest]**: expected 1명, got 0명 일치; 불일치 E0=196.88%

### 하후은냥 `r_hahueun` ★5 — 3건 실패 / 3

- [base] **damage 160% ×성장1.3 [nearest]**: expected 1명, got 0명 일치; 불일치 E0=236.25%
- [base] **debuff attackDown 15% 2s [nearest]**: expected 1명 (E0), got 없음
- [duo] **damage 160% ×성장1.3 ×1.2 [nearest]**: expected 1명, got 0명 일치; 불일치 E0=236.25%

### 이전냥 `r_ijeon` ★0 — 2건 실패 / 3

- [base] **debuff accuracyDown 30% 3s**: expected ≥1명, got 없음
- [base] **caster retreat**: expected 가장 가까운 적과 거리 +2 이상, got 4→4

### 이전냥 `r_ijeon` ★3 — 4건 실패 / 4

- [base] **damage 140% ×성장1.2** _(모호)_: expected 1명, got 0명 일치; 불일치 E0=183.75%
- [base] **debuff accuracyDown 30% 3s**: expected ≥1명, got 없음
- [base] **caster retreat**: expected 가장 가까운 적과 거리 +2 이상, got 4→4
- [passive] **aura speed**: expected caster=10%, got caster=0%

### 이전냥 `r_ijeon` ★5 — 4건 실패 / 4

- [base] **damage 140% ×성장1.3** _(모호)_: expected 1명, got 0명 일치; 불일치 E0=220.5%
- [base] **debuff accuracyDown 30% 5s**: expected ≥1명, got 없음
- [base] **caster retreat**: expected 가장 가까운 적과 거리 +2 이상, got 4→4
- [passive] **aura speed**: expected caster=10%, got caster=0%

### 장량냥 `r_jangryang` ★0 — 2건 실패 / 3

- [base] **damage 70%**: expected 2명, got 0명 일치; 불일치 E0=80%
- [base] **dot targets**: expected 2, got 1

### 장량냥 `r_jangryang` ★3 — 4건 실패 / 4

- [base] **damage 70% ×성장1.2**: expected 2명, got 0명 일치; 불일치 E0=105%
- [base] **dot targets**: expected 2, got 1
- [base] **dot poison 25%/s × 4s (성장 1.2)**: expected 대상별 총 100%, got E0: 총 131.25% / 4틱 / 4.0667s (틱당 32.81%)
- [spread] **poison spread count**: expected ≥1, got 0

### 장량냥 `r_jangryang` ★5 — 5건 실패 / 5

- [base] **damage 70% ×성장1.3**: expected 2명, got 0명 일치; 불일치 E0=126%
- [base] **dot targets**: expected 2, got 1
- [base] **dot poison 25%/s × 4s (성장 1.3)**: expected 대상별 총 100%, got E0: 총 157.5% / 4틱 / 4.0667s (틱당 39.38%)
- [base] **debuff vulnerable 8% 4s**: expected 2명, got 없음
- [spread] **poison spread count**: expected ≥1, got 0

### 단아냥 `m5` ★0 — 1건 실패 / 2

- [base] **heal 22% [lowest-hp-ally]**: expected 1회, got 0회 일치 (0명); 측정 ally-1=26%

### 단아냥 `m5` ★3 — 1건 실패 / 2

- [base] **heal 26% [lowest-hp-ally]**: expected 1회, got 0회 일치 (0명); 측정 ally-1=34.5%

### 단아냥 `m5` ★5 — 1건 실패 / 2

- [base] **heal 26% [lowest-hp-ally]**: expected 1회, got 0회 일치 (0명); 측정 ally-1=39%

### 관평냥 `r_gwanpyeong` ★0 — 2건 실패 / 2

- [base] **damage 150% [line]**: expected 2명, got 0명 일치; 불일치 E0=110%, E1=110%
- [base] **debuff defenseDown 10% 3s [line]**: expected 2명, got 없음

### 관평냥 `r_gwanpyeong` ★3 — 3건 실패 / 3

- [base] **damage 150% ×성장1.2 [line]**: expected 2명, got 0명 일치; 불일치 E0=144.38%, E1=144.38%
- [base] **debuff defenseDown 10% 3s [line]**: expected 2명, got 없음
- [duo] **damage 150% ×성장1.2 ×1.1 [line]**: expected 2명, got 0명 일치; 불일치 E0=144.38%, E1=144.38%

### 관평냥 `r_gwanpyeong` ★5 — 3건 실패 / 3

- [base] **damage 150% ×성장1.3 [line]**: expected 3명, got 0명 일치; 불일치 E0=173.25%, E1=173.25%
- [base] **debuff defenseDown 10% 3s [line]**: expected 3명, got 없음
- [duo] **damage 150% ×성장1.3 ×1.1 [line]**: expected 3명, got 0명 일치; 불일치 E0=173.25%, E1=173.25%

### 고순냥 `r_gosun` ★0 — 2건 실패 / 2

- [base] **damage 130% [nearest]**: expected 1명, got 0명 일치; 불일치 E0=120%, E1=120%, E2=120%
- [base] **buff reduction/armor 20% 4s [self]**: expected 1명 (caster(r_gosun)), got 없음
- [base] ⚠ 스펙에 없는 상태: taunt@E0, taunt@E1, taunt@E2

### 고순냥 `r_gosun` ★3 — 3건 실패 / 4

- [base] **unexpected damage targets**: expected 없음, got E1=157.5%, E2=157.5%
- [base] **buff reduction/armor 20% 4s [self]**: expected 1명 (caster(r_gosun)), got 없음
- [base] ⚠ 스펙에 없는 상태: taunt@E0, taunt@E1, taunt@E2
- [duo] **aura reduction/armor**: expected caster=8%, got caster=0%

### 고순냥 `r_gosun` ★5 — 3건 실패 / 3

- [base] **damage 130% ×성장1.3 [nearest]**: expected 1명, got 0명 일치; 불일치 E0=189%, E1=189%, E2=189%
- [base] **buff reduction/armor 30% 4s [self]**: expected 1명 (caster(r_gosun)), got 없음
- [base] ⚠ 스펙에 없는 상태: taunt@E0, taunt@E1, taunt@E2
- [duo] **aura reduction/armor**: expected caster=8%, got caster=0%

### 한당냥 `r_handang` ★0 — 2건 실패 / 2

- [base] **damage total**: expected 220%, got 140% (1명)
- [base] **damage hits**: expected 4, got 2

### 한당냥 `r_handang` ★3 — 3건 실패 / 3

- [base] **damage total**: expected 220% ×성장1.2, got 183.75% (1명)
- [base] **damage hits**: expected 4, got 2
- [twice] **energy +5 [self]**: expected 1명, got 기력 회복 없음

### 한당냥 `r_handang` ★5 — 3건 실패 / 3

- [base] **damage total**: expected 330% ×성장1.3, got 220.5% (1명)
- [base] **damage hits**: expected 6, got 2
- [twice] **energy +5 [self]**: expected 1명, got 기력 회복 없음

### 장보냥 `r_jangbo` ★0 — 1건 실패 / 1

- [base] **damage 160% [all-in-radius]**: expected 5명, got 0명 일치; 불일치 E0=110%, E1=110%, E2=110%

### 장보냥 `r_jangbo` ★3 — 2건 실패 / 2

- [base] **damage 160% ×성장1.2 [all-in-radius]**: expected 5명, got 0명 일치; 불일치 E0=144.38%, E1=144.38%, E2=144.38%
- [base] **energy +5 [self]**: expected 1명, got 기력 회복 없음

### 장보냥 `r_jangbo` ★5 — 3건 실패 / 3

- [base] **damage 160% ×성장1.3 [all-in-radius]**: expected 5명, got 0명 일치; 불일치 E0=173.25%, E1=173.25%, E2=173.25%
- [base] **energy +5 [self]**: expected 1명, got 기력 회복 없음
- [radius] **area radius ×1.5**: expected ×1.5, got zone.radius 큐 없음

### 채모냥 `r_chaemo` ★3 — 2건 실패 / 3

- [base] **damage 150% ×성장1.2 [nearest]**: expected 1명, got 0명 일치; 불일치 E0=196.88%
- [base] **debuff vulnerable 8% 3s [nearest]**: expected 1명 (E0), got 없음

### 채모냥 `r_chaemo` ★5 — 3건 실패 / 3

- [base] **damage 150% ×성장1.3 [nearest]**: expected 1명, got 0명 일치; 불일치 E0=236.25%
- [base] **slow slow 35% 3s [nearest]**: expected 1명 (E0), got E0=20%/3s
- [base] **debuff vulnerable 8% 3s [nearest]**: expected 1명 (E0), got 없음

### 주창냥 `r_juchang` ★0 — 2건 실패 / 2

- [base] **damage 120% [all-in-radius]**: expected 5명, got 3명 일치
- [base] **taunt taunt 2s**: expected 5명, got E0=✓/2s, E1=✓/2s, E2=✓/2s

### 주창냥 `r_juchang` ★3 — 3건 실패 / 3

- [base] **damage 120% ×성장1.2 [all-in-radius]**: expected 5명, got 0명 일치; 불일치 E0=157.5%, E1=157.5%, E2=157.5%
- [base] **taunt taunt 2s**: expected 5명, got E0=✓/2s, E1=✓/2s, E2=✓/2s
- [base] **buff reduction 10% 2s [self]**: expected 1명 (caster(r_juchang)), got 없음

### 주창냥 `r_juchang` ★5 — 4건 실패 / 4

- [base] **damage 120% ×성장1.3 [all-in-radius]**: expected 5명, got 0명 일치; 불일치 E0=189%, E1=189%, E2=189%
- [base] **taunt taunt 2s**: expected 5명, got E0=✓/2s, E1=✓/2s, E2=✓/2s
- [base] **buff reduction 10% 2s [self]**: expected 1명 (caster(r_juchang)), got 없음
- [guardGwan] **redirect 15% gwan→caster**: expected caster 150.0, gwan 850.0, got caster 0, gwan 1000.0

### 왕랑냥 `r_wangrang` ★3 — 1건 실패 / 1

- [base] **debuff attackDown 12% 5s [highest-atk]**: expected 1명 (E3), got E3=12%/4s

### 왕랑냥 `r_wangrang` ★5 — 2건 실패 / 2

- [base] **debuff attackDown 12% 5s [highest-atk]**: expected 1명 (E3), got E3=12%/4s
- [base] **debuff vulnerable 8% 5s [highest-atk]**: expected 1명 (E3), got 없음

### 순우경냥 `r_sunugyeong` ★3 — 2건 실패 / 3

- [base] **shield 12% [self]**: expected 1명, got 0명 일치; 측정 caster(r_sunugyeong)=13.8%/4s
- [base] **buff reduction 8% [self]**: expected 1명 (caster(r_sunugyeong)), got 없음

### 순우경냥 `r_sunugyeong` ★5 — 2건 실패 / 4

- [base] **shield 8% [lowest-hp-ally]**: expected 1명, got 0명 일치; 측정 caster(r_sunugyeong)=15.6%/4s
- [base] **buff reduction 8% [self]**: expected 1명 (caster(r_sunugyeong)), got 없음

### 정보냥 `r_jeongbo` ★3 — 3건 실패 / 3

- [base] **shield 10% [self]**: expected 1명, got 0명 일치; 측정 caster(r_jeongbo)=11.5%/4s, ally-1=9.2%/4s
- [base] **shield 8% [lowest-hp-ally]**: expected 1명, got 0명 일치; 측정 caster(r_jeongbo)=11.5%/4s, ally-1=9.2%/4s
- [base] **energy +3 [self]**: expected 1명, got 기력 회복 없음

### 정보냥 `r_jeongbo` ★5 — 3건 실패 / 7

- [base] **energy +3 [self]**: expected 1명, got 기력 회복 없음
- [faction] **shield duration caster(r_jeongbo)**: expected 5s, got 4s
- [faction] **shield duration ally-1**: expected 5s, got 4s

### 호표기냥 `n_hopyo` ★0 — 1건 실패 / 1

- [base] **damage 140% [line]**: expected 5명, got 0명 일치; 불일치 E0=150%

### 호표기냥 `n_hopyo` ★3 — 2건 실패 / 2

- [base] **damage 140% ×성장1.2 [line]**: expected 5명, got 0명 일치; 불일치 E0=196.88%
- [kill] **energy +5 [self]**: expected 1명, got 기력 회복 없음

### 호표기냥 `n_hopyo` ★5 — 3건 실패 / 3

- [base] **damage 140% ×성장1.3 [line]**: expected 5명, got 0명 일치; 불일치 E0=236.25%
- [base] **slow slow 30% 1s**: expected 5명, got 없음
- [kill] **energy +5 [self]**: expected 1명, got 기력 회복 없음

### 강동 해적냥 `n_pirate` ★0 — 2건 실패 / 2

- [base] **damage 140% [nearest]**: expected 1명, got 0명 일치; 불일치 E0=150%
- [vsShield] **damage vs shield 280% [nearest]**: expected 280%, got 2150%

### 강동 해적냥 `n_pirate` ★3 — 3건 실패 / 3

- [base] **damage 140% ×성장1.2 [nearest]**: expected 1명, got 0명 일치; 불일치 E0=196.88%
- [vsShield] **damage vs shield 280% [nearest]**: expected 336%, got 2196.88%
- [break] **energy +5 [self]**: expected 1명, got 기력 회복 없음

### 강동 해적냥 `n_pirate` ★5 — 4건 실패 / 4

- [base] **damage 140% ×성장1.3 [nearest]**: expected 1명, got 0명 일치; 불일치 E0=236.25%
- [vsShield] **damage vs shield 280% [nearest]**: expected 364%, got 2236.25%
- [break] **shield 30 [self]**: expected 1명, got 0명 일치; 측정 보호막 없음
- [break] **energy +5 [self]**: expected 1명, got 기력 회복 없음

### 서량 기병냥 `n_cavalry` ★0 — 1건 실패 / 2

- [base] **damage 140% [nearest]**: expected 1명, got 0명 일치; 불일치 E0=150%

### 서량 기병냥 `n_cavalry` ★3 — 2건 실패 / 3

- [base] **damage 140% ×성장1.2 [nearest]**: expected 1명, got 0명 일치; 불일치 E0=196.88%
- [passive] **aura speed**: expected caster=8%, got caster=0%

### 서량 기병냥 `n_cavalry` ★5 — 3건 실패 / 4

- [base] **damage 140% ×성장1.3 [nearest]**: expected 1명, got 0명 일치; 불일치 E0=236.25%
- [base] **slow slow 30% 1s [nearest]**: expected 1명 (E0), got 없음
- [passive] **aura speed**: expected caster=8%, got caster=0%

### 독사냥 `n_snake` ★0 — 3건 실패 / 4

- [base] **damage 60% [nearest]**: expected 1명, got 0명 일치; 불일치 E0=80%
- [base] **dot poison 20%/s × 4s**: expected 대상별 총 80%, got E0: 총 100% / 4틱 / 4.0667s (틱당 25%)
- [base] **debuff healDown 50% [nearest]**: expected 1명 (E0), got 없음

### 독사냥 `n_snake` ★3 — 3건 실패 / 4

- [base] **damage 60% ×성장1.2 [nearest]**: expected 1명, got 0명 일치; 불일치 E0=105%
- [base] **dot poison 20%/s × 4s (성장 1.2)**: expected 대상별 총 80%, got E0: 총 131.25% / 4틱 / 4.0667s (틱당 32.81%)
- [base] **debuff healDown 50% [nearest]**: expected 1명 (E0), got 없음

### 독사냥 `n_snake` ★5 — 3건 실패 / 4

- [base] **damage 60% ×성장1.3 [nearest]**: expected 1명, got 0명 일치; 불일치 E0=126%
- [base] **dot poison 20%/s × 6s (성장 1.3)**: expected 대상별 총 120%, got E0: 총 157.5% / 4틱 / 4.0667s (틱당 39.38%)
- [base] **debuff healDown 50% [nearest]**: expected 1명 (E0), got 없음

### 형주 수군 궁수냥 `n_hyeongju` ★0 — 4건 실패 / 4

- [base] **damage 80% [nearest]**: expected 1명, got 0명 일치; 불일치 E0=140%
- [base] **dot targets**: expected 1, got 0
- [base] **dot burn 20%/s × 3s**: expected 대상별 총 60%, got 틱 없음
- [vsShield] **dot ignores shield**: expected 보호막이 있어도 체력 피해, got 틱 없음

### 형주 수군 궁수냥 `n_hyeongju` ★3 — 4건 실패 / 4

- [base] **damage 80% ×성장1.2 [nearest]**: expected 1명, got 0명 일치; 불일치 E0=183.75%
- [base] **dot targets**: expected 1, got 0
- [base] **dot burn 20%/s × 3s (성장 1.2)**: expected 대상별 총 60%, got 틱 없음
- [vsShield] **dot ignores shield**: expected 보호막이 있어도 체력 피해, got 틱 없음

### 형주 수군 궁수냥 `n_hyeongju` ★5 — 4건 실패 / 4

- [base] **damage 80% ×성장1.3 [nearest]**: expected 1명, got 0명 일치; 불일치 E0=220.5%
- [base] **dot targets**: expected 1, got 0
- [base] **dot burn 20%/s × 5s (성장 1.3)**: expected 대상별 총 100%, got 틱 없음
- [vsShield] **dot ignores shield**: expected 보호막이 있어도 체력 피해, got 틱 없음

### 황건 역사냥 `n_giant` ★0 — 1건 실패 / 1

- [base] **damage 110% [nearest]**: expected 3명, got 0명 일치; 불일치 E0=120%, E1=120%, E2=120%

### 황건 역사냥 `n_giant` ★3 — 1건 실패 / 1

- [base] **damage 110% ×성장1.2 [nearest]**: expected 3명, got 0명 일치; 불일치 E0=157.5%, E1=157.5%, E2=157.5%

### 황건 역사냥 `n_giant` ★5 — 1건 실패 / 1

- [base] **damage 110% ×성장1.3 [nearest]**: expected 4명, got 0명 일치; 불일치 E0=189%, E1=189%, E2=189%

### 곰냥 `n_bear` ★3 — 2건 실패 / 3

- [base] **damage 120% ×성장1.2 [nearest]**: expected 3명, got 0명 일치; 불일치 E0=157.5%, E1=157.5%, E2=157.5%
- [lowhp] **aura reduction/armor**: expected caster=10%, got caster=0%

### 곰냥 `n_bear` ★5 — 4건 실패 / 4

- [base] **damage 120% ×성장1.3 [nearest]**: expected 3명, got 0명 일치; 불일치 E0=189%, E1=189%, E2=189%
- [base] **shield 10% [self]**: expected 1명, got 0명 일치; 측정 보호막 없음
- [base] **taunt taunt 3s [nearest]**: expected 3명 (E0,E1,E2), got E0=✓/2s, E1=✓/2s, E2=✓/2s
- [lowhp] **aura reduction/armor**: expected caster=10%, got caster=0%

### 늑대냥 `n_wolf` ★0 — 2건 실패 / 2

- [base] **unexpected skill damage**: expected 없음, got E0=140%
- [base] **summon ×2 6s 공격 35%**: expected 2기, got 소환 없음

### 늑대냥 `n_wolf` ★3 — 3건 실패 / 3

- [base] **unexpected skill damage**: expected 없음, got E0=183.75%
- [base] **summon ×2 6s 공격 35%**: expected 2기, got 소환 없음
- [passive] **aura speed**: expected caster=10%, got caster=0%

### 늑대냥 `n_wolf` ★5 — 3건 실패 / 3

- [base] **unexpected skill damage**: expected 없음, got E0=220.5%
- [base] **summon ×3 6s 공격 35%**: expected 3기, got 소환 없음
- [passive] **aura speed**: expected caster=10%, got caster=0%

### 위 방패 대장냥 `n_guard` ★0 — 2건 실패 / 2

- [base] **damage 120% [all-in-radius]**: expected 5명, got 3명 일치
- [base] **taunt taunt 2s**: expected 5명, got E0=✓/2s, E1=✓/2s, E2=✓/2s

### 위 방패 대장냥 `n_guard` ★3 — 3건 실패 / 3

- [base] **damage 120% ×성장1.2 [all-in-radius]**: expected 5명, got 0명 일치; 불일치 E0=157.5%, E1=157.5%, E2=157.5%
- [base] **taunt taunt 2s**: expected 5명, got E0=✓/2s, E1=✓/2s, E2=✓/2s
- [base] **buff reduction 8% 2s [self]**: expected 1명 (caster(n_guard)), got 없음

### 위 방패 대장냥 `n_guard` ★5 — 4건 실패 / 4

- [base] **damage 120% ×성장1.3 [all-in-radius]**: expected 5명, got 0명 일치; 불일치 E0=189%, E1=189%, E2=189%
- [base] **taunt taunt 2s**: expected 5명, got E0=✓/2s, E1=✓/2s, E2=✓/2s
- [base] **buff reduction 8% 2s [self]**: expected 1명 (caster(n_guard)), got 없음
- [base] **buff reduction 5% 2s [nearby-allies]**: expected ≥1명, got 없음

### 멧돼지냥 `n_boar` ★0 — 2건 실패 / 4

- [base] **damage 120% [nearest]**: expected 1명, got 0명 일치; 불일치 E0=130%
- [boss] **boss telegraph +1s**: expected +1s, got +0s

### 멧돼지냥 `n_boar` ★3 — 2건 실패 / 4

- [base] **damage 138% ×성장1.2 [nearest]**: expected 1명, got 0명 일치; 불일치 E0=170.63%
- [boss] **boss telegraph +1s**: expected +1s, got +0s

### 멧돼지냥 `n_boar` ★5 — 3건 실패 / 4

- [base] **damage 138% ×성장1.3 [nearest]**: expected 1명, got 0명 일치; 불일치 E0=204.75%
- [base] **stun stun 1s [nearest]**: expected 1명 (E0), got E0=✓/0.4s
- [boss] **boss telegraph +1.5s**: expected +1.5s, got +0s

### 산월 주술사냥 `n_shaman` ★0 — 1건 실패 / 2

- [boss] **debuff attackDown 20% 4s**: expected 1명, got E0=12%/4s

### 산월 주술사냥 `n_shaman` ★3 — 2건 실패 / 2

- [base] **debuff attackDown 12% 5s [nearest]**: expected 1명 (E0), got E0=12%/4s
- [boss] **debuff attackDown 20% 5s**: expected 1명, got E0=12%/4s

### 산월 주술사냥 `n_shaman` ★5 — 2건 실패 / 2

- [base] **debuff attackDown 12% 5s [nearest]**: expected 2명 (E0,E1), got E0=12%/4s
- [boss] **debuff attackDown 20% 5s**: expected 1명, got E0=12%/4s

### 남만 등갑병냥 `n_deunggap` ★0 — 1건 실패 / 2

- [poisonGuard] **dot taken ×0.4**: expected ×0.4, got 틱 없음

### 남만 등갑병냥 `n_deunggap` ★3 — 1건 실패 / 2

- [poisonGuard] **dot taken ×0.4**: expected ×0.4, got 틱 없음

### 남만 등갑병냥 `n_deunggap` ★5 — 3건 실패 / 3

- [base] **buff reduction 20% 6s [self]**: expected 1명 (caster(n_deunggap)), got caster(n_deunggap)=20%/4s
- [poisonGuard] **dot taken ×0.4**: expected ×0.4, got 틱 없음
- [allyPoison] **dot taken ×0.7** _(모호)_: expected ×0.7, got ×1,×1

### 청주병냥 `c_cheongju` ★0 — 2건 실패 / 2

- [base] **damage 120% [nearest]**: expected 1명, got 0명 일치; 불일치 E0=150%
- [kill] **energy +15 [self]**: expected 1명, got 기력 회복 없음

### 청주병냥 `c_cheongju` ★3 — 2건 실패 / 2

- [base] **damage 120% ×성장1.2 [nearest]**: expected 1명, got 0명 일치; 불일치 E0=196.88%
- [kill] **energy +15 [self]**: expected 1명, got 기력 회복 없음

### 청주병냥 `c_cheongju` ★5 — 2건 실패 / 2

- [base] **damage 138% ×성장1.3 [nearest]**: expected 1명, got 0명 일치; 불일치 E0=236.25%
- [kill] **energy +15 [self]**: expected 1명, got 기력 회복 없음

### 백이병냥 `c_baeki` ★0 — 2건 실패 / 2

- [base] **damage 120% [nearest]**: expected 1명, got 0명 일치; 불일치 E0=150%
- [finisher] **damage 144% [nearest]**: expected 1명, got 0명 일치; 불일치 E0=180%

### 백이병냥 `c_baeki` ★3 — 3건 실패 / 3

- [base] **damage 120% ×성장1.2 [nearest]**: expected 1명, got 0명 일치; 불일치 E0=196.88%
- [finisher] **damage 144% ×성장1.2 [nearest]**: expected 1명, got 0명 일치; 불일치 E0=236.25%
- [kill] **buff speed 10% 3s [self]**: expected 1명 (caster(c_baeki)), got 없음

### 백이병냥 `c_baeki` ★5 — 3건 실패 / 3

- [base] **damage 120% ×성장1.3 [nearest]**: expected 1명, got 0명 일치; 불일치 E0=236.25%
- [finisher] **damage 192% ×성장1.3 [nearest]**: expected 1명, got 0명 일치; 불일치 E0=283.5%
- [kill] **buff speed 10% 3s [self]**: expected 1명 (caster(c_baeki)), got 없음

### 황건 궁수냥 `c_hwanggeon` ★0 — 1건 실패 / 1

- [base] **damage 120% [nearest]**: expected 1명, got 0명 일치; 불일치 E0=150%

### 황건 궁수냥 `c_hwanggeon` ★3 — 1건 실패 / 1

- [base] **damage 120% ×성장1.2 [nearest]**: expected 1명, got 0명 일치; 불일치 E0=196.88%

### 황건 궁수냥 `c_hwanggeon` ★5 — 2건 실패 / 2

- [base] **damage 120% ×성장1.3 [nearest]**: expected 1명, got 0명 일치; 불일치 E0=236.25%
- [base] **slow slow 20% 2s [nearest]**: expected 1명 (E0), got 없음

### 흑산적냥 `c_heuksan` ★0 — 1건 실패 / 1

- [base] **damage 120% [farthest]**: expected 1명, got 0명 일치; 불일치 E0=140%

### 흑산적냥 `c_heuksan` ★3 — 2건 실패 / 2

- [base] **damage 120% ×성장1.2 [farthest]**: expected 1명, got 0명 일치; 불일치 E0=183.75%
- [allyDown] **buff attack 10% 5s [self]**: expected 1명 (caster(c_heuksan)), got 없음

### 흑산적냥 `c_heuksan` ★5 — 3건 실패 / 3

- [base] **damage 120% ×성장1.3 [farthest]**: expected 1명, got 0명 일치; 불일치 E0=220.5%
- [base] **damage 120% ×성장1.3 [behind-target]**: expected 1명, got 0명 일치; 불일치 E0=220.5%
- [allyDown] **buff attack 10% 5s [self]**: expected 1명 (caster(c_heuksan)), got 없음

### 위 궁노병냥 `c_wi_archer` ★0 — 1건 실패 / 1

- [base] **damage 100% [line]**: expected 5명, got 0명 일치; 불일치 E0=140%

### 위 궁노병냥 `c_wi_archer` ★3 — 1건 실패 / 1

- [base] **damage 100% ×성장1.2 [line]**: expected 5명, got 0명 일치; 불일치 E0=183.75%

### 위 궁노병냥 `c_wi_archer` ★5 — 1건 실패 / 1

- [base] **damage 120% ×성장1.3 [line]**: expected 5명, got 0명 일치; 불일치 E0=220.5%

### 수군 궁수냥 `c_sugun` ★0 — 1건 실패 / 1

- [base] **damage 70%**: expected 2명, got 0명 일치; 불일치 E0=140%

### 수군 궁수냥 `c_sugun` ★3 — 1건 실패 / 1

- [base] **damage 70% ×성장1.2**: expected 2명, got 0명 일치; 불일치 E0=183.75%

### 수군 궁수냥 `c_sugun` ★5 — 1건 실패 / 1

- [base] **damage 70% ×성장1.3**: expected 3명, got 0명 일치; 불일치 E0=220.5%

### 단양병냥 `c_danyang` ★0 — 1건 실패 / 1

- [base] **damage 100% [nearest]**: expected 2명, got 0명 일치; 불일치 E0=115%, E1=115%

### 단양병냥 `c_danyang` ★3 — 1건 실패 / 1

- [base] **damage 100% ×성장1.2 [nearest]**: expected 2명, got 0명 일치; 불일치 E0=150.94%, E1=150.94%

### 단양병냥 `c_danyang` ★5 — 1건 실패 / 1

- [base] **damage 100% ×성장1.3 [nearest]**: expected 3명, got 0명 일치; 불일치 E0=181.13%, E1=181.13%

### 산월 전사냥 `c_sanwol` ★0 — 2건 실패 / 2

- [base] **damage 143% [nearest]**: expected 1명, got 0명 일치; 불일치 E0=120%
- [base] ⚠ 스펙에 없는 상태: speed@c_sanwol
- [wounded] **damage 110% [nearest]**: expected 1명, got 0명 일치; 불일치 E0=120%

### 산월 전사냥 `c_sanwol` ★3 — 3건 실패 / 3

- [base] **damage 143% ×성장1.2 [nearest]**: expected 1명, got 0명 일치; 불일치 E0=157.5%
- [base] ⚠ 스펙에 없는 상태: speed@c_sanwol
- [wounded] **damage 110% ×성장1.2 [nearest]**: expected 1명, got 0명 일치; 불일치 E0=157.5%
- [passive] **aura speed**: expected caster=8%, got caster=15%

### 산월 전사냥 `c_sanwol` ★5 — 2건 실패 / 4

- [wounded] **damage 110% ×성장1.3 [nearest]**: expected 1명, got 0명 일치; 불일치 E0=189%
- [passive] **aura speed**: expected caster=8%, got caster=15%

### 무당비군냥 `c_mudang` ★0 — 2건 실패 / 3

- [base] **damage 100% [line]**: expected 5명, got 0명 일치; 불일치 E0=140%
- [base] **stun stun 0.5s [line]**: expected 5명, got 없음

### 무당비군냥 `c_mudang` ★3 — 3건 실패 / 4

- [base] **damage 100% ×성장1.2 [line]**: expected 5명, got 0명 일치; 불일치 E0=183.75%
- [base] **stun stun 0.5s [line]**: expected 5명, got 없음
- [passive] **aura speed**: expected caster=8%, got caster=0%

### 무당비군냥 `c_mudang` ★5 — 3건 실패 / 4

- [base] **damage 100% ×성장1.3 [line]**: expected 5명, got 0명 일치; 불일치 E0=220.5%
- [base] **stun stun 1s [line]**: expected 5명, got 없음
- [passive] **aura speed**: expected caster=8%, got caster=0%

### 허창 수비병냥 `c_heochang` ★0 — 1건 실패 / 1

- [base] **shield 12% [self]**: expected 1명, got 0명 일치; 측정 caster(c_heochang)=20%/4s

### 허창 수비병냥 `c_heochang` ★3 — 2건 실패 / 2

- [base] **shield 12% [self]**: expected 1명, got 0명 일치; 측정 caster(c_heochang)=23%/4s
- [passive] **aura reduction/armor**: expected caster=8%, got caster=0%

### 허창 수비병냥 `c_heochang` ★5 — 2건 실패 / 2

- [base] **shield 15% [self]**: expected 1명, got 0명 일치; 측정 caster(c_heochang)=26%/4s
- [passive] **aura reduction/armor**: expected caster=8%, got caster=0%

### 서량 보병냥 `c_seoryang` ★0 — 2건 실패 / 2

- [base] **shield 12% [self]**: expected 1명, got 0명 일치; 측정 caster(c_seoryang)=15%/4s
- [base] **displace 밀쳐냄**: expected 1명, got E0 4→4

### 서량 보병냥 `c_seoryang` ★3 — 2건 실패 / 2

- [base] **shield 12% [self]**: expected 1명, got 0명 일치; 측정 caster(c_seoryang)=17.25%/4s
- [base] **displace 밀쳐냄**: expected 1명, got E0 4→4

### 서량 보병냥 `c_seoryang` ★5 — 3건 실패 / 4

- [base] **shield 12% [self]**: expected 1명, got 0명 일치; 측정 caster(c_seoryang)=19.5%/4s
- [base] **stun stun 0.5s [nearest]**: expected 1명 (E0), got 없음
- [base] **displace 밀쳐냄**: expected 1명, got E0 4→4

### 익주 둔전병냥 `c_ikju` ★0 — 1건 실패 / 1

- [base] **shield 12% [self]**: expected 1명, got 0명 일치; 측정 caster(c_ikju)=15%/4s

### 익주 둔전병냥 `c_ikju` ★3 — 2건 실패 / 2

- [base] **shield 12% [self]**: expected 1명, got 0명 일치; 측정 caster(c_ikju)=17.25%/4s
- [wounded] **heal 6% [self]**: expected 1회, got 0회 일치 (0명); 측정 회복 없음

### 익주 둔전병냥 `c_ikju` ★5 — 1건 실패 / 2

- [wounded] **heal 6% [self]**: expected 1회, got 0회 일치 (0명); 측정 회복 없음

## E1 스킬 치명타

- yeo E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- gwan E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- hwangchung E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- juyu E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- joun E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- jang E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- sama E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- janggak E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- macho E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- taesaja E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- sonchaek E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- jeonwi E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- jangryo E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- gamnyeong E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- yuksun E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- heo E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- son E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- sr_anryang E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- sr_gongsonchan E1: 직접 피해 없음
- hwang E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- sr_chukyung E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- m3 E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- r_hahueun E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- r_ijeon E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- r_jangryang E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- r_gwanpyeong E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- r_gosun E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- r_handang E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- r_jangbo E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- r_chaemo E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- r_juchang E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- n_hopyo E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- n_pirate E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- n_cavalry E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- n_snake E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- n_hyeongju E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- n_giant E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- n_bear E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- n_guard E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- n_boar E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- c_cheongju E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- c_baeki E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- c_hwanggeon E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- c_heuksan E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- c_wi_archer E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- c_sugun E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- c_danyang E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- c_sanwol E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1
- c_mudang E1: expected 스킬 직접 피해 ×2 (치명타 100%/피해 200%), got ×1

## 설명문 숫자 검사 (표시 텍스트 vs v9)

표시 텍스트: `V3_CHARACTER_BY_ID[id].active / passive / star5` (v3Characters.ts가 approvedCharacterBalance·releaseRuntimeCharacterText를 병합한 결과).

- yeo ★0 설명문: expected 숫자 [480, 4, 40], got [105, 30, 4, 35, 15, 4] (누락 480,40) (불필요 105,30,35,15)
- yeo ★3 설명문: expected 숫자 [20, 3], got [2, 15, 1] (누락 20,3) (불필요 2,15,1)
- yeo ★5 설명문: expected 숫자 [5, 20, 40], got [5, 320, 30, 5, 25] (누락 20,40) (불필요 320,30,25)
- gwan ★0 설명문: expected 숫자 [3, 600], got [3, 160, 480, 20, 5] (누락 600) (불필요 160,480,20,5)
- gwan ★3 설명문: expected 숫자 [5, 20], got [] (누락 5,20)
- gwan ★5 설명문: expected 숫자 [30, 2], got [25] (누락 30,2) (불필요 25)
- je ★0 설명문: expected 숫자 [2, 60, 6, 20, 15], got [2, 60, 6, 25, 20] (누락 15) (불필요 25)
- hwangchung ★0 설명문: expected 숫자 [2, 500, 50], got [3, 29, 0.5, 68, 30] (누락 2,500,50) (불필요 3,29,0.5,68,30)
- hwangchung ★3 설명문: expected 숫자 [50], got [1, 30] (누락 50) (불필요 1,30)
- hwangchung ★5 설명문: expected 숫자 [30], got [20] (누락 30) (불필요 20)
- juyu ★0 설명문: expected 숫자 [200, 4, 50], got [4, 70, 27.5, 4] (누락 200,50) (불필요 70,27.5)
- juyu ★3 설명문: expected 숫자 [50], got [3, 10, 1] (누락 50) (불필요 3,10,1)
- juyu ★5 설명문: expected 숫자 [25], got [20] (누락 25) (불필요 20)
- hahudon ★0 설명문: expected 숫자 [8, 50, 50], got [3, 160, 15, 4] (누락 8,50,50) (불필요 3,160,15,4)
- hahudon ★3 설명문: expected 숫자 [60], got [90, 60, 30, 20, 40, 60, 30, 3, 30] (불필요 90,30,20,40,30,3,30)
- hahudon ★5 설명문: expected 숫자 [10, 5, 30, 1], got [100, 10, 25] (누락 5,30,1) (불필요 100,25)
- joun ★0 설명문: expected 숫자 [3, 3, 1, 140, 1], got [3, 120, 3, 15] (누락 1,140,1) (불필요 120,15)
- jang ★0 설명문: expected 숫자 [160, 3, 4, 25], got [160, 1.5, 25, 5] (누락 3,4) (불필요 1.5,5)
- jang ★3 설명문: expected 숫자 [15], got [] (누락 15)
- jang ★5 설명문: expected 숫자 [10, 1, 80, 10], got [] (누락 10,1,80,10)
- jo ★5 설명문: expected 숫자 [4, 8, 12, 1, 2, 3, 3, 10], got [3, 4, 12] (누락 8,1,2,10)
- hwata ★0 설명문: expected 숫자 [3, 1, 25], got [12, 3] (누락 1,25) (불필요 12)
- hwata ★5 설명문: expected 숫자 [5, 5, 10], got [5, 5] (누락 10)
- sama ★0 설명문: expected 숫자 [320, 80], got [150, 25, 30] (누락 320,80) (불필요 150,25,30)
- sama ★3 설명문: expected 숫자 [30], got [3, 1, 10, 3] (누락 30) (불필요 3,1,10,3)
- sama ★5 설명문: expected 숫자 [5, 10], got [80, 25, 4] (누락 5,10) (불필요 80,25,4)
- janggak ★0 설명문: expected 숫자 [240, 4, 150], got [168, 4, 82, 3, 3, 1, 15, 5, 5, 20] (누락 240,150) (불필요 168,82,3,3,1,15,5,5,20)
- janggak ★3 설명문: expected 숫자 [1, 15, 2], got [3, 3, 1, 15, 1] (누락 2) (불필요 3,3)
- dong ★0 설명문: expected 숫자 [35, 5, 3], got [35, 5, 3, 1, 20, 3, 2, 40, 3, 5, 4, 15, 4] (불필요 1,20,2,40,4,15,4)
- dong ★3 설명문: expected 숫자 [5], got [10] (누락 5) (불필요 10)
- dong ★5 설명문: expected 숫자 [10, 5, 10], got [2, 100] (누락 10,5,10) (불필요 2,100)
- daegyo ★0 설명문: expected 숫자 [12, 5, 3, 3, 50], got [14, 5, 4, 3] (누락 12,50) (불필요 14,4)
- daegyo ★3 설명문: expected 숫자 [5], got [5, 1, 4] (불필요 1,4)
- macho ★0 설명문: expected 숫자 [300], got [180, 20, 5] (누락 300) (불필요 180,20,5)
- macho ★3 설명문: expected 숫자 [5, 20], got [2, 30] (누락 5,20) (불필요 2,30)
- macho ★5 설명문: expected 숫자 [3, 20, 30], got [] (누락 3,20,30)
- taesaja ★0 설명문: expected 숫자 [2, 300, 2, 30], got [2, 180, 3, 20, 30, 15, 5] (누락 300) (불필요 180,3,20,15,5)
- taesaja ★3 설명문: expected 숫자 [2, 5, 15], got [3, 3, 30, 20] (누락 2,5,15) (불필요 3,3,30,20)
- taesaja ★5 설명문: expected 숫자 [3, 30, 2, 20], got [2, 50] (누락 3,30,20) (불필요 50)
- sonchaek ★0 설명문: expected 숫자 [180, 6, 20, 5], got [180, 6, 12, 20, 5] (불필요 12)
- sonchaek ★3 설명문: expected 숫자 [15], got [5, 4, 4, 10, 4] (누락 15) (불필요 5,4,4,10,4)
- sonchaek ★5 설명문: expected 숫자 [10], got [15, 2] (누락 10) (불필요 15,2)
- gyeonhui ★0 설명문: expected 숫자 [3, 40, 30, 4], got [4, 80] (누락 3,40,30) (불필요 80)
- gyeonhui ★3 설명문: expected 숫자 [100], got [150, 1] (누락 100) (불필요 150,1)
- hahuyeon ★0 설명문: expected 숫자 [3, 80], got [3, 95, 20, 4] (누락 80) (불필요 95,20,4)
- hahuyeon ★3 설명문: expected 숫자 [20], got [3, 2, 1, 4] (누락 20) (불필요 3,2,1,4)
- hahuyeon ★5 설명문: expected 숫자 [2], got [120, 10, 4] (누락 2) (불필요 120,10,4)
- yu ★0 설명문: expected 숫자 [15, 4, 20], got [20, 20, 4] (누락 15)
- yu ★5 설명문: expected 숫자 [4, 8, 12, 1, 2, 3, 3, 10], got [2, 3, 4] (누락 8,12,1,10)
- songwon ★3 설명문: expected 숫자 [3], got [3, 1] (불필요 1)
- songwon ★5 설명문: expected 숫자 [4, 8, 12, 7, 14, 20, 1, 2, 3, 3, 10], got [3, 5, 4] (누락 8,12,7,14,20,1,2,10) (불필요 5)
- jeonwi ★0 설명문: expected 숫자 [150, 3, 4, 35], got [150, 3, 30, 4] (누락 35) (불필요 30)
- jeonwi ★3 설명문: expected 숫자 [2], got [2, 0.5, 4] (불필요 0.5,4)
- jeonwi ★5 설명문: expected 숫자 [20, 1, 300], got [20, 100] (누락 1,300) (불필요 100)
- jangryo ★0 설명문: expected 숫자 [280], got [8, 150] (누락 280) (불필요 8,150)
- jangryo ★3 설명문: expected 숫자 [20], got [8, 4] (누락 20) (불필요 8,4)
- jangryo ★5 설명문: expected 숫자 [180], got [] (누락 180)
- gamnyeong ★0 설명문: expected 숫자 [260, 2, 35, 15], got [250, 35, 35, 15, 8, 4] (누락 260,2) (불필요 250,8,4)
- gamnyeong ★5 설명문: expected 숫자 [40, 1, 8], got [40] (누락 1,8)
- yuksun ★0 설명문: expected 숫자 [100, 30, 3], got [75, 30, 3, 165, 2, 3, 1] (누락 100) (불필요 75,165,2,1)
- yuksun ★3 설명문: expected 숫자 [4], got [3, 1] (누락 4) (불필요 3,1)
- gwakga ★0 설명문: expected 숫자 [4, 20, 12], got [22, 12, 4] (누락 20) (불필요 22)
- gwakga ★3 설명문: expected 숫자 [2], got [1] (누락 2) (불필요 1)
- gwakga ★5 설명문: expected 숫자 [20], got [] (누락 20)
- sunuk ★0 설명문: expected 숫자 [], got [5, 6, 30] (불필요 5,6,30)
- sunuk ★5 설명문: expected 숫자 [5, 20], got [10, 5] (누락 20) (불필요 10)
- heo ★0 설명문: expected 숫자 [160, 15, 4], got [160] (누락 15,4)
- heo ★3 설명문: expected 숫자 [20, 60], got [20, 60, 1] (불필요 1)
- heo ★5 설명문: expected 숫자 [1, 15, 25], got [1, 22, 4] (누락 15,25) (불필요 22,4)
- son ★0 설명문: expected 숫자 [240], got [3, 180] (누락 240) (불필요 3,180)
- son ★3 설명문: expected 숫자 [1, 5], got [3, 12] (누락 1,5) (불필요 3,12)
- son ★5 설명문: expected 숫자 [20], got [] (누락 20)
- sr_anryang ★0 설명문: expected 숫자 [220, 3, 15, 2], got [170, 3, 15] (누락 220,2) (불필요 170)
- sr_anryang ★3 설명문: expected 숫자 [10], got [5] (누락 10) (불필요 5)
- sr_anryang ★5 설명문: expected 숫자 [25, 6], got [] (누락 25,6)
- sr_ugil ★0 설명문: expected 숫자 [2, 4, 30], got [80, 25, 4] (누락 2,30) (불필요 80,25)
- sr_ugil ★3 설명문: expected 숫자 [], got [5] (불필요 5)
- sr_ugil ★5 설명문: expected 숫자 [3], got [] (누락 3)
- sr_wonsul ★3 설명문: expected 숫자 [30], got [5] (누락 30) (불필요 5)
- sr_wonsul ★5 설명문: expected 숫자 [30], got [] (누락 30)
- nosuk ★0 설명문: expected 숫자 [10, 4, 8], got [14, 4, 8] (누락 10) (불필요 14)
- nosuk ★3 설명문: expected 숫자 [1], got [2, 1] (불필요 2)
- nosuk ★5 설명문: expected 숫자 [12], got [] (누락 12)
- sr_gongsonchan ★0 설명문: expected 숫자 [150, 6, 1, 1, 1, 30], got [6, 40] (누락 150,1,1,1,30) (불필요 40)
- sr_gongsonchan ★3 설명문: expected 숫자 [10], got [5] (누락 10) (불필요 5)
- sr_gongsonchan ★5 설명문: expected 숫자 [2, 2], got [] (누락 2,2)
- hwaung ★0 설명문: expected 숫자 [20, 4, 3], got [180, 20, 10, 4, 1, 10, 4, 2, 14, 3, 10, 4, 30] (불필요 180,10,1,10,2,14,10,30)
- hwaung ★3 설명문: expected 숫자 [20, 4], got [12, 4] (누락 20) (불필요 12)
- hwaung ★5 설명문: expected 숫자 [20, 4], got [] (누락 20,4)
- hwang ★0 설명문: expected 숫자 [160, 20, 3], got [3, 1.5, 90, 15, 3, 1, 135, 150] (누락 160,20) (불필요 1.5,90,15,1,135,150)
- hwang ★3 설명문: expected 숫자 [1], got [8, 1] (불필요 8)
- hwang ★5 설명문: expected 숫자 [100], got [] (누락 100)
- sogyo ★0 설명문: expected 숫자 [15, 4, 6], got [18, 4, 8] (누락 15,6) (불필요 18,8)
- sogyo ★3 설명문: expected 숫자 [2], got [4, 10] (누락 2) (불필요 4,10)
- sogyo ★5 설명문: expected 숫자 [20], got [] (누락 20)
- sr_chukyung ★0 설명문: expected 숫자 [3, 90, 2, 30], got [70, 2] (누락 3,90,30) (불필요 70)
- sr_chukyung ★3 설명문: expected 숫자 [10], got [5] (누락 10) (불필요 5)
- sr_chukyung ★5 설명문: expected 숫자 [5], got [] (누락 5)
- sr_munchu ★0 설명문: expected 숫자 [3, 70, 210], got [3, 120] (누락 70,210) (불필요 120)
- sr_munchu ★3 설명문: expected 숫자 [10], got [5] (누락 10) (불필요 5)
- sr_munchu ★5 설명문: expected 숫자 [5, 20], got [] (누락 5,20)
- wonso ★0 설명문: expected 숫자 [3, 15, 5], got [3, 18, 5] (누락 15) (불필요 18)
- wonso ★3 설명문: expected 숫자 [20], got [20, 18, 21.6] (불필요 18,21.6)
- wonso ★5 설명문: expected 숫자 [3, 8], got [5, 3] (누락 8) (불필요 5)
- sr_maenghoek ★0 설명문: expected 숫자 [20, 5, 3], got [120, 2, 10] (누락 20,5,3) (불필요 120,2,10)
- sr_maenghoek ★3 설명문: expected 숫자 [15], got [5] (누락 15) (불필요 5)
- sr_maenghoek ★5 설명문: expected 숫자 [10, 50, 1], got [] (누락 10,50,1)
- sr_yupyo ★0 설명문: expected 숫자 [2, 10, 4], got [2, 12, 4] (누락 10) (불필요 12)
- sr_yupyo ★5 설명문: expected 숫자 [3, 5], got [] (누락 3,5)
- m3 ★0 설명문: expected 숫자 [5, 200], got [5, 180] (누락 200) (불필요 180)
- m3 ★3 설명문: expected 숫자 [15], got [8] (누락 15) (불필요 8)
- m3 ★5 설명문: expected 숫자 [4, 8, 12, 1, 2, 3, 3, 10], got [3, 4, 12] (누락 8,1,2,10)
- r_yohwa ★0 설명문: expected 숫자 [4, 50], got [4, 60] (누락 50) (불필요 60)
- r_yohwa ★3 설명문: expected 숫자 [0.5], got [0.5, 2] (불필요 2)
- r_iyu ★3 설명문: expected 숫자 [10], got [5] (누락 10) (불필요 5)
- r_iyu ★5 설명문: expected 숫자 [2, 3], got [] (누락 2,3)
- m1 ★0 설명문: expected 숫자 [18, 4, 2], got [24, 4, 2] (누락 18) (불필요 24)
- m1 ★5 설명문: expected 숫자 [25], got [8] (누락 25) (불필요 8)
- r_hahueun ★0 설명문: expected 숫자 [2, 160], got [150] (누락 2,160) (불필요 150)
- r_hahueun ★3 설명문: expected 숫자 [20], got [5] (누락 20) (불필요 5)
- r_hahueun ★5 설명문: expected 숫자 [2, 15], got [] (누락 2,15)
- r_ijeon ★0 설명문: expected 숫자 [140, 3, 30], got [70, 2] (누락 140,3,30) (불필요 70,2)
- r_ijeon ★3 설명문: expected 숫자 [10], got [5] (누락 10) (불필요 5)
- r_ijeon ★5 설명문: expected 숫자 [2], got [] (누락 2)
- r_jangryang ★0 설명문: expected 숫자 [2, 70, 25, 4], got [80, 25, 4] (누락 2,70) (불필요 80)
- r_jangryang ★3 설명문: expected 숫자 [], got [5] (불필요 5)
- r_jangryang ★5 설명문: expected 숫자 [8], got [] (누락 8)
- m5 ★0 설명문: expected 숫자 [22, 8], got [26, 8] (누락 22) (불필요 26)
- m5 ★5 설명문: expected 숫자 [25], got [5] (누락 25) (불필요 5)
- r_gwanpyeong ★0 설명문: expected 숫자 [2, 150, 3, 10], got [2, 110] (누락 150,3,10) (불필요 110)
- r_gwanpyeong ★3 설명문: expected 숫자 [10], got [5] (누락 10) (불필요 5)
- r_gwanpyeong ★5 설명문: expected 숫자 [3], got [] (누락 3)
- r_gosun ★0 설명문: expected 숫자 [130, 4, 20], got [120, 2, 10] (누락 130,4,20) (불필요 120,2,10)
- r_gosun ★3 설명문: expected 숫자 [8], got [5] (누락 8) (불필요 5)
- r_gosun ★5 설명문: expected 숫자 [30], got [] (누락 30)
- r_handang ★0 설명문: expected 숫자 [4, 1, 55], got [70, 2] (누락 4,1,55) (불필요 70,2)
- r_handang ★5 설명문: expected 숫자 [6], got [] (누락 6)
- r_jangbo ★0 설명문: expected 숫자 [2, 160], got [3, 110] (누락 2,160) (불필요 3,110)
- r_jangbo ★3 설명문: expected 숫자 [3, 5], got [5] (누락 3)
- r_jangbo ★5 설명문: expected 숫자 [50], got [] (누락 50)
- r_chaemo ★3 설명문: expected 숫자 [8], got [5] (누락 8) (불필요 5)
- r_chaemo ★5 설명문: expected 숫자 [35], got [] (누락 35)
- r_juchang ★0 설명문: expected 숫자 [120, 2], got [120, 2, 10] (불필요 10)
- r_juchang ★3 설명문: expected 숫자 [10], got [5] (누락 10) (불필요 5)
- r_juchang ★5 설명문: expected 숫자 [15], got [] (누락 15)
- r_wangrang ★3 설명문: expected 숫자 [1], got [5] (누락 1) (불필요 5)
- r_wangrang ★5 설명문: expected 숫자 [8], got [] (누락 8)
- r_sunugyeong ★0 설명문: expected 숫자 [12, 4], got [12, 4, 1] (불필요 1)
- r_sunugyeong ★3 설명문: expected 숫자 [8], got [5] (누락 8) (불필요 5)
- r_sunugyeong ★5 설명문: expected 숫자 [8], got [] (누락 8)
- r_jeongbo ★0 설명문: expected 숫자 [10, 8, 4], got [10, 1, 8, 4] (불필요 1)
- r_jeongbo ★3 설명문: expected 숫자 [3], got [5] (누락 3) (불필요 5)
- r_jeongbo ★5 설명문: expected 숫자 [3, 1], got [] (누락 3,1)
- n_hopyo ★0 설명문: expected 숫자 [140, 30], got [150] (누락 140,30) (불필요 150)
- n_hopyo ★5 설명문: expected 숫자 [1, 30], got [8] (누락 1,30) (불필요 8)
- n_pirate ★0 설명문: expected 숫자 [140, 2], got [20, 150] (누락 140,2) (불필요 20,150)
- n_pirate ★5 설명문: expected 숫자 [30, 10], got [8] (누락 30,10) (불필요 8)
- n_cavalry ★0 설명문: expected 숫자 [140], got [150, 3, 20] (누락 140) (불필요 150,3,20)
- n_cavalry ★3 설명문: expected 숫자 [8], got [5] (누락 8) (불필요 5)
- n_cavalry ★5 설명문: expected 숫자 [1, 30], got [8] (누락 1,30) (불필요 8)
- n_snake ★0 설명문: expected 숫자 [60, 20, 4, 50], got [80, 25, 4] (누락 60,20,50) (불필요 80,25)
- n_snake ★3 설명문: expected 숫자 [8], got [5] (누락 8) (불필요 5)
- n_snake ★5 설명문: expected 숫자 [2], got [8] (누락 2) (불필요 8)
- n_hyeongju ★0 설명문: expected 숫자 [80, 20, 3], got [70, 2] (누락 80,20,3) (불필요 70,2)
- n_hyeongju ★3 설명문: expected 숫자 [1], got [5] (누락 1) (불필요 5)
- n_hyeongju ★5 설명문: expected 숫자 [2], got [8] (누락 2) (불필요 8)
- n_giant ★0 설명문: expected 숫자 [3, 110], got [3, 120] (누락 110) (불필요 120)
- n_giant ★3 설명문: expected 숫자 [6], got [5] (누락 6) (불필요 5)
- n_giant ★5 설명문: expected 숫자 [4, 15], got [15] (누락 4)
- n_bear ★0 설명문: expected 숫자 [3, 120, 2], got [3, 120, 2, 10] (불필요 10)
- n_bear ★3 설명문: expected 숫자 [50, 10], got [5] (누락 50,10) (불필요 5)
- n_bear ★5 설명문: expected 숫자 [1, 10], got [5] (누락 1,10) (불필요 5)
- n_wolf ★0 설명문: expected 숫자 [2, 6, 35], got [70, 2] (누락 6,35) (불필요 70)
- n_wolf ★3 설명문: expected 숫자 [10], got [5] (누락 10) (불필요 5)
- n_wolf ★5 설명문: expected 숫자 [3, 15], got [15] (누락 3)
- n_guard ★0 설명문: expected 숫자 [120, 2, 4, 30], got [120, 2, 10] (누락 4,30) (불필요 10)
- n_guard ★3 설명문: expected 숫자 [8], got [5] (누락 8) (불필요 5)
- n_guard ★5 설명문: expected 숫자 [5], got [8] (누락 5) (불필요 8)
- n_boar ★0 설명문: expected 숫자 [120, 0.5, 1], got [130, 0.4, 2, 20] (누락 120,0.5,1) (불필요 130,0.4,2,20)
- n_boar ★3 설명문: expected 숫자 [15], got [5] (누락 15) (불필요 5)
- n_boar ★5 설명문: expected 숫자 [1, 1.5], got [] (누락 1,1.5)
- n_shaman ★0 설명문: expected 숫자 [12, 4, 20], got [12, 4] (누락 20)
- n_shaman ★3 설명문: expected 숫자 [1], got [5] (누락 1) (불필요 5)
- n_shaman ★5 설명문: expected 숫자 [2], got [20, 1] (누락 2) (불필요 20,1)
- n_deunggap ★0 설명문: expected 숫자 [4, 20, 50], got [4, 20] (누락 50)
- n_deunggap ★3 설명문: expected 숫자 [10], got [5] (누락 10) (불필요 5)
- n_deunggap ★5 설명문: expected 숫자 [2, 30], got [8] (누락 2,30) (불필요 8)
- c_cheongju ★0 설명문: expected 숫자 [120, 15], got [150] (누락 120,15) (불필요 150)
- c_cheongju ★3 설명문: expected 숫자 [8], got [5] (누락 8) (불필요 5)
- c_cheongju ★5 설명문: expected 숫자 [15], got [5] (누락 15) (불필요 5)
- c_baeki ★0 설명문: expected 숫자 [120, 50, 20], got [150, 180] (누락 120,50,20) (불필요 150,180)
- c_baeki ★3 설명문: expected 숫자 [3, 10], got [5] (누락 3,10) (불필요 5)
- c_baeki ★5 설명문: expected 숫자 [50, 40], got [5] (누락 50,40) (불필요 5)
- c_hwanggeon ★0 설명문: expected 숫자 [120], got [150] (누락 120) (불필요 150)
- c_hwanggeon ★5 설명문: expected 숫자 [2, 20], got [5] (누락 2,20) (불필요 5)
- c_heuksan ★0 설명문: expected 숫자 [120], got [70, 70] (누락 120) (불필요 70,70)
- c_heuksan ★3 설명문: expected 숫자 [5, 10], got [5] (누락 10)
- c_heuksan ★5 설명문: expected 숫자 [1], got [5] (누락 1) (불필요 5)
- c_wi_archer ★0 설명문: expected 숫자 [100], got [70, 2] (누락 100) (불필요 70,2)
- c_wi_archer ★3 설명문: expected 숫자 [0.5], got [5] (누락 0.5) (불필요 5)
- c_wi_archer ★5 설명문: expected 숫자 [20], got [3] (누락 20) (불필요 3)
- c_sugun ★0 설명문: expected 숫자 [2, 1, 1, 70], got [70, 2] (누락 1,1)
- c_sugun ★3 설명문: expected 숫자 [1], got [5] (누락 1) (불필요 5)
- c_danyang ★0 설명문: expected 숫자 [2, 100], got [2, 115] (누락 100) (불필요 115)
- c_danyang ★5 설명문: expected 숫자 [3, 10], got [10] (누락 3)
- c_sanwol ★0 설명문: expected 숫자 [110, 80, 30], got [120, 3, 15] (누락 110,80,30) (불필요 120,3,15)
- c_sanwol ★3 설명문: expected 숫자 [8], got [5] (누락 8) (불필요 5)
- c_sanwol ★5 설명문: expected 숫자 [3, 15], got [5] (누락 3,15) (불필요 5)
- c_mudang ★0 설명문: expected 숫자 [100, 0.5], got [70, 2] (누락 100,0.5) (불필요 70,2)
- c_mudang ★3 설명문: expected 숫자 [8], got [5] (누락 8) (불필요 5)
- c_mudang ★5 설명문: expected 숫자 [1], got [5] (누락 1) (불필요 5)
- c_heochang ★0 설명문: expected 숫자 [12, 4, 3], got [15, 4, 20] (누락 12,3) (불필요 15,20)
- c_heochang ★3 설명문: expected 숫자 [8], got [5] (누락 8) (불필요 5)
- c_heochang ★5 설명문: expected 숫자 [15, 5], got [5] (누락 15)
- c_seoryang ★0 설명문: expected 숫자 [12, 4], got [15, 4] (누락 12) (불필요 15)
- c_seoryang ★3 설명문: expected 숫자 [8], got [5] (누락 8) (불필요 5)
- c_seoryang ★5 설명문: expected 숫자 [0.5], got [3] (누락 0.5) (불필요 3)
- c_ikju ★0 설명문: expected 숫자 [12, 4], got [15, 4, 50, 6] (누락 12) (불필요 15,50,6)
- c_ikju ★3 설명문: expected 숫자 [50, 6, 1], got [5] (누락 50,6,1) (불필요 5)
- c_ikju ★5 설명문: expected 숫자 [15, 10], got [10] (누락 15)

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
