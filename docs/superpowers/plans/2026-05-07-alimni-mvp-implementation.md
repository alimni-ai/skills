# Alimni AI Academy MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship Alimni AI Academy V1 — 5 Arabic skills for agentic coding tools (Claude Code + Codex), a static RTL landing page, distribution loops (LinkedIn AR/FR + Telegram + X + YT Shorts), and activation telemetry — within 12 weeks, with go/no-go gates at weeks 4, 8, and 12.

**Architecture:** Monorepo at `/home/creed/alimni`. Single-source-of-truth `source.md` per skill compiles to Claude Code SKILL.md + Codex skill.json via Node build script. GitHub Actions CI tests every skill against both harnesses on push. Static Astro landing on `alimni-ai.com` (gestion VPS + Caddy + CF). Activation telemetry: anonymous opt-in completion ping → simple Express endpoint on gestion → Postgres count.

**Tech Stack:** Node 20+, GitHub Actions, Astro static + RTL CSS, Caddy, Cloudflare DNS, Postgres (existing on gestion), Bash (skill test runners), Markdown frontmatter (skill metadata). No build framework lock-in — boring stack on purpose.

**Owner:** Hervé (solo founder). Support roles: Claude (drafting + spec/plan reviews + Wissam loading), Ines (dual-think on hard decisions), Wissam corpus (SOTA references).

**Bandwidth budget:** 5–8 hours per week. If a week exceeds 10 hours, the next week is a "skip-week" (build note only, no skill work). This is non-negotiable per the founder-bandwidth risk in the spec.

**Non-negotiables (locked from spec):**
- No paid tier, no payment plumbing, until V1 activation thresholds met
- Skills written from first principles in Arabic — no third-party transcript adaptation
- All founder-voice posts written manually — LinkedIn AR + ENG + FR variants are 3 separate manual writes from a single canonical build note source. **No AI translation, no auto-cross-post for written content.**
- One source asset → N platform variants (manual for written, automated only for format adaptation)
- No own Discord/Slack/forum in V1 (moderation debt)
- No voice cloning of any creator
- TTS narration labeled per EU AI Act Article 50 (effective 2026-08-02)

**Distribution tiers (locked from spec §7):**
- 🟢 **Primary** (every build note + release): GitHub · LinkedIn AR · LinkedIn ENG · LinkedIn FR · X · Telegram · YT Shorts
- 🟡 **Secondary** (every skill release, repurposed from YT Shorts asset): TikTok · Instagram Reels · YouTube long-form · Threads
- 🟠 **Opportunistic** (bounded events: W4 launch + W8 flagship + W12 V1 close): Product Hunt · Hacker News · Reddit · existing AR/MENA dev community drops

**Hosting strategy (locked from spec §9 — single-track, revised 2026-05-07):**
- ✅ W0: `alimni-ai.com` acquired at Cloudflare Registrar ($12/yr, registered 2026-05-07).
- W1: V1 hosted directly on `alimni-ai.com` (Caddy on gestion VPS + CF DNS + LE cert). Brand-aligned URL from day 1, no transitional sub-domain, no W6 migration to plan.
- Optional: acquire `alimniai.com` typo-redirect ($12/yr, permanent 301 → `alimni-ai.com`). Decision pending Hervé in `brand-lock-report.md`.
- GitHub repo URL `github.com/alimni-ai/skills` is immutable from day 1 — install commands never break.

**Execution mode (locked from EXECUTION_MODE.md):**
- 🤖 Subagent for: Task 2 (repo+CI), Task 6 (telemetry), code-only parts of Task 4 + 11
- 🧑 Inline (Hervé) for: Task 1 (brand), Tasks 3/5/7/9/11 (skill content), Task 8 (publish + push), Task 10 (outreach), Task 12 (retro)
- 🚦 HITL gates (Hervé+Claude council): W4, W6 (migration), W8, W12, plus AR native review before each skill publish
- See `EXECUTION_MODE.md` at repo root for the full task→mode mapping.

---

## File Structure (created across the 12 weeks)

```
/home/creed/alimni/
├── README.md                                  ← W2
├── COMPATIBILITY.md                           ← W2 (skill-vs-harness matrix)
├── LICENSE                                    ← W2 (MIT or Apache-2.0)
├── package.json                               ← W2
├── .gitignore                                 ← W2
├── .github/workflows/ci.yml                   ← W2
├── scripts/
│   ├── build.js                               ← W2 (source.md → harness outputs)
│   └── new-skill.sh                           ← W3 (scaffolds a new skill dir)
├── skills/
│   ├── setup-agentic-ar/                      ← W3 (target maturity: 🌿 MVE-complete)
│   ├── prompt-loop-ar/                        ← W5 (target maturity: 🌿 MVE-complete)
│   ├── ship-real-product-ar/                  ← W7 (target maturity: 🌿 MVE-complete — flagship)
│   ├── repo-to-agent-ar/                      ← W9 (target maturity: 🌱 MVE-partial)
│   └── n8n-mcp-pipeline-ar/                   ← W11 (target maturity: 🌱 MVE-partial)
│       └── (each contains per maturity stage — see spec §6:
│            🌱 MVE-partial: source.md + lab.md + test.sh + MATURITY.md
│            🌿 MVE-complete: + starter-repo/ + claude/SKILL.md + codex/skill.json
│            🌳 Mature (V2): + cheatsheet.md + examples/ + credits.md)
├── landing/                                   ← W4
│   ├── astro.config.mjs
│   ├── src/pages/index.astro
│   ├── src/components/SkillCard.astro
│   ├── src/styles/rtl.css
│   └── public/
│       ├── og-image.png
│       └── alimni-logo.svg
├── telemetry/                                 ← W6
│   ├── server.js                              (Express ping endpoint)
│   ├── schema.sql                             (Postgres table)
│   └── README.md
├── distribution/
│   ├── build-notes/                           ← W2 (logs of weekly LinkedIn posts)
│   │   ├── 2026-05-XX-week-1.md
│   │   └── ...
│   ├── x-threads/                             ← W4
│   ├── yt-shorts-scripts/                     ← W4
│   └── creator-outreach-log.md                ← W10
└── docs/
    ├── superpowers/
    │   ├── specs/2026-05-07-arabic-academy-mvp-design.md  ← exists
    │   └── plans/2026-05-07-alimni-mvp-implementation.md  ← THIS FILE
    └── retro/
        └── 2026-XX-XX-v1-retrospective.md     ← W12
```

**Boundary principle:** each skill directory is self-contained. Each script is single-purpose. The landing is isolated from skills (independent deploy). Telemetry is its own service. Distribution artifacts are docs, not code.

---

## Phase 1 — Foundation (Weeks 1–4)

**Theme:** lock the brand, build the infra, ship the first skill.
**Gate at end of W4:** brand legally clear, repo + CI working, skill #1 published and tested by ≥3 real users.

### Task 1: Brand-lock checklist (Week 1)

**Files:**
- Create: `/home/creed/alimni/distribution/brand-lock-report.md`

This is non-code work but blocks everything downstream. **Done = a single committed report file documenting all outcomes + `alimni-ai.com` hosting live with valid TLS cert.**

**Recommended execution order (per founder priority — all steps are independent and can be parallelized, but launch in this order to minimize squatting risk):**
1. Step 1.1 (domain — ✅ done 2026-05-07) → Step 1.4 (handles) — within same hour as initial name commit
2. Steps 1.2 + 1.3 (trademark + reputational) — can run in parallel
3. Step 1.5 (`alimni-ai.com` DNS + Caddy + placeholder + email routing) — once name is provisionally cleared
4. Step 1.6 (commit) — at the end

- [x] **Step 1.1: Acquire `alimni-ai.com`** (✅ done 2026-05-07)

`alimni-ai.com` registered at Cloudflare Registrar on 2026-05-07 11:03:29 UTC, expires 2027-05-07. WHOIS-confirmed: registrar Cloudflare Inc., status `clientTransferProhibited` (CF default protection). DNS records will be added at Step 1.5 (no longer parked-only — V1 lives directly on this domain).

