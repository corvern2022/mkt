# 내 목소리 레퍼런스 (qwen3 엔진용)

1. 조용한 방에서 10~15초 녹음 → `voice/my_voice.wav` (mp3도 가능)
2. 녹음한 문장을 **정확히** `src/script.json` → `tts.qwen3.refText`에 입력
3. `tts.engine`을 `"qwen3"`로 바꾸고 `npm run audio && npm run qa`

녹음 파일은 개인 음성 데이터라 `.gitignore`로 커밋에서 제외됩니다.
