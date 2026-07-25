"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { SectionHeading, Tag } from "../primitives/kit";
import { RadialGauge } from "../primitives/stat";
import { GraphEdge, GraphNode, GraphSurface } from "../primitives/graph";
import { usePrefersReducedMotion } from "../primitives/hooks";
import { TintWash } from "../primitives/section-backgrounds";

type Tier = 1 | 2;
type RiskTier = "Critical" | "High" | "Medium" | "Low";

type Vendor = {
  id: string;
  name: string;
  tier: Tier;
  parent?: string;
  x: number;
  y: number;
  risk: RiskTier;
  aiScore: number;
  rating: number;
  criticality: number;
  incidents: number;
  finding: string;
};

const tierColor: Record<RiskTier, string> = {
  Critical: "#e23a4e",
  High: "#f2a93b",
  Medium: "#1e6feb",
  Low: "#22d3ee",
};

const vendors: Vendor[] = [
  { id: "org", name: "Your organization", tier: 1, x: 580, y: 200, risk: "Low", aiScore: 0, rating: 100, criticality: 100, incidents: 0, finding: "" },
  { id: "northwind", name: "Northwind Payments", tier: 1, parent: "org", x: 350, y: 60, risk: "Critical", aiScore: 82, rating: 62, criticality: 88, incidents: 4, finding: "Two unpatched CVEs on internet-facing infrastructure." },
  { id: "cloudline", name: "Cloudline Storage", tier: 1, parent: "org", x: 350, y: 200, risk: "High", aiScore: 40, rating: 78, criticality: 70, incidents: 1, finding: "Rating improved after MFA enforcement rollout." },
  { id: "vertex", name: "Vertex Logistics", tier: 1, parent: "org", x: 350, y: 340, risk: "High", aiScore: 58, rating: 69, criticality: 65, incidents: 2, finding: "Subprocessor breach disclosed 11 days ago." },
  { id: "anchor", name: "Anchor HR Systems", tier: 2, parent: "northwind", x: 100, y: 60, risk: "Medium", aiScore: 55, rating: 58, criticality: 34, incidents: 3, finding: "Credential leak affecting admin portal access." },
  { id: "helio", name: "Helio Analytics", tier: 2, parent: "cloudline", x: 100, y: 200, risk: "Medium", aiScore: 18, rating: 84, criticality: 40, incidents: 0, finding: "No open findings — reassessed quarterly." },
  { id: "beacon", name: "Beacon Legal Suite", tier: 2, parent: "vertex", x: 100, y: 340, risk: "Low", aiScore: 8, rating: 91, criticality: 18, incidents: 0, finding: "Low blast radius, strong security posture." },
];

const VIEW_W = 680;
const VIEW_H = 400;

function pathToOrg(vendor: Vendor): string[] {
  const path = [vendor.id];
  let current = vendor;
  while (current.parent) {
    path.push(current.parent);
    current = vendors.find((v) => v.id === current.parent)!;
  }
  return path;
}

const riskTone: Record<RiskTier, "red" | "amber" | "blue" | "teal"> = {
  Critical: "red",
  High: "amber",
  Medium: "blue",
  Low: "teal",
};

