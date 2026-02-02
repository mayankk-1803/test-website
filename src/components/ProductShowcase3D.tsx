import { Canvas } from '@react-three/fiber';
import { Sphere, Box, Icosahedron, useTexture, Float } from '@react-three/drei';
import { useRef, useState } from 'react';
import { Group } from 'three';

interface Product3DProps {
  color: string;
  emissiveColor: string;
  shape: 'sphere' | 'box' | 'icosahedron';
}

function Product3DModel({ color, emissiveColor, shape }: Product3DProps) {
  const [hovered, setHovered] = useState(false);

  const shapes = {
    sphere: (
      <Sphere args={[1.2, 32, 32]}>
        <meshStandardMaterial
          color={color}
          emissive={emissiveColor}
          emissiveIntensity={hovered ? 0.8 : 0.3}
          roughness={0.4}
          metalness={0.7}
        />
      </Sphere>
    ),
    box: (
      <Box args={[1.5, 1.5, 1.5]}>
        <meshStandardMaterial
          color={color}
          emissive={emissiveColor}
          emissiveIntensity={hovered ? 0.8 : 0.3}
          roughness={0.4}
          metalness={0.7}
        />
      </Box>
    ),
    icosahedron: (
      <Icosahedron args={[1.2, 4]}>
        <meshStandardMaterial
          color={color}
          emissive={emissiveColor}
          emissiveIntensity={hovered ? 0.8 : 0.3}
          roughness={0.4}
          metalness={0.7}
        />
      </Icosahedron>
    ),
  };

  return (
    <Float speed={hovered ? 3 : 2} rotationIntensity={hovered ? 1 : 0.5} floatIntensity={1}>
      <group
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        {shapes[shape]}
      </group>
    </Float>
  );
}

interface ProductShowcase3DProps {
  color: string;
  emissiveColor: string;
  shape?: 'sphere' | 'box' | 'icosahedron';
}

export default function ProductShowcase3D({
  color,
  emissiveColor,
  shape = 'sphere',
}: ProductShowcase3DProps) {
  return (
    <div className="product-3d-showcase">
      <Canvas camera={{ position: [0, 0, 4], fov: 75 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, 5]} intensity={0.5} />

        <Product3DModel color={color} emissiveColor={emissiveColor} shape={shape} />
      </Canvas>
    </div>
  );
}
