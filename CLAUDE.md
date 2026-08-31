# Agent instructions

**Read [CONTEXT.md](./CONTEXT.md) first, then [DESIGN.md](./DESIGN.md). Do not start work until you have.**

CONTEXT.md is the canonical brief: what this project is, the non-negotiables, the content model, and how to add a project. DESIGN.md is the visual system and the writing voice.

This file is a pointer on purpose. It holds no rules of its own, so it can never drift out of sync with CONTEXT.md. Do not add content here.

## The 60 second version

- Personal site of Rohan Aslam, aimed at startup strategy roles. Astro 5 + MDX + Tailwind 4, deployed to GitHub Pages on push to `main`.
- The design language is a transit wayfinding system. Work categories are routes, projects are stations.
- Adding a project is one `.mdx` file in `src/content/work/`. That is the main task.
- Hard rules: no warm/orange palette, no em dashes, radius is 0 or 999px, no shadows, no serif, no hex outside the DESIGN.md tokens.
- `npm run build` runs `scripts/validate.mjs` first and fails on violations. Run it before you claim to be done.

Everything else is in CONTEXT.md. Go read it.
