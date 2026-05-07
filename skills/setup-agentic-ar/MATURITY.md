# setup-agentic-ar — maturity log

## Current stage

🌱 **MVE-partial** (scaffolded 2026-05-07)

## Files present

- [x] source.md (artifact-first content draft — Claude pen, native AR review pending Hervé)
- [x] lab.md (full Setup + Exercise + Acceptance criteria — Claude pen, native AR review pending)
- [x] test.sh (author-mode smoke PASS — verifies artifact contract + frontmatter)
- [x] MATURITY.md
- [x] starter-repo/  (README.md AR + index.html RTL + lesson-1-output.md + .gitignore + vercel.json — scaffolded 2026-05-07 W1 evening)
- [ ] claude/SKILL.md  (auto-built when maturity ≥ mve-complete)
- [ ] codex/skill.json  (auto-built when maturity ≥ mve-complete)
- [ ] cheatsheet.md  (required for 🌳 Mature)
- [ ] examples/  (required for 🌳 Mature, dialectal prompt variants per memory `wissam-arabic-builder-ecosystem`)
- [ ] credits.md  (required for 🌳 Mature)

## Iteration history

| Date | Change | Source (feedback) | Result |
|---|---|---|---|
| 2026-05-07 | Scaffolded via new-skill.sh | — | initial |
| 2026-05-07 (later) | Artifact-first rewrite of source.md + lab.md + test.sh | Track A reverse-engineering matrix C1 (Replit pattern); Hervé validation 2026-05-07 nuit | Skill now publishes GitHub repo + deployed URL; test.sh has learner-repo validation mode |
| 2026-05-07 (W1 evening) | starter-repo/ scaffolded (README AR + index.html RTL + lesson-1-output.md + .gitignore + vercel.json) | Plan V1 W1 prerequisite — gate to mve-complete | Learner can clone instead of generating from scratch (mobile-friendly, low-spec MENA pattern) |

## Alimni golden rule applied

`publishes_artifact: true` + `artifact_kind: github_repo + deployed_url` declared
in source.md frontmatter. test.sh enforces both author-side (source.md/lab.md
declare the contract) and learner-side (`--learner-repo PATH` validates the
produced repo has Arabic RTL page + lesson-1-output.md with published URL).

## Next iteration target

To graduate to 🌿 **MVE-complete** (gates remaining) :

1. **Native AR review** of source.md + lab.md by Hervé (or recruited mentor — task #29 plan V1). Mark `ar_review: approved` in source.md frontmatter when validated.
2. **End-to-end test** by 1+ AR-fluent learner using starter-repo/ as clone target. Acceptance criteria from lab.md must pass on a real cloned repo + deployed URL.
3. **Maturity bump** : edit `source.md` frontmatter `maturity: mve-partial` → `maturity: mve-complete`. Build pipeline (`scripts/build.js`) auto-emits `claude/SKILL.md` + `codex/skill.json`.

To graduate further to 🌳 **Mature** (V2) :

- [ ] Translate prompts to Maghrebi + Levantine + Gulf dialect variants in `examples/` (cultural legitimacy moat per `wissam-arabic-builder-ecosystem`)
- [ ] Mentor video walkthrough (Maghrebi or Levantine voice; 5 min max)
- [ ] First learner completion captured (real GitHub repo URL added to `distribution/feedback-loop-log.md`)
- [ ] First feedback iteration loop closed — at least 1 lab.md edit driven by real learner feedback
