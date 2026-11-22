# geo-doc-pipeline — 지리 다큐 로컬 자동화 파이프라인 (MVP)

API 키 0개 · 비용 0원으로 16:9(1920×1080, 30fps) 유튜브 지리 다큐 MP4를 자동 생성합니다.
파일럿: **Why 90% of Canada is Completely Empty** — 30초 오프닝, 테마 2종(`tintin`, `paper3d`).

## 빠른 실행

```bash
cd geo-doc-pipeline
pip install -r requirements.txt     # edge-tts, mutagen  (ffprobe 권장)
npm install
npm run build                       # = 오디오 생성 + 두 테마 렌더
# 개별 실행
npm run audio                       # src/script.json → public/audio/*.mp3 + src/timeline.json
npm run render:tintin               # out/mvp_canada_tintin.mp4
npm run render:paper3d              # out/mvp_canada_paper3d.mp4
npm run studio                      # Remotion Studio 미리보기
```

임의 Props 렌더:
```bash
npx remotion render GeoDoc out/x.mp4 --props='{"theme":"paper3d","subtitleMode":"both"}'
```
- `theme`: `"tintin" | "paper3d"`
- `subtitleMode`: `"ko" | "en" | "both" | "none"` (검수 기본값 `ko`)

> `edge-tts`는 키가 필요 없지만 Microsoft Edge 읽어주기 서버에 접속하므로 **오디오 생성 단계만 인터넷이 필요**합니다.
> 프록시/사내 CA 환경이면 `HTTPS_PROXY`, `SSL_CERT_FILE`을 자동으로 사용합니다. 렌더링은 완전 오프라인(지도·폰트 모두 npm 패키지에 포함).

## 데이터 주도 구조

```
src/script.json      ← 사람이 편집하는 유일한 파일 (대본 EN/KO, 씬 타입, 파라미터, 큐 단어)
   │ scripts/generate_audio.py  (edge-tts en-US-AndrewNeural +5%, WordBoundary 타이밍, ffprobe/mutagen 길이 측정)
   ▼
public/audio/<scene>.mp3 + src/timeline.json   (씬 길이[초/프레임], 단어별 타임스탬프, 자막 라인 타이밍, 큐 → 초)
   │ Remotion (src/Video.tsx 의 REGISTRY: scene.type → 컴포넌트)
   ▼
out/*.mp4
```

- **큐(cues)**: `"cues": {"cardTop": "Canadians"}` 처럼 대사 속 단어를 지정하면, 그 단어가 발음되는 프레임에 애니메이션이 맞춰집니다. 대본/음성을 바꿔도 싱크가 자동으로 따라갑니다.
- **새 씬 타입**: `src/scenes/`에 컴포넌트를 만들고 `REGISTRY`에 등록 → `script.json`에서 `"type"`으로 사용.
- `lines`가 비어 있는 씬은 무음 카드(`durationSec`)로 처리됩니다(인트로 타이틀).
- 패딩/전환: `leadInSec`, `tailSec`, `transitionFrames`.
- `python3 scripts/generate_audio.py --skip-existing` 은 텍스트가 바뀌지 않은 씬의 MP3를 재사용합니다.

## 3단 레이어 합성

| 레이어 | 구현 | 독립 모션 |
|---|---|---|
| 1. 배경 | `Background.tsx` — 모눈 그리드 + feTurbulence 종이 노이즈/섬유 + 비네트 | 그리드 상시 드리프트, 조명 이동 |
| 2. 지도·단면도 | `MapLayers.tsx`(d3-geo Lambert Conformal Conic + world-atlas 50m), `GlacierScene.tsx` | 카메라 줌/팬, 국경 띠 W→E 와이프, 빙하 전진·해빙 |
| 3. 오버레이 | 고도계 HUD, 스탯 배지, 70% 카운트업, roughjs 화살표·원, 비교 카드, 자막 | 스프링 팝업, 펜 드로잉 |

## 씬 구성 (총 29.5초)

| 씬 | 길이 | 내용 |
|---|---|---|
| intro | 3.6s | 타이틀 카드 (무음) → 아이리스/페이퍼 전환 |
| scene1 | 7.1s | 북미 → 캐나다 줌인, 고도계 400→50km, 빗금/종이 레이어 채움, #2 LARGEST · ≈4명/km² |
| scene2 | 9.7s | 지도가 만화 컷 패널로 축소(연속 전환), 100마일 빨간 띠 W→E, 100 MI 치수선, 도시 핀, 0→70%+ 카운트업, 비교 카드 2장 |
| scene3 | 9.1s | 캐나다 순상지 단면도: 빙하가 남쪽으로 밀며 표토 제거(퇴석 누적) → 해빙 후 노출된 화강암 + 호수, 위치 인셋 지도 |

## 테마별 일러스트

비교 카드는 테마마다 별도 SVG 컴포넌트입니다 (`src/components/illustrations/`).
- `TintinSkyline` / `TintinNorth`: 균일한 검은 펜선 + 플랫 채색 + roughjs 빗금 음영 (Ligne Claire), 구름·페리·눈 애니메이션, "POP. 0" 표지판
- `PaperSkyline` / `PaperNorth`: 외곽선 없는 다층 종이 실루엣, 레이어별 다중 drop-shadow, 패럴랙스

## 디렉터리

```
scripts/generate_audio.py
src/script.json, src/timeline.json
src/Root.tsx, src/Video.tsx, src/theme.ts, src/geo.ts, src/rough.ts, src/fonts.ts
src/scenes/       TitleCard, MapZoomScene, BorderStripScene, GlacierScene
src/components/   Background, MapLayers, MapOverlay, AltitudeHUD, ComparisonCards,
                  SubtitleOverlay, SceneTransition, RoughSvg, illustrations/*
public/audio/     scene1~3.mp3
```
