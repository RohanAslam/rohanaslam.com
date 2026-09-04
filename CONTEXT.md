# CONTEXT.md

**Read this file first. Every time. Before writing a single line.**

This is the canonical brief for rohanaslam.com. If you are an AI model, agent, or a person who has just opened this repo, this file plus [DESIGN.md](./DESIGN.md) is everything you need. Read both before you edit anything.

Two files, two jobs:

- **CONTEXT.md** (this file): what this project is, how it is built, how to add to it, what will break.
- **DESIGN.md**: the visual system and the writing voice, in detail. Section 9 is the voice spec and it is long because that is the part that usually goes wrong.

Everything else in the repo root that looks like agent instructions (CLAUDE.md, AGENTS.md, .cursorrules, .github/copilot-instructions.md) is a thin pointer back to these two. Do not add content to those pointer files. It will drift and then contradict this one.

---

## 1. What this is

The personal site of **Rohan Aslam**. Live at [rohanaslam.com](https://rohanaslam.com).

It exists to get him hired into **startup strategy and operations roles**. Every decision serves that. It is not a design showcase, not a blog, not a template demo.

It is also built to be updated by AI. He ships small tools most weekends, and the intended loop is: finish a tool, tell an agent "add this to my portfolio, follow CONTEXT.md", the agent writes one file and pushes, the site redeploys in about a minute.

## 2. Who Rohan is

You need this to make correct calls about content and tone.

- Recent University of Toronto Mississauga grad. CCIT (Communication, Culture, Information and Technology) with a Computer Science minor. He calls it an arts degree that taught him to build.
- Five internships: RBC (web dev, 2022), Ontario Teachers' Pension Plan (Experience Design and Innovation, 16 months, 2023 to 2024), U of T Innovation Hub (design research, 2025), Dye & Durham (product, eCore, 2025), Sun Life (digital transformation, 2026).
- Now full time at Sun Life on the **SunAdvantage** team, group benefits for small businesses.
- Co-founder of **SmartSyllabus**, an AI academic planning product built through University of Toronto ICUBE, live at smartsyllabus.ca.
- Based in Scarborough, Ontario. Hikes Ontario and Quebec. Plans events and volunteer rotations in his community.

**Positioning, in one line:** he thinks in strategy and proves it by shipping. Strategic claims on this site are always backed by something he actually built.

## 3. Non-negotiables

If you break one of these, the work is wrong even if it looks fine.

1. **No warm off-white backgrounds. No orange or ember accent colors.** That palette belongs to the AI tools this site is built with, and it makes the work look generated. A previous version of this site used it and was rejected for exactly that reason. Do not drift back toward it.
2. **No em dashes anywhere in site copy.** There is not one in Rohan's entire writing archive. Use a period, comma, colon, or parentheses.
3. **Border radius is 0 or fully round.** Nothing in between. No rounded cards.
4. **No drop shadows, no serif type, no gradients used as decoration.**
5. **Only one animated element on the site:** the route diagram in the homepage hero.
6. **Never hardcode a hex value that is not in DESIGN.md section 12.**
7. **Sun Life content stays publicly shareable.** No internal data, metrics, client information, or anything not already public.

Items 2, 3, 4 and 6 are checked automatically. See section 9.

## 4. The design language, in 60 seconds

The site is a **transit wayfinding system**. This is not decoration, it is the organizing idea:

- **Work categories are routes.** Each has a permanent line number and color.
- **Projects are stations.** Every project card carries its route bullet and a colored platform marker down its left edge.
- **His career is a line diagram.** The homepage hero draws it, 45 and 90 degree angles only.
- **Navigation is signage.** Heavy Archivo caps, 2px ink rules, IBM Plex Mono for every piece of data.

Fixed tag to route mapping. A project's route comes from its **first tag**, and the components pick it up automatically:

| Tag | Route | Token | Color |
|---|---|---|---|
| `strategy` | Line 1 | `--line-1` | cobalt |
| `ai-tools` | Line 2 | `--line-2` | amber |
| `startup` | Line 3 | `--line-3` | rose |
| `data` | Line 4 | `--line-4` | green |
| `earlier-work` | Line 5 | `--line-5` | purple |

Full spec, including every contrast ratio, is in DESIGN.md.

## 5. Repo map

```
CONTEXT.md                      you are here
DESIGN.md                       visual system + voice spec
README.md                       human-facing setup and deploy
CLAUDE.md / AGENTS.md           pointers to this file
.cursorrules                    pointer
.github/copilot-instructions.md pointer
.github/workflows/deploy.yml    builds and publishes on push to main
scripts/validate.mjs            house-rules checker, runs before every build
src/content.config.ts           frontmatter schema, enforced at build time
src/content/work/*.mdx          one file per project. This is the CMS.
src/components/RouteMap.astro   the animated career diagram
src/components/ProjectCard.astro
src/layouts/Base.astro          system bar, nav, footer
src/pages/index.astro           homepage
src/pages/work/index.astro      filterable work grid
src/pages/work/[slug].astro     project detail
src/pages/about.astro
src/pages/style.astro           living style guide at /style
src/styles/global.css           all design tokens live here
public/CNAME                    pins the custom domain
```

## 6. The main task: adding a project

This is what you will be asked to do 90% of the time. It is one file.

1. Create `src/content/work/<slug>.mdx`. Slug is short, kebab-case, no dates.
2. Frontmatter, all fields validated at build time by `src/content.config.ts`:

```yaml
---
title: "Human readable name"
date: 2026-08-30            # shipped, or last meaningful update
summary: "One line, under 200 chars. Outcome, not description. Shown on cards."
tags: ["ai-tools"]           # first tag decides the route color
stack: ["Claude Code", "n8n"]
status: "shipped"            # shipped | in-progress | experiment
featured: false              # true puts it on the homepage. Keep exactly 3 featured.
links:
  repo: ""                   # optional
  live: ""                   # optional
---
```

3. Body: three or four short paragraphs. **No headers, no bullets, no bold labels.** The arc is problem, what I built, the interesting decision, where it stands. It should read as prose, not as a filled-in template.
   - Open with a hard number or a concrete scene. Never a thesis statement.
   - Close on a turn, usually what is still unfinished. Never a summary.
   - Read two existing entries before writing a new one. `smartsyllabus.mdx` and `personal-ai-os.mdx` are the reference.
4. Images go in `public/images/<slug>/`, referenced as `/images/<slug>/name.png`. An entry can ship without images.
5. If featuring the new entry, un-feature an older one. Exactly three stay featured.
6. When something ships, flip its `status` to `shipped` and update `date`.

Run `npm run build`. If it passes, commit and push. That is the whole job.

## 7. Voice, the short version

Full spec in DESIGN.md section 9, with verbatim samples of Rohan's own writing. Use those samples as calibration: if your draft could not sit beside them, rewrite it.

- Casual, direct, contractions throughout. Write like explaining to a friend who works in tech.
- Open with a hard number. Close on a turn.
- One dry, understated moment per piece. Never a pun, never "plot twist", never exclamation-mark comedy.
- One analogy per section, at the end. Sports, transit, or physical space are his natural domains.
- State achievements plainly with the number attached, then say what is still unfinished.
- Never: marketing superlatives about himself, rhetorical triads, "It's not just X, it's Y" fragments, second person addressed to the reader, "Learn more".

**A trap worth knowing:** "not only... but also", "Moreover", "Furthermore" and "extremely" are simultaneously Rohan's genuine tics and classic AI tells. Leaning on them makes authentic copy read as generated. Do not use them as proof of authenticity.

## 8. Deploy

GitHub Pages, built by GitHub Actions.

- Push to `main` triggers `.github/workflows/deploy.yml`.
- It runs `npm run build`, which runs `scripts/validate.mjs` first, then Astro.
- If either fails, nothing deploys.
- Live in roughly a minute. Watch the Actions tab.
- Domain is registered at Squarespace, apex pointed at GitHub's four Pages IPs, `public/CNAME` pins it.

You do not need to touch any of this to add content.

## 9. What will fail the build

`scripts/validate.mjs` runs before every build, locally and in CI. It fails on:

- An em dash in any file under `src/`.
- A hex color anywhere in `src/` that is not one of the approved tokens.
- A `border-radius` value that is not `0` or `999px`.
- A `box-shadow` in `src/`.
- A project entry missing required frontmatter, or using a tag outside the five routes.

Run it on its own with `npm run check`. This is deliberate: the rules are not suggestions, and an agent that skipped this file will find out at build time instead of shipping something off-brand.

The Astro content schema in `src/content.config.ts` is a second layer. A malformed entry fails the build rather than breaking the live site.

## 10. Mistakes that have already been made

Recorded so nobody repeats them.

- **The first version of this site used warm paper and a burnt orange accent.** It was rejected on sight as looking AI-generated, because that is the palette of the tools it was built with. This is why non-negotiable number 1 exists.
- **The first copy was performative.** Antithesis constructions, rhetorical triads, "thinking and building are the same job". Rohan's actual writing is drier and more concrete than any default AI register. This is why DESIGN.md section 9 is so long.
- **The route diagram was once animated with wrong path lengths**, so branches drew backwards from the right edge. If you edit `RouteMap.astro`, the SVG path lengths and the per-station delays must be recomputed together. The comment at the top of that file explains the maths.

## 11. Before you say you are done

- [ ] `npm run build` passes, which means `npm run check` passed too.
- [ ] Read your copy against the samples in DESIGN.md section 9. Does it sound like him, or like a competent stranger?
- [ ] Zero em dashes.
- [ ] Still exactly three featured entries.
- [ ] The anti-patterns list in DESIGN.md section 11 has been read, especially the first item.
- [ ] Nothing about Sun Life that is not already public.
