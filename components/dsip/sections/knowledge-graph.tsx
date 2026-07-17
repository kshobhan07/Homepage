"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Check, Move } from "lucide-react";
import { Panel, Tag } from "../primitives/kit";
import { cn } from "@/lib/utils";

type NodeId = "core" | "api" | "cred" | "phish" | "exec";

type GraphNodeData = { id: NodeId; label: string; color: string; x: number; y: number };

const initialNodes: GraphNodeData[] = [
  { id: "core", label: "DSIP Knowledge Graph", color: "#2f6fed", x: 300, y: 40 },
  { id: "api", label: "Exposed API", color: "#6e7cf6", x: 70, y: 170 },
  { id: "cred", label: "Leaked Credential", color: "#ff4d5e", x: 300, y: 190 },
  { id: "phish", label: "Phishing Kit", color: "#f5a623", x: 520, y: 170 },
  { id: "exec", label: "Executive Risk", color: "#2ee6b8", x: 300, y: 340 },
];

const links: [NodeId, NodeId][] = [
  ["core", "api"],
  ["core", "cred"],
  ["core", "phish"],
  ["cred", "exec"],
  ["phish", "exec"],
];

const stages = ["Pre-assessment discovery", "Course-of-evaluation enrichment", "Post-evaluation takedown and reporting"];

function InteractiveGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState(initialNodes);
  const dragState = useRef<{ id: NodeId; offsetX: number; offsetY: number } | null>(null);

  const onPointerMove = useCallback((e: PointerEvent) => {
    const drag = dragState.current;
    const container = containerRef.current;
    if (!drag || !container) return;
    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left - drag.offsetX) / rect.width) * 600;
    const y = ((e.clientY - rect.top - drag.offsetY) / rect.height) * 400;
    setNodes((prev) =>
      prev.map((n) => (n.id === drag.id ? { ...n, x: Math.max(50, Math.min(550, x)), y: Math.max(30, Math.min(370, y)) } : n)),
    );
  }, []);

  const endDrag = useCallback(() => {
    dragState.current = null;
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", endDrag);
  }, [onPointerMove]);

  function startDrag(id: NodeId, e: React.PointerEvent) {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const node = nodes.find((n) => n.id === id)!;
    const nodeXpx = (node.x / 600) * rect.width;
    const nodeYpx = (node.y / 400) * rect.height;
    dragState.current = { id, offsetX: e.clientX - rect.left - nodeXpx, offsetY: e.clientY - rect.top - nodeYpx };
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", endDrag);
  }

  useEffect(() => () => endDrag(), [endDrag]);

  return (
    <div ref={containerRef} className="relative h-[430px] w-full select-none overflow-hidden">
      <svg viewBox="0 0 600 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <defs>
          <pattern id="kg-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,.05)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#kg-grid)" />
        {links.map(([a, b]) => {
          const na = nodes.find((n) => n.id === a)!;
          const nb = nodes.find((n) => n.id === b)!;
          return (
            <line key={`${a}-${b}`} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke="rgba(255,255,255,.16)" strokeWidth={1.3} className="dsip-edge-flow" />
          );
        })}
      </svg>
      {nodes.map((node) => (
        <div
          key={node.id}
          onPointerDown={(e) => startDrag(node.id, e)}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 cursor-grab items-center gap-1.5 rounded-[8px] border bg-[#0a0e16]/95 px-3 py-2 font-mono text-[11px] text-white active:cursor-grabbing"
          style={{
            left: `${(node.x / 600) * 100}%`,
            top: `${(node.y / 400) * 100}%`,
            borderColor: node.color,
            boxShadow: `0 0 26px ${node.color}30`,
          }}
        >
          {node.id === "core" ? <Move className="h-3 w-3 shrink-0 text-white/40" /> : null}
          {node.label}
        </div>
      ))}
    </div>
  );
}

export function KnowledgeGraph() {
  return (
    <section id="knowledge-graph" className="mx-auto max-w-[1200px] px-5 py-24 sm:px-8">
      <div className="grid items-center gap-10 lg:grid-cols-[.85fr_1.15fr]">
        <div>
          <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-white/45">
            <span className="h-1.5 w-1.5 rounded-full bg-signal-teal" />
            <span>12</span>
            <span className="h-px w-8 bg-white/15" />
            <span>Connected intelligence</span>
          </div>
          <h2 className="text-balance font-display text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
            A graph of assets, actors, evidence and outcomes
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-7 text-white/55">
            DSIP correlates domains, cloud resources, credentials, phishing infrastructure, third parties, VIP
            mentions, data leaks and takedown workflows into a knowledge graph built for investigations and
            reporting. Drag any node below — it's the same graph analysts work in.
          </p>
          <div className="mt-8 space-y-3">
            {stages.map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-white/76">
                <Check className="h-4 w-4 text-signal-teal" /> {item}
              </div>
            ))}
          </div>
        </div>
        <Panel className="relative overflow-hidden !rounded-[18px] p-0">
          <div className="flex items-center justify-between border-b border-white/[.07] px-5 py-3.5">
            <span className="font-mono text-[11px] uppercase tracking-wide text-white/45">Relationship explorer</span>
            <Tag tone="teal">Drag to explore</Tag>
          </div>
          <InteractiveGraph />
        </Panel>
      </div>
    </section>
  );
}
