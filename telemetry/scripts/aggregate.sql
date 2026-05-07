-- ──────────────────────────────────────────────────────────────────────────
-- Alimni AI telemetry — aggregate queries (read-only)
--
-- Run via:
--   psql "postgresql://alimni_telemetry_admin:PASS@127.0.0.1:5432/alimni_telemetry" -f aggregate.sql
--
-- These queries answer the spec §3 metrics we publish in build notes:
--   - W6 activation snapshot: completions per skill, distinct clients
--   - V12 retro: cumulative + per-country distribution
-- ──────────────────────────────────────────────────────────────────────────

\echo
\echo === Total completions (cumulative) ===
SELECT COUNT(*) AS total_completions FROM skill_completions;

\echo
\echo === Distinct clients (the activation cohort) ===
SELECT COUNT(DISTINCT client_uuid) AS distinct_clients FROM skill_completions;

\echo
\echo === Per-skill: completions and distinct clients ===
SELECT
  skill_slug,
  COUNT(*)                  AS completions,
  COUNT(DISTINCT client_uuid) AS distinct_clients,
  MIN(pinged_at)            AS first_seen,
  MAX(pinged_at)            AS last_seen
FROM skill_completions
GROUP BY skill_slug
ORDER BY completions DESC;

\echo
\echo === Per-harness distribution ===
SELECT
  harness,
  COUNT(*)                  AS completions,
  COUNT(DISTINCT client_uuid) AS distinct_clients
FROM skill_completions
GROUP BY harness
ORDER BY completions DESC;

\echo
\echo === Per-country distribution (broad geo only) ===
SELECT
  COALESCE(country_code, '(unknown)') AS country,
  COUNT(*)                            AS completions,
  COUNT(DISTINCT client_uuid)         AS distinct_clients
FROM skill_completions
GROUP BY country_code
ORDER BY completions DESC;

\echo
\echo === Last 7 days activity ===
SELECT
  DATE_TRUNC('day', pinged_at) AS day,
  COUNT(*)                     AS completions,
  COUNT(DISTINCT client_uuid)  AS distinct_clients
FROM skill_completions
WHERE pinged_at >= NOW() - INTERVAL '7 days'
GROUP BY day
ORDER BY day DESC;

\echo
\echo === V1 W12 Gate 3 readouts ===
\echo (compare to spec §3 success criteria)
SELECT
  COUNT(DISTINCT client_uuid)       AS unique_completers,
  COUNT(*)                          AS total_completions,
  COUNT(DISTINCT skill_slug)        AS skills_with_activity
FROM skill_completions;
