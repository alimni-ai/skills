#!/usr/bin/env node
/**
 * Run every skill's test.sh — fails CI on any non-zero exit.
 *
 * test.sh is the per-skill smoke test (whatever the skill author defines).
 * Convention: must exit 0 on success, non-zero on failure. Output is captured
 * and shown only on failure.
 *
 * Usage: node scripts/test-skills.js
 */

import { spawnSync } from 'node:child_process';
import { readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SKILLS_DIR = join(__dirname, '..', 'skills');

let pass = 0;
let fail = 0;
let skip = 0;

if (!existsSync(SKILLS_DIR)) {
  console.log('No skills/ directory. Nothing to test.');
  process.exit(0);
}

const slugs = readdirSync(SKILLS_DIR).filter(n => statSync(join(SKILLS_DIR, n)).isDirectory());

for (const slug of slugs) {
  const testScript = join(SKILLS_DIR, slug, 'test.sh');

  if (!existsSync(testScript)) {
    console.log(`⏭  ${slug}: no test.sh — skipping`);
    skip++;
    continue;
  }

  const result = spawnSync('bash', [testScript], {
    cwd: join(SKILLS_DIR, slug),
    encoding: 'utf8',
    timeout: 60_000
  });

  if (result.status === 0) {
    console.log(`✅ ${slug}: test.sh PASS`);
    pass++;
  } else {
    console.log(`❌ ${slug}: test.sh FAIL (exit ${result.status})`);
    if (result.stdout) console.log(`   stdout:\n${result.stdout.split('\n').map(l => '     ' + l).join('\n')}`);
    if (result.stderr) console.log(`   stderr:\n${result.stderr.split('\n').map(l => '     ' + l).join('\n')}`);
    fail++;
  }
}

console.log(`\nSummary: ${pass} pass · ${fail} fail · ${skip} skip`);

if (fail > 0) process.exit(1);
