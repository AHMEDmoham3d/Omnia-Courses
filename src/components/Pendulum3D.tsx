import { Canvas, useFrame, RootState } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

/// <reference types="@react-three/fiber" />

const PendulumBob = ({ position, length }: { position: [number, number, number]; length: number }) => {
  const bobRef = useRef<THREE.Mesh>(null!);

  useFrame((state: RootState) => {
    if (bobRef.current) {
      const time = state.clock.elapsedTime;
      const swingAngle = Math.sin(time * 2) * (Math.PI / 6); // Swing between -30 to 30 degrees
      const x = length * Math.sin(swingAngle);
      const y = -length * Math.cos(swingAngle);
      bobRef.current.position.set(x, y, 0);
    }
  });

  return (
    <mesh ref={bobRef} position={position}>
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshStandardMaterial color="#6b46c1" metalness={0.8} roughness={0.2} />
    </mesh>
  );
};

const PendulumString = ({ start, end }: { start: [number, number, number]; end: [number, number, number] }) => {
  const points = [[start[0], start[1], start[2]], [end[0], end[1], end[2]]] as [number, number, number][];
  return (
    <Line
      points={points}
      lineWidth={3}
      color="#ffffff"
      opacity={0.8}
      transparent
    />
  );
};

export function Pendulum3D() {
  const length = 2;
  const pivot = [0, 0, 0] as [number, number, number];
  const restPosition = [0, -length, 0] as [number, number, number];

  return (
    <div className="w-full h-96 relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <PendulumString start={pivot} end={restPosition} />
        <PendulumBob position={restPosition} length={length} />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} />
      </Canvas>
    </div>
  );
}
