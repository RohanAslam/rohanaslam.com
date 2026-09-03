#!/usr/bin/env node
/**
 * House-rules checker for rohanaslam.com.
 * Runs before every build, locally and in CI, so the rules in CONTEXT.md and
 * DESIGN.md are enforced rather than merely documented.
 *
 * Run on its own:  npm run check
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOT = process.cwd();
const SCAN_DIRS = ['src', 'public'];
const EXTS = new Set(['.astro', '.css', '.ts', '.js', '.mjs', '.mdx', '.md', '.svg', '.html']);

// Every hex value permitted anywhere in the codebase. Source: DESIGN.md section 12.
const APPROVED_HEX = new Set(
  [
    // light
    'F4F4F2', 'E9E9E6', '0B0E12', '535A63', '7A828C', 'D3D3CE',
    // routes, light
    '1B44D9', 'F2B705', 'D6246E', '00875A', '7A3EB0',
    // text-safe route variants
    '1739B4', '6B5000', 'B81A5B', '006B47',
    // dark
    '0D1014', '1A1F26', 'EDEFF2', '9AA3AE', '727C88', '2A313A',
    // routes, dark
    '6E90FF', 'FFC933', 'FF6FA3', '3FCC94', '8B95A1', '8FA9FF', 'B77BE8',
    // neutral
    'FFFFFF', 'FFF', '000000', '000',
  ].map((h) => h.toUpperCase()),
);

const errors = [];
const files = [];

function walk(dir) {
  let entries;
  try { entries = readdirSync(dir); } catch { return; }
  for (const name of entries) {
    if (name === 'node_modules' || name === 'dist' || name.startsWith('.')) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (EXTS.has(extname(p))) files.push(p);
  }
}
SCAN_DIRS.forEach((d) => walk(join(ROOT, d)));

const rel = (p) => p.replace(ROOT + '/', '');
const lineOf = (text, index) => text.slice(0, index).split('\n').length;

for (const file of files) {
  const text = readFileSync(file, 'utf8');
  const r = rel(file);

  // 1. Em dashes. Rohan does not use them. DESIGN.md section 9.7.
  for (const m of text.matchAll(/—/g)) {
    errors.push(`${r}:${lineOf(text, m.index)}  em dash. Use a period, comma, colon, or parentheses.`);
  }

  // 2. Hex colors outside the approved token set. DESIGN.md section 12.
  for (const m of text.matchAll(/#([0-9a-fA-F]{3,8})\b/g)) {
    const hex = m[1].toUpperCase();
    if (hex.length !== 3 && hex.length !== 6) continue; // skip 8-digit alpha and ids
    if (!APPROVED_HEX.has(hex)) {
      errors.push(`${r}:${lineOf(text, m.index)}  hex #${m[1]} is not a DESIGN.md token. Add it to DESIGN.md section 12 with a measured contrast ratio first, or use an existing token.`);
    }
  }

  // 3. Radius is 0 or fully round. Nothing in between. DESIGN.md section 5.
  for (const m of text.matchAll(/border-radius:\s*([^;\n}]+)/g)) {
    const v = m[1].trim();
    if (!/^(0|0px|999px|inherit|var\(--radius-(none|full)\))$/.test(v)) {
      errors.push(`${r}:${lineOf(text, m.index)}  border-radius: ${v}. Only 0 or 999px are allowed.`);
    }
  }
  for (const m of text.matchAll(/\brounded-(?!full\b)[a-z0-9[\]]+/g)) {
    errors.push(`${r}:${lineOf(text, m.index)}  "${m[0]}". Only rounded-full is allowed.`);
  }

  // 4. No shadows. Structure comes from 2px ink rules. DESIGN.md section 5.
  for (const m of text.matchAll(/box-shadow:\s*(?!none)/g)) {
    errors.push(`${r}:${lineOf(text, m.index)}  box-shadow. This system has no shadows.`);
  }
  for (const m of text.matchAll(/\bshadow-(?!none\b)[a-z0-9[\]]+/g)) {
    errors.push(`${r}:${lineOf(text, m.index)}  "${m[0]}". This system has no shadows.`);
  }

  // 5. No serif type anywhere. DESIGN.md section 4.
  if (/font-family:[^;\n}]*\bserif\b/.test(text) && !/sans-serif/.test(text.match(/font-family:[^;\n}]*\bserif\b/)[0])) {
    errors.push(`${r}  a serif font-family. This system is Archivo and IBM Plex Mono only.`);
  }
}

// 6. Content entries: valid route tags and required frontmatter.
const ROUTES = ['strategy', 'ai-tools', 'startup', 'data', 'earlier-work'];
const contentDir = join(ROOT, 'src/content/work');
let entries = [];
try { entries = readdirSync(contentDir).filter((f) => f.endsWith('.mdx')); } catch {}
if (!entries.length) errors.push('src/content/work  no project entries found.');

let featured = 0;
for (const name of entries) {
  const text = readFileSync(join(contentDir, name), 'utf8');
  const fm = text.match(/^---\n([\s\S]*?)\n---/);
  const r = `src/content/work/${name}`;
  if (!fm) { errors.push(`${r}  missing frontmatter block.`); continue; }
  const block = fm[1];
  for (const field of ['title', 'date', 'summary', 'tags', 'status']) {
    if (!new RegExp(`^${field}:`, 'm').test(block)) errors.push(`${r}  frontmatter missing "${field}".`);
  }
  const tagMatch = block.match(/^tags:\s*\[(.*)\]/m);
  if (tagMatch) {
    const tags = tagMatch[1].split(',').map((t) => t.trim().replace(/['"]/g, '')).filter(Boolean);
    if (!tags.length) errors.push(`${r}  tags is empty. The first tag decides the route color.`);
    for (const t of tags) {
      if (!ROUTES.includes(t)) errors.push(`${r}  tag "${t}" is not a route. Use one of: ${ROUTES.join(', ')}.`);
    }
  }
  const sum = block.match(/^summary:\s*["'](.*)["']\s*$/m);
  if (sum && sum[1].length > 200) errors.push(`${r}  summary is ${sum[1].length} chars. Cap is 200.`);
  if (/^featured:\s*true/m.test(block)) featured++;
}
if (featured !== 3) {
  errors.push(`src/content/work  ${featured} entries are featured. Exactly 3 should be. See CONTEXT.md section 6.`);
}

// Report
if (errors.length) {
  console.error(`\n  ${errors.length} house-rule violation${errors.length === 1 ? '' : 's'}:\n`);
  for (const e of errors) console.error('  ' + e);
  console.error('\n  These rules are documented in CONTEXT.md and DESIGN.md. Read those before overriding anything.\n');
  process.exit(1);
}
console.log(`  house rules pass  (${files.length} files, ${entries.length} entries, ${featured} featured)`);
