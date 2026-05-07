# Alimni AI Brand-Lock Report

**Project**: Alimni AI — Arabic AI Engineering Academy
**Brand (AR primary)**: علّمني
**Brand (Latin secondary)**: Alimni AI
**Owner**: Hervé Davies Paul (independent side-business, not under TENERE LLC)
**Date initiated**: 2026-05-07
**Status**: 🟡 In progress (1 of 5 checks done)

> Plan reference: Task 1, `docs/superpowers/plans/2026-05-07-alimni-mvp-implementation.md`
> Spec reference: §9 Brand & identity, `docs/superpowers/specs/2026-05-07-arabic-academy-mvp-design.md`

This report documents brand-lock outcomes. **All checks must be ✅ before any public communication.**

---

## Step 1.1 — Domain purchases

### ✅ `alimni-ai.com` (primary canonical)

| Field | Value |
|---|---|
| Registrar | Cloudflare Registrar |
| Status | **🟢 ACQUIRED — 2026-05-07** |
| Owner email | contact@tenereonline.com |
| WHOIS privacy | ON (CF default) |
| Auto-renew | ON (verify in CF dashboard) |
| Parking status | Currently no DNS records (will activate at Step 1.5: A records + CF Email Routing) |
| Cost | $12/year |
| CF dashboard confirmation | Active · 0 records · 0 transfer · Free plan |

### ⏳ `alimniai.com` (typo-redirect insurance — recommended companion)

| Field | Value |
|---|---|
| Registrar | Cloudflare Registrar |
| Status | ⏳ pending — **decision pending Hervé** |
| Cost | $12/year |
| Purpose | 301 redirect to `alimni-ai.com` to recover users typing the URL without hyphen |
| Recommendation | **YES — buy now, $12 insurance** vs. losing typo traffic + risk of squatter parking it later |

**Hervé action**: optional — if you want ceinture-et-bretelles, buy `alimniai.com` now (same CF flow). If you skip, document the decision below.

---

## Step 1.2 — Trademark search

Goal: confirm "ALIMNI" + "ALIMNI AI" + "علّمني" are clear in Nice classes **9 (computer software)** + **41 (educational services)** in US + EU.

### USPTO TESS (US)
- URL: https://tmsearch.uspto.gov
- Queries: `ALIMNI`, `ALIMNI AI`, `علّمني` (also try `ALLIMNI` for double-l variants)
- Date searched: <FILL>
- Results in class 9: <FILL — count + notes>
- Results in class 41: <FILL — count + notes>
- **Specific check**: surface any "Alumni AI" alumni-engagement marks to verify class separation (we operate in AI education for devs; alumni-management is a different sub-class — coexistence acceptable)
- Conclusion: <CLEAR / SOFT_CONFLICT / HARD_CONFLICT>
- Screenshot: <PASTE PATH>

### EUIPO eSearch plus (EU)
- URL: https://euipo.europa.eu/eSearch
- Queries: same as USPTO
- Date searched: <FILL>
- Results: <FILL>
- Conclusion: <CLEAR / SOFT_CONFLICT / HARD_CONFLICT>
- Screenshot: <PASTE PATH>

### WIPO Madrid Monitor (global)
- URL: https://www3.wipo.int/branddb/en
- Queries: same
- Date searched: <FILL>
- Results: <FILL>
- Conclusion: <CLEAR / SOFT_CONFLICT / HARD_CONFLICT>
- Screenshot: <PASTE PATH>

### Overall trademark status
- ⏳ pending

---

## Step 1.3 — Reputational scan

Goal: surface any existing AI/dev brand using "Alimni" since 2024–2026 (recent enough to risk active conflict). Note: "Alumni AI" alumni-management products coexist in a different category — not a blocker.

### Google searches
- `"Alimni AI"` — <FILL: 1st page summary + screenshot path>
- `"علّمني AI"` — <FILL>
- `"Alimni dev"` — <FILL>
- `"Alimni academy"` — <FILL>
- `"Alimni Arabic AI"` — <FILL>

### X (Twitter) search
- `Alimni AI` — <FILL>
- `@alimni_ai` (handle exists?) — <FILL>

### GitHub
- Org `alimni-ai` available? — <FILL>
- Repos containing "alimni" — <FILL: top 5 results, any dev/AI ones?>

### LinkedIn
- Search "Alimni AI" — <FILL: any AI/tech company page?>

### Reputational status
- ⏳ pending