- Registrar: Cloudflare Registrar
- Owner email at registrar: `contact@tenereonline.com` (TENERE LLC operational email — Hervé's working inbox; brand-facing public email `hello@alimni-ai.com` is set up at Step 1.5b via CF Email Routing)
- WHOIS privacy: ON
- Auto-renew: verify ON in CF dashboard (avoid accidental drop)
- Cost: $12/year

Acceptance: ✅ domain visible in CF Registrar dashboard, WHOIS-confirmed.

- [ ] **Step 1.2: Trademark search**

Manual searches (free, ~30 min total):
- USPTO TESS: https://tmsearch.uspto.gov — search "ALIMNI" in classes 9 (computer software) + 41 (educational services)
- EUIPO eSearch plus: https://euipo.europa.eu/eSearch — same query
- WIPO Madrid Monitor: https://www3.wipo.int/branddb/en — global view
- For each: screenshot results page

Expected: "Alimni AI" is a generic Arabic noun ("agency"), so likely some unrelated commercial uses exist (real estate agencies, financial services). Acceptable as long as **no existing mark in classes 9 or 41 in target jurisdictions (US, EU, MENA)**.

Acceptance: 3 search screenshots embedded in report, conclusion line "No conflicting mark in classes 9+41 in US/EU as of 2026-05-XX" (or fallback decision).

- [ ] **Step 1.3: Reputational scan**

Run searches and document:
- Google: `"Alimni AI"`, `"Alimni AI dev"`, `"Alimni AI academy"`
- X search: `from:alimni_dev OR @alimni_ai`
- GitHub org search: https://github.com/alimni-ai
- LinkedIn page search: "Alimni AI"

Expected: surface any AI/dev product calling itself Alimni AI. If a recent (2025-2026) AI startup uses the name, even unregistered, it's a soft conflict — fall back to `muhandis.dev`.

Acceptance: scan results documented in report, conclusion go/no-go on Alimni AI name.

- [ ] **Step 1.4: Secure social handles simultaneously**

Within 60 minutes of go-decision (handle squatters move fast), claim:
- X: `@alimni_ai`
- LinkedIn: company page "Alimni AI — Arabic AI Engineering Academy"
- Telegram: `@alimni_ar` (broadcast channel, not group)
- GitHub: org `alimni-dev` (or chosen variant from §13 of spec)
- Bluesky: `@alimni-ai.com` (cheap insurance)

Each handle: log URL + screenshot in report.

Acceptance: 5 handles secured, all linked in report. Use `hello@alimni-ai.com` if Step 1.5b (CF Email Routing) is already live; otherwise fall back to `contact@tenereonline.com` and update the handle email after routing is up.

- [ ] **Step 1.5: Setup `alimni-ai.com` on Caddy + CF DNS + email routing (V1 hosting)**

Per the single-track hosting strategy (spec §9), V1 lives directly on the canonical `alimni-ai.com` from W0 — no transitional sub-domain.

**5.a — Cloudflare DNS** (in the `alimni-ai.com` zone, which CF auto-created at registration):

Verify the zone exists in CF dashboard. Add records:

| Type | Name | Value | Proxy | TTL |
|---|---|---|---|---|
| A | `@` (root) | gestion VPS public IPv4 | 🟠 ON | Auto |
| A | `www` | gestion VPS public IPv4 | 🟠 ON | Auto |

Add AAAA records too if gestion has a public IPv6 (same proxied setup).

Verify SSL/TLS encryption mode in `alimni-ai.com` zone settings: must be **Full (strict)** — otherwise Caddy cannot issue a valid LE cert behind CF proxy.

- [ ] **5.b — Cloudflare Email Routing** (`hello@alimni-ai.com` → TENERE corporate inbox)

In CF dashboard → `alimni-ai.com` zone → Email → Email Routing → Enable. CF auto-adds the required MX + SPF records.

Destination is `contact@tenereonline.com` (single-inbox principle per memory `feedback_tenere_corporate_email_rule.md`), not Hervé's personal Gmail directly.

Add forwarding rule:
- `hello@alimni-ai.com` → `contact@tenereonline.com` (verify destination address via the confirmation link CF sends to that inbox)

Catch-all (recommended): `*@alimni-ai.com` → `contact@tenereonline.com` (insurance against typos like `info@`, `contact@`).

Acceptance: send a test email to `hello@alimni-ai.com` from a third-party inbox; confirms delivery to the TENERE corporate inbox within 60s.

- [ ] **5.c — Caddy config on gestion VPS (isolated conf.d/ pattern, locked 2026-05-07)**

SSH to gestion. The Alimni Caddy block lives in its own file under `/etc/caddy/conf.d/`, included via a one-time `import conf.d/*.caddy` directive at the bottom of the main `/etc/caddy/Caddyfile`. **Future Alimni edits never touch the main Caddyfile** — they only modify `conf.d/alimni-ai.caddy`. This keeps gestion's other tenants (gestion.rh2p, tenereonline, rimaya, cadragejn) safe from Alimni-side mistakes.

The Caddy block itself is checked into the Alimni repo at `infra/caddy/alimni-ai.caddy` (uses CF-only access matcher matching the TENERE/RIMAYA/BCF anti-phishing pattern, plus HSTS / X-Robots-Tag noindex for the placeholder phase).

Deploy:

```bash
# Push isolated Caddy block
scp infra/caddy/alimni-ai.caddy gestion:/tmp/alimni-ai.caddy
ssh gestion 'sudo install -m 0644 -o root -g root /tmp/alimni-ai.caddy /etc/caddy/conf.d/alimni-ai.caddy && rm /tmp/alimni-ai.caddy'

# Pre-create log file (Caddy runs as caddy user; if the file doesn't exist
# the reload fails with permission denied — pre-create with right ownership)
ssh gestion 'sudo install -m 0640 -o caddy -g caddy /dev/null /var/log/caddy/alimni-ai.log'

# Webroot
ssh gestion 'sudo mkdir -p /var/www/alimni-ai && sudo chown creed:creed /var/www/alimni-ai'
```

For now (W1, no landing built yet), drop a temporary `index.html`:

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>علّمني — Alimni AI</title>
  <meta name="description" content="أكاديمية عربية للذكاء الاصطناعي والبرمجة الذكية. قريبًا.">
</head>
<body style="font-family: serif; padding: 2rem; max-width: 600px; margin: auto; line-height: 1.7;">
  <h1 style="font-size: 3rem;">علّمني</h1>
  <p>أكاديمية عربية لأدوات البرمجة الذكية. قريبًا.</p>
  <p style="margin-top: 2rem;" dir="ltr"><strong>Alimni AI</strong> — Teach me AI, in Arabic. Coming soon.</p>
  <p style="margin-top: 2rem; font-size: 0.9rem; color: #666;" dir="ltr">
    <a href="mailto:hello@alimni-ai.com">hello@alimni-ai.com</a>
  </p>
</body>
</html>
```

Reload Caddy: `sudo caddy reload --config /etc/caddy/Caddyfile`.

- [ ] **5.d — Smoke test + cert verification (headless gate, non-negotiable)**

Per memory `feedback_no_blind_push_to_public_site.md`: build OK ≠ runtime OK. Run the headless smoke gate before declaring Step 1.5 done.

```bash
# Quick curl checks
curl -sSI https://alimni-ai.com | head -10
# Expected: HTTP/2 200, valid Let's Encrypt cert, server: cloudflare
curl -sSI https://www.alimni-ai.com | head -5
# Expected: 301 redirect → https://alimni-ai.com/
curl -sS https://alimni-ai.com | grep -o 'علّمني'
# Expected: matches (AR script rendered over HTTPS)

# Headless 6-gate smoke (reuse the TENERE script pattern, adapted)
bash /home/creed/tenere-site/scripts/smoke-headless.sh https://alimni-ai.com
# Gates: DOM mounted / no console error / title present / AR text rendered / TLS cert valid / CF proxy active
```

If LE cert fails: confirm CF SSL/TLS mode is **Full (strict)**, not Flexible.

Acceptance: `https://alimni-ai.com` returns 200 with placeholder page, valid TLS cert, AR text renders, www→apex redirect works, headless smoke 6/6 PASS. Document URL + cert info + smoke output in `brand-lock-report.md`.

- [ ] **Step 1.6: Commit brand-lock report**

```bash
cd /home/creed/alimni
git add distribution/brand-lock-report.md
git commit -m "brand: lock Alimni AI — domain insurance + subdomain live + trademark clear + handles secured"
git tag w1-brand-locked
git push --tags  # if remote already exists; else defer to Task 2
```

**Time estimate:** 4–5h total (registrar + 3 manual searches + handles + Caddy/CF setup + smoke).
**Blocks:** all downstream tasks. If Alimni AI fails any of the 4 checks (Steps 1.1–1.4) → fall back to `muhandis.dev` and re-run Task 1 with new name (add 1 week to plan).

---

### Task 2: Repo skeleton + CI (Week 2)

**Files:**
- Create: `/home/creed/alimni/README.md`
- Create: `/home/creed/alimni/COMPATIBILITY.md`
- Create: `/home/creed/alimni/LICENSE`
- Create: `/home/creed/alimni/package.json`
- Create: `/home/creed/alimni/.gitignore`
- Create: `/home/creed/alimni/scripts/build.js`
- Create: `/home/creed/alimni/.github/workflows/ci.yml`
- Create: `/home/creed/alimni/distribution/build-notes/2026-05-XX-week-1-foundations.md` (build note from Week 1 brand-lock work)

- [ ] **Step 2.1: README + LICENSE + .gitignore**

`README.md` (≤30 lines): one-paragraph what + who + how to install. RTL banner. Link to landing once live. Link to spec.
`LICENSE`: MIT (most permissive, widely accepted; Apache-2.0 if patent concerns — none here).
`.gitignore`: `node_modules/`, `.env*`, `dist/`, `.DS_Store`, `landing/dist/`.

Acceptance: 3 files exist, `git status` shows them clean.

- [ ] **Step 2.2: package.json**

```json
{
  "name": "alimni-skills",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "node scripts/build.js",
    "test": "node --test scripts/build.test.js",
    "lint:skills": "node scripts/lint-skills.js"
  },
  "engines": { "node": ">=20" }
}
```

Acceptance: `node --version` ≥ 20 confirmed; `npm init -y` not used (file is hand-written, no junk).

- [ ] **Step 2.3: Write failing test for build script**

Create `scripts/build.test.js`:

```js
import { test } from 'node:test';
import assert from 'node:assert';
import { compileSkill } from './build.js';
import { readFileSync, mkdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

test('compileSkill emits Claude SKILL.md and Codex skill.json from source.md', () => {
  const tmp = join(tmpdir(), `alimni-test-${Date.now()}`);
  mkdirSync(tmp, { recursive: true });
  const sourcePath = join(tmp, 'source.md');
  const fixture = `---\nslug: test-skill\ntitle_ar: مهارة اختبار\nestimated_runtime: 10m\nharness: [claude, codex]\n---\n\n# مهارة اختبار\n\nمحتوى الاختبار.\n`;
  require('node:fs').writeFileSync(sourcePath, fixture);

  compileSkill(sourcePath, tmp);

  const claudeOut = readFileSync(join(tmp, 'claude/SKILL.md'), 'utf8');
  const codexOut = JSON.parse(readFileSync(join(tmp, 'codex/skill.json'), 'utf8'));

  assert.match(claudeOut, /مهارة اختبار/);
  assert.equal(codexOut.slug, 'test-skill');
  assert.equal(codexOut.harness.includes('codex'), true);

  rmSync(tmp, { recursive: true, force: true });
});
```

- [ ] **Step 2.4: Run test, verify it fails**

Run: `npm test`
Expected: FAIL with "Cannot find module './build.js'" or "compileSkill is not a function".

- [ ] **Step 2.5: Write minimal build.js**

```js
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';

