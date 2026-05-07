#!/usr/bin/env node
/**
 * Alimni AI build pipeline — source.md → claude/SKILL.md + codex/skill.json
 *
 * The single source of truth is `skills/<slug>/source.md`. This script reads
 * that file (YAML frontmatter + Markdown body in Arabic), validates the
 * frontmatter against the v1 schema, and emits per-harness packages:
 *
 *   - claude/SKILL.md     (Claude Code)
 *   - codex/skill.json    (OpenAI Codex)
 *
 * Per spec §6 (council 2026-05-07), only skills at 🌿 MVE-complete or higher
 * emit harness packages. Skills at 🌱 MVE-partial just need source.md + lab.md
 * + test.sh + MATURITY.md to ship.
 *
 * Usage:
 *   node scripts/build.js               # build all skills
 *   node scripts/build.js <slug>        # build one skill
 *   node scripts/build.js --check       # dry-run, exit non-zero on any issue
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');
const SKILLS_DIR = join(REPO_ROOT, 'skills');

const REQUIRED_FRONTMATTER = ['slug', 'title_ar', 'description_ar', 'maturity', 'est_runtime_min'];
const VALID_MATURITY = ['mve-partial', 'mve-complete', 'mature', 'reference'];
const HARNESS_REQUIRED_FROM = 'mve-complete';

const args = process.argv.slice(2);
const checkOnly = args.includes('--check');
const targetSlug = args.find(a => !a.startsWith('--'));

let errors = 0;
let warnings = 0;
let built = 0;
let skipped = 0;

function err(msg) {
  console.error(`  ❌ ${msg}`);
  errors++;
}

function warn(msg) {
  console.warn(`  ⚠️  ${msg}`);
  warnings++;
}

function ok(msg) {
  console.log(`  ✅ ${msg}`);
}

function info(msg) {
  console.log(`  • ${msg}`);
}

function maturityRank(stage) {
  return VALID_MATURITY.indexOf(stage);
}

function shouldEmitHarness(maturity) {
  return maturityRank(maturity) >= maturityRank(HARNESS_REQUIRED_FROM);
}

function validateFrontmatter(slug, fm) {
  let valid = true;

  for (const field of REQUIRED_FRONTMATTER) {
    if (!fm[field]) {
      err(`${slug}: missing required frontmatter field '${field}'`);
      valid = false;
    }
  }

  if (fm.slug && fm.slug !== slug) {
    err(`${slug}: frontmatter slug '${fm.slug}' does not match directory name '${slug}'`);
    valid = false;
  }

  if (fm.maturity && !VALID_MATURITY.includes(fm.maturity)) {
    err(`${slug}: maturity '${fm.maturity}' not in ${VALID_MATURITY.join(', ')}`);
    valid = false;
  }

  if (fm.est_runtime_min && (typeof fm.est_runtime_min !== 'number' || fm.est_runtime_min < 1)) {
    err(`${slug}: est_runtime_min must be a positive integer (got ${JSON.stringify(fm.est_runtime_min)})`);
    valid = false;
  }

  // Soft checks (warnings, not errors)
  if (fm.requires_local_terminal === undefined) {
    warn(`${slug}: missing 'requires_local_terminal' in frontmatter (council 2026-05-07 mobile/low-spec consideration)`);
  }

  if (fm.mobile_friendly_first_steps === undefined) {
    warn(`${slug}: missing 'mobile_friendly_first_steps' in frontmatter (council 2026-05-07 mobile/low-spec consideration)`);
  }

  return valid;
}

function buildClaudeSkill(slug, fm, body) {
  const claudeFm = {
    name: fm.slug,
    description: fm.description_ar
  };

  const yaml = Object.entries(claudeFm)
    .map(([k, v]) => `${k}: ${typeof v === 'string' && v.includes(':') ? `"${v.replace(/"/g, '\\"')}"` : v}`)
    .join('\n');

  return `---\n${yaml}\n---\n\n${body.trim()}\n`;
}

function buildCodexSkill(slug, fm, body) {
  return JSON.stringify({
    name: fm.slug,
    title: fm.title_ar,
    description: fm.description_ar,
    instructions: body.trim(),
    metadata: {
      language: 'ar',
      est_runtime_min: fm.est_runtime_min,
      maturity: fm.maturity,
      audience: fm.audience || null,
      requires_local_terminal: fm.requires_local_terminal ?? null,
      mobile_friendly_first_steps: fm.mobile_friendly_first_steps ?? null,
      inspired_by: fm.inspired_by || null
    }
  }, null, 2) + '\n';
}

function buildOne(slug) {
  const skillDir = join(SKILLS_DIR, slug);
  const sourceFile = join(skillDir, 'source.md');

  if (!existsSync(sourceFile)) {
    info(`${slug}: no source.md (likely scaffolded but not yet authored), skipping`);
    skipped++;
    return;
  }

  const raw = readFileSync(sourceFile, 'utf8');
  const { data: fm, content: body } = matter(raw);

  if (!validateFrontmatter(slug, fm)) {
    return;
  }

  if (!shouldEmitHarness(fm.maturity)) {
    info(`${slug}: maturity '${fm.maturity}' below '${HARNESS_REQUIRED_FROM}', no harness output emitted (per spec §6)`);
    skipped++;
    return;
  }

  const claudePath = join(skillDir, 'claude');
  const codexPath = join(skillDir, 'codex');

  if (!checkOnly) {
    mkdirSync(claudePath, { recursive: true });
    mkdirSync(codexPath, { recursive: true });
    writeFileSync(join(claudePath, 'SKILL.md'), buildClaudeSkill(slug, fm, body));
    writeFileSync(join(codexPath, 'skill.json'), buildCodexSkill(slug, fm, body));
  }

  ok(`${slug} (${fm.maturity}) → claude/SKILL.md + codex/skill.json`);
  built++;
}

function main() {
  console.log(`🛠  Alimni AI build${checkOnly ? ' (--check, dry-run)' : ''}`);
  console.log('');

  if (!existsSync(SKILLS_DIR)) {
    info('No skills/ directory yet. Nothing to build.');
    return;
  }

  let slugs;
  if (targetSlug) {
    slugs = [targetSlug];
  } else {
    slugs = readdirSync(SKILLS_DIR)
      .filter(name => statSync(join(SKILLS_DIR, name)).isDirectory());
  }

  if (slugs.length === 0) {
    info('No skill directories found.');
    return;
  }

  for (const slug of slugs) {
    console.log(`\n📦 ${slug}`);
    buildOne(slug);
  }

  console.log('');
  console.log(`Summary: ${built} built · ${skipped} skipped · ${warnings} warnings · ${errors} errors`);

  if (errors > 0) {
    process.exit(1);
  }
}

main();
