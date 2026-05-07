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

### 5.b — Cloudflare Email Routing (`hello@alimni-ai.com`) — ✅ done 2026-05-07

Destination is `contact@tenereonline.com` (TENERE corporate Workspace mailbox,
MX `smtp.google.com`), not Hervé's personal Gmail directly — per memory
`feedback_tenere_corporate_email_rule.md`. Single-inbox principle.

| Step | Status |
|---|---|
| Enable Email Routing in `alimni-ai.com` zone (CF auto-adds MX + SPF + DKIM) | ✅ done — `route1/2/3.mx.cloudflare.net` posted, SPF + `cf2024-1._domainkey` set |
| Verify destination `contact@tenereonline.com` | ✅ done — verification link clicked in Workspace |
| Forwarding rule: `hello@alimni-ai.com` → `contact@tenereonline.com` | ✅ Active |
| Catch-all (recommended): `*@alimni-ai.com` → `contact@tenereonline.com` | ⏳ Hervé to enable (currently Disabled+Drop in CF UI) |
| Test: send mail from third-party inbox → arrives in TENERE inbox | ✅ test-03 from `davies.herve@gmail.com` delivered (after first-mail Gmail MX cache delay on test-02) |

### 5.c — Caddy config + placeholder on gestion (✅ done 2026-05-07 — isolated via conf.d/ pattern)

| Step | Status |
|---|---|
| One-time `import conf.d/*.caddy` added to main `/etc/caddy/Caddyfile` (locks isolation envelope) | ✅ done |
| Alimni Caddy block in **isolated file** `/etc/caddy/conf.d/alimni-ai.caddy` (future edits never touch the main file) | ✅ done |
| `/var/www/alimni-ai/` directory created (owner `creed:creed`) | ✅ done |
| Placeholder `index.html` (AR primary `علّمني` + Latin secondary) deployed | ✅ done |
| `/var/log/caddy/alimni-ai.log` pre-created with `caddy:caddy` ownership | ✅ done |
| `caddy validate` + `caddy reload` clean | ✅ done |
| Cert `alimni-ai.com` obtained from LE (HTTP-01 via CF proxy) | ✅ done 12:27:07 UTC |
| Cert `www.alimni-ai.com` obtained from LE | ✅ done 12:18:50 UTC |
| Other tenants verified intact (gestion.rh2p / tenereonline / rimaya) | ✅ done — all 200 OK |

### 5.d — Smoke test + cert verification (✅ done 2026-05-07 — 6/6 PASS)

Bot Fight Mode OFF (Hervé) was the only CF blocker — Security Level adjustment
proved unnecessary. Smoke ran clean.

| Check | Status |
|---|---|
| `curl -sSI https://alimni-ai.com` → 200 + valid LE cert + `server: cloudflare` | ✅ HTTP/2 200 |
| `curl -sSI https://www.alimni-ai.com` → 301 redirect to apex | ✅ `location: https://alimni-ai.com/` |
| `<title>` brand-aligned | ✅ `<title>علّمني — Alimni AI · Arabic AI Engineering Academy</title>` |
| AR text `علّمني` rendered in HTML body | ✅ confirmed |
| TLS handshake | ✅ valid LE cert obtained 12:27:07 UTC |
| Headless chromium load (no console errors) | ✅ screenshot captured at `~/snap/chromium/common/alimni-smoke/home.png` |
| Public URL: https://alimni-ai.com | ✅ **LIVE** |

Smoke gate output:
```
✅ Smoke 6/6 PASS — https://alimni-ai.com is healthy.
```

---

## Final brand-lock decision

- [x] Step 1.1 domain primary acquired (alimni-ai.com) ✅ 2026-05-07
- [ ] Step 1.1 domain insurance acquired (alimniai.com — optional, recommended)
- [ ] Step 1.2 trademark cleared
- [ ] Step 1.3 reputational scan clean
- [ ] Step 1.4 5 handles secured
- [x] Step 1.5 `alimni-ai.com` live with valid TLS cert + email routing + headless smoke 6/6 ✅ 2026-05-07
- [ ] **Brand: Alimni AI** confirmed locked

If any check fails → fallback to `allimni-ai.com` (double-l) → `mu3allim-ai.com` → `muhandis.dev` → re-brainstorm.

---

**Last updated**: 2026-05-07 nuit — `alimni-ai.com` LIVE end-to-end :
- ✅ Hosting LIVE : `https://alimni-ai.com` Astro landing déployée 14:13 UTC, smoke 6/6 PASS
  - Backup placeholder W1 préservé sur gestion à `/var/www/alimni-ai.bak.20260507-141253-pre-landing/` (rollback en `sudo rsync -av --delete /var/www/alimni-ai.bak.../ /var/www/alimni-ai/`)
- ✅ Email Routing LIVE : `hello@alimni-ai.com` → `contact@tenereonline.com` (Active, test-03 livré)
- ✅ Caddy isolation conf.d/ pattern locké
- ✅ Repo skeleton + CI + build pipeline en place (commit `62f12fb`)
- ✅ Council Claude+Ines reframing intégré (4 patches : positioning across tools, moat = boucle feedback, format MVE ladder, audience triple-couche + mobile/B2B)
- ⏳ Pending Hervé : catch-all email + SSL Full strict + Step 1.2/1.3/1.4 (trademark / reputational / 5 social handles) + GitHub org `alimni-ai` création + écriture contenu AR pour skill #1
