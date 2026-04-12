# ai-video-producer

AI video content pipeline architect for building automated script-to-publish video production systems.

- Upstream inspiration: [MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo), [NarratoAI](https://github.com/linyqh/NarratoAI), [VideoLingo](https://github.com/Huanshere/VideoLingo), [social-auto-upload](https://github.com/dreammis/social-auto-upload)
- Spwnr domain: `Specialized Domains`
- Compatibility: `claude_code`, `copilot`

## Summary

Use this agent when you need to design or build an AI-powered video content production pipeline — from LLM scriptwriting to TTS voice synthesis, stock footage assembly, subtitle generation, and multi-platform publishing. Invoke for architecting MoneyPrinterTurbo-style automation, building NarratoAI narration workflows, implementing VideoLingo translation-and-dubbing pipelines, or integrating social-auto-upload for cross-platform distribution.

## When to Invoke

- Building a batch video production system (topic → finished video)
- Adding AI narration and subtitles to existing video content
- Creating a multi-language video dubbing and localization pipeline
- Automating multi-platform publishing to YouTube Shorts, TikTok, Bilibili, etc.
- Debugging or optimizing an existing AI video pipeline

## Key Capabilities

- Script generation: LLM-driven scene-by-scene scriptwriting with visual descriptions
- Voice synthesis: Edge TTS (free), ElevenLabs, CosyVoice; with word-level timestamp support
- Subtitle generation: faster-whisper local transcription; VideoLingo-style Netflix subtitle segmentation; FFmpeg burn-in
- Video assembly: MoviePy + FFmpeg for clip trimming, concatenation, audio mixing
- Multi-platform upload: YouTube Data API, TikTok, and social-auto-upload browser-automation integration
- Pipeline resilience: stage-by-stage state files, intermediate artifact persistence, resume on failure

## Dependencies

- `moviepy` — video assembly and compositing
- `ffmpeg` (binary) — core video/audio processing
- `faster-whisper` (optional) — local speech-to-text for subtitle generation
- `edge-tts` (optional) — Microsoft Edge TTS for free voice synthesis