export function compileSkill(sourcePath, outDir) {
  const raw = readFileSync(sourcePath, 'utf8');
  const match = raw.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error(`No frontmatter in ${sourcePath}`);
  const [, frontmatterRaw, body] = match;
  const meta = Object.fromEntries(
    frontmatterRaw.split('\n').map((line) => {
      const [k, ...rest] = line.split(':');
      return [k.trim(), rest.join(':').trim()];
    })
  );

  // Claude Code SKILL.md format
  mkdirSync(join(outDir, 'claude'), { recursive: true });
  writeFileSync(
    join(outDir, 'claude/SKILL.md'),
    `---\nname: ${meta.slug}\ndescription: ${meta.title_ar}\n---\n\n${body}`
  );

  // Codex Agent Skills skill.json format
  mkdirSync(join(outDir, 'codex'), { recursive: true });
  writeFileSync(
    join(outDir, 'codex/skill.json'),
    JSON.stringify(
      {
        slug: meta.slug,
        title_ar: meta.title_ar,
        estimated_runtime: meta.estimated_runtime,
        harness: meta.harness?.replace(/[\[\]]/g, '').split(',').map((s) => s.trim()),
        body,
      },
      null,
      2
    )
  );
}

if (import.meta.url === `file://${process.argv[1]}`) {
  // CLI entry — compile all skills under skills/
  const { readdirSync } = await import('node:fs');
  const skillDirs = readdirSync('skills', { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
  for (const slug of skillDirs) {
    const src = `skills/${slug}/source.md`;
    compileSkill(src, `skills/${slug}`);
    console.log(`compiled: ${slug}`);
  }
}
```

- [ ] **Step 2.6: Run test, verify it passes**

Run: `npm test`
Expected: PASS, 1 test, 0 failures.

- [ ] **Step 2.7: GitHub Actions CI**

Create `.github/workflows/ci.yml`:

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm test
      - run: npm run build
      - name: Verify all skills compile
        run: ls skills/*/claude/SKILL.md && ls skills/*/codex/skill.json
```

(The "verify all skills compile" step will fail until W3 when first skill exists — that's expected. Comment it out for now or guard with `if [ -d skills/*/claude ]`.)

- [ ] **Step 2.8: COMPATIBILITY.md skeleton**

Create `COMPATIBILITY.md`:

```markdown
# Compatibility Matrix

| Skill | Claude Code | Codex | Cursor | Windsurf |
|---|---|---|---|---|
| (skills appear here as they ship) | | | | |

Legend: ✅ tested working · ⚠️ experimental · ❌ unsupported
```

- [ ] **Step 2.9: Push to GitHub + verify CI green**

```bash
gh repo create alimni-ai/skills --public --source=. --remote=origin --push
```

Wait for CI run. Expected: green check on `main`.

- [ ] **Step 2.10: Build note #1 (Week 1+2 wrap) — 3 LinkedIn variants from single source**

Create `distribution/build-notes/2026-05-XX-week-1-foundations.md` as the **canonical source** with:
- What I shipped this week (brand-locked, repo live, CI green)
- One specific lesson learned
- Link to repo
- 3 manually-written language variants in the same file (clearly delimited):
  - AR variant (~150 words, MSA simple, dev-community register)
  - ENG variant (~150 words, native ENG, builder/AI/dev register)
  - FR variant (~150 words, native FR, founder voice)

**Each variant is written by Hervé manually, not auto-translated.** AI may help with research outline only. Variants share the same insight but adapt the cultural register — they are not word-for-word the same.

Then publish manually:
- LinkedIn AR — AR variant
- LinkedIn ENG — ENG variant
- LinkedIn FR — FR variant
- X thread (ENG + AR variants, ~5 tweets each)
- Telegram channel pinned message (AR variant)

Acceptance: 3 LinkedIn posts live, 1 X thread live, 1 Telegram pin live, build note .md file committed with all 3 language variants delimited.

- [ ] **Step 2.11: Commit + tag W2**

```bash
git add -A
git commit -m "infra: repo skeleton + build script + CI green"
git tag w2-foundation-complete
git push --tags
```

**Time estimate:** 6h (most front-loaded effort of the project).

---

### Task 3: Skill #1 `setup-agentic-ar` (Week 3)

**Files:**
- Create: `/home/creed/alimni/skills/setup-agentic-ar/source.md`
- Create: `/home/creed/alimni/skills/setup-agentic-ar/test.sh`
- Create: `/home/creed/alimni/skills/setup-agentic-ar/examples/hello-claude.md`
- Create: `/home/creed/alimni/scripts/new-skill.sh` (helper to scaffold future skills)
- Modify: `/home/creed/alimni/COMPATIBILITY.md` (add row)
- Modify: `/home/creed/alimni/.github/workflows/ci.yml` (un-guard the verify step)

This is the foundational skill — it gets installed first and assumed installed by every later skill. Quality bar is high.

- [ ] **Step 3.1: Write `new-skill.sh` helper**

```bash
#!/usr/bin/env bash
set -euo pipefail
SLUG="${1:?usage: new-skill.sh <slug>}"
DIR="skills/${SLUG}"
mkdir -p "${DIR}/examples"
cat > "${DIR}/source.md" <<EOF
---
slug: ${SLUG}
title_ar: عنوان المهارة بالعربية
description_ar: وصف موجز للمهارة
estimated_runtime: 30m
prerequisites: []
inspired_by:
harness: [claude, codex]
audience: [maghreb, diaspora]
license: MIT
alimni_telemetry: true
---

# ${SLUG}

(Arabic content goes here)
EOF
cat > "${DIR}/test.sh" <<'EOF'
#!/usr/bin/env bash
set -euo pipefail
echo "smoke test for skill — replace with real assertions"
exit 0
EOF
chmod +x "${DIR}/test.sh"
echo "scaffolded ${DIR}"
```

Make it executable: `chmod +x scripts/new-skill.sh`. Run: `bash scripts/new-skill.sh setup-agentic-ar`.

Acceptance: directory `skills/setup-agentic-ar/` exists with `source.md` skeleton.

- [ ] **Step 3.2: Draft `source.md` content (the heavy task)**

Write the skill content **in Arabic, from first principles, 800–1500 words**. Outline:
1. شرح موجز: ما هو وكيل البرمجة (Claude Code, Codex) — 100 mots
2. التثبيت على macOS / Linux / WSL — étape par étape avec commandes shell
3. اختبار "Hello world" : premier prompt qui modifie un fichier réel
4. Configuration `~/.claude.json` minimaliste (model, env vars)
5. Configuration équivalente Codex
6. الأخطاء الشائعة وحلولها — 5 erreurs fréquentes (auth token, PATH, Node version, sandbox, network)
7. الخطوة التالية : pointer vers `prompt-loop-ar`

Frontmatter à compléter avec :
- `prerequisites: [Node 20+, terminal]`
- `inspired_by:` (laisser vide — skill 100% original)
- `estimated_runtime: 30m`

Acceptance:
- Word count between 800–1500 (use `wc -w skills/setup-agentic-ar/source.md`)
- ≥3 shell commands shown verbatim
- ≥1 example output block
- ≥5 troubleshooting entries
- No translated content from any third-party tutorial (manual self-check)

**Native AR review (mandatory before publish)**: send `source.md` to a native AR-speaker dev for review. If Hervé doesn't have one in his network yet, options:
- Post in Maghreb dev Slack/Discord asking for "20-min review of an Arabic tutorial"
- DM 2–3 Maghreb devs on X with a polite ask
- Pay a fixer on Workana / Khamsat (low cost, ~$15)

Block publishing until at least 1 review pass. Document reviewer in `inspired_by:` or a credits footer.

- [ ] **Step 3.3: Write real `test.sh`**

Replace placeholder with real smoke test:

```bash
#!/usr/bin/env bash
set -euo pipefail
SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Verify required frontmatter fields exist
grep -q '^slug: setup-agentic-ar$' "${SKILL_DIR}/source.md"
grep -q '^title_ar:' "${SKILL_DIR}/source.md"
grep -q '^harness:' "${SKILL_DIR}/source.md"

# Verify content has Arabic characters
grep -P '[\x{0600}-\x{06FF}]' "${SKILL_DIR}/source.md" >/dev/null

# Verify at least one shell command in body
grep -E '^\$ |^claude |^codex ' "${SKILL_DIR}/source.md" >/dev/null

echo "smoke OK: setup-agentic-ar"
```

- [ ] **Step 3.4: Write `examples/hello-claude.md`**

A 1-page worked example in AR showing a real session: prompt user wrote, output Claude produced, what changed in the repo. ~200 words AR. Real screenshots optional but encouraged.

- [ ] **Step 3.5: Compile + verify**

Run:
```bash
npm run build
bash skills/setup-agentic-ar/test.sh
ls skills/setup-agentic-ar/claude/SKILL.md
ls skills/setup-agentic-ar/codex/skill.json
```

Expected: all 4 commands succeed, no errors.

- [ ] **Step 3.6: Manual harness install test (real-world)**

In a fresh dir or VM:
- Install in Claude Code: `mkdir -p ~/.claude/skills/setup-agentic-ar && cp -r skills/setup-agentic-ar/claude/SKILL.md ~/.claude/skills/setup-agentic-ar/`. Open Claude Code, invoke `/setup-agentic-ar`, verify it loads.
- Install in Codex: follow OpenAI's `~/.codex/skills/` install path with `codex/skill.json`. Invoke and verify.

Document any harness-specific quirks in `COMPATIBILITY.md`.

Acceptance: ✅ marks for both Claude and Codex columns in the matrix for `setup-agentic-ar`.

- [ ] **Step 3.7: Update COMPATIBILITY.md**

Add row:

```markdown
| setup-agentic-ar | ✅ | ✅ | (V2) | (V2) |
```

- [ ] **Step 3.8: Build note #2**

`distribution/build-notes/2026-05-XX-week-3-skill-1-drafted.md`. Tease the skill, share one specific challenge solved (e.g., "Arabic CLI output debugging issue"). Manual writing. Cross-post LinkedIn AR/FR + X.

- [ ] **Step 3.9: Commit + tag**

```bash
git add -A
git commit -m "feat(skill): setup-agentic-ar V1 — Claude + Codex tested"
git tag w3-skill-1-drafted
git push --tags
```

**Time estimate:** 7–8h (writing AR content from scratch + native review wait).

---

### Task 4: Landing page MVP + Skill #1 publish + Gate 1 (Week 4)

**Files:**
- Create: `/home/creed/alimni/landing/astro.config.mjs`
- Create: `/home/creed/alimni/landing/package.json`
- Create: `/home/creed/alimni/landing/src/pages/index.astro`
- Create: `/home/creed/alimni/landing/src/components/SkillCard.astro`
- Create: `/home/creed/alimni/landing/src/styles/rtl.css`
- Create: `/home/creed/alimni/landing/public/alimni-logo.svg`
- Create: `/home/creed/alimni/landing/public/og-image.png`
- Create: Caddy config snippet on gestion VPS
- Create: `distribution/build-notes/2026-05-XX-week-4-launch.md`

- [ ] **Step 4.1: Astro init + RTL setup**

```bash
cd /home/creed/alimni/landing
npm create astro@latest . -- --template minimal --no-install --yes
npm install
```

Edit `astro.config.mjs` to set `site: 'https://alimni-ai.com'`. Edit `src/pages/index.astro`:
- `<html lang="ar" dir="rtl">`
- font: system AR fallback (`'Noto Naskh Arabic', 'Amiri', serif`) + monospace for code (`'JetBrains Mono', monospace`)
- 1 page, 5 sections: hero / value prop / 5 skill cards / "request a skill" form / founder build-in-public links

- [ ] **Step 4.2: Quick logo SVG**

A minimal placeholder: stylized و (Arabic letter "waw") + dot. ~30 lines of inline SVG. Hervé can iterate later or hire a designer ($200 Fiverr/Upwork).

Acceptance: `landing/public/alimni-logo.svg` renders cleanly at 32px and 256px.

- [ ] **Step 4.3: SkillCard component**

`src/components/SkillCard.astro` props: `slug`, `title_ar`, `description_ar`, `runtime`, `status` (`shipped` | `coming-soon`). Renders RTL card with install button (links to `https://github.com/alimni-ai/skills/tree/main/skills/<slug>`).

- [ ] **Step 4.4: Index page composition**

5 SkillCards, only 1 marked `shipped` for now (`setup-agentic-ar`), 4 as `coming-soon` with greyed CTAs. "Request a skill" form: Formspree endpoint (free tier), POST to a Hervé-controlled email. Consent checkbox + GDPR notice (1 sentence).

- [ ] **Step 4.5: Local preview + check**

Run: `npm run dev` (in `landing/`). Open http://localhost:4321. Verify:
- RTL flows right-to-left
- AR text renders cleanly
- Form submits a test entry to Formspree
- No console errors
- Mobile viewport: cards stack, no horizontal scroll

- [ ] **Step 4.6: Build static + deploy to gestion VPS at `alimni-ai.com`**

Per the single-track hosting strategy (spec §9), V1 deploys go directly to the canonical domain. Caddy + CF DNS + email routing were set up at Task 1 Step 1.5; here we just push the real built site over the W1 placeholder.

```bash
cd /home/creed/alimni/landing
npm run build  # outputs to landing/dist/
rsync -avz --delete landing/dist/ creed@gestion:/var/www/alimni-ai/
```

(Note: `/var/www/alimni-ai/` directory already exists from Task 1 Step 1.5c. The `--delete` flag removes the W1 placeholder index.html.)

Caddy config: **no change needed** — the `alimni-ai.com` block was already configured at Task 1 Step 1.5c. Caddy serves whatever is in `/var/www/alimni-ai/`.

Run smoke headless gate (non-negotiable per memory `feedback_no_blind_push_to_public_site.md`):

```bash
bash /home/creed/tenere-site/scripts/smoke-headless.sh https://alimni-ai.com
# Expected: 6/6 PASS — DOM mounted / no console error / title present / AR text rendered / TLS valid / CF proxy active
```

If smoke fails: rollback (`rsync` previous backup) before declaring deploy done.

- [ ] **Step 4.7: Smoke test runtime headless (per memory `feedback_no_blind_push_to_public_site.md`)**

This rule is non-negotiable. Local build OK ≠ runtime OK. Run a headless chromium check **before** announcing the launch:

```bash
# Reuse the smoke gate pattern from project_tenere_site_smoke_gate.md
# Adapt: 6 gates — DOM mounts, no console error, title contains "Alimni AI", AR text renders, form visible, no broken images
bash /home/creed/tenere-site/scripts/smoke-headless.sh https://alimni-ai.com
```

Or write a quick `landing/scripts/smoke.sh` adapted to the same 6-gate pattern. Block launch announcement until all 6 PASS.

Acceptance: 6/6 PASS in artefact log.

- [ ] **Step 4.8: Public launch announcement — Primary tier, full repurposing**

Manual writing (per non-negotiables) of the launch build note as the canonical source, then platform variants:

**Primary (all manual writing):**
- LinkedIn AR — launch story in MSA (~300 words)
- LinkedIn ENG — launch story in ENG (~300 words)
- LinkedIn FR — launch story in FR (~300 words)
- X thread (ENG version, ~7 tweets walking through what Alimni AI is)
- X thread (AR version, ~7 tweets, separate post not translation)
- Telegram channel pin (AR variant adapted)
- YouTube Shorts (60s screen-rec install demo, AR voiceover, AR + EN burned-in captions)

**🟠 Opportunistic for W4 (V1 launch is one of the 3 bounded opportunistic events per spec §7):**
- Reddit r/SideProject + r/arabs (1 polite post each, value-first, no link spam)
- Drop in 3–5 existing AR/MENA dev community Slacks/Discords Hervé already belongs to (polite share, not announcement)
- **Hacker News and Product Hunt are deferred to W8 or W12** — not at W4. Reasoning: HN and PH are 1-shot opportunities; we burn them when we have the strongest possible asset (flagship `ship-real-product-ar` at W8, or full V1 at W12), not the day after launch.

**Secondary (repurposed from YT Shorts asset):**
- TikTok — same vertical video, captions resized for TikTok, AR hashtags
- Instagram Reels — same vertical video, IG-tuned captions
- Threads (Meta) — auto-cross-post from X via Buffer/Hypefury (set up once at W2, runs automatically)

Acceptance: 7 primary posts live (3 LinkedIn + 2 X + Telegram + YT Shorts), 3 secondary posts live (TikTok + IG Reels + Threads auto), 2 opportunistic Reddit posts live, ≥3 community drops logged. 1 build note .md file committed with 3 LinkedIn variants delimited.

- [ ] **Step 4.9: 🚦 GATE 1 — go/no-go decision**

Compute go criteria (binary, no fudging):
- ✅ Brand legally clear (Task 1 report says go)
- ✅ Repo public, CI green, ≥1 skill compiled
- ✅ Landing live at https://alimni-ai.com with smoke 6/6 PASS
- ✅ Skill #1 tested install in 2 harnesses (Claude + Codex)
- ✅ ≥3 real users have invoked the skill end-to-end (ask 3 specific people in Hervé's network: friends, X followers, Maghreb dev community — 30-min ask)

If any criterion fails → STOP, fix it, do not proceed to W5. Document blocker in `docs/superpowers/plans/blockers/<topic>.md` and council-consult (Claude + Ines) on whether to pivot or push.

- [ ] **Step 4.10: Commit + tag W4**

```bash
git add -A
git commit -m "launch: V1 landing live + skill-1 published + gate-1 PASS"
git tag w4-gate-1-pass
git push --tags
```

**Time estimate:** 8–10h (Astro is overkill for 1 page but convention is fine; Caddy + DNS + smoke is the time sink).

---

## Phase 2 — Build (Weeks 5–8)

**Theme:** ship 2 more skills, instrument activation, grow audience.
**Gate at end of W8:** 3 skills shipped (incl. flagship `ship-real-product-ar`), telemetry live, ≥50 stars, first activation signals visible.

### Task 5: Skill #2 `prompt-loop-ar` (Week 5)

**Files:**
- Create: `/home/creed/alimni/skills/prompt-loop-ar/source.md`
- Create: `/home/creed/alimni/skills/prompt-loop-ar/test.sh`
- Create: `/home/creed/alimni/skills/prompt-loop-ar/examples/debug-session-real.md`
- Modify: `COMPATIBILITY.md` (add row)
- Create: `distribution/build-notes/2026-05-XX-week-5-skill-2-drafted.md`

Following the same 9-step pattern as Task 3, adapted for prompt-loop content:

- [ ] **Step 5.1:** `bash scripts/new-skill.sh prompt-loop-ar`
- [ ] **Step 5.2:** Draft AR content 800–1500 words covering: the prompt → run → read output → debug → re-prompt loop, common anti-patterns (vague prompts, ignoring errors, over-specifying), 2 worked examples (debugging a Python error, refactoring a function), the "5-second rule" (if I can't articulate what I want in 5s in my head, I shouldn't prompt yet)
- [ ] **Step 5.3:** Write `test.sh` smoke
- [ ] **Step 5.4:** `examples/debug-session-real.md` — a real 8-turn debug transcript translated/adapted from a Hervé session, screenshots OK
- [ ] **Step 5.5:** `npm run build` + smoke test
- [ ] **Step 5.6:** Manual install in Claude + Codex, document compat
- [ ] **Step 5.7:** Native AR review (1 reviewer minimum)
- [ ] **Step 5.8:** Build note #3 — the meta-lesson: "what I learned writing about prompt-debug while shipping skills using prompts"
- [ ] **Step 5.9:** Commit + tag `w5-skill-2-drafted`

**Time estimate:** 6h (faster than Task 3 because the format is now established).

---

### Task 6: Skill #2 publish + Telemetry + Telegram launch (Week 6)

**Files:**
- Modify: `/home/creed/alimni/landing/src/pages/index.astro` (mark skill #2 shipped)
- Create: `/home/creed/alimni/telemetry/server.js`
- Create: `/home/creed/alimni/telemetry/schema.sql`
- Create: `/home/creed/alimni/telemetry/README.md`
- Create: `/home/creed/alimni/telemetry/server.test.js`
- Modify: each skill `source.md` to add the optional ping snippet
- Create: `distribution/build-notes/2026-05-XX-week-6-telemetry-and-telegram.md`

Telemetry is the activation-tracking spine. **It must be opt-in, anonymous, and zero-PII.**

- [ ] **Step 6.1: Schema**

`telemetry/schema.sql`:

```sql
CREATE TABLE IF NOT EXISTS alimni_skill_completions (
  id BIGSERIAL PRIMARY KEY,
  skill_slug TEXT NOT NULL,
  harness TEXT NOT NULL CHECK (harness IN ('claude', 'codex', 'cursor', 'windsurf', 'unknown')),
  client_uuid TEXT NOT NULL,
  ts TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_completions_skill_ts
  ON alimni_skill_completions (skill_slug, ts DESC);
CREATE INDEX IF NOT EXISTS idx_completions_client
  ON alimni_skill_completions (client_uuid);
```

Apply on gestion: `sudo -u postgres psql alimni_telemetry < telemetry/schema.sql` (create the DB first: `CREATE DATABASE alimni_telemetry; CREATE USER alimni_telemetry WITH PASSWORD '...';`).

- [ ] **Step 6.2: Failing test for /ping endpoint**

`telemetry/server.test.js`:

```js
import { test, before, after } from 'node:test';
import assert from 'node:assert';
import { startServer } from './server.js';

let server;
before(async () => { server = await startServer({ port: 0, dbUrl: process.env.TEST_DB_URL }); });
after(async () => { await server.close(); });

test('POST /ping with valid body returns 204 and inserts row', async () => {
  const res = await fetch(`http://localhost:${server.port}/ping`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      skill_slug: 'setup-agentic-ar',
      harness: 'claude',
      client_uuid: 'test-uuid-1234',
    }),
  });
  assert.equal(res.status, 204);
});

