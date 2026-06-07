'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Stars, Icosahedron, TorusKnot, OrbitControls } from '@react-three/drei';
import { useRef, Suspense } from 'react';

function MainBlob() {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.1;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={ref} args={[1.4, 96, 96]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#8b5cf6"
          attach="material"
          distort={0.45}
          speed={2.2}
          roughness={0.1}
          metalness={0.7}
          emissive="#7c3aed"
          emissiveIntensity={0.35}
        />
      </Sphere>
    </Float>
  );
}

function OrbitingShape({ position, color, type = 'ico', size = 0.25, speed = 1 }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime() * speed;
      ref.current.position.x = Math.cos(t) * position[0];
      ref.current.position.z = Math.sin(t) * position[0];
      ref.current.position.y = position[1] + Math.sin(t * 2) * 0.3;
      ref.current.rotation.x = t;
      ref.current.rotation.y = t * 0.7;
    }
  });
  const Shape = type === 'torus' ? TorusKnot : Icosahedron;
  return (
    <Shape ref={ref} args={type === 'torus' ? [size, size * 0.3, 80, 16] : [size, 1]}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} metalness={0.8} roughness={0.2} wireframe={type === 'ico'} />
    </Shape>
  );
}

export default function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#fff" />
        <pointLight position={[-5, -5, -5]} intensity={1} color="#ec4899" />
        <pointLight position={[5, -3, 2]} intensity={0.6} color="#22d3ee" />
        <MainBlob />
        <OrbitingShape position={[2.5, 0.5, 0]} color="#ec4899" type="ico" size={0.22} speed={0.5} />
        <OrbitingShape position={[3, -0.5, 0]} color="#22d3ee" type="torus" size={0.18} speed={-0.4} />
        <OrbitingShape position={[2.2, 1, 0]} color="#fbbf24" type="ico" size={0.15} speed={0.7} />
        <Stars radius={50} depth={50} count={2500} factor={4} fade speed={1} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
      </Suspense>
    </Canvas>
  );
}