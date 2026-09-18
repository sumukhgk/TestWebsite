import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export interface LiquidShaderProps {
  speed?: number;
  color?: string;
  wireframe?: boolean;
  roughness?: number;
  distort?: number;
}

export function LiquidShaderContent({
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
    <mesh ref={meshRef} rotation={[-Math.PI / 3, 0, 0]} position={[0, -0.5, 0]}>
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
}
