#!/usr/bin/env bash
# Smoke test for setup-agentic-ar.
# Two modes:
#   1. Author mode (default, in CI):     verify the skill source files exist + frontmatter sane
#   2. Learner mode (--learner-repo PATH): verify the learner has produced a real artifact
#
# Exits 0 on success, non-zero on failure.

set -euo pipefail
cd "$(dirname "$0")"

LEARNER_REPO=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --learner-repo) LEARNER_REPO="$2"; shift 2 ;;
    *) echo "❌ unknown arg: $1"; exit 2 ;;
  esac
done

# ── Mode 1: author smoke (always run) ──────────────────────────────────────

if [[ ! -f source.md ]]; then
  echo "❌ source.md missing"
  exit 1
fi

if ! grep -q "^slug: setup-agentic-ar$" source.md; then
  echo "❌ frontmatter slug mismatch"
  exit 1
fi

if ! grep -q "^publishes_artifact: true$" source.md; then
  echo "❌ Alimni golden rule: source.md must declare 'publishes_artifact: true'"
  exit 1
fi

if ! grep -q "^artifact_kind:" source.md; then
  echo "❌ Alimni golden rule: source.md must declare 'artifact_kind'"
  exit 1
fi

if ! grep -q "lesson-1-output.md" lab.md; then
  echo "❌ lab.md must reference lesson-1-output.md (the learner artifact file)"
  exit 1
fi

if ! grep -q "Vercel\|Cloudflare Pages" lab.md; then
  echo "❌ lab.md must include at least one publish target (Vercel or Cloudflare Pages)"
  exit 1
fi

echo "✅ author smoke OK (source.md + lab.md declare artifact contract)"

# ── Mode 2: learner artifact validation ────────────────────────────────────

if [[ -z "$LEARNER_REPO" ]]; then
  exit 0
fi

if [[ ! -d "$LEARNER_REPO" ]]; then
  echo "❌ learner repo not found: $LEARNER_REPO"
  exit 1
fi

cd "$LEARNER_REPO"

if [[ ! -d .git ]]; then
  echo "❌ learner repo is not a git repository"
  exit 1
fi

if [[ ! -f index.html ]]; then
  echo "❌ learner repo missing index.html"
  exit 1
fi

if ! grep -qi 'dir="rtl"' index.html; then
  echo "❌ index.html missing dir=\"rtl\" — Arabic page will display reversed"
  exit 1
fi

if ! grep -qi 'lang="ar"' index.html; then
  echo "❌ index.html missing lang=\"ar\""
  exit 1
fi

if ! grep -qi 'charset="utf-8"' index.html; then
  echo "❌ index.html missing UTF-8 meta charset"
  exit 1
fi

if [[ ! -f README.md ]]; then
  echo "❌ learner repo missing README.md"
  exit 1
fi

if [[ ! -f lesson-1-output.md ]]; then
  echo "❌ learner repo missing lesson-1-output.md (the artifact ledger)"
  exit 1
fi

if ! grep -qE 'https?://[^ )]+' lesson-1-output.md; then
  echo "❌ lesson-1-output.md does not contain a published URL — artifact incomplete"
  exit 1
fi

echo "✅ learner artifact OK — repo + RTL Arabic page + published URL recorded"
