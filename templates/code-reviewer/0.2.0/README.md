# code-reviewer

`code-reviewer` is a cross-host subagent template for reviewing diffs and producing actionable code feedback.

## Included assets

- canonical prompt entry at `agent.md`
- optional JSON input, output, and memory schemas
- layered skills under `skills/universal` and host-specific `skills/<host>`
- host injection support for Claude Code, Codex, Copilot, and OpenCode

## Notes

- Keep `agent.md` host-neutral and avoid hard-coding tool names there.
- Put host-specific tool binding notes directly into the matching `SKILL.md` files.
- Publish future updates by adding a new sibling version directory instead of mutating `0.2.0`.
