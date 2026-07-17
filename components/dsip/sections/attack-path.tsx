"use client";

import React, { useEffect, useState } from "react";
import { Panel, SectionHeading, Tag } from "../primitives/kit";
import { GraphEdge, GraphNode, GraphSurface } from "../primitives/graph";
import { usePrefersReducedMotion } from "../primitives/hooks";

const chain = [
  { id: "n1", label: "Exposed VPN endpoint", stage: "Initial access", x: 90, y: 130, color: "#2f6fed" },
  { id: "n2", label: "Leaked credential match", stage: "Credential access", x: 320, y: 50, color: "#f5a623" },
  { id: "n3", label: "Stale admin account", stage: "Credential access", x: 320, y: 210, color: "#f5a623" },
  { id: "n4", label: "Lateral movement — finance VLAN", stage: "Lateral movement", x: 550, y: 130, color: "#6e7cf6" },
  { id: "n5", label: "Critical asset: billing database", stage: "Impact", x: 770, y: 130, color: "#ff4d5e" },
] as const;

const edges: [string, string][] = [
  ["n1", "n2"],
  ["n1", "n3"],
  ["n2", "n4"],
  ["n3", "n4"],
  ["n4", "n5"],
];

const order = ["n1", "n2", "n3", "n4", "n5"];

function AttackSimulation() {
  const reduced = usePrefersReducedMotion();
  const [step, setStep] = useState(order.length);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setStep((s) => (s >= order.length ? 0 : s + 1));
    }, 1100);
    return () => clearInterval(id);
  }, [reduced]);

  const lit = new Set(order.slice(0, step));
  const currentStage = step > 0 && step <= order.length ? chain.find((c) => c.id === order[step - 1])?.stage : null;

  return (
    <Panel className="overflow-hidden !rounded-[18px] p-0">
      <div className="flex items-center justify-between border-b border-white/[.07] px-5 py-3.5">
        <span className="font-mono text-[11px] uppercase tracking-wide text-white/45">Attack path simulation</span>
        <Tag tone="red">{currentStage ?? "Replaying"}</Tag>
      </div>
      <div className="h-[300px]">
        <GraphSurface viewBox="0 0 860 260">
          {edges.map(([from, to]) => {
            const a = chain.find((c) => c.id === from)!;
            const b = chain.find((c) => c.id === to)!;
            const isLit = lit.has(from) && lit.has(to);
            return (
              <GraphEdge
                key={`${from}-${to}`}
                x1={a.x + 84}
                y1={a.y}
                x2={b.x - 84}
                y2={b.y}
                color={isLit ? b.color : "rgba(255,255,255,.12)"}
                animated={isLit}
                width={isLit ? 2 : 1.2}
              />
            );
          })}
          {chain.map((node) => {
            const isLit = lit.has(node.id);
            return (
              <GraphNode key={node.id} x={node.x} y={node.y} width={168} height={52} color={isLit ? node.color : "rgba(255,255,255,.18)"} critical={node.id === "n5" && isLit}>
                <span className="font-mono text-[10.5px] leading-tight text-white/90">{node.label}</span>
                <span className="mt-0.5 font-mono text-[9px] uppercase tracking-wide text-white/35">{node.stage}</span>
              </GraphNode>
            );
          })}
        </GraphSurface>
      </div>
    </Panel>
  );
}

export function AttackPath() {
  return (
    <section id="attack-path" className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8">
      <SectionHeading
        index="11"
        kicker="Attack Path Simulation"
        tone="red"
        title="See the route from a single exposure to a critical asset"
        description="Lateral movement, exposure paths and risk propagation, replayed from real correlated signals — not a static diagram."
      />
      <AttackSimulation />
    </section>
  );
}
