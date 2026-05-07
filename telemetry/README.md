# Alimni AI — Telemetry

> Anonymous, opt-in completion pings from skills the learner has executed
> end-to-end. **The single signal we measure to validate the moat.**
>
> Per spec §3 (council 2026-05-07): the V1 wedge succeeds only if the
> feedback loop closes — which requires honest measurement of who actually
> completes a skill, not just who installs it. This service exists for
> that exact measurement and nothing else.

## Privacy commitments (non-negotiable, mirrored in every skill)

We collect:

- **`skill_slug`** — which skill was completed
- **`skill_version`** — optional, for tracking iterations
- **`harness`** — `claude` | `codex` | `cursor` | `windsurf` | `other`
- **`client_uuid`** — generated locally on the learner's machine on first
  ping, persisted at `~/.alimni-uuid`. Opaque to us.
- **`country_code`** — 2-char from CF-IPCountry header (broad geo only).
  Never the IP itself.
- **`pinged_at`** — server-side timestamp.

We do **not** collect:

- Email, name, hostname, full IP, file path, file content
- In-skill behavior (no events, no pageviews — only the final completion)
- Anything before the user has actually completed the skill end-to-end
- Anything if the skill's `source.md` frontmatter has `alimni_telemetry: false`
  (which is the default — opt-in is per-skill, not global)
- Anything if the user's environment has `ALIMNI_TELEMETRY=off`

The schema (`schema.sql`) is the only source of truth. If a column doesn't
exist there, we don't store it.

## Architecture

```
┌─────────────────────┐       ┌──────────────────────┐
│ Learner's machine   │       │  Alimni AI on        │
│   ~/.alimni-uuid    │       │  gestion VPS         │
│   (created on 1st   │       │                      │
│    ping)            │       │  ping.alimni-ai.com  │
│                     │  POST │  → Caddy (CF-only)   │
│  curl one-liner     │ ────▶ │  → Express :4011     │
│  in skill's lab     │       │  → Postgres:         │
│                     │       │    alimni_telemetry. │
└─────────────────────┘       │    skill_completions │
                              └──────────────────────┘

   No JS in browser. No tracker pixel. No cookie.
   Pure server-side ping fired by the skill itself, only on completion.
```

## Files

```
telemetry/
├── server.js                   Express POST /ping endpoint
├── schema.sql                  Postgres schema (idempotent)
├── package.json                Node 20 + express + pg + dotenv
├── .env.example                ALIMNI_TELEMETRY_DATABASE_URL + PORT
├── README.md                   this file
├── snippets/
│   ├── ping-claude.md          What to embed in claude/SKILL.md (skill-side)
│   └── ping-codex.md           What to embed in codex/skill.json (skill-side)
├── scripts/
│   ├── setup-postgres.sh       Idempotent role + DB + cross-app isolation
│   ├── ping.alimni-ai.caddy    Caddy block for /etc/caddy/conf.d/
│   ├── alimni-telemetry.service systemd unit
│   └── aggregate.sql           Read-only aggregation queries (admin)
└── tests/
    └── server.test.js          Validation surface tests (no DB required)
```

## Deploy procedure (W6 — staged, not yet executed)

This procedure is **deferred to W6** per the implementation plan. The code
is built now to surface design issues early, but no DNS records are added
and no service is started until skill #1 is shipping (Task 3) so we are
collecting data on something real.

### W6 Step 1 — Cloudflare DNS

Add to the `alimni-ai.com` zone:

| Type | Name | Value | Proxy |
|---|---|---|---|
| `A` | `ping` | `157.180.21.245` | 🟠 ON |

### W6 Step 2 — Postgres setup on gestion

```bash
ssh gestion
sudo apt update
# (Postgres 16 already installed — used by RH2P, TENERE App, BCF cadrage)

cd /home/creed/alimni/telemetry
export ALIMNI_TELEMETRY_PG_PASSWORD="$(openssl rand -hex 24)"
export ALIMNI_TELEMETRY_ADMIN_PG_PASSWORD="$(openssl rand -hex 24)"
bash scripts/setup-postgres.sh

# Save passwords to /home/creed/secrets/alimni-telemetry-pg.env (mode 0600)
sudo install -m 0600 -o creed -g creed /dev/null /home/creed/secrets/alimni-telemetry-pg.env
cat > /home/creed/secrets/alimni-telemetry-pg.env <<EOF
ALIMNI_TELEMETRY_PG_PASSWORD=${ALIMNI_TELEMETRY_PG_PASSWORD}
ALIMNI_TELEMETRY_ADMIN_PG_PASSWORD=${ALIMNI_TELEMETRY_ADMIN_PG_PASSWORD}
EOF
chmod 0600 /home/creed/secrets/alimni-telemetry-pg.env
```

