# code-reviewer

`code-reviewer` is a cross-host subagent template for reviewing diffs and producing actionable code feedback.

## Included assets

- prompt entrypoint at `prompts/system.md`
- JSON input, output, and memory schemas
- local helper skills for diff reading and repo navigation
- host injection support for Claude Code, Codex, Copilot, and OpenCode

## Versioning

This repository treats each `templates/<name>/<version>/` directory as immutable after merge. Publish a new version by adding a new sibling directory such as `templates/code-reviewer/0.2.0/`.
