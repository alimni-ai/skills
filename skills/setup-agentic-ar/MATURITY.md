# setup-agentic-ar — maturity log

## Current stage

🌿 **MVE-complete** (bumped 2026-05-07 nuit suite à council AR review pass)

## Files present

- [x] source.md (artifact-first content, council-reviewed Claude+Ines+Wissam, awaits Hervé final native validation pass)
- [x] lab.md (Setup + Exercise + Acceptance criteria + safety expectation + mobile path + LTR command framing)
- [x] test.sh (author-mode smoke PASS + learner-repo verification mode)
- [x] MATURITY.md
- [x] starter-repo/ (README.md AR + 3 install paths + index.html RTL + lesson-1-output.md + .gitignore + vercel.json)
- [x] claude/SKILL.md  (auto-built 2026-05-07, live install verified ~/.claude/skills/, discovered by claude CLI)
- [x] codex/skill.json (auto-built 2026-05-07, structurally valid, deployed ~/.codex/skills/, full live agent test pending OpenAI auth)
- [ ] cheatsheet.md  (required for 🌳 Mature)
- [ ] examples/  (required for 🌳 Mature, dialectal prompt variants)
- [ ] credits.md  (required for 🌳 Mature)

## Iteration history

| Date | Change | Source (feedback) | Result |
|---|---|---|---|
| 2026-05-07 morning | Scaffolded via new-skill.sh | — | initial mve-partial |
| 2026-05-07 afternoon | Artifact-first rewrite | Track A reverse-engineering matrix C1 (Replit pattern); Hervé validation | Skill publishes GitHub repo + deployed URL artifact contract |
| 2026-05-07 evening | starter-repo + lab + W1 build note | Plan W1 | mve-partial scaffolded (gate restante: AR review + 1ère completion) |
| 2026-05-07 nuit | 17 council corrections (Claude+Ines+Wissam) | Hervé validates "all approved" | AR content reviewed council-pass: install commands fixed (npm @anthropic-ai/claude-code + @openai/codex), URLs verified, safety expectation added, mobile path explicit, LTR command framing, calques cleaned, people-first framing |
| 2026-05-07 nuit | Bump mve-partial → mve-complete | V1 readiness gate (council 2026-05-07 nuit) | Build artifacts generated: claude/SKILL.md + codex/skill.json. Claude Code skill LIVE discovered. Codex skill.json deployed at conventional path. |

## Live install verification

- ✅ `~/.claude/skills/setup-agentic-ar/SKILL.md` deployed, Claude CLI 2.1.132 lists skill in available skills (verified non-interactive `claude --print`)
- 🟡 `~/.codex/skills/setup-agentic-ar/skill.json` deployed, Codex CLI 0.129.0 installed, skill.json structure valid (name, title, description, instructions, metadata) — full agent invocation test requires OpenAI auth, deferred

