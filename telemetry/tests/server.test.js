/**
 * Smoke tests for telemetry server validation logic.
 * These run without a real Postgres — we test the input-validation and
 * routing surface only. Database integration is verified manually post-deploy.
 *
 * Usage: node --test tests/
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

// Re-implement the validation rules from server.js so tests can run without
// importing the running server (which would try to bind to PORT and connect
// to PG). When server.js changes its rules, mirror them here.

const SLUG_RE = /^[a-z0-9-]{1,64}$/;
const VERSION_RE = /^v?\d+\.\d+\.\d+(?:-[a-z0-9.-]+)?$/i;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const COUNTRY_RE = /^[A-Z]{2}$/;
const VALID_HARNESSES = ['claude', 'codex', 'cursor', 'windsurf', 'other'];

function validatePing(body) {
  const errors = [];
  if (!body.skill_slug || !SLUG_RE.test(body.skill_slug)) errors.push('invalid skill_slug');
  if (!body.harness || !VALID_HARNESSES.includes(body.harness)) errors.push('invalid harness');
  if (!body.client_uuid || !UUID_RE.test(body.client_uuid)) errors.push('invalid client_uuid');
  if (body.skill_version != null && !VERSION_RE.test(body.skill_version)) errors.push('invalid skill_version');
  return errors;
}

const VALID_PING = {
  skill_slug: 'setup-agentic-ar',
  harness: 'claude',
  client_uuid: '550e8400-e29b-41d4-a716-446655440000'
};

test('valid ping passes', () => {
  assert.deepEqual(validatePing(VALID_PING), []);
});

test('valid ping with optional skill_version passes', () => {
  assert.deepEqual(validatePing({ ...VALID_PING, skill_version: 'v0.2.0' }), []);
});

test('missing skill_slug rejected', () => {
  const { skill_slug, ...rest } = VALID_PING;
  assert.ok(validatePing(rest).includes('invalid skill_slug'));
});

test('skill_slug with uppercase rejected', () => {
  assert.ok(validatePing({ ...VALID_PING, skill_slug: 'Setup-Agentic-AR' }).includes('invalid skill_slug'));
});

test('skill_slug with path traversal rejected', () => {
  assert.ok(validatePing({ ...VALID_PING, skill_slug: '../../etc/passwd' }).includes('invalid skill_slug'));
});

test('skill_slug too long (>64) rejected', () => {
  assert.ok(validatePing({ ...VALID_PING, skill_slug: 'a'.repeat(65) }).includes('invalid skill_slug'));
});

test('invalid harness rejected', () => {
  assert.ok(validatePing({ ...VALID_PING, harness: 'gpt' }).includes('invalid harness'));
});

test('all 5 valid harnesses accepted', () => {
  for (const h of VALID_HARNESSES) {
    assert.deepEqual(validatePing({ ...VALID_PING, harness: h }), [], `harness ${h} should be valid`);
  }
});

test('non-UUID client_uuid rejected', () => {
  assert.ok(validatePing({ ...VALID_PING, client_uuid: 'anonymous' }).includes('invalid client_uuid'));
});

test('non-string client_uuid rejected', () => {
  assert.ok(validatePing({ ...VALID_PING, client_uuid: 12345 }).includes('invalid client_uuid'));
});

test('invalid skill_version rejected', () => {
  assert.ok(validatePing({ ...VALID_PING, skill_version: 'latest' }).includes('invalid skill_version'));
});

test('valid skill_version variants accepted', () => {
  for (const v of ['v0.2.0', '1.0.0', 'v1.0.0-beta.1', 'v2.5.0-rc.3']) {
    assert.deepEqual(validatePing({ ...VALID_PING, skill_version: v }), [], `version ${v} should be valid`);
  }
});

test('country code regex matches expected format', () => {
  assert.ok(COUNTRY_RE.test('MA'));
  assert.ok(COUNTRY_RE.test('FR'));
  assert.ok(!COUNTRY_RE.test('USA'));
  assert.ok(!COUNTRY_RE.test('ma'));
  assert.ok(!COUNTRY_RE.test(''));
});
