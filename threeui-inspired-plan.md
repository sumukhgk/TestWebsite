# Website Plan — ThreeUI-Inspired Component Catalog

Inspired by: https://github.com/MengTo/threeui
Target build environment: Google Antigravity (agentic IDE)

## What we're building
A component catalog/showcase website with live, interactive Three.js/WebGL
components — matching ThreeUI's structure: app shell, browse grid, search,
theming, component detail pages with a live renderer, variant picker,
controls panel, and tabbed source viewer. Also structured as an installable
component library, not just a demo site.

---

## Phase 0 — Scope
Two possible products hide inside "a website like ThreeUI":
1. A **catalog/showcase site** (like threeui.com)
2. A **component library** (like the `@designcodeio/threeui` npm package)

This plan builds both: the library is the source of truth, the site
consumes it.

## Phase 1 — Tech stack
- Vite + React 18 + TypeScript
- `@react-three/fiber` + `@react-three/drei` (Three.js in React)
- Tailwind CSS
- React Router
- Zustand (theme + active variant state)
- `fuse.js` (client-side fuzzy search)

## Phase 2 — Information architecture
1. **App shell** — top nav (logo, search, theme toggle, GitHub link) + sidebar category nav
2. **Browse grid** — homepage grid of component cards (live/static thumbnail, name, category tag)
3. **Search** — fuzzy search over component names/tags/categories
4. **Component detail page**
   - Live renderer canvas
   - Variant picker (swap between visual variants of the same component)
   - Controls panel (sliders/toggles bound to component props)
   - Tabbed source view: Code / Props / Usage
5. **Theming** — CSS-variable-based light/dark mode, applied globally

## Phase 3 — Data model
One schema every page reads from, so adding a component is a data change,
not a new page:

```ts
type ComponentEntry = {
  slug: string;
  name: string;
  category: string;
  description: string;
  variants: { id: string; label: string; props: Record<string, any> }[];
  controls: ControlSchema[];
  sourceFiles: { filename: string; code: string }[];
};
```

## Phase 4 — Build order
1. Scaffold Vite + React + TS + Tailwind + Router
2. App shell with static placeholder content
3. Browse grid + one hardcoded component card
4. Component detail page wired to the data schema (renderer, variant picker,
   controls, source tabs)
5. Build 3–5 real R3F components, starting simple:
   - Animated gradient background
   - Particle field
   - Hero section with a shader backdrop
6. Wire up search
7. Responsive polish + dark mode
8. Optional: Vite library-mode build for an installable npm package

## Phase 5 — Stretch goals
- Pro/Beta content gating (OAuth + entitlement check) — only if selling components
- Public/private repo sync scripts — only relevant at scale
- CI (lint, build, smoke test) via GitHub Actions

---

## Prompt for Antigravity's Agent Manager

Paste this into a **New Task** (Manager Surface, not inline Editor chat) so
the agent produces a reviewable plan artifact before it starts coding:

> Scaffold a Vite + React + TypeScript website inspired by the ThreeUI
> component catalog (github.com/MengTo/threeui). Build: (1) an app shell
> with top nav, search, and light/dark theme toggle, (2) a homepage browse
> grid of component cards, (3) a component detail page with a live React
> Three Fiber renderer, a variant picker, a controls panel, and a tabbed
> source-code viewer, (4) a JSON/TS data schema so new components can be
> added as data, not new pages. Start with 3 example shader/Three.js
> components: animated gradient background, particle field, and a hero
> section. Use Tailwind for styling and React Router for routing. Run the
> dev server and verify the browse grid and one detail page render
> correctly in the browser before finishing.

## Design direction notes for the agent
- Pick a real visual identity for the subject (a dev-tools/component
  catalog audience) rather than defaulting to generic SaaS card styling —
  named palette, deliberate type scale, one memorable hero moment.
- Avoid: single-accent-word headlines, ALL-CAPS eyebrow labels, identical
  rounded cards with the same soft shadow on everything.
- Motion: one deliberate reveal/hero animation, not fade-up on every card.