**Decision rule**: any AI/dev brand actively using "Alimni" since 2024 → fallback to `allimni-ai.com` (double-l) or `mu3allim-ai.com` (Arabish).

---

## Step 1.4 — Social handles secured

Goal: claim handles within 60 minutes of domain purchase (already done ~2026-05-07) to prevent squatting.

| Platform | Handle | URL | Status | Date | Screenshot |
|---|---|---|---|---|---|
| X | @alimni_ai | https://x.com/alimni_ai | ⏳ | | |
| LinkedIn Page | Alimni AI — Arabic AI Engineering Academy | <FILL> | ⏳ | | |
| Telegram (broadcast) | @alimni_ar | https://t.me/alimni_ar | ⏳ | | |
| GitHub Org | alimni-ai | https://github.com/alimni-ai | ⏳ | | |
| Bluesky | @alimni-ai.com (custom domain handle, free after domain registered) | <FILL> | ⏳ | | |

All handles use `hello@alimni-ai.com` once Cloudflare Email Routing is live (Step 1.5b). Fallback to `contact@tenereonline.com` only if a handle has to be claimed before routing is up — update the handle email after.

**Hervé action**: claim all 5 handles in the next 30 minutes.

---

## Step 1.5 — `alimni-ai.com` hosting setup (V1, single-track)

> **Revised 2026-05-07**: V1 lives directly on `alimni-ai.com` from W0 — no transitional sub-domain (spec §9). Brand-aligned URL from day 1.

### 5.a — Cloudflare DNS (in `alimni-ai.com` zone)

| Record | Value | Status |
|---|---|---|
| `A @` → gestion VPS public IPv4 (proxied 🟠) | ⏳ pending | |
| `A www` → gestion VPS public IPv4 (proxied 🟠) | ⏳ pending | |
| SSL/TLS mode = Full (strict) | ⏳ pending verify | |

### 5.b — Cloudflare Email Routing (`hello@alimni-ai.com`)

| Step | Status |
|---|---|
| Enable Email Routing in `alimni-ai.com` zone (CF auto-adds MX + SPF) | ⏳ pending |
| Verify destination `davies.herve@gmail.com` | ⏳ pending |
| Forwarding rule: `hello@alimni-ai.com` → Hervé Gmail | ⏳ pending |
| Optional catch-all: `*@alimni-ai.com` → Hervé Gmail | ⏳ pending |
| Test: send mail from third-party inbox → arrives within 60s | ⏳ pending |

### 5.c — Caddy config + placeholder on gestion

| Step | Status |
|---|---|
| `alimni-ai.com, www.alimni-ai.com` block in Caddyfile | ⏳ pending |
| `/var/www/alimni-ai/` directory + placeholder `index.html` (AR primary + EN secondary) | ⏳ pending |
| `caddy reload` clean (no syntax error, no port conflict) | ⏳ pending |

### 5.d — Smoke test + cert verification (headless gate, non-negotiable)

| Check | Status |
|---|---|
| `curl -sSI https://alimni-ai.com` → 200 + valid LE cert + `server: cloudflare` | ⏳ pending |
| `curl -sSI https://www.alimni-ai.com` → 301 redirect to apex | ⏳ pending |
| AR text `علّمني` rendered in HTML body | ⏳ pending |
| Headless smoke (6 gates) PASS | ⏳ pending |
| Public URL: https://alimni-ai.com | ⏳ pending |

**Claude action** (after Hervé confirms handles secured): SSH gestion, configure DNS + Email Routing + Caddy, deploy placeholder, run headless smoke gate.

---

## Final brand-lock decision

- [x] Step 1.1 domain primary acquired (alimni-ai.com) ✅ 2026-05-07
- [ ] Step 1.1 domain insurance acquired (alimniai.com — optional, recommended)
- [ ] Step 1.2 trademark cleared
- [ ] Step 1.3 reputational scan clean
- [ ] Step 1.4 5 handles secured
- [ ] Step 1.5 `alimni-ai.com` live with valid TLS cert + email routing + headless smoke 6/6
- [ ] **Brand: Alimni AI** confirmed locked

If any check fails → fallback to `allimni-ai.com` (double-l) → `mu3allim-ai.com` → `muhandis.dev` → re-brainstorm.

---

**Last updated**: 2026-05-07 — `alimni-ai.com` purchased on Cloudflare ✅, hosting strategy revised to single-track (spec §9 + plan revised same day, see commit log). Awaiting handles + scans + Step 1.5 (DNS + email routing + Caddy + smoke).
