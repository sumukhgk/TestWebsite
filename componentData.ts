import type { ComponentEntry } from "./types";

// One example entry. The browse grid maps over an array of these;
// the detail page looks one up by slug from the route params.
export const componentCatalog: ComponentEntry[] = [
  {
    slug: "particle-field",
    name: "Particle Field",
    category: "Backgrounds",
    description:
      "A drifting field of animated points, useful as a hero or section backdrop.",
    variants: [
      { id: "default", label: "Default", props: { count: 2000, color: "#7c9aff" } },
      { id: "dense", label: "Dense", props: { count: 6000, color: "#7c9aff" } },
      { id: "warm", label: "Warm", props: { count: 2000, color: "#ffb27c" } },
    ],
    controls: [
      { key: "count", label: "Particle count", type: "slider", min: 200, max: 8000, step: 100, defaultValue: 2000 },
      { key: "color", label: "Color", type: "color", defaultValue: "#7c9aff" },
      { key: "speed", label: "Drift speed", type: "slider", min: 0, max: 2, step: 0.05, defaultValue: 0.4 },
    ],
    sourceFiles: [
      {
        filename: "ParticleField.tsx",
        language: "tsx",
        code: "// see ParticleField.tsx in this same folder",
      },
    ],
  },
];
