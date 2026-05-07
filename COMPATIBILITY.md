# Compatibility matrix — Alimni AI skills × harness

> **Source of truth** for which harness each skill works on. Updated automatically by CI on each release tag.
> Last manual review: 2026-05-07 (W1 brand-lock)

## Legend

- ✅ **Works** — passes `test.sh` against this harness, content adapted
- 🔧 **Partial** — runs but with caveats noted in skill's `MATURITY.md`
- ⏳ **Planned** — explicit V2 target, not in V1 scope
- ❌ **Not supported** — incompatible by design (e.g. tool-specific workflow)
- — **Not applicable**

## V1 skills × harness

| # | Skill | Claude Code | OpenAI Codex | Cursor | Windsurf | Notes |
|---|---|:-:|:-:|:-:|:-:|---|
| 1 | `setup-agentic-ar` | ⏳ | ⏳ | ⏳ V2 | ⏳ V2 | Onboarding both harnesses; pre-W3 |
| 2 | `prompt-loop-ar` | ⏳ | ⏳ | ⏳ V2 | ⏳ V2 | Pre-W5 |
| 3 | `ship-real-product-ar` | ⏳ | ⏳ | ⏳ V2 | ⏳ V2 | Flagship; pre-W7 |
| 4 | `repo-to-agent-ar` | ⏳ | ⏳ | ⏳ V2 | ⏳ V2 | Pre-W9; MCP-heavy |
| 5 | `n8n-mcp-pipeline-ar` | ⏳ | ⏳ | ⏳ V2 | ⏳ V2 | Pre-W11; meta-skill |

## Tool versions tested against (V1)

| Harness | Min version | Tested at |
|---|---|---|
| Claude Code | 2.0+ | TBD W3 |
| OpenAI Codex | 1.0+ | TBD W3 |
| n8n | latest stable | TBD W11 |
| MCP servers | spec 2025-11-25 | TBD W9 |

## V2+ candidates (not committed)

- Cursor — distinct skill format, requires separate compile target
- Windsurf — same as Cursor
- Replit Agent — TBD post-V1
- VS Code Copilot Chat — TBD post-V1

## How this matrix is updated

1. Each skill's `test.sh` is run by CI against every supported harness on every PR
2. CI updates the cell to ✅ on green / 🔧 on caveat / ❌ on red
3. The "Notes" column captures human-readable caveats (max 80 chars)
4. Manual edits land in `MATURITY.md` per-skill rather than here — this file is the high-level overview