test('POST /ping with invalid harness returns 400', async () => {
  const res = await fetch(`http://localhost:${server.port}/ping`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ skill_slug: 'x', harness: 'lol', client_uuid: 'y' }),
  });
  assert.equal(res.status, 400);
});
```

- [ ] **Step 6.3: Run test, verify it fails (no server.js yet)**

`npm test` → FAIL.

- [ ] **Step 6.4: Implement `telemetry/server.js`**

```js
import { createServer } from 'node:http';
import pg from 'pg';
const { Pool } = pg;

const ALLOWED_HARNESS = new Set(['claude', 'codex', 'cursor', 'windsurf', 'unknown']);

export async function startServer({ port = 8787, dbUrl = process.env.ALIMNI_DB_URL }) {
  const pool = new Pool({ connectionString: dbUrl });
  const server = createServer(async (req, res) => {
    if (req.method !== 'POST' || req.url !== '/ping') {
      res.writeHead(404).end();
      return;
    }
    let body = '';
    req.on('data', (c) => (body += c));
    req.on('end', async () => {
      try {
        const { skill_slug, harness, client_uuid } = JSON.parse(body);
        if (!skill_slug || !ALLOWED_HARNESS.has(harness) || !client_uuid) {
          res.writeHead(400).end();
          return;
        }
        await pool.query(
          'INSERT INTO alimni_skill_completions (skill_slug, harness, client_uuid) VALUES ($1, $2, $3)',
          [skill_slug, harness, client_uuid]
        );
        res.writeHead(204).end();
      } catch (e) {
        res.writeHead(400).end();
      }
    });
  });
  await new Promise((r) => server.listen(port, r));
  const actualPort = server.address().port;
  return {
    port: actualPort,
    close: () => new Promise((r) => server.close(() => pool.end().then(r))),
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  startServer({}).then((s) => console.log(`telemetry listening on ${s.port}`));
}
```

Add `pg` to `package.json` deps: `npm install pg`.

- [ ] **Step 6.5: Run test, verify it passes**

`TEST_DB_URL=postgres://alimni_telemetry:...@localhost/alimni_telemetry npm test` → PASS.

- [ ] **Step 6.6: Deploy as systemd service on gestion**

`/etc/systemd/system/alimni-telemetry.service`:

```ini
[Unit]
Description=Alimni AI telemetry ping endpoint
After=network.target postgresql.service

[Service]
Type=simple
User=creed
WorkingDirectory=/var/www/alimni-telemetry
EnvironmentFile=/home/creed/secrets/alimni-telemetry.env
ExecStart=/usr/bin/node server.js
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Caddy reverse proxy:

```
ping.alimni-ai.com {
    reverse_proxy localhost:8787
    log
}
```

`sudo systemctl daemon-reload && sudo systemctl enable --now alimni-telemetry && sudo caddy reload`.

Smoke: `curl -X POST https://ping.alimni-ai.com/ping -H 'content-type: application/json' -d '{"skill_slug":"smoke","harness":"unknown","client_uuid":"smoke-uuid"}' -w '\n%{http_code}\n'`. Expected: `204`.

- [ ] **Step 6.7: Add ping snippet to skills**

In each skill's `source.md`, add a final section "✅ المهارة مكتملة" with an opt-in:

```markdown
> اختياري: مساعدة Alimni AI على معرفة عدد المتعلّمين الذين أكملوا هذه المهارة (بدون أي بيانات شخصية).
> ```bash
> curl -sS -X POST https://ping.alimni-ai.com/ping \
>   -H 'content-type: application/json' \
>   -d '{"skill_slug":"setup-agentic-ar","harness":"claude","client_uuid":"'"$(uuidgen 2>/dev/null || echo anon)"'"}' >/dev/null
> ```
```

- [ ] **Step 6.8: Telegram broadcast channel real launch**

Channel `@alimni_ar` was claimed in Task 1. Now make it real:
- Pinned post: AR welcome + value prop + link to landing
- 1 launch post: AR + 1 image (skill #1 install GIF)
- Cross-link from LinkedIn + X

Acceptance: ≥10 subscribers within 48h of launch (signal that the cross-link works).

- [ ] **Step 6.9: Build note #4 (telemetry transparency)**

Important narrative move: explain publicly **why** telemetry is opt-in + anonymous. Builds trust with privacy-aware audience (especially MENA + diaspora). Manual writing.

- [ ] **Step 6.10: Skill #2 publish (mark shipped on landing, publish skill release)**

```bash
git tag skills-v0.2.0
git push --tags
gh release create skills-v0.2.0 --title "Alimni AI Skills v0.2.0 — prompt-loop-ar" --notes "..."
```

- [ ] **Step 6.11: 🚦 GATE INTERMEDIATE — W6 activation health-check**

Single-track hosting (spec §9 revised) means there is no domain-migration decision at W6. This gate now exists only as an honest activation-signal checkpoint to inform whether the V1 wedge is working — outcome shapes Task 7's effort budget, not domain plumbing.

Compute activation signals:
- Unique skill completions in telemetry (`SELECT COUNT(DISTINCT client_uuid) FROM alimni_skill_completions;`)
- GitHub stars
- Telegram subscribers
- Substantive inbound feedback signals (issue, PR, DM, thoughtful reply)
- Hervé bandwidth status: cumulative skip-weeks used so far (target ≤2)

Write the snapshot file (informational, no binary decision):

```bash
cat > distribution/w6-activation-snapshot.md <<'EOF'
# W6 Activation Snapshot — 2026-XX-XX

## Metrics computed
- Unique completions: <N>
- GitHub stars: <N>
- Telegram subs: <N>
- Feedback signals: <N>
- Skip-weeks used: <N>

## Health read
- Activation: STRONG / TEPID / WEAK
- Implication for Task 7 effort: lean in (flagship gets full 10h) / hold (flagship gets 6h, faster ship) / re-evaluate scope at W8 gate
- Notes: <one paragraph>
EOF
git add distribution/w6-activation-snapshot.md
```

Acceptance: snapshot file committed before W6 commit. Outcome is honest signal — no fudging — but no rollback or migration mechanics depend on it.

- [ ] **Step 6.12: Commit + tag W6**

```bash
git add -A
git commit -m "feat: telemetry + telegram launch + skill-2 + W6 activation snapshot"
git tag w6-telemetry-live
git push --tags
```

**Time estimate:** 10h (telemetry + ops + content). This is the most code-heavy week.

---

### Task 7: Skill #3 `ship-real-product-ar` draft (Week 7)

This is the **flagship skill** — 2-hour end-to-end build. Highest production value. Deserves more time than other skills.

**Files:**
- Create: `/home/creed/alimni/skills/ship-real-product-ar/source.md`
- Create: `/home/creed/alimni/skills/ship-real-product-ar/test.sh`
- Create: `/home/creed/alimni/skills/ship-real-product-ar/examples/built-product/` (a real working tiny product as the artifact — e.g., a static habit tracker deployable in 1 command)

> **Note (revised 2026-05-07)**: a previous version of this plan included a conditional W7 domain-migration step (Step 7.0) gated on W6 metrics. That step is removed — single-track hosting (spec §9) puts V1 directly on `alimni-ai.com` from W0, so no migration is ever needed.

- [ ] **Step 7.1:** Scaffold via `new-skill.sh`
- [ ] **Step 7.2:** Build the example product first (a real tiny CRUD or static tool that the skill teaches users to build). Document each prompt + response. ~2h of real building.
- [ ] **Step 7.3:** Write the AR skill content as a narrative walkthrough of that real session: idea → prompts → debug → deploy. 1500–2500 words (this skill is longer).
- [ ] **Step 7.4:** Test smoke + harness install
- [ ] **Step 7.5:** Native AR reviewer (and ideally a 2nd reviewer for the flagship)
- [ ] **Step 7.6:** Build note #5 — tease the upcoming flagship with a 30s screen-recording of the example product working
- [ ] **Step 7.7:** Commit + tag `w7-flagship-drafted`

**Time estimate:** 10h (heaviest content week — real product build is the time sink). If exceeds 12h, push publish to W9 and bump everything by 1 week.

---

### Task 8: Skill #3 publish + first viral push + Gate 2 (Week 8)

**Files:**
- Modify: `landing/src/pages/index.astro` (mark skill #3 shipped, update hero with "3 skills live")
- Create: `distribution/yt-shorts-scripts/skill-3-flagship.md` (60s screen-rec script)
- Create: `distribution/x-threads/skill-3-launch-thread.md`
- Create: `distribution/build-notes/2026-XX-XX-week-8-gate-2.md`

- [ ] **Step 8.1:** Publish skill #3, update landing, deploy. Re-run smoke.
- [ ] **Step 8.2:** YT Shorts (canonical video asset): record 60s screen-rec of the example product going from prompt to deployed URL. AR voiceover (Hervé's own voice OR labeled TTS per Spec §8 / EU AI Act Art. 50). Burn AR captions + small EN subs.

  **Then repurpose immediately to Secondary tier (same video file, no re-recording):**
  - TikTok — re-upload, captions resized + AR hashtags + 1 line French/Arabic hook
  - Instagram Reels — re-upload, IG caption rewrite (Reels-style hook)
  - YouTube long-form (5–8 min expanded version) — re-record with more depth, separate session ~1.5h
- [ ] **Step 8.3:** X thread — **two versions, manual**:
  - X thread ENG (10 tweets): the build narrative for global builder/AI audience
  - X thread AR (10 tweets): same narrative adapted for AR audience (not translated)
  - Threads (Meta) auto-mirror from X via Buffer/Hypefury (no manual step)
- [ ] **Step 8.4:** LinkedIn launch post — **3 manually-written variants**:
  - AR variant (~600 words MSA, dev-community register, story angle: "I shipped a product in 2 hours using this stack — here's the playbook")
  - ENG variant (~500 words native ENG, builder/AI register, same insight, different cultural framing)
  - FR variant (~500 words native FR, founder network angle)
- [ ] **Step 8.5: 🟠 Opportunistic — Product Hunt launch for skill #3 flagship**

  Submit `ship-real-product-ar` skill release as a Product Hunt launch (the flagship is strong enough to anchor a PH push). Prep:
  - PH listing copy (ENG, by Hervé manually)
  - First-comment thread explaining context (50% of PH launches die without it)
  - Recruit 5 hunters from Hervé's network for upvote support
  - Schedule for Tuesday-Thursday (best PH days)
  Skip PH if Hervé doesn't have ≥5 hunter contacts ready — burn the opportunity at W12 instead.
- [ ] **Step 8.6:** Reach out to 5 specific Maghreb / diaspora dev influencers via DM (X or LinkedIn). Polite ask: "I built a free Arabic skill for X — would love your honest take. No promo expected, just feedback." Track in `distribution/creator-outreach-log.md`.
- [ ] **Step 8.7:** Telegram pin update with skill #3 + Shorts embed.
- [ ] **Step 8.8: 🚦 GATE 2 — go/no-go decision**

Compute (binary):
- ✅ 3 skills shipped, all green on Claude + Codex
- ✅ Telemetry live, dashboard query shows ≥10 unique completions across all skills
- ✅ ≥50 GitHub stars
- ✅ ≥30 Telegram subscribers
- ✅ ≥1 inbound feedback signal (issue, PR, DM, or thoughtful reply on a build note)

If <3 of 5 hit → STOP, council-consult, may pivot strategy (e.g., switch from skill cadence to audience-first content for 2 weeks). If ≥4 → proceed to W9.

- [ ] **Step 8.9:** Commit + tag `w8-gate-2-result-<pass|warn|fail>`.

**Time estimate:** 8h (mostly distribution + outreach work).

---

## Phase 3 — Scale (Weeks 9–12)

**Theme:** finish 2 last skills, listen to feedback, close V1 with a clear retrospective.
**Gate at end of W12:** V1 success metrics evaluated; decision on V2 path documented.

### Task 9: Skill #4 `repo-to-agent-ar` draft (Week 9)

**Files:** `skills/repo-to-agent-ar/{source.md,test.sh,examples/}`, `COMPATIBILITY.md`, build note #6.

This is the **differentiator skill** for the dev audience: connecting an agent to your real existing repo (not a toy demo). High potential virality.

- [ ] **Step 9.1:** Scaffold + AR draft (1200–1800 words). Cover: cloning Claude Code into an existing project, MCP filesystem permissions, code review patterns, security caveats (don't grant write to `.env` etc.), 2 real examples (refactor session + bugfix session).
- [ ] **Step 9.2:** test.sh smoke
- [ ] **Step 9.3:** Examples: 2 real session transcripts adapted from Hervé's TENERE app or Kiosque work (with permission from himself, ha)
- [ ] **Step 9.4:** Native AR review
- [ ] **Step 9.5:** Build note #7 — "the security gotchas I hit connecting an agent to a real repo"
- [ ] **Step 9.6:** Commit + tag `w9-skill-4-drafted`

**Time estimate:** 6h.

---

### Task 10: Skill #4 publish + creator outreach round (Week 10)

**Files:** modify landing, build note #8, modify `distribution/creator-outreach-log.md`.

- [ ] **Step 10.1:** Publish skill #4, deploy, smoke.
- [ ] **Step 10.2:** Reach out to **5 specific creators** whose Claude Code / Cursor / agentic content has been inspirational (per Spec §8 — credit, never adapt). Polite courtesy message: "I built an Arabic skill in this space, I credited your channel as inspiration in `inspired_by:`. Would love to share with you." Document each outreach.
- [ ] **Step 10.3:** YT Shorts release for skill #4.
- [ ] **Step 10.4:** Build note #8 — meta-lesson on the outreach experience.
- [ ] **Step 10.5:** Commit + tag `w10-skill-4-published`.

**Time estimate:** 5h.

---

### Task 11: Skill #5 `n8n-mcp-pipeline-ar` draft (Week 11)

This is the **meta-skill** — automating the academy itself (transcript → translation candidates → review queue). It demos the agentic stack on a real recursive use case.

**Files:** `skills/n8n-mcp-pipeline-ar/...`

- [ ] **Step 11.1:** Build the actual n8n + MCP pipeline first as the worked example. ~3h.
- [ ] **Step 11.2:** AR skill content draft, 1500–2200 words: MCP basics in AR, n8n setup, the pipeline architecture, hands-on lab.
- [ ] **Step 11.3:** test.sh smoke
- [ ] **Step 11.4:** Native AR review
- [ ] **Step 11.5:** Build note #9 — "I automated my own academy — here's the recursive joy"
- [ ] **Step 11.6:** Commit + tag `w11-skill-5-drafted`

**Time estimate:** 8h (heavier — n8n setup + MCP server stand-up).

---

### Task 12: Skill #5 publish + V1 retrospective + Gate 3 (Week 12)

**Files:**
- Modify: landing (mark 3 MVE-complete + 2 MVE-partial, hero "5 skills live, V1 complete — 3 polished, 2 in iteration")
- Create: `/home/creed/alimni/docs/retro/2026-XX-XX-v1-retrospective.md`
- Create: `distribution/build-notes/2026-XX-XX-week-12-v1-close.md`
- Create: `distribution/x-threads/v1-recap-thread.md`

- [ ] **Step 12.1:** Publish skill #5, deploy, smoke. Mark V1 complete on landing.
- [ ] **Step 12.2:** YT Shorts (canonical video) for skill #5 + immediate Secondary repurpose (TikTok + IG Reels + YT long-form 5-8 min). LinkedIn 3 manual variants (AR + ENG + FR) for skill #5 release. X thread ENG + AR. Telegram pin.

- [ ] **Step 12.3:** Compute V1 metrics from raw data:

```sql
-- Run on gestion postgres alimni_telemetry
SELECT skill_slug, COUNT(DISTINCT client_uuid) AS unique_completions
FROM alimni_skill_completions
GROUP BY skill_slug
ORDER BY unique_completions DESC;

SELECT COUNT(DISTINCT client_uuid) AS total_unique_users,
       COUNT(*) AS total_completions
FROM alimni_skill_completions;
```

- GitHub: stars, forks, issues, PRs (`gh repo view --json stargazerCount,forkCount,issues,pullRequests`)
- Telegram: subscriber count + engagement rate (manual)
- LinkedIn: total impressions on the 12 build notes (manual)
- X: total impressions on the 5 launch threads
- Inbound: count of "request a skill" submissions + DMs received

- [ ] **Step 12.4:** Write `docs/retro/2026-XX-XX-v1-retrospective.md` with:
  - North-star result vs target
  - Activation result vs target (the binding metric per spec §3)
  - 3 things that worked (specific, with evidence)
  - 3 things that failed or surprised
  - 5 lessons distilled
  - V2 candidate ranking based on inbound signal

- [ ] **Step 12.5: 🚦 GATE 3 — V1 outcome decision**

Compute (binary, per spec §3 revised 2026-05-07):
- **≥3 skills shipped at 🌿 MVE-complete** + ≥2 skills at 🌱 MVE-partial (Claude + Codex)
- **≥1 skill iterated on real community feedback** (loop closure proof — required, not nice-to-have)
- ≥50 stars · ≥200 installs · ≥100 Telegram subs · ≥12 build notes · ≥1 viral post
- **≥30 unique end-to-end completions** (activation, the binding gate)
- **≥10 substantive feedback signals**
- ≥10 "request a skill" submissions

Outcome paths:
1. **Hit all** → V2 planning sprint (1 week of brainstorming + spec for V2 path: paid tier, cohort, more harness, more skills?)
2. **Hit reach but not activation** → 2-week pivot to deepen completion experience (better examples, in-skill checkpoints, community Q&A) before any V2
3. **Miss reach** → 1-week post-mortem, decide between (a) audience-first phase ship content not skills, or (b) abandon — no sunk-cost continuation, document learnings publicly, free the brand

- [ ] **Step 12.6:** Build note #12 — manual founder retrospective post in **3 LinkedIn variants** (all written by hand, no AI translation):
  - AR variant (~1000 words MSA)
  - ENG variant (~900 words native ENG, builder/AI register)
  - FR variant (~800 words native FR, founder network angle)
  Each ends with explicit V2 ask adapted to its audience: "what should Alimni AI build next? reply or DM."

  **🟠 Opportunistic V1 close (per spec §7) — burn the bounded events here:**
  - Hacker News Show HN with V1 retrospective (ENG, manual) — Tuesday-Thursday, comment thread prepared
  - Product Hunt launch (if not already burned at W8) with full landing + 5 skills as the asset
  - Reddit r/SideProject + r/arabs (V1 close, value-first post)
  - Drops in 3-5 AR/MENA dev community Slacks/Discords Hervé belongs to
  - Threads + TikTok + IG Reels: repurpose the YT Shorts retrospective video.

  Acceptance: 3 LinkedIn variants live, X threads ENG + AR live, Telegram pin set, ≥2 of 3 opportunistic events triggered (HN + PH + Reddit), all logged in `distribution/build-notes/2026-XX-XX-week-12-v1-close.md`.

- [ ] **Step 12.7:** Commit + tag `w12-v1-complete`

```bash
git add -A
git commit -m "milestone: V1 complete — retrospective + gate 3 result"
git tag w12-v1-complete
git push --tags
```

**Time estimate:** 6–8h (mostly retro writing + analysis, light code).

---

## Activation Tracking — what to measure starting W6

Once telemetry is live (W6), every Monday morning check (5 min):

1. `SELECT COUNT(DISTINCT client_uuid) FROM alimni_skill_completions;` — track unique users curve
2. `SELECT skill_slug, COUNT(*) FROM alimni_skill_completions GROUP BY 1;` — which skill activates most
3. `SELECT COUNT(*) FROM alimni_skill_completions WHERE ts > NOW() - INTERVAL '7 days';` — weekly activation velocity
4. Telegram subscribers count + active poll engagement
5. GitHub stars delta vs last week

Log results in `distribution/build-notes/weekly-metrics-log.md` (append-only). This is the data that feeds Gate 2 and Gate 3 decisions.

---

## Council support across the 12 weeks

| Topic | Role | When to invoke |
|---|---|---|
| AR translation quality review | Native AR speaker (paid or community) | Every skill, before publish |
| Architectural calls (e.g., should we add Cursor in V1?) | Ines via `dual-think` | Any deviation from spec, before merging |
| Distribution strategy questions (channel mix, viral attempts) | `wissam-marketing-sales` skill + Ines | Before Gate 2 and Gate 3 |
| Content creation workflow | `wissam-content-creation` skill | When designing video pipelines for YT Shorts |
| MCP server design (V2 candidate) | `wissam-skills-claude-code` + Ines | If adding MCP server in V2 |
| Legal questions (DMCA, Art. 50 compliance) | Wissam-first lookup + human lawyer if commercial | Before any creator outreach involving content reuse |

---

## Skip-week protocol

If any week exceeds 10 hours of actual work logged, the **next week is a skip-week**:
- No new skill drafting
- Only 1 build note (the meta-lesson "what burnt me out last week and how I'm pacing back")
- Telemetry monitoring (5 min/week)
- All other tasks deferred 1 week

This is a non-negotiable founder-bandwidth safeguard. 12-week timeline can extend to 14 if 2 skip-weeks are taken.

---

## Self-Review pass

**Spec coverage check** (against `2026-05-07-arabic-academy-mvp-design.md`):

| Spec section | Implementation task |
|---|---|
| §1 Product description | Tasks 2 (repo) + 4 (landing) |
| §2 Audience + positioning | Distribution tasks throughout (build notes 1–12) |
| §3 Success criteria — reach | Activation tracking (telemetry W6+) + Gate 2 + Gate 3 |
| §3 Success criteria — activation | Tasks 6 (telemetry) + 12 (V1 metrics SQL) |
| §4 Architecture | Tasks 2 (repo+CI), 4 (landing), 6 (telemetry), 8/10/12 (deploys) |
| §5 The 5 V1 skills | Tasks 3, 5, 7, 9, 11 (one per skill) |
| §6 Multi-harness packaging | Tasks 2.5 (build script), 3.6 + per-skill harness install steps |
| §7 Distribution & cadence | Build note steps in every task + outreach in Tasks 8 + 10 |
| §8 Legal | Step 1.2 trademark, Step 6.7 telemetry consent, Step 10.2 outreach courtesy, Spec rules referenced throughout |
| §9 Brand & identity | Task 1 brand-lock, Task 4 logo + landing tone |
| §10 NOT in V1 (monetization principle) | Plan never references payment plumbing — by omission, enforced |
| §11 Risks | Skip-week protocol (founder bandwidth), CI tests (drift), legal rule (copyright), Gate 1 user check (audience), Step 4.7 smoke (domain runtime) |
| §12 V2 candidates | Task 12.4 retrospective ranks them based on signal |
| §13 Open questions | Task 1 (org name), Task 2 (Astro vs raw), Task 4 (logo), Task 6 (telemetry stack) — all resolved with concrete decisions |

**Placeholder scan:** none of "TBD", "implement later", "appropriate error handling", "similar to Task N" appear above. Every step has either concrete code or concrete acceptance criteria.

**Type consistency:** `compileSkill` signature stable from Task 2.5 onward. `client_uuid` field name consistent across schema.sql + server.js + ping snippet. `skill_slug` field name consistent. Endpoint `/ping` consistent across all references.

**Scope consistency:** plan does not introduce features outside the spec. Cursor/Windsurf are V2 (not implemented in any task). No paid tier plumbing.

---

## Execution handoff

Plan complete and saved to `/home/creed/alimni/docs/superpowers/plans/2026-05-07-alimni-mvp-implementation.md`.

Two execution options:

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration. Best for tasks 2, 4, 6 (heavy code).

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints. Best for tasks 1, 3, 5, 7, 9, 11 (content + ops + brand work that benefits from continuous Hervé presence).

**My recommendation:** **mixed mode** — inline for content/brand/ops tasks (where Hervé's voice and judgment are needed), subagent for the code tasks (build script, telemetry server, Astro landing).

Which approach?

---

## Track A copy/avoid matrix — review gate (added 2026-05-07 nuit)

Every task in this plan that ships content (skills), surface (landing), pricing,
distribution, or cohort design **must be reviewed against the matrix** before
merge.

- Source: `research/README.md` (commit `58f5e3b`)
- Hard gates: spec §14 (G1-G10) — non-negotiable
- Soft guides: spec §14 (WhatsApp ref / HF link / model credit)
- Per-PR checklist: paste from spec §14 into the PR body

This applies retroactively to anything still under work, and forward to all
future tasks.
