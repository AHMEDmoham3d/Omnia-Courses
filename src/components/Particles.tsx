import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticlesInner() {
  const ref = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(1000 * 3);

    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }

    return positions;
  }, []);

  const linesPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 1000; i++) {
      const next1 = (i + 1) % 1000;
      const next2 = (i + 2) % 1000;
      positions.push(
        particlesPosition[i * 3], particlesPosition[i * 3 + 1], particlesPosition[i * 3 + 2],
        particlesPosition[next1 * 3], particlesPosition[next1 * 3 + 1], particlesPosition[next1 * 3 + 2],
        particlesPosition[i * 3], particlesPosition[i * 3 + 1], particlesPosition[i * 3 + 2],
        particlesPosition[next2 * 3], particlesPosition[next2 * 3 + 1], particlesPosition[next2 * 3 + 2]
      );
    }
    return new Float32Array(positions);
  }, [particlesPosition]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime / 4) / 2;
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime / 2) / 2;
    }
    if (linesRef.current) {
      linesRef.current.rotation.x = Math.sin(state.clock.elapsedTime / 4) / 2;
      linesRef.current.rotation.y = Math.sin(state.clock.elapsedTime / 2) / 2;
    }
  });

  return (
    <>
      <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linesPositions.length / 3}
            array={linesPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#ffffff" opacity={0.1} transparent />
      </lineSegments>
    </>
  );
}

export function Particles() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ParticlesInner />
      </Canvas>
    </div>
  );
}
