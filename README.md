# KPMG DSIP V3

The flagship landing experience for KPMG's Digital Signals Insights Platform — complete 360° protection against
digital threats, powered by Gen AI. Rebuilt around KPMG's actual capability positioning (attack surface, brand
protection, threat intelligence, dark web, VIP/deepfake and third-party risk) with a premium, enterprise-grade
product feel: a multi-source intelligence engine in the hero, an AI analyst you watch reason through an
investigation, an animated Gather → Discover → Analyze → Report → Remediate pipeline, and a realistic platform
snapshot — all on a KPMG-blue/cyan design language with no purple, pink or gaming aesthetics.

## Stack

- Next.js 15 (App Router) · React 19 · TypeScript
- Tailwind CSS
- Framer Motion
- Custom canvas/SVG primitives for the signal lattice, topology graphs and radar visualizations

## Run

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

## Structure

- `app/` — root layout, fonts, global styles
- `components/dsip/primitives/` — shared instrument-panel primitives (glass panels, terminal chrome, node-graph
  helpers, signal rail, status bar, command palette, stat/gauge widgets)
- `components/dsip/sections/` — one file per landing page section
- `components/dsip/sections-config.ts` — ordered section registry driving the nav rail, mobile menu and command
  palette jump list
