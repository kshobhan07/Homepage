# KPMG DSIP V2

The flagship landing experience for KPMG's Digital Signals Intelligence Platform — an AI-native external cyber
risk command center. Rebuilt from scratch as a cinematic, product-like experience rather than a marketing page:
a persistent signal-rail navigator, a live global operations map, an animated attack-path simulation, a
draggable knowledge-graph explorer, a real-feeling AI copilot conversation, and a living architecture diagram,
all sharing one instrument-panel design language.

## Stack

- Next.js 15 (App Router) · React 19 · TypeScript
- Tailwind CSS
- Framer Motion
- Recharts (trend charts)
- Zustand (platform module state)
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
