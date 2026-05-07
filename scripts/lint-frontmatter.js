#!/usr/bin/env node
/**
 * Lint skill frontmatter — fails CI on any missing required field or invalid value.
 * Lighter than build.js: doesn't emit harness packages, just validates source.md.
 *
 * Usage: node scripts/lint-frontmatter.js
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SKILLS_DIR = join(__dirname, '..', 'skills');

const REQUIRED = ['slug', 'title_ar', 'description_ar', 'maturity', 'est_runtime_min'];
const VALID_MATURITY = ['mve-partial', 'mve-complete', 'mature', 'reference'];

let errors = 0;

if (!existsSync(SKILLS_DIR)) {
  console.log('No skills/ directory. Nothing to lint.');
  process.exit(0);
}

const slugs = readdirSync(SKILLS_DIR).filter(n => statSync(join(SKILLS_DIR, n)).isDirectory());

for (const slug of slugs) {
  const sourceFile = join(SKILLS_DIR, slug, 'source.md');
  if (!existsSync(sourceFile)) continue;

  const { data: fm } = matter(readFileSync(sourceFile, 'utf8'));

  for (const field of REQUIRED) {
    if (!fm[field]) {
      console.error(`❌ ${slug}: missing '${field}'`);
      errors++;
    }
  }

  if (fm.slug && fm.slug !== slug) {
    console.error(`❌ ${slug}: frontmatter slug '${fm.slug}' != directory '${slug}'`);
    errors++;
  }

  if (fm.maturity && !VALID_MATURITY.includes(fm.maturity)) {
    console.error(`❌ ${slug}: invalid maturity '${fm.maturity}'`);
    errors++;
  }
}

if (errors > 0) {
  console.error(`\n${errors} error(s).`);
  process.exit(1);
}

console.log('✅ Frontmatter lint passed.');
