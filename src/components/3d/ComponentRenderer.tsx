import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { ParticleFieldContent } from "./ParticleField";
import { LiquidShaderContent } from "./LiquidShaderMesh";
import { GeometricCoreContent } from "./GeometricCore";
import { CyberGridContent } from "./CyberGrid";

interface ComponentRendererProps {
  slug: string;
  props: Record<string, any>;
  interactive?: boolean;
  className?: string;
}

export default function ComponentRenderer({
  slug,
  props,
  interactive = true,
  className = "w-full h-full min-h-[300px]",
}: ComponentRendererProps) {
  return (
    <div className={`relative ${className}`}>
      <Canvas
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full rounded-xl"
      >
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={50} />
        
        {/* Ambient & Directional Lighting setup */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#818cf8" />

        {/* Dynamic Component Switching */}
        {slug === "particle-field" && <ParticleFieldContent {...props} />}
        {slug === "liquid-shader" && <LiquidShaderContent {...props} />}
        {slug === "geometric-core" && <GeometricCoreContent {...props} />}
        {slug === "cyber-grid" && <CyberGridContent {...props} />}

        {interactive && (
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            autoRotate={false}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 4}
          />
        )}
      </Canvas>
    </div>
  );
}
