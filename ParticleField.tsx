import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export interface ParticleFieldProps {
  count?: number;
  color?: string;
  speed?: number;
}

// The scene content, kept separate from the <Canvas> wrapper so it can be
// reused inside a bigger scene later if needed.
function Points({ count = 2000, color = "#7c9aff", speed = 0.4 }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * speed * 0.1;
    pointsRef.current.rotation.x += delta * speed * 0.03;
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
      <pointsMaterial color={color} size={0.035} sizeAttenuation depthWrite={false} />
    </points>
  );
}

// Exported component: this is what the detail page's live renderer mounts,
// and what the controls panel re-renders with new props on every change.
export default function ParticleField(props: ParticleFieldProps) {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} style={{ width: "100%", height: "100%" }}>
      <Points {...props} />
    </Canvas>
  );
}
