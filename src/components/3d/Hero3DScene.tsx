import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import type { Mesh, Group } from 'three';
import * as THREE from 'three';

/**
 * A floating glass-like icosahedron with distortion material feel.
 * Uses standard materials for performance on mobile.
 */
function GlassShape({
  position,
  scale = 1,
  color = '#7565FF',
  speed = 1,
}: {
  position: [number, number, number];
  scale?: number;
  color?: string;
  speed?: number;
}) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    meshRef.current.rotation.x = t * 0.2;
    meshRef.current.rotation.y = t * 0.15;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.3;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color={color}
        metalness={0.3}
        roughness={0.1}
        transparent
        opacity={0.65}
        emissive={color}
        emissiveIntensity={0.15}
        flatShading
      />
    </mesh>
  );
}

/**
 * A wireframe geometric shape that adds structural depth.
 */
function WireShape({
  position,
  scale = 1,
  color = '#39D9FF',
  speed = 0.8,
  geometry = 'octahedron',
}: {
  position: [number, number, number];
  scale?: number;
  color?: string;
  speed?: number;
  geometry?: 'octahedron' | 'torus' | 'dodecahedron';
}) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    meshRef.current.rotation.x = t * 0.1;
    meshRef.current.rotation.y = t * 0.2;
  });

  const geo = useMemo(() => {
    switch (geometry) {
      case 'torus':
        return <torusGeometry args={[0.6, 0.2, 16, 32]} />;
      case 'dodecahedron':
        return <dodecahedronGeometry args={[0.8, 0]} />;
      default:
        return <octahedronGeometry args={[0.9, 0]} />;
    }
  }, [geometry]);

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {geo}
      <meshBasicMaterial color={color} wireframe transparent opacity={0.3} />
    </mesh>
  );
}

/**
 * Particle field — a cloud of small points drifting in 3D space.
 * Count is kept low for mobile performance.
 */
function ParticleField({ count = 200 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribute in a sphere shell.
      const r = 4 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
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
      <pointsMaterial
        size={0.04}
        color="#39D9FF"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

/**
 * Mouse parallax — moves the entire scene group slightly based on pointer.
 */
function MouseParallax({
  children,
  strength = 0.3,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const groupRef = useRef<Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;
    // Smoothly lerp toward the pointer-based target.
    groupRef.current.rotation.y +=
      (pointer.x * strength - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x +=
      (-pointer.y * strength * 0.5 - groupRef.current.rotation.x) * 0.05;
  });

  return <group ref={groupRef}>{children}</group>;
}

export default function Hero3DScene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#7565FF" />
      <pointLight position={[-5, -3, 2]} intensity={0.5} color="#39D9FF" />
      <pointLight position={[3, 4, -2]} intensity={0.3} color="#7565FF" />

      <MouseParallax strength={0.35}>
        {/* Central large glass shape */}
        <GlassShape
          position={[0, 0, 0]}
          scale={1.6}
          color="#7565FF"
          speed={0.6}
        />

        {/* Orbiting smaller shapes */}
        <GlassShape
          position={[2.5, 1, -1]}
          scale={0.6}
          color="#39D9FF"
          speed={0.9}
        />
        <GlassShape
          position={[-2.8, -0.5, -0.5]}
          scale={0.5}
          color="#7565FF"
          speed={1.1}
        />
        <GlassShape
          position={[1.5, -1.8, 1]}
          scale={0.35}
          color="#39D9FF"
          speed={1.3}
        />

        {/* Wireframe accents */}
        <WireShape
          position={[-2, 1.5, -1.5]}
          scale={0.8}
          color="#39D9FF"
          speed={0.5}
          geometry="octahedron"
        />
        <WireShape
          position={[2.2, -1.2, 0.8]}
          scale={0.6}
          color="#7565FF"
          speed={0.7}
          geometry="torus"
        />
        <WireShape
          position={[0, 2.2, -2]}
          scale={0.7}
          color="#39D9FF"
          speed={0.4}
          geometry="dodecahedron"
        />

        {/* Particles */}
        <ParticleField count={180} />
      </MouseParallax>
    </>
  );
}
