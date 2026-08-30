# rohanaslam.com — agent instructions

This repo is Rohan Aslam's portfolio site. It is content-as-code: **the most common task is adding a new project entry.** The site auto-deploys to Vercel on every push to `main`.

## Read DESIGN.md first

[DESIGN.md](./DESIGN.md) is the visual and verbal source of truth. The site is a **transit wayfinding system**: work categories are routes, projects are stations, my career is a line diagram. Use its tokens by name. Never introduce a hex value that is not in that file.

The rules most likely to be broken:

- **Never use a warm off-white ground or an orange/ember accent.** That is the default palette of the AI tools this site is built with, and it makes the work look generated. This is anti-pattern number one.
- Radius is `0` or `999px`. Nothing between. No rounded cards.
- No drop shadows, no serif type, no gradients as decoration.
- Route colors are fills, never text on the ground. Amber measures 1.65 against the ground and is invisible. Cobalt is the only route color allowed as text.
- Exactly one animated element on the site: the route diagram in the homepage hero.

Tag to route mapping, fixed:

| Tag | Route | Color |
|---|---|---|
| `strategy` | Line 1 | cobalt `--line-1` |
| `ai-tools` | Line 2 | amber `--line-2` |
| `startup` | Line 3 | rose `--line-3` |
| `data` | Line 4 | green `--line-4` |
| `earlier-work` | Line 5 | grey `--line-5` |

A project's route comes from its first tag. The card and detail page pick it up automatically, so adding an entry needs no styling work.

Live implementation: `src/styles/global.css`, the diagram in `src/components/RouteMap.astro`, the style guide at `/style`.

## Stack

Astro 5 + MDX + Tailwind 4 (via `@tailwindcss/vite`). No CMS, no database. Content lives in `src/content/work/` as `.mdx` files, validated by the schema in `src/content.config.ts`. A malformed entry fails the build, so run `npm run build` before pushing.

## Adding a project entry (the main workflow)

1. Create `src/content/work/<slug>.mdx`. Slug: short, kebab-case, no dates.
2. Frontmatter — all fields validated at build time:

```yaml
---
title: "Human-readable name"
date: 2026-08-30            # date shipped or last major update
summary: "One line, under 200 chars, outcome-focused. Shown on cards."
tags: ["ai-tools"]           # from: ai-tools | strategy | startup | data | earlier-work
stack: ["Claude Code", "n8n"]
status: "shipped"            # shipped | in-progress | experiment
featured: false              # true puts it on the homepage; keep exactly 3 featured
links:
  repo: ""                   # optional
  live: ""                   # optional
---
```

3. Body: three or four short paragraphs, no headers, no bullets, no bold labels. The arc is
   problem, what I built, the interesting decision, where it stands now. But it reads as prose,
   not as a template with the seams showing. Open with a hard number or a concrete scene. Close
   on a turn, usually what is still unfinished. See DESIGN.md section 9, and read two existing
   entries before writing a new one.
4. Images: put in `public/images/<slug>/`, reference as `/images/<slug>/name.png`. Entries may ship without images.
5. Verify: `npm install && npm run build` must pass. Then commit and push to `main`.

## Voice rules (strict)

**DESIGN.md section 9 is the full specification, and it is long because this is the part that
usually goes wrong. Read it before writing any prose.** It contains verbatim samples of Rohan's
own writing. Use them as calibration: if a draft could not sit beside those quotes, rewrite it.

The rules that get broken most:

- **Never use em dashes.** There is not one in his entire writing archive. Use a period, comma,
  colon, or parentheses.
- Open with a hard number or a concrete scene. Never a thesis statement.
- Close on a turn, not a summary. Usually what is still unfinished.
- One dry, understated moment per piece. Never a pun, never "plot twist", never exclamation-mark
  comedy.
- One analogy per section, at the end, from sports, transit, or physical space.
- No "It's not just X, it's Y." fragments. No rhetorical triads. No second person to the reader.
- No marketing superlatives about himself, ever. State the work plainly with the number attached.
- Contractions throughout. Sentence fragments where they earn it.
- Sentence case in body copy. UPPERCASE only in `--text-label` and on buttons.
- Sun Life content: publicly shareable work only. No internal data, metrics, or client info.

## Homepage logic

- "Building now" strip = entries with status `in-progress` or `experiment` (newest 3).
- Featured grid = entries with `featured: true` (max 3 shown). When featuring a new entry, un-feature an old one.
- When something ships, flip its status to `shipped` and update `date`.

## Don'ts

- Don't restructure layouts/styles when asked to add content.
- Don't hardcode colors, sizes, or radii. Use the DESIGN.md tokens.
- Don't add a second animated element. The route diagram is the only one.
- Don't edit `RouteMap.astro` unless a real milestone changed. If you do, path lengths and station delays must be recomputed together, or the draw runs backwards.
- Don't add new tags to the taxonomy without being asked; the schema will reject them anyway.
- Don't delete existing entries; set them to `earlier-work` instead if they've aged out.