function EcosystemGraph({ active, onHover }: { active: Vendor; onHover: (v: Vendor) => void }) {
  const reduced = usePrefersReducedMotion();
  const highlighted = new Set(pathToOrg(active));
  const highlightedEdges = vendors
    .filter((v) => v.parent && highlighted.has(v.id) && highlighted.has(v.parent))
    .map((v) => {
      const parent = vendors.find((p) => p.id === v.parent)!;
      return { from: v, to: parent };
    });

  const cardLeft = `${(active.x / VIEW_W) * 100}%`;
  const cardTop = `${(active.y / VIEW_H) * 100}%`;
  const cardOnRight = active.x < VIEW_W / 2;

  return (
    <div className="relative">
      <div className="mb-6 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-wide text-white/35">Supply-chain ecosystem</span>
        <Tag tone="amber">Attack path trace</Tag>
      </div>

      <div
        className="relative mx-auto overflow-visible"
        style={{ width: `min(100%, ${VIEW_W}px)`, aspectRatio: `${VIEW_W} / ${VIEW_H}` }}
      >
        <GraphSurface viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}>
          {vendors
            .filter((v) => v.parent)
            .map((v) => {
              const parent = vendors.find((p) => p.id === v.parent)!;
              const isLit = highlighted.has(v.id) && highlighted.has(parent.id);
              return (
                <GraphEdge
                  key={v.id}
                  x1={parent.x - 85}
                  y1={parent.y}
                  x2={v.x + 85}
                  y2={v.y}
                  color={isLit ? tierColor[active.risk] : "rgba(255,255,255,.1)"}
                  animated={isLit}
                  width={isLit ? 2 : 1.2}
                />
              );
            })}
          {!reduced &&
            highlightedEdges.map(({ from, to }) => (
              <circle key={`p-${from.id}`} r="3" fill={tierColor[active.risk]}>
                <animateMotion dur="1.6s" repeatCount="indefinite" path={`M${from.x + 85},${from.y} L${to.x - 85},${to.y}`} />
              </circle>
            ))}
          {vendors.map((v) => (
            <g key={v.id} onMouseEnter={() => v.id !== "org" && onHover(v)} className={v.id !== "org" ? "cursor-pointer" : undefined}>
              <GraphNode x={v.x} y={v.y} width={170} height={46} color={v.id === "org" ? "#1e6feb" : tierColor[v.risk]}>
                <span className="truncate font-mono text-[11px] text-white/90">{v.name}</span>
                {v.id !== "org" ? (
                  <span className="font-mono text-[9px] uppercase tracking-wide text-white/40">
                    Tier {v.tier} · {v.risk}
                  </span>
                ) : (
                  <span className="font-mono text-[9px] uppercase tracking-wide text-white/40">Core</span>
                )}
              </GraphNode>
            </g>
          ))}
        </GraphSurface>

        <div
          className="absolute w-[240px]"
          style={{
            left: cardLeft,
            top: cardTop,
            transform: `translate(${cardOnRight ? "24px" : "calc(-100% - 24px)"}, -50%)`,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 0.92, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="dsip-panel !rounded-2xl p-4"
            >
              <div className="mb-3 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wide text-white/40">
                <Sparkles className="h-3 w-3 text-signal-indigo" /> Scored by Intellicore
              </div>
              <div className="flex items-center gap-3">
                <RadialGauge value={active.aiScore} size={58} stroke={6} color={tierColor[active.risk]} label="" />
                <div className="min-w-0">
                  <h3 className="truncate font-display text-sm font-semibold text-white">{active.name}</h3>
                  <Tag tone={riskTone[active.risk]} className="mt-1">{active.risk} tier</Tag>
                </div>
              </div>
              <p className="mt-3 text-xs leading-5 text-white/55">{active.finding}</p>
              <div className="mt-3 grid grid-cols-3 gap-2 border-t border-white/10 pt-3 text-center">
                <div>
                  <p className="font-display text-sm font-semibold" style={{ color: tierColor[active.risk] }}>{active.rating}</p>
                  <p className="font-mono text-[8px] uppercase tracking-wide text-white/35">Rating</p>
                </div>
                <div>
                  <p className="font-display text-sm font-semibold text-white">{active.criticality}</p>
                  <p className="font-mono text-[8px] uppercase tracking-wide text-white/35">Critical.</p>
                </div>
                <div>
                  <p className="font-display text-sm font-semibold text-white">{active.incidents}</p>
                  <p className="font-mono text-[8px] uppercase tracking-wide text-white/35">Findings</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <p className="mt-2 text-center text-xs text-white/35">Hover any vendor to trace how its risk propagates upstream to your organization.</p>
    </div>
  );
}

export function ThirdPartyRisk() {
  const [active, setActive] = useState<Vendor>(vendors[1]);
  return (
    <section id="third-party" className="relative mx-auto max-w-[1400px] overflow-hidden px-5 py-24 sm:px-8">
      <TintWash tint="rgba(30,111,235,.09)" position="20% 100%" />
      <SectionHeading
        index="07"
        kicker="Third-Party Risk Management"
        tone="amber"
        title="Every vendor, scored by how its risk reaches you"
        description="A living dependency graph, not a spreadsheet — hover a vendor to trace its attack path and see its AI-generated risk score."
      />
      <EcosystemGraph active={active} onHover={setActive} />
    </section>
  );
}
