// Core data schema for ThreeUI component catalog entries

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
  language: "tsx" | "ts" | "css" | "glsl";
  code: string;
}

export interface ComponentEntry {
  slug: string;             // used in route: /components/:slug
  name: string;
  category: "Backgrounds" | "Shaders" | "Geometric" | "Audio & Grid";
  description: string;
  tags: string[];
  thumbnailColor?: string;
  variants: ComponentVariant[];
  controls: ControlSchema[];
  sourceFiles: SourceFile[];
}
