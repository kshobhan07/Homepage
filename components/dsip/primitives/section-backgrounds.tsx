"use client";

import React from "react";
import { usePrefersReducedMotion } from "./hooks";

/** Diagonal light streams — flowing signal/telemetry, used behind threat-intel-flavored sections. */
export function SignalStreamsField({ tint = "#1e6feb" }: { tint?: string }) {
  const reduced = usePrefersReducedMotion();
  const streams = [
    { top: "8%", delay: 0, dur: 7 },
    { top: "28%", delay: 1.4, dur: 9 },
    { top: "52%", delay: 0.6, dur: 8 },
    { top: "74%", delay: 2.1, dur: 10 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-60">
      {streams.map((s, i) => (
        <div
          key={i}
          className={reduced ? "absolute h-px w-[60%]" : "dsip-stream absolute h-px w-[60%]"}
          style={{
            top: s.top,
            left: "-60%",
            background: `linear-gradient(90deg, transparent, ${tint}aa, transparent)`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
          }}
        />
      ))}
    </div>
  );
}

const neuralNodes = [
  { x: 8, y: 15 }, { x: 22, y: 32 }, { x: 12, y: 55 }, { x: 28, y: 78 },
  { x: 45, y: 10 }, { x: 50, y: 40 }, { x: 48, y: 68 }, { x: 42, y: 92 },
  { x: 72, y: 20 }, { x: 78, y: 48 }, { x: 68, y: 72 }, { x: 90, y: 30 }, { x: 92, y: 62 },
];
const neuralEdges: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [0, 4], [1, 5], [2, 6], [3, 7], [4, 5], [5, 6], [6, 7],
  [4, 8], [5, 9], [6, 10], [8, 9], [9, 10], [8, 11], [9, 12], [10, 12], [11, 12],
];

/** Sparse neural graph with traveling pulses — reasoning / AI cognition backdrop. */
export function NeuralField({ tint = "#6e7cf6" }: { tint?: string }) {
  const reduced = usePrefersReducedMotion();
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 opacity-[.35]">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
        {neuralEdges.map(([a, b], i) => (
          <line
            key={i}
            x1={neuralNodes[a].x}
            y1={neuralNodes[a].y}
            x2={neuralNodes[b].x}
            y2={neuralNodes[b].y}
            stroke={tint}
            strokeWidth="0.12"
          />
        ))}
        {!reduced &&
          neuralEdges.slice(0, 6).map(([a, b], i) => (
            <circle key={`p-${i}`} r="0.5" fill="#22d3ee">
              <animateMotion
                dur={`${3 + (i % 3)}s`}
                begin={`${i * 0.5}s`}
                repeatCount="indefinite"
                path={`M${neuralNodes[a].x},${neuralNodes[a].y} L${neuralNodes[b].x},${neuralNodes[b].y}`}
              />
            </circle>
          ))}
        {neuralNodes.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={0.6} fill={tint} />
        ))}
      </svg>
    </div>
  );
}

/** Moving scan grid — surveillance / detection backdrop. */
export function ScanGridField({ tint = "#f2a93b" }: { tint?: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-40">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${tint}22 1px, transparent 1px), linear-gradient(90deg, ${tint}22 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
          maskImage: "radial-gradient(60% 60% at 50% 40%, black, transparent)",
          WebkitMaskImage: "radial-gradient(60% 60% at 50% 40%, black, transparent)",
        }}
      />
      <div className="dsip-scan-sweep absolute inset-x-0 h-1/3" />
    </div>
  );
}

/** Soft holographic glow + scanlines — live product / dashboard backdrop. */
export function HoloDashGlow({ tint = "#22d3ee" }: { tint?: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-70">
      <div
        className="absolute left-1/2 top-1/3 h-[60%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-3xl"
        style={{ background: `radial-gradient(ellipse at center, ${tint}22, transparent 70%)` }}
      />
      <div className="dsip-scanlines absolute inset-0 opacity-30" />
    </div>
  );
}

/** Large faint globe graticule — global coverage backdrop. */
export function GlobeAmbientField() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden opacity-[.22]">
      <svg viewBox="0 0 600 600" className="h-[140%] w-[140%]">
        {[60, 140, 220].map((ry) => (
          <ellipse key={ry} cx={300} cy={300} rx={280} ry={ry} fill="none" stroke="#2fd3ee" strokeWidth="1" />
        ))}
        {[280, 190, 90].map((rx) => (
          <ellipse key={rx} cx={300} cy={300} rx={rx} ry={280} fill="none" stroke="#2fd3ee" strokeWidth="1" />
        ))}
        <circle cx={300} cy={300} r={280} fill="none" stroke="#2fd3ee" strokeWidth="1.4" />
      </svg>
    </div>
  );
}

/** Simple tinted radial wash — lightweight differentiation for supporting sections. */
export function TintWash({ tint, position = "50% 0%" }: { tint: string; position?: string }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 opacity-80"
      style={{ background: `radial-gradient(55% 40% at ${position}, ${tint}, transparent)` }}
    />
  );
}
