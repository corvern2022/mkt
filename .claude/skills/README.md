# Project skills

Third-party Claude Code skills installed for the `geo-doc-pipeline` workflow. They were reviewed
before install (no exfiltration or prompt injection found). Upstream sources:

| skill | source | license | notes |
|---|---|---|---|
| `remotion-*` | github.com/remotion-dev/skills | Remotion's official skills | Remotion itself is free for individuals & companies ≤3 people |
| `watch` | github.com/bradautomates/claude-video | MIT | pinned to free local mode via `.claude/settings.json` (`WATCH_ENGINE=local`, `WATCH_WHISPER_BACKEND=none`) so it never uses the Gemini/OpenAI keys in `.env`. SessionStart hook intentionally not installed. |
| `agent-reach` | github.com/Panniantong/Agent-Reach | MIT | needs the `agent-reach` CLI (`pip install git+https://github.com/Panniantong/Agent-Reach`) |
| `caveman`, `ultracave`, `megacave` | github.com/JuliusBrussee/caveman | Apache-2.0 | opt-in: `/caveman` … `stop caveman` |
