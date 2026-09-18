import type { ComponentEntry } from "../types";

export const componentCatalog: ComponentEntry[] = [
  {
    slug: "particle-field",
    name: "Particle Field",
    category: "Backgrounds",
    description: "A drifting ambient starfield of illuminated 3D points with additive blending.",
    tags: ["particles", "space", "stars", "background", "r3f"],
    thumbnailColor: "#7c9aff",
    variants: [
      { id: "default", label: "Default Cosmic", props: { count: 2500, color: "#7c9aff", speed: 0.4, particleSize: 0.04 } },
      { id: "dense", label: "Hyperdrive", props: { count: 6000, color: "#38bdf8", speed: 1.2, particleSize: 0.03 } },
      { id: "warm", label: "Solar Dust", props: { count: 3000, color: "#fbbf24", speed: 0.5, particleSize: 0.05 } },
    ],
    controls: [
      { key: "count", label: "Particle count", type: "slider", min: 500, max: 8000, step: 100, defaultValue: 2500 },
      { key: "color", label: "Particle Color", type: "color", defaultValue: "#7c9aff" },
      { key: "speed", label: "Rotation Speed", type: "slider", min: 0, max: 2, step: 0.05, defaultValue: 0.4 },
      { key: "particleSize", label: "Particle Size", type: "slider", min: 0.01, max: 0.1, step: 0.005, defaultValue: 0.04 },
    ],
    sourceFiles: [
      {
        filename: "ParticleField.tsx",
        language: "tsx",
        code: `import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export interface ParticleFieldProps {
  count?: number;
  color?: string;
  speed?: number;
  particleSize?: number;
}

export function ParticleField({
  count = 2500,
  color = "#7c9aff",
  speed = 0.4,
  particleSize = 0.04,
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * speed * 0.1;
    pointsRef.current.rotation.x += delta * speed * 0.04;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={particleSize}
        sizeAttenuation
        depthWrite={false}
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}`,
      },
    ],
  },
  {
    slug: "liquid-shader",
    name: "Liquid Wave Mesh",
    category: "Shaders",
    description: "An organic waving plane mesh with continuous procedural vertex displacement and metallic shading.",
    tags: ["shader", "waves", "water", "mesh", "displacement"],
    thumbnailColor: "#38bdf8",
    variants: [
      { id: "cyan-wave", label: "Cyan Ocean", props: { speed: 1.0, color: "#38bdf8", wireframe: false, roughness: 0.2, distort: 0.5 } },
      { id: "wireframe-neon", label: "Wireframe Grid", props: { speed: 1.5, color: "#818cf8", wireframe: true, roughness: 0.1, distort: 0.8 } },
      { id: "molten-gold", label: "Molten Gold", props: { speed: 0.6, color: "#fbbf24", wireframe: false, roughness: 0.3, distort: 0.4 } },
    ],
    controls: [
      { key: "speed", label: "Wave Speed", type: "slider", min: 0.1, max: 3.0, step: 0.1, defaultValue: 1.0 },
      { key: "color", label: "Mesh Color", type: "color", defaultValue: "#38bdf8" },
      { key: "distort", label: "Wave Amplitude", type: "slider", min: 0.1, max: 1.5, step: 0.05, defaultValue: 0.5 },
      { key: "wireframe", label: "Wireframe Mode", type: "toggle", defaultValue: false },
      { key: "roughness", label: "Surface Roughness", type: "slider", min: 0.0, max: 1.0, step: 0.05, defaultValue: 0.2 },
    ],
    sourceFiles: [
      {
        filename: "LiquidShaderMesh.tsx",
        language: "tsx",
        code: `import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export interface LiquidShaderProps {
  speed?: number;
  color?: string;
  wireframe?: boolean;
  roughness?: number;
  distort?: number;
}

export function LiquidShaderMesh({
  speed = 1.0,
  color = "#38bdf8",
  wireframe = false,
  roughness = 0.2,
  distort = 0.5,
}: LiquidShaderProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() * speed;
    const geo = meshRef.current.geometry as THREE.PlaneGeometry;
    const pos = geo.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const u = pos.getX(i);
      const v = pos.getY(i);
      const z = Math.sin(u * 1.5 + t) * Math.cos(v * 1.5 + t * 0.8) * distort;
      pos.setZ(i, z);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 3, 0, 0]}>
      <planeGeometry args={[10, 10, 48, 48]} />
      <meshStandardMaterial
        color={color}
        wireframe={wireframe}
        roughness={roughness}
        metalness={0.8}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}`,
      },
    ],
  },
  {
    slug: "geometric-core",
    name: "Geometric Core",
    category: "Geometric",
    description: "A physically-rendered glass and metal 3D polyhedron with clearcoat reflections.",
    tags: ["geometry", "polyhedron", "pbr", "3d-object", "metallic"],
    thumbnailColor: "#818cf8",
    variants: [
      { id: "torus-indigo", label: "Torus Knot", props: { shape: "torusKnot", color: "#818cf8", metalness: 0.9, roughness: 0.1, wireframe: false, rotationSpeed: 0.6 } },
      { id: "icosa-wire", label: "Wireframe Icosahedron", props: { shape: "icosahedron", color: "#38bdf8", metalness: 0.5, roughness: 0.2, wireframe: true, rotationSpeed: 1.0 } },
      { id: "dodeca-gold", label: "Golden Dodecahedron", props: { shape: "dodecahedron", color: "#fbbf24", metalness: 0.95, roughness: 0.05, wireframe: false, rotationSpeed: 0.4 } },
    ],
    controls: [
      { key: "shape", label: "Geometry Shape", type: "select", options: ["torusKnot", "icosahedron", "dodecahedron"], defaultValue: "torusKnot" },
      { key: "color", label: "Material Color", type: "color", defaultValue: "#818cf8" },
      { key: "metalness", label: "Metalness", type: "slider", min: 0, max: 1, step: 0.05, defaultValue: 0.9 },
      { key: "roughness", label: "Roughness", type: "slider", min: 0, max: 1, step: 0.05, defaultValue: 0.1 },
      { key: "rotationSpeed", label: "Rotation Speed", type: "slider", min: 0, max: 2, step: 0.1, defaultValue: 0.6 },
      { key: "wireframe", label: "Wireframe Mode", type: "toggle", defaultValue: false },
    ],
    sourceFiles: [
      {
        filename: "GeometricCore.tsx",
        language: "tsx",
        code: `import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export interface GeometricCoreProps {
  shape?: "torusKnot" | "icosahedron" | "dodecahedron";
  color?: string;
  metalness?: number;
  roughness?: number;
  wireframe?: boolean;
  rotationSpeed?: number;
}

export function GeometricCore({
  shape = "torusKnot",
  color = "#818cf8",
  metalness = 0.9,
  roughness = 0.1,
  wireframe = false,
  rotationSpeed = 0.6,
}: GeometricCoreProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * rotationSpeed * 0.7;
    meshRef.current.rotation.y += delta * rotationSpeed;
  });

  return (
    <mesh ref={meshRef}>
      {shape === "torusKnot" && <torusKnotGeometry args={[1.2, 0.4, 128, 32]} />}
      {shape === "icosahedron" && <icosahedronGeometry args={[1.6, 2]} />}
      {shape === "dodecahedron" && <dodecahedronGeometry args={[1.5, 0]} />}
      <meshPhysicalMaterial
        color={color}
        metalness={metalness}
        roughness={roughness}
        wireframe={wireframe}
        clearcoat={0.6}
        clearcoatRoughness={0.2}
      />
    </mesh>
  );
}`,
      },
    ],
  },
  {
    slug: "cyber-grid",
    name: "Cyber Visualizer Grid",
    category: "Audio & Grid",
    description: "An animated 3D grid array of pulsating equalizer bars with phase displacement.",
    tags: ["audio", "visualizer", "grid", "bars", "equalizer"],
    thumbnailColor: "#fbbf24",
    variants: [
      { id: "amber-matrix", label: "Amber Equalizer", props: { gridSize: 7, barColor: "#fbbf24", speed: 1.2, maxHeight: 2.5 } },
      { id: "cyan-synth", label: "Synthwave Cyan", props: { gridSize: 9, barColor: "#38bdf8", speed: 1.8, maxHeight: 3.0 } },
      { id: "rose-pulse", label: "Neon Rose Grid", props: { gridSize: 5, barColor: "#fb7185", speed: 0.8, maxHeight: 2.0 } },
    ],
    controls: [
      { key: "gridSize", label: "Grid Dimensions", type: "slider", min: 3, max: 11, step: 2, defaultValue: 7 },
      { key: "barColor", label: "Bar Accent Color", type: "color", defaultValue: "#fbbf24" },
      { key: "speed", label: "Pulse Speed", type: "slider", min: 0.2, max: 3.0, step: 0.1, defaultValue: 1.2 },
      { key: "maxHeight", label: "Max Bar Height", type: "slider", min: 0.5, max: 4.0, step: 0.2, defaultValue: 2.5 },
    ],
    sourceFiles: [
      {
        filename: "CyberGrid.tsx",
        language: "tsx",
        code: `import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export interface CyberGridProps {
  gridSize?: number;
  barColor?: string;
  speed?: number;
  maxHeight?: number;
}

export function CyberGrid({
  gridSize = 7,
  barColor = "#fbbf24",
  speed = 1.2,
  maxHeight = 2.5,
}: CyberGridProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  const items = useMemo(() => {
    const list = [];
    const offset = (gridSize - 1) / 2;
    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        list.push({
          x: (x - offset) * 0.7,
          z: (z - offset) * 0.7,
          phase: Math.sqrt(x * x + z * z) * 0.5,
        });
      }
    }
    return list;
  }, [gridSize]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15;
    }

    items.forEach((item, idx) => {
      const mesh = meshRefs.current[idx];
      if (mesh) {
        const h = 0.2 + Math.abs(Math.sin(t + item.phase)) * maxHeight;
        mesh.scale.set(1, h, 1);
        mesh.position.y = h / 2 - 1;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {items.map((item, idx) => (
        <mesh
          key={idx}
          ref={(el) => (meshRefs.current[idx] = el)}
          position={[item.x, 0, item.z]}
        >
          <boxGeometry args={[0.4, 1, 0.4]} />
          <meshStandardMaterial
            color={barColor}
            metalness={0.7}
            roughness={0.2}
            emissive={barColor}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}`,
      },
    ],
  },
];
