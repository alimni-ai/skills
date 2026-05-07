# setup-agentic-ar — maturity log

## Current stage

🌱 **MVE-partial** (scaffolded 2026-05-07)

## Files present

- [x] source.md (template — content TODO by Hervé)
- [x] lab.md (template — content TODO by Hervé)
- [x] test.sh (placeholder smoke)
- [x] MATURITY.md
- [ ] starter-repo/  (required for 🌿 MVE-complete)
- [ ] claude/SKILL.md  (auto-built when maturity ≥ mve-complete)
- [ ] codex/skill.json  (auto-built when maturity ≥ mve-complete)
- [ ] cheatsheet.md  (required for 🌳 Mature)
- [ ] examples/  (required for 🌳 Mature)
- [ ] credits.md  (required for 🌳 Mature)

## Iteration history

| Date | Change | Source (feedback) | Result |
|---|---|---|---|
| 2026-05-07 | Scaffolded via new-skill.sh | — | initial |
| 2026-05-07 (later) | Artifact-first rewrite of source.md + lab.md + test.sh | Track A reverse-engineering matrix C1 (Replit pattern); Hervé validation 2026-05-07 nuit | Skill now publishes GitHub repo + deployed URL; test.sh has learner-repo validation mode |

## Alimni golden rule applied

`publishes_artifact: true` + `artifact_kind: github_repo + deployed_url` declared
in source.md frontmatter. test.sh enforces both author-side (source.md/lab.md
declare the contract) and learner-side (`--learner-repo PATH` validates the
produced repo has Arabic RTL page + lesson-1-output.md with published URL).

## Next iteration target

To graduate to 🌿 **MVE-complete**:
- [ ] Add `starter-repo/` directory with the skeleton index.html + README + lesson-1-output.md template (so learners on slow connections can clone instead of generating from scratch)
- [ ] Translate prompts to Maghrebi + Levantine + Gulf dialect variants in `examples/` (cultural legitimacy moat)
- [ ] Mentor video walkthrough (Maghrebi or Levantine voice; 5 min max)
- [ ] First learner completion captured (real GitHub repo URL added to `distribution/feedback-loop-log.md`)
