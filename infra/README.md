# Alimni AI — infra (V1 hosting on `alimni-ai.com`)

Static site files + Caddy block + smoke gate for the V1 placeholder phase
(brand-lock W1 → real landing replaces this at W4 Step 4.6).

Per spec §9 (revised 2026-05-07): single-track hosting on `alimni-ai.com` from
W0. No transitional sub-domain.

## Layout

```
infra/
├── caddy/alimni-ai.caddy        ← Caddy block, included in /etc/caddy/Caddyfile on gestion
├── placeholder/index.html       ← AR/EN coming-soon page (deployed to /var/www/alimni-ai/)
└── scripts/smoke-alimni.sh      ← Headless smoke gate, run AFTER deploy + DNS resolves
```

## Isolation strategy (locked 2026-05-07)

The Alimni Caddy block lives in `/etc/caddy/conf.d/alimni-ai.caddy` on gestion,
included via a one-time `import conf.d/*.caddy` directive added to the main
`/etc/caddy/Caddyfile`. **Every future edit to Alimni infra touches only this
single file** — the main Caddyfile and other tenant blocks (gestion.rh2p.org,
tenereonline.com, rimaya.tenereonline.com, cadragejn.tenereonline.com) stay
untouched.

**Rollback Alimni in 1 command** (does not affect any other site):

```bash
ssh gestion 'sudo rm /etc/caddy/conf.d/alimni-ai.caddy && sudo caddy reload --config /etc/caddy/Caddyfile'
```

## Deploy procedure (V1 placeholder)

One-shot deploy. Real landing replaces `/var/www/alimni-ai/index.html` at W4
(Task 4 Step 4.6) and follows the same smoke gate.

### 1. Push files to gestion

```bash
# Caddy block — single isolated file in conf.d/
scp infra/caddy/alimni-ai.caddy gestion:/tmp/alimni-ai.caddy
ssh gestion 'sudo install -m 0644 -o root -g root /tmp/alimni-ai.caddy /etc/caddy/conf.d/alimni-ai.caddy && rm /tmp/alimni-ai.caddy'

# Pre-create log file with caddy:caddy ownership (Caddy runs as caddy user; if
# the file doesn't exist, caddy can't create it in /var/log/caddy/ which is
# owned by caddy:caddy with 0755 — but new files default to root if not pre-created).
ssh gestion 'sudo install -m 0640 -o caddy -g caddy /dev/null /var/log/caddy/alimni-ai.log'

# Placeholder
ssh gestion 'sudo mkdir -p /var/www/alimni-ai && sudo chown creed:creed /var/www/alimni-ai'
scp infra/placeholder/index.html gestion:/var/www/alimni-ai/index.html
```

### 2. Validate + reload Caddy

```bash
ssh gestion 'sudo caddy validate --config /etc/caddy/Caddyfile && sudo caddy reload --config /etc/caddy/Caddyfile'
```

### 3. Cloudflare dashboard checklist (Hervé — done once)

In `alimni-ai.com` zone at https://dash.cloudflare.com:

| Setting | Value |
|---|---|
| DNS → `A @` | `157.180.21.245` (gestion VPS public IPv4), proxied (orange cloud ON) |
| DNS → `A www` | `157.180.21.245`, proxied (orange cloud ON) |
| SSL/TLS → Encryption mode | **Full (strict)** — required for LE cert behind CF proxy |
| Security → Bots → Bot Fight Mode | **OFF** (default ON on new zones blocks all visitors with 403 cf-mitigated:challenge) |
| Security → Settings → Security Level | **Medium** (or Essentially Off for placeholder phase) |
| Email → Email Routing → Enable | (CF auto-adds MX + SPF) |
| Email → Destination addresses | `contact@tenereonline.com` (verify via the confirmation link CF sends to that inbox) |
| Email → Forwarding rule | `hello@alimni-ai.com` → `contact@tenereonline.com` |
| Email → Catch-all (recommended) | `*@alimni-ai.com` → `contact@tenereonline.com` (insurance against typos like `info@`, `contact@`) |

### 4. Smoke gate (after DNS resolves + CF Bot Fight is OFF)

```bash
bash infra/scripts/smoke-alimni.sh
# Expected: 6/6 PASS — HTTP 200 / www→apex 301 / title brand-aligned /
#                      AR text rendered / TLS valid / chromium loads clean
```

## Notes

- **CF-only access** is enforced by the `@not_cloudflare` matcher in the Caddy
  block (matches TENERE/RIMAYA/BCF pattern). Direct hits to gestion's public IP
  on this hostname return 403. Avoids phishing-flag risk per memory
  `feedback_deployment_security_rules.md`.
- **noindex for placeholder** — `X-Robots-Tag: noindex, nofollow` until the real
  landing ships at W4. Avoids the placeholder being indexed and ranking for the
  brand name on Day 1.
- **HTTP-01 ACME challenge** works through CF orange cloud — CF proxies the
  `/.well-known/acme-challenge/` path to gestion, Caddy responds, LE issues. No
  CF API token / DNS-01 plugin needed.
- **Email destination = `contact@tenereonline.com`**, not Hervé's personal
  Gmail directly. Per memory `feedback_tenere_corporate_email_rule.md`, all
  brand-facing inboxes route through the TENERE corporate operational email
  (single inbox principle). `contact@tenereonline.com` is itself forwarded to
  Hervé's working inbox.
