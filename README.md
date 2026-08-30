# rohanaslam.com

Personal portfolio. Astro 5 + MDX + Tailwind 4, deployed on Vercel. The repo is the CMS: every project is one `.mdx` file in `src/content/work/`, and AI agents (Claude Code, Antigravity) add entries by committing files. See [CLAUDE.md](./CLAUDE.md) and [AGENTS.md](./AGENTS.md).

**[DESIGN.md](./DESIGN.md) is the design system: a transit wayfinding language.** Work categories are routes, projects are stations, the career is a line diagram. Color, type, rules, components, motion, and voice, with every contrast ratio measured. Implemented in `src/styles/global.css` and rendered live at `/style`.

## Develop

```bash
npm install
npm run dev      # localhost:4321
npm run build    # validates all content against the schema
```

## Deploy

Hosted on **GitHub Pages**, built by GitHub Actions. `.github/workflows/deploy.yml` runs on every push to `main`, builds with `withastro/action`, and publishes. `public/CNAME` pins the custom domain.

One-time setup:

1. Repo -> Settings -> Pages -> Source: **GitHub Actions**.
2. Repo -> Settings -> Pages -> Custom domain: `rohanaslam.com`, then tick **Enforce HTTPS** once the certificate is issued.
3. At the domain registrar, point the apex at GitHub Pages with four A records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`. Add a CNAME for `www` pointing at `rohanaslam.github.io`.
4. Once it resolves, cancel Adobe Portfolio.

After that, every push to `main` deploys in about a minute. Watch it under the repo's Actions tab.

## Add work with AI

From any Claude Code or Antigravity session where you just finished building something:

> "Add this project to my portfolio repo (github.com/RohanAslam/rohanaslam.com). Follow its CLAUDE.md."

The agent writes the entry, validates the build, and pushes. Live in about a minute.
