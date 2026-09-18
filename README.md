# Starter code

Three files that show how the catalog's data-driven pattern works end to end:

- `types.ts` — the `ComponentEntry` schema every page reads from
- `componentData.ts` — one real catalog entry (Particle Field), wired to a slug/category/variants/controls
- `ParticleField.tsx` — the actual React Three Fiber component the entry points to

## How they connect
1. The browse grid maps over `componentCatalog` and renders a card per entry.
2. The detail page route (`/components/:slug`) looks up the matching entry.
3. It mounts the component named by the entry (here, `ParticleField`) inside
   the live renderer, passing the active variant's `props`.
4. The controls panel reads `entry.controls`, renders a slider/color input
   per control, and feeds live prop changes back into the mounted component.
5. The source tab renders `entry.sourceFiles` in a code viewer.

## To use these in a scaffolded project
Drop `types.ts` and `componentData.ts` into `src/data/`, and
`ParticleField.tsx` into `src/components/`. Install the two dependencies it
needs:

```
npm install three @react-three/fiber
npm install -D @types/three
```

Then render it directly to sanity-check it renders before wiring up the
full detail-page machinery:

```tsx
import ParticleField from "./components/ParticleField";

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ParticleField count={2000} color="#7c9aff" speed={0.4} />
    </div>
  );
}
```
