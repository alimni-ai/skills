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

## Deploy procedure (V1 placeholder)

This is a one-shot deploy. Real landing replaces `/var/www/alimni-ai/index.html`
at W4 (Task 4 Step 4.6) and follows the same smoke gate.

### 1. Push files to gestion

```bash
# Caddy block
scp infra/caddy/alimni-ai.caddy gestion:/tmp/alimni-ai.caddy
ssh gestion 'sudo install -m 0644 /tmp/alimni-ai.caddy /etc/caddy/conf.d/alimni-ai.caddy 2>/dev/null \
            || sudo bash -c "cat /tmp/alimni-ai.caddy >> /etc/caddy/Caddyfile"'

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
| Email → Email Routing → Enable | (CF auto-adds MX + SPF) |
| Email → Destination addresses | `davies.herve@gmail.com` (verify via Gmail confirmation link) |
| Email → Forwarding rule | `hello@alimni-ai.com` → `davies.herve@gmail.com` |
| Email → Catch-all (optional) | `*@alimni-ai.com` → `davies.herve@gmail.com` |

### 4. Smoke gate (after DNS resolves — propagation ~30s with CF)

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
