# Feedback loop log — Alimni AI

> The actual moat. Every substantive return from the community gets logged here, with what it improved.
> Per spec §3 (council 2026-05-07): "loop closure proof" — V1 fails W12 Gate 3 if zero entries.

## Why this file exists

The Alimni AI moat is **not** static curation + execution + community. Each of those is replicable in 30-90 days by a capitalized actor. The actual defendable position is the **dynamic feedback loop**:

```
better labs → more end-to-end executions → more substantive returns
   ↑                                                ↓
improvement                                     learning
   ↑                                                ↓
←  more trust  ←  curated taste  ←  data  ←  iteration
```

This file is the audit trail of that loop. It exists to make it impossible to fake.

## Entry schema

Each entry is a row in the table below + a detail block underneath when needed.

| Date | Skill | Source | Insight | Iteration applied | Result |
|---|---|---|---|---|---|

- **Date** — YYYY-MM-DD when the return was received
- **Skill** — slug of the skill the return applies to (or `general` for cross-cutting)
- **Source** — `issue#NN`, `PR#NN`, `DM`, `tg-msg`, `linkedin-comment`, `x-quote`, `email`, `voice` — be specific
- **Insight** — what the return surfaced (max 200 chars; long-form below if needed)
- **Iteration applied** — what changed in the skill (PR ref, commit SHA, doc update)
- **Result** — measurable improvement OR `pending verification` OR `rejected — reason`

## Log

| Date | Skill | Source | Insight | Iteration applied | Result |
|---|---|---|---|---|---|
| _empty — first entry will land when V1 ships skill #1 (~W4)_ | | | | | |

## Verification rules

1. Every quarter, count entries → if quarter shows zero entries, the loop is not closing → trigger council to investigate (community engagement, distribution reach, skill quality)
2. Each `🌳 Mature` graduation in `MATURITY.md` MUST reference at least one entry here
3. Public retro at W12 surfaces the loop count and the most impactful 3 entries

## What does NOT count as a loop entry

To prevent vanity bloat:

- ❌ "Great skill!" without specific feedback
- ❌ Likes, stars, retweets without comment
- ❌ Internal team observations (those go in build notes or PRs directly)
- ❌ AI-generated feedback that we cannot trace to a real human

Only **substantive returns** that named a specific problem, suggested a specific change, or surfaced a use case we hadn't anticipated.
