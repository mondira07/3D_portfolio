'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useRef, useMemo, Suspense } from 'react';
import * as random from 'maath/random/dist/maath-random.esm';

function Particles() {
  const ref = useRef();
  const sphere = useMemo(() => random.inSphere(new Float32Array(3000), { radius: 1.6 }), []);
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 22;
    }
  });
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial transparent color="#a78bfa" size={0.005} sizeAttenuation depthWrite={false} />
      </Points>
    </group>
  );
}

export default function BackgroundParticles() {
  return (
    <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <Particles />
      </Suspense>
    </Canvas>
  );
}