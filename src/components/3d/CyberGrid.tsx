import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export interface CyberGridProps {
  gridSize?: number;
  barColor?: string;
  speed?: number;
  maxHeight?: number;
}

export function CyberGridContent({
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
    <group ref={groupRef} position={[0, -0.2, 0]}>
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
}
