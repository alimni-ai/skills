#!/usr/bin/env bash
# Smoke test for setup-agentic-ar.
# Exits 0 on success, non-zero on failure.
# Replace the placeholder check with real validation as the skill matures.
# Self-locates: works whether run from repo root or from within the skill dir.

set -euo pipefail
cd "$(dirname "$0")"

# Placeholder check: source.md exists
if [[ ! -f source.md ]]; then
  echo "❌ source.md missing"
  exit 1
fi

# Placeholder check: frontmatter has slug
if ! grep -q "^slug: setup-agentic-ar$" source.md; then
  echo "❌ frontmatter slug mismatch"
  exit 1
fi

echo "✅ setup-agentic-ar placeholder smoke OK"
