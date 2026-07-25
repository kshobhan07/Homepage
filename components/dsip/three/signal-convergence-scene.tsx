"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

const SOURCES = [
  "Internet",
  "Cloud",
  "Dark Web",
  "Social Media",
  "Email",
  "Mobile Apps",
  "Infrastructure",
  "Source Code",
  "Threat Intelligence",
];

const RADIUS = 3.4;

function fibonacciSphere(index: number, total: number, radius: number): [number, number, number] {
  const offset = 2 / total;
  const increment = Math.PI * (3 - Math.sqrt(5));
  const y = index * offset - 1 + offset / 2;
  const r = Math.sqrt(Math.max(0, 1 - y * y));
  const phi = index * increment;
  return [Math.cos(phi) * r * radius, y * radius * 0.72, Math.sin(phi) * r * radius];
}

function Core() {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  const glow = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (outer.current) outer.current.rotation.y += delta * 0.15;
    if (inner.current) inner.current.rotation.y -= delta * 0.3;
    if (glow.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 1.6) * 0.08;
      glow.current.scale.setScalar(s);
    }
  });

  return (
    <group>
      <mesh ref={glow}>
        <sphereGeometry args={[0.42, 24, 24]} />
        <meshBasicMaterial color="#6e7cf6" transparent opacity={0.22} />
      </mesh>
      <mesh ref={outer}>
        <icosahedronGeometry args={[0.62, 1]} />
        <meshBasicMaterial color="#6e7cf6" wireframe transparent opacity={0.55} />
      </mesh>
      <mesh ref={inner} rotation={[0.4, 0.2, 0]}>
        <icosahedronGeometry args={[0.4, 0]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.5} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#f2f8ff" />
      </mesh>
    </group>
  );
}

function SourceNode({ position, label }: { position: [number, number, number]; label: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.15;
      ref.current.scale.setScalar(s);
    }
  });
  return (
    <group position={position}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.055, 12, 12]} />
        <meshBasicMaterial color="#22d3ee" />
      </mesh>
      <Html center distanceFactor={9} occlude={false} style={{ pointerEvents: "none" }}>
        <div className="whitespace-nowrap rounded-full border border-white/15 bg-[#050b18]/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-white/80 backdrop-blur-sm">
          {label}
        </div>
      </Html>
    </group>
  );
}

function SignalStream({ from, seed }: { from: [number, number, number]; seed: number }) {
  const particles = useRef<THREE.Mesh[]>([]);
  const count = 3;

  useFrame((state) => {
    for (let i = 0; i < count; i++) {
      const mesh = particles.current[i];
      if (!mesh) continue;
      const speed = 0.18 + (seed % 5) * 0.015;
      const t = ((state.clock.elapsedTime * speed + i / count + seed * 0.13) % 1);
      const eased = t * t * (3 - 2 * t);
      const x = THREE.MathUtils.lerp(from[0], 0, eased);
      const y = THREE.MathUtils.lerp(from[1], 0, eased);
      const z = THREE.MathUtils.lerp(from[2], 0, eased);
      mesh.position.set(x, y, z);
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.sin(t * Math.PI) * 0.9;
    }
  });

  return (
    <group>
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([...from, 0, 0, 0]), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#1e6feb" transparent opacity={0.14} />
      </line>
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i} ref={(el) => { if (el) particles.current[i] = el; }}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0} />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  const group = useRef<THREE.Group>(null);
  const positions = useMemo(
    () => SOURCES.map((_, i) => fibonacciSphere(i, SOURCES.length, RADIUS)),
    [],
  );

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.05;
  });

  return (
    <group ref={group}>
      <Core />
      {positions.map((pos, i) => (
        <SignalStream key={i} from={pos} seed={i} />
      ))}
      {positions.map((pos, i) => (
        <SourceNode key={SOURCES[i]} position={pos} label={SOURCES[i]} />
      ))}
    </group>
  );
}

export default function SignalConvergenceScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 1.1, 8.4], fov: 42 }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 3, 4]} intensity={30} color="#6e7cf6" />
      <pointLight position={[-4, -2, -3]} intensity={20} color="#22d3ee" />
      <Scene />
    </Canvas>
  );
}
