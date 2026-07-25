"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Core() {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.12;
    if (inner.current) inner.current.rotation.y -= delta * 0.25;
  });

  return (
    <group ref={group}>
      <mesh ref={inner}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshBasicMaterial color="#1e6feb" wireframe transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[0.4, 0.2, 0]}>
        <icosahedronGeometry args={[0.68, 0]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.4} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshBasicMaterial color="#e8fbff" transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

function Rings() {
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  const r3 = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (r1.current) r1.current.rotation.z += delta * 0.08;
    if (r2.current) r2.current.rotation.z -= delta * 0.06;
    if (r3.current) r3.current.rotation.x += delta * 0.05;
  });

  return (
    <>
      <mesh ref={r1} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[1.9, 0.006, 8, 128]} />
        <meshBasicMaterial color="#1e6feb" transparent opacity={0.5} />
      </mesh>
      <mesh ref={r2} rotation={[Math.PI / 2.1, 0.4, 0]}>
        <torusGeometry args={[2.3, 0.005, 8, 128]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.35} />
      </mesh>
      <mesh ref={r3} rotation={[Math.PI / 3, 0, 0.3]}>
        <torusGeometry args={[1.55, 0.004, 8, 128]} />
        <meshBasicMaterial color="#8fbdf5" transparent opacity={0.3} />
      </mesh>
    </>
  );
}

function OrbitDots() {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.15;
  });
  const dots = Array.from({ length: 10 }, (_, i) => {
    const angle = (i / 10) * Math.PI * 2;
    const radius = 1.9;
    return [Math.cos(angle) * radius, Math.sin(angle * 1.7) * 0.3, Math.sin(angle) * radius] as const;
  });
  return (
    <group ref={group}>
      {dots.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color={i % 3 === 0 ? "#22d3ee" : "#1e6feb"} />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroCoreScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0.6, 4.4], fov: 42 }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 2, 3]} intensity={40} color="#2f6fed" />
      <pointLight position={[-3, -2, -2]} intensity={20} color="#22d3ee" />
      <Core />
      <Rings />
      <OrbitDots />
    </Canvas>
  );
}
