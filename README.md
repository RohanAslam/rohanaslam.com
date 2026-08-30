# rohanaslam.com

Personal portfolio. Astro 5 + MDX + Tailwind 4, deployed on Vercel. The repo is the CMS: every project is one `.mdx` file in `src/content/work/`, and AI agents (Claude Code, Antigravity) add entries by committing files. See [CLAUDE.md](./CLAUDE.md) and [AGENTS.md](./AGENTS.md).

**[DESIGN.md](./DESIGN.md) is the design system: a transit wayfinding language.** Work categories are routes, projects are stations, the career is a line diagram. Color, type, rules, components, motion, and voice, with every contrast ratio measured. Implemented in `src/styles/global.css` and rendered live at `/style`.

## Develop

```bash
npm install
npm run dev      # localhost:4321
npm run build    # validates all content against the schema
```

## Deploy (one-time setup)

1. Push this repo to GitHub.
2. [vercel.com](https://vercel.com) → Add New Project → import the repo. Astro is auto-detected; accept defaults.
3. Project → Settings → Domains → add `rohanaslam.com`. Vercel shows the DNS records to set at your registrar (an A record and a CNAME for www).
4. Once the domain resolves, cancel Adobe Portfolio.

After setup, every push to `main` deploys automatically.

## Add work with AI

From any Claude Code or Antigravity session where you just finished building something:

> "Add this project to my portfolio repo (github.com/RohanAslam/rohanaslam.com). Follow its CLAUDE.md."

The agent writes the entry, validates the build, and pushes. Live in about a minute.
