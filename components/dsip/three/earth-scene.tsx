"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, QuadraticBezierLine } from "@react-three/drei";
import * as THREE from "three";

export type EarthOffice = {
  id: string;
  city: string;
  lat: number;
  lon: number;
  status: "online" | "after-hours";
};

const RADIUS = 2.2;

function latLongToVector3(lat: number, lon: number, radius: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return [-radius * Math.sin(phi) * Math.cos(theta), radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(theta)];
}

function Globe() {
  const wire = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (wire.current) wire.current.rotation.y += delta * 0.02;
  });
  return (
    <group>
      <mesh>
        <sphereGeometry args={[RADIUS - 0.02, 32, 32]} />
        <meshBasicMaterial color="#050b18" transparent opacity={0.9} />
      </mesh>
      <mesh ref={wire}>
        <icosahedronGeometry args={[RADIUS, 3]} />
        <meshBasicMaterial color="#1e6feb" wireframe transparent opacity={0.22} />
      </mesh>
      <mesh>
        <sphereGeometry args={[RADIUS + 0.35, 24, 24]} />
        <meshBasicMaterial color="#1e6feb" transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

function ArcPulse({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
  const mid = useMemo(() => {
    const s = new THREE.Vector3(...start);
    const e = new THREE.Vector3(...end);
    const m = s.clone().add(e).multiplyScalar(0.5);
    return m.normalize().multiplyScalar(RADIUS * 1.32);
  }, [start, end]);

  const dot = useRef<THREE.Mesh>(null);
  const curve = useMemo(() => new THREE.QuadraticBezierCurve3(new THREE.Vector3(...start), mid, new THREE.Vector3(...end)), [start, mid, end]);

  useFrame((state) => {
    if (!dot.current) return;
    const t = (state.clock.elapsedTime * 0.15) % 1;
    const p = curve.getPoint(t);
    dot.current.position.copy(p);
    const mat = dot.current.material as THREE.MeshBasicMaterial;
    mat.opacity = Math.sin(t * Math.PI);
  });

  return (
    <group>
      <QuadraticBezierLine start={start} end={end} mid={[mid.x, mid.y, mid.z]} color="#22d3ee" lineWidth={0.8} transparent opacity={0.22} />
      <mesh ref={dot}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0} />
      </mesh>
    </group>
  );
}

function CityMarker({
  office,
  position,
  isActive,
  onHover,
  onLeave,
}: {
  office: EarthOffice;
  position: [number, number, number];
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const color = office.status === "online" ? "#22d3ee" : "#f2a93b";

  useFrame((state) => {
    if (ref.current) {
      const s = isActive ? 1.8 : 1 + Math.sin(state.clock.elapsedTime * 2.2 + office.lat) * 0.15;
      ref.current.scale.setScalar(s);
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={ref}
        onPointerOver={(e) => { e.stopPropagation(); onHover(); }}
        onPointerOut={(e) => { e.stopPropagation(); onLeave(); }}
      >
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshBasicMaterial color={color} transparent opacity={isActive ? 0.25 : 0.1} />
      </mesh>
      <Html center distanceFactor={7} style={{ pointerEvents: "none" }}>
        <p
          className="whitespace-nowrap font-mono text-[9px] uppercase tracking-wide transition-opacity"
          style={{ color: isActive ? "#fff" : "rgba(255,255,255,.55)" }}
        >
          {office.city}
        </p>
      </Html>
    </group>
  );
}

function Scene({
  offices,
  activeId,
  onHover,
  onLeave,
}: {
  offices: EarthOffice[];
  activeId: string;
  onHover: (id: string) => void;
  onLeave: () => void;
}) {
  const group = useRef<THREE.Group>(null);
  const positions = useMemo(
    () => offices.map((o) => latLongToVector3(o.lat, o.lon, RADIUS)),
    [offices],
  );

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.04;
  });

  return (
    <group ref={group} rotation={[0.1, -0.6, 0.15]}>
      <Globe />
      {positions.map((p, i) => (
        <ArcPulse key={offices[i].id} start={p} end={positions[(i + 1) % positions.length]} />
      ))}
      {offices.map((o, i) => (
        <CityMarker
          key={o.id}
          office={o}
          position={positions[i]}
          isActive={o.id === activeId}
          onHover={() => onHover(o.id)}
          onLeave={onLeave}
        />
      ))}
    </group>
  );
}

export default function EarthScene({
  offices,
  activeId,
  onHover,
  onLeave,
}: {
  offices: EarthOffice[];
  activeId: string;
  onHover: (id: string) => void;
  onLeave: () => void;
}) {
  return (
    <Canvas dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }} camera={{ position: [0, 0.4, 6], fov: 40 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 3, 4]} intensity={30} color="#2f6fed" />
      <pointLight position={[-4, -2, -3]} intensity={18} color="#22d3ee" />
      <Scene offices={offices} activeId={activeId} onHover={onHover} onLeave={onLeave} />
    </Canvas>
  );
}
