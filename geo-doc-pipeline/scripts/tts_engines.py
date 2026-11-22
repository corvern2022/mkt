"""Pluggable narration engines. All free; pick one in script.json → "tts.engine" or --engine.

  edge      Microsoft Edge read-aloud voices via edge-tts (no key, needs internet). Word timings native.
  qwen3     Qwen3-TTS voice clone, runs locally (CPU ok, GPU faster). Needs a ~10s reference
            recording of YOUR voice + its transcript. Word timings via faster-whisper.
  voicebox  Calls a running Voicebox app (https://github.com/jamiepine/voicebox) on your PC
            through its local REST API (default http://127.0.0.1:17493) using a voice profile
            you created in the app. Word timings via faster-whisper.
"""
from __future__ import annotations

import json
import os
import ssl
import subprocess
import tempfile
import urllib.request
from pathlib import Path

TICKS = 10_000_000  # edge-tts offsets are in 100ns ticks


def _to_mp3(src: Path, dst: Path, trim_lead: bool = True):
    """Encode to mp3; strip leading silence/breath and shorten long mid-line pauses (>0.3s → ~0.22s) so narration flows."""
    af = ["-af", "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05:stop_periods=-1:stop_duration=0.3:stop_threshold=-45dB:stop_silence=0.22,loudnorm=I=-16:TP=-1.5"] if trim_lead else []
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(src), *af, "-ar", "24000", "-b:a", "128k", str(dst)], check=True)


# ---------------------------------------------------------------- edge
async def synth_edge(text: str, out: Path, cfg: dict) -> list[dict]:
    import edge_tts
    import edge_tts.communicate as comm_mod

    ca = os.environ.get("SSL_CERT_FILE") or os.environ.get("REQUESTS_CA_BUNDLE")
    if ca and Path(ca).exists():  # honour sandbox / corporate proxies with custom CAs
        comm_mod._SSL_CTX = ssl.create_default_context(cafile=ca)
    proxy = os.environ.get("HTTPS_PROXY") or os.environ.get("https_proxy")
    comm = edge_tts.Communicate(text, cfg.get("voice", "en-US-AndrewNeural"), rate=cfg.get("rate", "+0%"),
                                boundary="WordBoundary", proxy=proxy)
    words = []
    with open(out, "wb") as f:
        async for chunk in comm.stream():
            if chunk["type"] == "audio":
                f.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                start = chunk["offset"] / TICKS
                words.append({"text": chunk["text"], "start": round(start, 3),
                              "end": round(start + chunk["duration"] / TICKS, 3)})
    return words


# ---------------------------------------------------------------- qwen3 (local clone)
_QWEN = {}


def synth_qwen3(text: str, out: Path, cfg: dict, root: Path) -> list[dict]:
    import soundfile as sf
    import torch
    from qwen_tts import Qwen3TTSModel

    ref_audio = root / cfg["refAudio"]
    if not ref_audio.exists():
        raise SystemExit(f"qwen3: reference recording not found: {ref_audio}\n"
                         "Record ~10s of your voice (wav/mp3) and put its exact transcript in tts.qwen3.refText.")
    name = cfg.get("model", "Qwen/Qwen3-TTS-12Hz-0.6B-Base")
    if name not in _QWEN:
        dev = "cuda:0" if torch.cuda.is_available() else "cpu"
        _QWEN[name] = Qwen3TTSModel.from_pretrained(
            name, device_map=dev, dtype=torch.bfloat16 if dev != "cpu" else torch.float32)
    torch.manual_seed(int(cfg.get("seed", 42)))  # fixed seed → consistent tone between scenes
    wavs, sr = _QWEN[name].generate_voice_clone(
        text=text, language=cfg.get("language", "English"),
        ref_audio=str(ref_audio), ref_text=cfg.get("refText") or None,
        x_vector_only_mode=not cfg.get("refText"),
    )
    with tempfile.NamedTemporaryFile(suffix=".wav") as tmp:
        sf.write(tmp.name, wavs[0], sr)
        _to_mp3(Path(tmp.name), out)
    return []


# ---------------------------------------------------------------- files (takes you exported yourself)
def synth_files(scene_id: str, out: Path, cfg: dict, root: Path) -> list[dict]:
    """Use a take recorded/exported elsewhere (e.g. Voicebox app → Export): <dir>/<scene_id>.(wav|mp3|m4a|flac)."""
    d = root / cfg.get("dir", "voice/takes")
    for ext in ("wav", "mp3", "m4a", "flac", "aac", "ogg"):
        src = d / f"{scene_id}.{ext}"
        if src.exists():
            _to_mp3(src, out)
            return []
    raise SystemExit(f"files: no take for '{scene_id}' in {d} (expected {scene_id}.wav/.mp3/...)")


# ---------------------------------------------------------------- voicebox (your desktop app)
def synth_voicebox(text: str, out: Path, cfg: dict) -> list[dict]:
    url = os.environ.get("VOICEBOX_URL", cfg.get("url", "http://127.0.0.1:17493")).rstrip("/")
    profile = os.environ.get("VOICEBOX_PROFILE_ID", cfg.get("profileId", ""))
    if not profile:
        raise SystemExit("voicebox: set tts.voicebox.profileId (or VOICEBOX_PROFILE_ID). "
                         f"List profiles at {url}/docs → GET /profiles")
    body = {"profile_id": profile, "text": text, "language": cfg.get("language", "en"),
            "seed": int(cfg.get("seed", 42)), "model_size": cfg.get("modelSize", "1.7B")}
    if cfg.get("engine"):
        body["engine"] = cfg["engine"]
    if cfg.get("instruct"):
        body["instruct"] = cfg["instruct"]
    req = urllib.request.Request(f"{url}/generate/stream", data=json.dumps(body).encode(),
                                 headers={"Content-Type": "application/json"}, method="POST")
    # local server: never route through a proxy
    opener = urllib.request.build_opener(urllib.request.ProxyHandler({}))
    with opener.open(req, timeout=600) as r, tempfile.NamedTemporaryFile(suffix=".wav") as tmp:
        tmp.write(r.read())
        tmp.flush()
        _to_mp3(Path(tmp.name), out)
    return []
