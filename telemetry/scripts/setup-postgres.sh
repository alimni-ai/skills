#!/usr/bin/env bash
# Idempotent Postgres setup for Alimni AI telemetry on gestion.
#
# Creates:
#   - role  alimni_telemetry_app (LOGIN, password from $ALIMNI_TELEMETRY_PG_PASSWORD)
#   - db    alimni_telemetry (owned by alimni_telemetry_app)
#   - role  alimni_telemetry_admin (superuser-ish reads, password from $ALIMNI_TELEMETRY_ADMIN_PG_PASSWORD)
#
# Hardens:
#   - Revokes CONNECT from PUBLIC on alimni_telemetry (cross-app isolation)
#   - alimni_telemetry_app cannot CONNECT to other databases (handled by
#     gestion's existing pg_hba.conf + role NOCREATEDB NOSUPERUSER posture)
#
# Usage (on gestion, as user with sudo):
#   export ALIMNI_TELEMETRY_PG_PASSWORD="$(openssl rand -hex 24)"
#   export ALIMNI_TELEMETRY_ADMIN_PG_PASSWORD="$(openssl rand -hex 24)"
#   bash scripts/setup-postgres.sh
#   # then save the passwords to /home/creed/secrets/alimni-telemetry-pg.env
#   #   matching the existing pattern (TENERE App: tenere-app-pg.env)

set -euo pipefail

if [[ -z "${ALIMNI_TELEMETRY_PG_PASSWORD:-}" ]]; then
  echo "FATAL: export ALIMNI_TELEMETRY_PG_PASSWORD before running"
  exit 2
fi
if [[ -z "${ALIMNI_TELEMETRY_ADMIN_PG_PASSWORD:-}" ]]; then
  echo "FATAL: export ALIMNI_TELEMETRY_ADMIN_PG_PASSWORD before running"
  exit 2
fi

run_psql() {
  sudo -u postgres psql -v ON_ERROR_STOP=1 "$@"
}

echo "==> Create role alimni_telemetry_app (idempotent)"
run_psql -c "DO \$\$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'alimni_telemetry_app') THEN
    CREATE ROLE alimni_telemetry_app
      WITH LOGIN PASSWORD '${ALIMNI_TELEMETRY_PG_PASSWORD}'
      NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION;
  ELSE
    ALTER ROLE alimni_telemetry_app
      WITH LOGIN PASSWORD '${ALIMNI_TELEMETRY_PG_PASSWORD}'
      NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION;
  END IF;
END\$\$;"

echo "==> Create role alimni_telemetry_admin (read-only aggregation, idempotent)"
run_psql -c "DO \$\$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'alimni_telemetry_admin') THEN
    CREATE ROLE alimni_telemetry_admin
      WITH LOGIN PASSWORD '${ALIMNI_TELEMETRY_ADMIN_PG_PASSWORD}'
      NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION;
  ELSE
    ALTER ROLE alimni_telemetry_admin
      WITH LOGIN PASSWORD '${ALIMNI_TELEMETRY_ADMIN_PG_PASSWORD}'
      NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION;
  END IF;
END\$\$;"

echo "==> Create database alimni_telemetry (idempotent)"
if ! run_psql -tAc "SELECT 1 FROM pg_database WHERE datname = 'alimni_telemetry'" | grep -q 1; then
  run_psql -c "CREATE DATABASE alimni_telemetry OWNER alimni_telemetry_app ENCODING 'UTF8';"
fi

echo "==> Cross-app isolation: revoke CONNECT from PUBLIC on alimni_telemetry"
run_psql -c "REVOKE CONNECT ON DATABASE alimni_telemetry FROM PUBLIC;"
run_psql -c "GRANT CONNECT ON DATABASE alimni_telemetry TO alimni_telemetry_app, alimni_telemetry_admin;"

echo "==> Cross-app isolation: deny alimni_telemetry_app from CONNECT-ing to other DBs"
# This mirrors the pattern from project_tenere_app_postgres memory.
# We only allow CONNECT to its own DB.
for OTHER_DB in $(run_psql -tAc "SELECT datname FROM pg_database WHERE datname NOT IN ('alimni_telemetry', 'template0', 'template1', 'postgres')"); do
  run_psql -c "REVOKE CONNECT ON DATABASE \"${OTHER_DB}\" FROM alimni_telemetry_app, alimni_telemetry_admin;" || true
done

echo "==> Apply schema"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SCHEMA_FILE="${SCRIPT_DIR}/../schema.sql"
PGPASSWORD="${ALIMNI_TELEMETRY_PG_PASSWORD}" \
  psql -U alimni_telemetry_app -h 127.0.0.1 -d alimni_telemetry -v ON_ERROR_STOP=1 -f "${SCHEMA_FILE}"

echo "==> Grant SELECT to admin (read-only aggregation)"
run_psql -d alimni_telemetry -c "GRANT SELECT ON skill_completions TO alimni_telemetry_admin;"
run_psql -d alimni_telemetry -c "GRANT USAGE, SELECT ON SEQUENCE skill_completions_id_seq TO alimni_telemetry_admin;"

echo
echo "✅ Postgres setup complete"
echo "   Connection URL for app:"
echo "     postgresql://alimni_telemetry_app:<PASSWORD>@127.0.0.1:5432/alimni_telemetry"
echo "   Connection URL for admin (aggregation queries via psql, NOT exposed via API):"
echo "     postgresql://alimni_telemetry_admin:<PASSWORD>@127.0.0.1:5432/alimni_telemetry"
echo
echo "Save passwords to /home/creed/secrets/alimni-telemetry-pg.env (mode 0600)"
echo "matching the existing pattern (see TENERE App / RH2P / Kiosque)."
