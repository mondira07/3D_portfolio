'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, OrbitControls } from '@react-three/drei';
import { useRef, Suspense } from 'react';

function Cube({ skills }) {
  const ref = useRef();
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.15;
      ref.current.rotation.y += delta * 0.2;
    }
  });
  const faces = [
    { pos: [0, 0, 1.01], rot: [0, 0, 0], color: '#8b5cf6' },
    { pos: [0, 0, -1.01], rot: [0, Math.PI, 0], color: '#ec4899' },
    { pos: [1.01, 0, 0], rot: [0, Math.PI / 2, 0], color: '#22d3ee' },
    { pos: [-1.01, 0, 0], rot: [0, -Math.PI / 2, 0], color: '#fbbf24' },
    { pos: [0, 1.01, 0], rot: [-Math.PI / 2, 0, 0], color: '#34d399' },
    { pos: [0, -1.01, 0], rot: [Math.PI / 2, 0, 0], color: '#f97316' },
  ];
  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.7} roughness={0.2} transparent opacity={0.4} />
      </mesh>
      {faces.map((f, i) => (
        <group key={i} position={f.pos} rotation={f.rot}>
          <mesh>
            <planeGeometry args={[1.8, 1.8]} />
            <meshStandardMaterial color={f.color} emissive={f.color} emissiveIntensity={0.3} transparent opacity={0.15} />
          </mesh>
          <Text position={[0, 0.6, 0.01]} fontSize={0.18} color="#fff" anchorX="center" anchorY="middle" maxWidth={1.6}>
            {Object.keys(skills)[i]}
          </Text>
          {Object.values(skills)[i]?.slice(0, 4).map((s, idx) => (
            <Text key={idx} position={[0, 0.2 - idx * 0.28, 0.01]} fontSize={0.13} color={f.color} anchorX="center" anchorY="middle" maxWidth={1.6}>
              {s}
            </Text>
          ))}
        </group>
      ))}
    </group>
  );
}

export default function SkillsCube({ skills }) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, 5]} intensity={0.8} color="#ec4899" />
        <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1.2}>
          <Cube skills={skills} />
        </Float>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Suspense>
    </Canvas>
  );
}