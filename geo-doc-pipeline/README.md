# geo-doc-pipeline — 지리 다큐 로컬 자동화 파이프라인 (MVP)

API 키 0개 · 비용 0원으로 16:9(1920×1080, 30fps) 유튜브 지리 다큐 MP4를 자동 생성합니다.
EP.01: **Why 90% of Canada is Completely Empty** — 약 3분 12초 풀 영상(5챕터 · 23씬), 테마 3종(`tintin`, `paper3d`, `hud`).

## 빠른 실행

```bash
cd geo-doc-pipeline
pip install -r requirements.txt     # edge-tts, mutagen, faster-whisper, yt-dlp (ffmpeg 필요)
npm install
npm run build                       # = 오디오 생성 + whisper 검수 + 두 테마 렌더
# 개별 실행
npm run audio                       # src/script.json → public/audio/*.mp3 + src/timeline.json
npm run render:tintin               # out/mvp_canada_tintin.mp4
npm run render:paper3d              # out/mvp_canada_paper3d.mp4
npm run render:hud                  # out/mvp_canada_hud.mp4 (다크 블루프린트 / 전술 HUD)
npm run studio                      # Remotion Studio 미리보기
```

임의 Props 렌더:
```bash
npx remotion render GeoDoc out/x.mp4 --props='{"theme":"paper3d","subtitleMode":"both"}'
```
- `theme`: `"tintin" | "paper3d" | "hud"`
- `subtitleMode`: `"ko" | "en" | "both" | "none"` (검수 기본값 `ko`)

> `edge-tts`는 키가 필요 없지만 Microsoft Edge 읽어주기 서버에 접속하므로 **오디오 생성 단계만 인터넷이 필요**합니다.
> 프록시/사내 CA 환경이면 `HTTPS_PROXY`, `SSL_CERT_FILE`을 자동으로 사용합니다. 렌더링은 완전 오프라인(지도·폰트 모두 npm 패키지에 포함).

## 제작 워크플로 (전부 무료 · 오픈소스)

```
1. 소재 조사   npm run research -- "why is canada empty" "canada population border"
               → research/<slug>/brief.md  (경쟁 영상 조회수·포화도 + 근거 자막 + "조사 내용만 써" 프롬프트)
2. 대본       src/script.json 편집 (brief.md 근거만 사용)
3. 음성       npm run audio      (tts.engine: edge | qwen3 | voicebox)
4. 검수       npm run qa         (로컬 whisper로 받아쓰기 → 대본과 WER 비교 → 틀린 씬만 자동 재생성)
5. 렌더       npm run render:all
   (1~5 한 번에: npm run build — 조사 제외)
```

### 목소리 엔진 (`src/script.json` → `tts.engine`)