### W6 Step 3 — Deploy server code to gestion

```bash
ssh gestion 'sudo mkdir -p /var/www/alimni-telemetry /var/log/alimni-telemetry \
  && sudo chown creed:creed /var/www/alimni-telemetry /var/log/alimni-telemetry'

rsync -avz --delete \
  --exclude node_modules --exclude tests --exclude README.md --exclude snippets \
  /home/creed/alimni/telemetry/ \
  gestion:/var/www/alimni-telemetry/

ssh gestion 'cd /var/www/alimni-telemetry && npm ci --omit=dev'
```

### W6 Step 4 — Environment file

```bash
# On gestion, create /home/creed/secrets/alimni-telemetry.env (mode 0600)
sudo install -m 0600 -o creed -g creed /dev/null /home/creed/secrets/alimni-telemetry.env
cat > /home/creed/secrets/alimni-telemetry.env <<EOF
ALIMNI_TELEMETRY_DATABASE_URL=postgresql://alimni_telemetry_app:${ALIMNI_TELEMETRY_PG_PASSWORD}@127.0.0.1:5432/alimni_telemetry
PORT=4011
NODE_ENV=production
EOF
chmod 0600 /home/creed/secrets/alimni-telemetry.env
```

### W6 Step 5 — systemd service

```bash
sudo install -m 0644 /var/www/alimni-telemetry/scripts/alimni-telemetry.service \
  /etc/systemd/system/alimni-telemetry.service
sudo systemctl daemon-reload
sudo systemctl enable --now alimni-telemetry
sudo systemctl status alimni-telemetry
```

### W6 Step 6 — Caddy block (conf.d isolation)

```bash
sudo install -m 0644 /var/www/alimni-telemetry/scripts/ping.alimni-ai.caddy \
  /etc/caddy/conf.d/ping.alimni-ai.caddy
sudo install -m 0640 -o caddy -g caddy /dev/null /var/log/caddy/ping.alimni-ai.log
sudo caddy validate --config /etc/caddy/Caddyfile
sudo caddy reload --config /etc/caddy/Caddyfile
```

### W6 Step 7 — Smoke test

```bash
# Health check (no DB write)
curl -sS https://ping.alimni-ai.com/health

# Synthetic ping (writes a real row — clean it up after if desired)
curl -sS -m 5 -H 'content-type: application/json' \
  -X POST https://ping.alimni-ai.com/ping \
  -d '{
    "skill_slug": "smoke-test",
    "harness": "other",
    "client_uuid": "00000000-0000-0000-0000-000000000000"
  }'
# Expected: HTTP 201 {"recorded":true}

# Aggregate verify
ssh gestion "psql 'postgresql://alimni_telemetry_admin:PASS@127.0.0.1/alimni_telemetry' \
  -c \"SELECT COUNT(*), MAX(pinged_at) FROM skill_completions WHERE skill_slug = 'smoke-test'\""

# Clean the smoke row
ssh gestion "sudo -u postgres psql alimni_telemetry \
  -c \"DELETE FROM skill_completions WHERE skill_slug = 'smoke-test'\""
```

## Skill author integration

To add telemetry to a skill, the skill author:

1. Sets `alimni_telemetry: true` in `source.md` frontmatter
2. The build pipeline (`scripts/build.js`) automatically appends the
   curl one-liner to the generated `claude/SKILL.md` and the post-completion
   action to `codex/skill.json`. See `snippets/ping-claude.md` and
   `snippets/ping-codex.md` for the exact strings.
3. The skill's `lab.md` MUST include the privacy notice block (AR + EN)
   from the snippets — non-negotiable per spec §3.

## Aggregation (manual, monthly)

```bash
ssh gestion
psql "postgresql://alimni_telemetry_admin:PASS@127.0.0.1:5432/alimni_telemetry" \
  -f /var/www/alimni-telemetry/scripts/aggregate.sql
```

The numbers are then summarized into the next monthly Wissam digest +
`distribution/feedback-loop-log.md` for spec §3 W12 Gate 3 readouts.

## Tests

```bash
cd /home/creed/alimni/telemetry
npm install
npm test
```

The validation surface is tested without a real DB. Database integration
is verified via the synthetic ping in step W6.7.

## Rollback / kill switch

To disable telemetry collection without touching skill code:

```bash
ssh gestion 'sudo systemctl stop alimni-telemetry'
```

`/ping` will return 502 (Caddy → upstream down). Skills will silently
fail their ping and the lesson continues uninterrupted (curl `|| true`).
