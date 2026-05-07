-- ──────────────────────────────────────────────────────────────────────────
-- Alimni AI — telemetry schema (V1)
--
-- One table only: skill_completions. We track opt-in anonymous pings from
-- skills that the learner has executed end-to-end. No PII, no full IP, no
-- path. Country code (2-char from CF-IPCountry header) is the only
-- geographic data, retained at the broad "which region uses this" granularity.
--
-- Apply via:
--   psql "$ALIMNI_TELEMETRY_DATABASE_URL" -f schema.sql
-- (idempotent — safe to re-run)
-- ──────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS skill_completions (
    id              BIGSERIAL PRIMARY KEY,

    -- What was completed
    skill_slug      TEXT NOT NULL,
    skill_version   TEXT,                                                       -- optional, e.g. "v0.2.0"
    harness         TEXT NOT NULL CHECK (harness IN ('claude','codex','cursor','windsurf','other')),

    -- Who (anonymously)
    client_uuid     UUID NOT NULL,                                              -- generated locally by skill on first run, persisted on learner's machine
    country_code    CHAR(2),                                                    -- from CF-IPCountry; NULL allowed (privacy nets, VPN, local dev)

    -- When
    pinged_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Per-skill timeline queries (e.g. "completions per skill last 30 days")
CREATE INDEX IF NOT EXISTS idx_completions_skill_time
    ON skill_completions (skill_slug, pinged_at DESC);

-- Global timeline (e.g. "weekly active practitioners")
CREATE INDEX IF NOT EXISTS idx_completions_time
    ON skill_completions (pinged_at DESC);

-- Dedup safety: same client + same skill + same version within 1h is one
-- completion (we use INSERT ... ON CONFLICT in server.js for the practical
-- dedup; this index supports queries like "DISTINCT client per skill").
CREATE INDEX IF NOT EXISTS idx_completions_client_skill
    ON skill_completions (client_uuid, skill_slug);

-- ── Minimal RLS-style hardening: revoke broad access; grant specific perms ──
--
-- The application role `alimni_telemetry_app` has INSERT only.
-- Aggregate queries (count, COUNT DISTINCT) are run by Hervé manually via
-- psql with the superuser, NOT exposed via the API.
--
-- This preserves the spec §3 commitment that "telemetry is an opt-in
-- completion ping, not a behavioral tracker".

REVOKE ALL ON skill_completions FROM PUBLIC;
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'alimni_telemetry_app') THEN
        GRANT INSERT ON skill_completions TO alimni_telemetry_app;
        GRANT USAGE, SELECT ON SEQUENCE skill_completions_id_seq TO alimni_telemetry_app;
    END IF;
END $$;
