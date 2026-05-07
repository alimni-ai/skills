#!/usr/bin/env bash
# Scaffold a new Alimni AI skill directory at 🌱 MVE-partial maturity.
#
# Usage: bash scripts/new-skill.sh <slug>
#
# Creates skills/<slug>/ with the four files required for 🌱 MVE-partial:
#   source.md     (frontmatter template + AR placeholder)
#   lab.md        (hands-on exercise template)
#   test.sh       (skeleton smoke test)
#   MATURITY.md   (per-skill maturity log)
#
# Hervé authors the AR content. starter-repo/, claude/SKILL.md, codex/skill.json,
# cheatsheet, examples, credits get added later as the skill graduates.

set -euo pipefail

SLUG="${1:-}"
if [[ -z "${SLUG}" ]]; then
  echo "Usage: bash scripts/new-skill.sh <slug>"
  echo "Example: bash scripts/new-skill.sh setup-agentic-ar"
  exit 2
fi

if [[ ! "${SLUG}" =~ ^[a-z0-9-]+$ ]]; then
  echo "❌ Invalid slug '${SLUG}'. Use lowercase letters, digits, and hyphens only."
  exit 2
fi

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SKILL_DIR="${REPO_ROOT}/skills/${SLUG}"

if [[ -d "${SKILL_DIR}" ]]; then
  echo "❌ ${SKILL_DIR} already exists. Pick a different slug or rm it first."
  exit 2
fi

mkdir -p "${SKILL_DIR}"

# source.md — frontmatter template + AR body placeholder
cat > "${SKILL_DIR}/source.md" <<EOF
---
slug: ${SLUG}
title_ar: "TODO — العنوان العربي"
description_ar: "TODO — وصف موجز بالعربية"
audience: "AR-primary, beginner|intermediate|advanced"
prerequisites: []
est_runtime_min: 30
maturity: mve-partial
requires_local_terminal: true
mobile_friendly_first_steps: false
inspired_by: null
---

# TODO — Lesson title (Arabic)

<!-- Start writing in Arabic. This is the source of truth.
     Build pipeline emits claude/SKILL.md + codex/skill.json from this file
     once maturity ≥ mve-complete. -->

## التعريف

TODO — explain the concept in Arabic.

## ما ستتعلّمه

- TODO — bullet 1
- TODO — bullet 2
- TODO — bullet 3

## الخطوات

1. TODO — step 1
2. TODO — step 2
3. TODO — step 3

## الأخطاء الشائعة

- TODO — common mistake 1
- TODO — common mistake 2

## الموارد

- TODO — link to lab.md
- TODO — link to starter-repo/ if applicable
EOF

# lab.md — hands-on exercise template
cat > "${SKILL_DIR}/lab.md" <<EOF
# Lab — ${SLUG}

> **Goal**: TODO — what the learner will have built/done by the end of this lab.
> **Estimated time**: TODO min
> **Mobile-friendly first steps**: TODO yes/no

## Setup

TODO — step-by-step environment prep, in Arabic.

## Exercise

TODO — the actual lab. Each step in Arabic, with command examples.

## Acceptance criteria

The learner has completed the lab when:

- [ ] TODO — criterion 1
- [ ] TODO — criterion 2
- [ ] TODO — criterion 3

## Common errors and how to debug

TODO — list error → diagnosis → fix.
EOF

# test.sh — skeleton smoke test (always exits 0 by default — author replaces)
cat > "${SKILL_DIR}/test.sh" <<EOF
#!/usr/bin/env bash
# Smoke test for ${SLUG}.
# Exits 0 on success, non-zero on failure.
# Replace the placeholder check with real validation as the skill matures.
# Self-locates: works whether run from repo root or from within the skill dir.

set -euo pipefail
cd "\$(dirname "\$0")"

# Placeholder check: source.md exists
if [[ ! -f source.md ]]; then
  echo "❌ source.md missing"
  exit 1
fi

# Placeholder check: frontmatter has slug
if ! grep -q "^slug: ${SLUG}\$" source.md; then
  echo "❌ frontmatter slug mismatch"
  exit 1
fi

echo "✅ ${SLUG} placeholder smoke OK"
EOF
chmod +x "${SKILL_DIR}/test.sh"

# MATURITY.md — per-skill maturity log
cat > "${SKILL_DIR}/MATURITY.md" <<EOF
# ${SLUG} — maturity log

## Current stage

🌱 **MVE-partial** (scaffolded $(date -u +%Y-%m-%d))

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
| $(date -u +%Y-%m-%d) | Scaffolded via new-skill.sh | — | initial |

## Next iteration target

TODO — what would graduate this skill to the next stage?
EOF

echo "✅ Scaffolded ${SKILL_DIR}/"
echo ""
echo "Files created:"
ls -1 "${SKILL_DIR}/"
echo ""
echo "Next: edit source.md + lab.md (Arabic content), then run:"
echo "  npm run build:skill -- ${SLUG}"
echo "  bash skills/${SLUG}/test.sh"
