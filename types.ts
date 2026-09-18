// Core data schema. Every browse-grid card and component detail page
// reads from ComponentEntry — adding a new component is a data change,
// not a new page.

export type ControlType = "slider" | "color" | "toggle" | "select";

export interface ControlSchema {
  key: string;            // matches a prop name on the live component
  label: string;          // shown in the controls panel
  type: ControlType;
  min?: number;            // for "slider"
  max?: number;
  step?: number;
  options?: string[];      // for "select"
  defaultValue: number | string | boolean;
}

export interface ComponentVariant {
  id: string;
  label: string;
  props: Record<string, unknown>;
}

export interface SourceFile {
  filename: string;
  language: "tsx" | "ts" | "css";
  code: string;
}

export interface ComponentEntry {
  slug: string;             // used in the route: /components/:slug
  name: string;
  category: string;         // e.g. "Backgrounds", "Hero", "Particles"
  description: string;
  thumbnail?: string;       // optional static preview image for the grid
  variants: ComponentVariant[];
  controls: ControlSchema[];
  sourceFiles: SourceFile[];
}
