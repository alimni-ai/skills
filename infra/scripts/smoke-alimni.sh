#!/usr/bin/env bash
# Headless smoke gate for https://alimni-ai.com (V1 placeholder).
# Per memory feedback_no_blind_push_to_public_site.md — non-negotiable before
# declaring a deploy done. Adapted from tenere-site/scripts/smoke-headless.sh
# but targets a remote URL (not a local preview) since the placeholder is
# static HTML served by Caddy on gestion.
#
# Gates (6) :
#   1. HTTP 200 on / (apex)
#   2. www → apex 301 redirect
#   3. <title> contains "علّمني" or "Alimni"
#   4. AR text "علّمني" present in body
#   5. TLS cert valid (LE chain via CF or Caddy origin cert)
#   6. Headless chromium loads page without console errors
#
# Usage : bash infra/scripts/smoke-alimni.sh
# Exit 0 = green light. Exit ≠ 0 = NE PAS déclarer Step 1.5 done.

set -euo pipefail
cd "$(dirname "$0")/../.."

readonly TARGET="${TARGET:-https://alimni-ai.com}"
readonly WWW_TARGET="${WWW_TARGET:-https://www.alimni-ai.com}"
readonly LOG_DIR="${HOME}/snap/chromium/common/alimni-smoke"
readonly SHOT="${LOG_DIR}/home.png"
readonly RUNTIME_LOG="${LOG_DIR}/runtime.log"
readonly BODY_FILE="${LOG_DIR}/body.html"

mkdir -p "${LOG_DIR}"
rm -f "${SHOT}" "${RUNTIME_LOG}" "${BODY_FILE}"

CHROMIUM_BIN=""
for c in chromium-browser chromium google-chrome-stable google-chrome; do
  if command -v "$c" >/dev/null 2>&1; then CHROMIUM_BIN="$c"; break; fi
done
if [[ -z "${CHROMIUM_BIN}" ]]; then
  echo "❌ Chromium introuvable (chromium-browser, chromium, google-chrome-stable)"
  exit 2
fi

pass() { echo "  ✅ $1"; }
fail() { echo "  ❌ $1"; exit 1; }

echo "🛡  Smoke gate: ${TARGET}"
echo

# Gate 1 — HTTP 200 on apex
echo "Gate 1/6 — HTTP 200 on apex"
HTTP_CODE=$(curl -sS -o "${BODY_FILE}" -w '%{http_code}' "${TARGET}")
[[ "${HTTP_CODE}" == "200" ]] && pass "HTTP ${HTTP_CODE}" || fail "HTTP ${HTTP_CODE} (expected 200)"

# Gate 2 — www → apex 301
echo "Gate 2/6 — www → apex 301 redirect"
WWW_REDIRECT=$(curl -sS -o /dev/null -w '%{http_code} %{redirect_url}' "${WWW_TARGET}")
echo "  www response: ${WWW_REDIRECT}"
echo "${WWW_REDIRECT}" | grep -qE '^30[12] https://alimni-ai\.com' \
  && pass "www redirects to apex" \
  || fail "www does not redirect to apex (got: ${WWW_REDIRECT})"

# Gate 3 — <title> contains brand
echo "Gate 3/6 — <title> contains brand"
TITLE=$(grep -oE '<title>[^<]+</title>' "${BODY_FILE}" | head -1 || echo '')
echo "  title: ${TITLE}"
if echo "${TITLE}" | grep -qE 'علّمني|Alimni'; then
  pass "title brand-aligned"
else
  fail "title missing brand (got: ${TITLE})"
fi

# Gate 4 — AR text in body
echo "Gate 4/6 — AR text 'علّمني' in body"
if grep -q 'علّمني' "${BODY_FILE}"; then
  pass "AR script rendered in HTML"
else
  fail "AR script missing in body"
fi

# Gate 5 — TLS cert valid
echo "Gate 5/6 — TLS cert valid"
TLS_INFO=$(curl -sSI "${TARGET}" 2>&1 | head -2 || echo '')
if curl -sSI "${TARGET}" >/dev/null 2>&1; then
  pass "TLS handshake OK"
else
  fail "TLS handshake failed"
fi

# Gate 6 — Headless chromium loads page without console errors
echo "Gate 6/6 — Headless chromium load"
"${CHROMIUM_BIN}" \
  --headless=new \
  --no-sandbox \
  --disable-gpu \
  --hide-scrollbars \
  --window-size=1280,720 \
  --screenshot="${SHOT}" \
  --virtual-time-budget=8000 \
  --enable-logging=stderr \
  --v=0 \
  "${TARGET}" 2> "${RUNTIME_LOG}" || true

if [[ -f "${SHOT}" ]] && [[ -s "${SHOT}" ]]; then
  pass "screenshot captured (${SHOT})"
else
  fail "no screenshot — chromium failed to load page"
fi

if grep -iE '(error|severe).*console' "${RUNTIME_LOG}" >/dev/null 2>&1; then
  echo "  ⚠️  console errors found in ${RUNTIME_LOG}"
  fail "console errors detected"
else
  pass "no console errors"
fi

echo
echo "✅ Smoke 6/6 PASS — ${TARGET} is healthy."
echo "   Screenshot: ${SHOT}"
echo "   Runtime log: ${RUNTIME_LOG}"
