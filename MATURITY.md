# Skill maturity index — Alimni AI

> **Source of truth** for the maturity stage of every skill in the repo.
> Per-skill detail (iteration history, next target) lives in `skills/<slug>/MATURITY.md`.
> Last update: 2026-05-07 (W1 brand-lock)

## Maturity ladder (recap)

| Stage | Files required | Meaning |
|---|---|---|
| 🌱 **MVE-partial** | `source.md` + `lab.md` + `test.sh` + `MATURITY.md` | Installable + runnable. Collecting first feedback. |
| 🌿 **MVE-complete** | + `starter-repo/` + `claude/SKILL.md` + `codex/skill.json` | Tested on both harnesses. Full execution path. |
| 🌳 **Mature** | + `cheatsheet.md` + `examples/` + `credits.md` + ≥1 community-feedback iteration logged | Loop closure proven. |
| 🌲 **Reference** | + Arabic walkthrough video + GPT/Claude assistant config + Termux/online IDE compat note | Production-grade canonical reference. |

## V1 skills × stage

| # | Slug | Current stage | V1 target | Last iterated | Files present |
|---|---|---|---|---|---|
| 1 | `setup-agentic-ar` | scaffolded | 🌿 MVE-complete | — | scaffold only |
| 2 | `prompt-loop-ar` | not started | 🌿 MVE-complete | — | — |
| 3 | `ship-real-product-ar` | not started | 🌿 MVE-complete | — | — |
| 4 | `repo-to-agent-ar` | not started | 🌱 MVE-partial | — | — |
| 5 | `n8n-mcp-pipeline-ar` | not started | 🌱 MVE-partial | — | — |

## V1 success criterion (W12 Gate 3)

- **3 skills must reach 🌿 MVE-complete** (skills 1-3) — non-negotiable
- **2 skills must reach 🌱 MVE-partial** (skills 4-5) — stretch
- **At least 1 skill iterated on real community feedback** — loop closure proof, non-negotiable

If any of the three are missing at W12, V1 is a failure (per spec §3, council 2026-05-07).

## How a skill graduates

Promotion is **not** automatic by file presence. A skill graduates when:

1. All files for the target stage are present **and** validated
2. `test.sh` passes on every supported harness
3. For 🌳 Mature stage: at least one entry in `distribution/feedback-loop-log.md` references this skill **and** the skill's `MATURITY.md` shows the iteration applied

A skill can also be **demoted** if a regression is found (e.g. test.sh breaks on a Claude Code update). Demotion is logged in the skill's `MATURITY.md` history.

## Why this index exists

To make the pedagogy + execution honest. It is too easy to claim "5 skills shipped" when only 1 is truly polished and 4 are scaffolded shells. The maturity ladder forces honest reporting and prevents the trap of optimizing surface count over depth.
