"use client";

import React from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Lock, Radar, ShieldCheck } from "lucide-react";
import { LatticeField } from "../primitives/lattice-field";
import { usePrefersReducedMotion } from "../primitives/hooks";

const nodes = [
  { x: 10, y: 20 }, { x: 25, y: 10 }, { x: 40, y: 25 }, { x: 55, y: 12 }, { x: 70, y: 22 }, { x: 85, y: 15 },
  { x: 15, y: 45 }, { x: 35, y: 50 }, { x: 55, y: 45 }, { x: 75, y: 48 }, { x: 90, y: 42 },
  { x: 25, y: 75 }, { x: 50, y: 78 }, { x: 72, y: 72 }, { x: 88, y: 80 },
];

const edges: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [0, 6], [1, 6], [2, 7], [3, 8], [4, 9], [5, 10],
  [6, 7], [7, 8], [8, 9], [9, 10], [6, 11], [7, 11], [7, 12], [8, 12], [8, 13], [9, 13], [9, 14], [10, 14],
  [11, 12], [12, 13], [13, 14],
];

const pulseNodes = [2, 8, 13];

function NeuralNetwork() {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full opacity-[.22]">
      {edges.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="#1e6feb"
          strokeWidth="0.15"
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={pulseNodes.includes(i) ? 0.9 : 0.5}
          fill={pulseNodes.includes(i) ? "#22d3ee" : "#1e6feb"}
          className={pulseNodes.includes(i) ? "dsip-pulse" : undefined}
        />
      ))}
    </svg>
  );
}

function GlobeWireframe() {
  return (
    <svg viewBox="0 0 600 600" className="pointer-events-none absolute left-1/2 top-1/2 h-[130vh] w-[130vh] -translate-x-1/2 -translate-y-1/2 opacity-[.16]">
      {[60, 140, 220].map((ry) => (
        <ellipse key={ry} cx={300} cy={300} rx={280} ry={ry} fill="none" stroke="#2fd3ee" strokeWidth="1" />
      ))}
      {[280, 190, 90].map((rx) => (
        <ellipse key={rx} cx={300} cy={300} rx={rx} ry={280} fill="none" stroke="#2fd3ee" strokeWidth="1" />
      ))}
      <circle cx={300} cy={300} r={280} fill="none" stroke="#2fd3ee" strokeWidth="1.4" />
    </svg>
  );
}

const telemetry = [
  { Icon: ShieldCheck, text: "Threat feed synced", pos: "left-[6%] top-[22%]", delay: 0 },
  { Icon: Radar, text: "42 regions monitored", pos: "right-[6%] top-[30%]", delay: 0.8 },
  { Icon: Lock, text: "Zero-trust session", pos: "left-[8%] bottom-[24%]", delay: 1.5 },
  { Icon: BrainCircuit, text: "Intellicore AI active", pos: "right-[7%] bottom-[18%]", delay: 2.1 },
];

function FloatingTelemetry() {
  const reduced = usePrefersReducedMotion();
  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block">
      {telemetry.map((t) => (
        <motion.div
          key={t.text}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: t.delay }}
          className={`absolute ${t.pos} ${reduced ? "" : "animate-signal-drift"} flex items-center gap-2 rounded-full border border-white/10 bg-[#0a1428]/80 px-3.5 py-2 font-mono text-[11px] text-white/60`}
          style={{ animationDelay: `${t.delay}s` }}
        >
          <t.Icon className="h-3.5 w-3.5 text-signal-teal" />
          {t.text}
        </motion.div>
      ))}
    </div>
  );
}

export function LoginBackdrop() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050b18]">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(30,111,235,.14) 1px, transparent 1px), linear-gradient(90deg, rgba(30,111,235,.14) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(circle at 50% 40%, black 0%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 40%, black 0%, transparent 75%)",
        }}
      />
      <GlobeWireframe />
      <NeuralNetwork />
      <LatticeField className="pointer-events-none absolute inset-0 opacity-60" />
      <div className="dsip-scan-sweep pointer-events-none absolute inset-x-0 h-1/3 opacity-70" />
      <FloatingTelemetry />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_38%,rgba(30,111,235,.14),transparent)]" />
    </div>
  );
}
