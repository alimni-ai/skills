#!/usr/bin/env node
/**
 * Alimni AI — telemetry server (V1)
 *
 * Single endpoint: POST /ping
 * Receives anonymous opt-in skill-completion pings, validates strictly,
 * inserts into Postgres. Nothing else.
 *
 * Privacy commitments (mirrored in README.md):
 *   - No PII, no email, no full IP stored
 *   - Only country_code (CF-IPCountry) for broad geo
 *   - client_uuid is generated locally by the skill, opaque to us
 *   - Skill must declare `alimni_telemetry: true` in its source.md
 *     frontmatter for the ping integration to be present at all
 *
 * Deployment (W6, see README.md): systemd service on gestion VPS, Caddy
 * reverse-proxy on https://ping.alimni-ai.com, behind CF orange cloud.
 */

import express from 'express';
import pg from 'pg';
import 'dotenv/config';

const PORT = parseInt(process.env.PORT || '4011', 10);
const DATABASE_URL = process.env.ALIMNI_TELEMETRY_DATABASE_URL;
const NODE_ENV = process.env.NODE_ENV || 'development';

if (!DATABASE_URL) {
  console.error('FATAL: ALIMNI_TELEMETRY_DATABASE_URL is not set');
  process.exit(1);
}

const VALID_HARNESSES = ['claude', 'codex', 'cursor', 'windsurf', 'other'];
const SLUG_RE = /^[a-z0-9-]{1,64}$/;
const VERSION_RE = /^v?\d+\.\d+\.\d+(?:-[a-z0-9.-]+)?$/i;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const COUNTRY_RE = /^[A-Z]{2}$/;

const pool = new pg.Pool({
  connectionString: DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000
});

pool.on('error', err => {
  console.error('PG pool error:', err.message);
});

const app = express();

// Body parsing — strict 1KB limit (a ping should be tiny)
app.use(express.json({ limit: '1kb', strict: true }));

// Trust the first proxy hop (Caddy on gestion, behind CF) for client_ip headers
app.set('trust proxy', 1);

// ── Health check ──────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'alimni-telemetry', node_env: NODE_ENV });
});

// ── The one endpoint ──────────────────────────────────────────────────────
app.post('/ping', async (req, res) => {
  const body = req.body || {};

  // Strict input validation
  const errors = [];

  const skill_slug = typeof body.skill_slug === 'string' ? body.skill_slug : null;
  if (!skill_slug || !SLUG_RE.test(skill_slug)) {
    errors.push('invalid skill_slug');
  }

  const harness = typeof body.harness === 'string' ? body.harness : null;
  if (!harness || !VALID_HARNESSES.includes(harness)) {
    errors.push('invalid harness');
  }

  const client_uuid = typeof body.client_uuid === 'string' ? body.client_uuid : null;
  if (!client_uuid || !UUID_RE.test(client_uuid)) {
    errors.push('invalid client_uuid');
  }

  // skill_version is optional but if present must validate
  const skill_version = body.skill_version ?? null;
  if (skill_version !== null && (typeof skill_version !== 'string' || !VERSION_RE.test(skill_version))) {
    errors.push('invalid skill_version');
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join('; ') });
  }

  // Country code is derived from the CF-IPCountry header (CF sets this when
  // the request transits CF orange cloud). Never trust client-supplied data.
  let country_code = null;
  const cfCountry = req.get('CF-IPCountry');
  if (cfCountry && COUNTRY_RE.test(cfCountry)) {
    country_code = cfCountry;
  }

  try {
    await pool.query(
      `INSERT INTO skill_completions
         (skill_slug, skill_version, harness, client_uuid, country_code)
       VALUES ($1, $2, $3, $4, $5)`,
      [skill_slug, skill_version, harness, client_uuid, country_code]
    );
    return res.status(201).json({ recorded: true });
  } catch (err) {
    // Don't leak internal SQL error to public — log + generic message
    console.error('insert failed:', err.message);
    return res.status(500).json({ error: 'recording failed' });
  }
});

// ── Reject any other path/method ──────────────────────────────────────────
app.all('*', (req, res) => {
  res.status(404).json({ error: 'not found' });
});

// ── Boot ──────────────────────────────────────────────────────────────────
const server = app.listen(PORT, () => {
  console.log(`alimni-telemetry listening on :${PORT} (${NODE_ENV})`);
});

// Graceful shutdown on SIGTERM (systemd stop)
function shutdown(signal) {
  console.log(`${signal} received — closing server + pool`);
  server.close(() => {
    pool.end().then(() => process.exit(0));
  });
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
