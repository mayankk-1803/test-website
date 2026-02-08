import { Canvas } from '@react-three/fiber';
import { Sphere, OrbitControls, Icosahedron, Float } from '@react-three/drei';
import { useRef } from 'react';
import { Group } from 'three';

function FloatingObjects() {
  const group = useRef<Group>(null);

  return (
    <group ref={group}>
      <Float speed={4} rotationIntensity={0.5} floatIntensity={2}>
        <Sphere args={[2, 32, 32]} position={[-5, 2, 0]}>
          <meshStandardMaterial color="#DC2626" emissive="#990000" />
        </Sphere>
      </Float>

      <Float speed={3} rotationIntensity={0.4} floatIntensity={1.8}>
        <Icosahedron args={[1.5, 4]} position={[5, 3, 0]}>
          <meshStandardMaterial color="#EAB308" emissive="#CA8A04" />
        </Icosahedron>
      </Float>

      <Float speed={5} rotationIntensity={0.6} floatIntensity={2.2}>
        <Sphere args={[1, 32, 32]} position={[0, -2, -3]}>
          <meshStandardMaterial color="#DC2626" emissive="#990000" />
        </Sphere>
      </Float>

      <Float speed={2.5} rotationIntensity={0.3} floatIntensity={1.5}>
        <Icosahedron args={[1, 4]} position={[3, -1, 3]}>
          <meshStandardMaterial color="#EAB308" emissive="#CA8A04" />
        </Icosahedron>
      </Float>
    </group>
  );
}

export default function ThreeDBackground() {
  return (
    <div className="three-d-container">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 75 }}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, 10]} intensity={0.5} color="#EAB308" />

        <FloatingObjects />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={2}
        />
      </Canvas>
    </div>
  );
}


