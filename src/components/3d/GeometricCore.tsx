import { useRef } from "react";
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

export function GeometricCoreContent({
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
    <group>
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
    </group>
  );
}
