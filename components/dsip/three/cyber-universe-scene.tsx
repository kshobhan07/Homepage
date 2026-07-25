"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

export type UniverseNode = { id: string; label: string; color: string; angle: number; radius: number; y: number };

const UNKNOWN_COUNT = 14;

function OrgCore() {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (outer.current) outer.current.rotation.y += delta * 0.1;
    if (inner.current) inner.current.rotation.y -= delta * 0.2;
  });
  return (
    <group>
      <mesh ref={outer}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshBasicMaterial color="#1e6feb" wireframe transparent opacity={0.55} />
      </mesh>
      <mesh ref={inner} rotation={[0.3, 0.2, 0]}>
        <icosahedronGeometry args={[0.34, 0]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.45} />
      </mesh>
      <Html center distanceFactor={9} style={{ pointerEvents: "none" }}>
        <div className="whitespace-nowrap text-center">
          <p className="font-display text-[13px] font-bold text-white">acme-corp</p>
          <p className="font-mono text-[8px] uppercase tracking-wide text-white/40">attack surface</p>
        </div>
      </Html>
    </group>
  );
}

function ScanSweep({ radius }: { radius: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.35;
  });
  return (
    <group ref={ref}>
      <mesh position={[radius / 2, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[radius, 0.9]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.05} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
    </group>
  );
}

function UnknownAssets({ radius }: { radius: number }) {
  const refs = useRef<THREE.Mesh[]>([]);
  const seeds = useRef(
    Array.from({ length: UNKNOWN_COUNT }, () => ({
      angle: Math.random() * Math.PI * 2,
      r: radius * (0.5 + Math.random() * 0.9),
      y: (Math.random() - 0.5) * 1.6,
      phase: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 0.3,
    })),
  );

  useFrame((state) => {
    seeds.current.forEach((s, i) => {
      const mesh = refs.current[i];
      if (!mesh) return;
      const t = state.clock.elapsedTime;
      mesh.position.set(Math.cos(s.angle + t * 0.03) * s.r, s.y, Math.sin(s.angle + t * 0.03) * s.r);
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, Math.sin(t * s.speed + s.phase)) * 0.7;
    });
  });

  return (
    <group>
      {seeds.current.map((_, i) => (
        <mesh key={i} ref={(el) => { if (el) refs.current[i] = el; }}>
          <sphereGeometry args={[0.03, 6, 6]} />
          <meshBasicMaterial color="#f2a93b" transparent opacity={0} />
        </mesh>
      ))}
    </group>
  );
}

function OrbitNode({
  node,
  isActive,
  onHover,
  onLeave,
}: {
  node: UniverseNode;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const group = useRef<THREE.Group>(null);
  const nodeMesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (group.current) {
      const t = state.clock.elapsedTime * 0.12 + node.angle;
      group.current.position.set(Math.cos(t) * node.radius, node.y, Math.sin(t) * node.radius);
    }
    if (nodeMesh.current) {
      const s = isActive ? 1.6 : 1 + Math.sin(state.clock.elapsedTime * 2 + node.angle) * 0.12;
      nodeMesh.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={group}>
      <mesh
        ref={nodeMesh}
        onPointerOver={(e) => { e.stopPropagation(); onHover(); }}
        onPointerOut={(e) => { e.stopPropagation(); onLeave(); }}
      >
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshBasicMaterial color={node.color} transparent opacity={isActive ? 1 : 0.85} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.16, 12, 12]} />
        <meshBasicMaterial color={node.color} transparent opacity={isActive ? 0.18 : 0.08} />
      </mesh>
      <Html center distanceFactor={9} style={{ pointerEvents: "none" }}>
        <div
          className="whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[10px] font-medium backdrop-blur-sm transition-colors"
          style={{
            borderColor: isActive ? node.color : "rgba(255,255,255,.15)",
            background: isActive ? "#0a1428ee" : "#0a142899",
            color: isActive ? "#fff" : "rgba(255,255,255,.6)",
          }}
        >
          {node.label}
        </div>
      </Html>
    </group>
  );
}

function OrbitRing({ radius }: { radius: number }) {
  const points: [number, number, number][] = [];
  const segments = 96;
  for (let i = 0; i <= segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    points.push([Math.cos(a) * radius, 0, Math.sin(a) * radius]);
  }
  const positions = new Float32Array(points.flat());
  return (
    <line>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#ffffff" transparent opacity={0.06} />
    </line>
  );
}

function Scene({
  nodes,
  activeId,
  onHover,
  onLeave,
}: {
  nodes: UniverseNode[];
  activeId: string;
  onHover: (id: string) => void;
  onLeave: () => void;
}) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.025;
  });

  return (
    <group ref={group} rotation={[0.32, 0, 0]}>
      <OrgCore />
      <OrbitRing radius={2.6} />
      <ScanSweep radius={2.9} />
      <UnknownAssets radius={2.6} />
      {nodes.map((n) => (
        <OrbitNode
          key={n.id}
          node={n}
          isActive={n.id === activeId}
          onHover={() => onHover(n.id)}
          onLeave={onLeave}
        />
      ))}
    </group>
  );
}

export default function CyberUniverseScene({
  nodes,
  activeId,
  onHover,
  onLeave,
}: {
  nodes: UniverseNode[];
  activeId: string;
  onHover: (id: string) => void;
  onLeave: () => void;
}) {
  return (
    <Canvas dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }} camera={{ position: [0, 1.6, 6.4], fov: 44 }}>
      <ambientLight intensity={0.45} />
      <pointLight position={[4, 3, 4]} intensity={35} color="#2f6fed" />
      <pointLight position={[-4, -2, -3]} intensity={18} color="#22d3ee" />
      <Scene nodes={nodes} activeId={activeId} onHover={onHover} onLeave={onLeave} />
    </Canvas>
  );
}