| 엔진 | 용도 | 준비물 |
|---|---|---|
| `edge` (기본) | 무료 Microsoft 음성, 단어 타이밍 내장 | 없음 (인터넷만) |
| `qwen3` | **내 목소리 클론** (Qwen3-TTS, 로컬 실행, CPU 가능·GPU면 훨씬 빠름) | `voice/my_voice.wav` 10~15초 녹음 + `tts.qwen3.refText`에 녹음 문장 정확히 입력 → [voice/README.md](voice/README.md) |
| `voicebox` | 내 PC에 설치한 [Voicebox](https://github.com/jamiepine/voicebox) 앱의 로컬 API 호출 (앱에서 만든 목소리 프로필 사용) | Voicebox 실행 + `tts.voicebox.profileId` (`http://127.0.0.1:17493/docs` → `GET /profiles`) |

- 클론 엔진은 단어 타이밍이 없어서 **faster-whisper로 자동 정렬**합니다 → 애니메이션 큐가 그대로 동작.
- 시드 고정(`seed`), 앞 무음/숨소리 자동 제거(ffmpeg silenceremove), 음량 정규화(loudnorm)로 씬 간 톤을 맞춥니다.
  Voicebox는 `instruct`("No breath, start on the first syllable")도 전달합니다.
- `npm run qa`가 실패한 씬은 시드를 바꿔 최대 3번 다시 뽑습니다. 결과: `out/qa_report.json`.
- 이 클라우드 환경(CPU 4코어)에서 qwen3 0.6B로 3개 씬 생성 ≈ 1분 50초, QA WER 0% 확인.

### 조사 도구 주의
- 클라우드 서버 IP에서는 YouTube가 자막/영상 다운로드를 봇으로 차단합니다(검색은 됨). **자막 수집·`yt-dlp` 클립 추출은 집 PC에서** 실행하세요.
  필요하면 `yt-dlp --cookies-from-browser chrome ...`.
- Reddit은 Agent-Reach에서 로그인(`agent-reach login reddit`)이 필요한 선택 채널입니다.
- 한 번에 많이 긁으면 IP가 막힙니다. `research.py`는 요청 사이 2초 쉬어갑니다(`--pause`).
- 클립 일부만 받기: `yt-dlp --download-sections "*00:01:10-00:01:16" -f mp4 <URL>` — 남의 영상 사용은 저작권/공정이용 범위 확인 필수.

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

## 씬 타입 (script.json → `"type"`)

| type | 용도 | 주요 params |
|---|---|---|
| `titleCard` | 무음 오프닝 타이틀 | `kicker`, `subtitleKo` |
| `chapter` | 무음 챕터 구분 카드 | `number`, `title`, `titleKo`, `kicker` |
| `mapZoom` / `borderStrip` / `glacierSection` | 오프닝 전용 연출 (줌인 · 100마일 띠 · 빙하 단면) | 기존 그대로 |
| `mapFocus` | 범용 지도 씬 | `cam`/`camFrom`(lon,lat,zoom), `provinces`{codes}, `region`{northOf}, `shape`{points}, `route`{points}, `pins`, `labels`, `badges`, `heading` |
| `statCompare` | 좌우 비교 카드 (VS) | `left`/`right` {title, sub, rows[{label,value}]} |
| `barCompare` | 가로 막대 그래프 | `bars[{label,value,highlight}]`, `max`, `callout` |
| `waffleStat` | 큰 숫자 카운트업 + 10×10 와플 | `value`, `suffix`, `label`, `note` |
| `bulletList` | 번호 목록 (이유 정리) | `items[{title,sub,at}]`, `tag` |

모든 `at` 값은 씬의 `cues` 키(= 대사 속 단어)이므로 음성이 바뀌어도 타이밍이 자동으로 맞습니다.
지도 데이터: world-atlas(국가) + Natural Earth 1:50m 주 경계(`src/data/canada_provinces.json`)·호수(`src/data/na_lakes.json`), 모두 퍼블릭 도메인이며 오프라인 번들.

### 숫자 읽기
클론 음성(Voicebox/Qwen3)은 숫자를 잘못 읽습니다("130,000" → "175"). `scripts/numwords.py`가 TTS로 보낼 때만 숫자를 영어 단어로 풀어 쓰고(자막은 숫자 유지),
`npm run qa`는 대본의 숫자가 하나라도 다르게 들리면 WER과 무관하게 실패 처리 후 재생성합니다.

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

- `hud` (다크 블루프린트): 네이비 격자 + 레이더 링, 청록 와이어프레임 지도(스캔 라인으로 등장), 주황 발광 100마일 띠, 시안 글로우 카드/자막, 레이더 스캔 전환. 일러스트는 `HudSkyline` / `HudNorth`(네온 윤곽선).

비교 카드는 테마마다 별도 SVG 컴포넌트입니다 (`src/components/illustrations/`).
- `TintinSkyline` / `TintinNorth`: 균일한 검은 펜선 + 플랫 채색 + roughjs 빗금 음영 (Ligne Claire), 구름·페리·눈 애니메이션, "POP. 0" 표지판
- `PaperSkyline` / `PaperNorth`: 외곽선 없는 다층 종이 실루엣, 레이어별 다중 drop-shadow, 패럴랙스

## 디렉터리

```
scripts/generate_audio.py, tts_engines.py, whisper_utils.py, qa_audio.py, research.py
voice/            내 목소리 레퍼런스 (gitignore)
research/         조사 결과 (brief.md, videos.json)
src/script.json, src/timeline.json
src/Root.tsx, src/Video.tsx, src/theme.ts, src/geo.ts, src/rough.ts, src/fonts.ts
src/scenes/       TitleCard, MapZoomScene, BorderStripScene, GlacierScene
src/components/   Background, MapLayers, MapOverlay, AltitudeHUD, ComparisonCards,
                  SubtitleOverlay, SceneTransition, RoughSvg, illustrations/*
public/audio/     scene1~3.mp3
```
