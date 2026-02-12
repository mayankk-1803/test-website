import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";

const GlobeMesh = () => {

  const globeRef = useRef<THREE.Mesh>(null);

  const texture = useLoader(
    THREE.TextureLoader,
    "/textures/world.png"
  );

  // MAXIMUM clarity settings
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 64; // max supported usually 16–64
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipMapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.0015;
    }
  });

  return (
    <Sphere
    ref={globeRef}
  args={[1.8, 512, 512]}

>
      <meshStandardMaterial
        map={texture}
        color="#ffffff"
        roughness={0.8}
        metalness={0}
        toneMapped={false}
        dithering={false}
      />
    </Sphere>
  );
};


const HeroGlobe = () => {

  return (
    <Canvas

      camera={{ position: [0, 0, 6], fov: 45 }}

      // CRITICAL FOR SHARPNESS
      dpr={Math.min(window.devicePixelRatio, 2)}

      gl={{
        antialias: true,
        powerPreference: "high-performance",
        precision: "highp",
        alpha: true,
        stencil: false,
        depth: true
      }}

      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
      }}
    >

      {/* Balanced lighting */}

      <ambientLight intensity={1.2} />

      <directionalLight
        position={[5, 5, 5]}
        intensity={1.8}
      />

      <directionalLight
        position={[-5, -5, -5]}
        intensity={1}
      />

      <GlobeMesh />

    </Canvas>
  );
};

export default HeroGlobe;
