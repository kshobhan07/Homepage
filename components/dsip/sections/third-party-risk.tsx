"use client";

import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { Panel, SectionHeading, Tag } from "../primitives/kit";
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
  { id: "org", name: "Your organization", tier: 1, x: 560, y: 200, risk: "Low", aiScore: 0, rating: 100, criticality: 100, incidents: 0, finding: "" },
  { id: "northwind", name: "Northwind Payments", tier: 1, parent: "org", x: 340, y: 70, risk: "Critical", aiScore: 82, rating: 62, criticality: 88, incidents: 4, finding: "Two unpatched CVEs on internet-facing infrastructure." },
  { id: "cloudline", name: "Cloudline Storage", tier: 1, parent: "org", x: 340, y: 200, risk: "High", aiScore: 40, rating: 78, criticality: 70, incidents: 1, finding: "Rating improved after MFA enforcement rollout." },
  { id: "vertex", name: "Vertex Logistics", tier: 1, parent: "org", x: 340, y: 330, risk: "High", aiScore: 58, rating: 69, criticality: 65, incidents: 2, finding: "Subprocessor breach disclosed 11 days ago." },
  { id: "anchor", name: "Anchor HR Systems", tier: 2, parent: "northwind", x: 120, y: 70, risk: "Medium", aiScore: 55, rating: 58, criticality: 34, incidents: 3, finding: "Credential leak affecting admin portal access." },
  { id: "helio", name: "Helio Analytics", tier: 2, parent: "cloudline", x: 120, y: 200, risk: "Medium", aiScore: 18, rating: 84, criticality: 40, incidents: 0, finding: "No open findings — reassessed quarterly." },
  { id: "beacon", name: "Beacon Legal Suite", tier: 2, parent: "vertex", x: 120, y: 330, risk: "Low", aiScore: 8, rating: 91, criticality: 18, incidents: 0, finding: "Low blast radius, strong security posture." },
];

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

function DependencyGraph({ active, onHover }: { active: Vendor; onHover: (v: Vendor) => void }) {
  const reduced = usePrefersReducedMotion();
  const highlighted = new Set(pathToOrg(active));
  const highlightedEdges = vendors
    .filter((v) => v.parent && highlighted.has(v.id) && highlighted.has(v.parent))
    .map((v) => {
      const parent = vendors.find((p) => p.id === v.parent)!;
      return { from: v, to: parent };
    });

  return (
    <Panel className="overflow-hidden !rounded-[18px] p-0 lg:col-span-2">
      <div className="flex items-center justify-between border-b border-white/[.07] px-5 py-3.5">
        <span className="font-mono text-[11px] uppercase tracking-wide text-white/45">Supply-chain dependency graph</span>
        <Tag tone="amber">Attack path trace</Tag>
      </div>
      <div className="h-[420px]">
        <GraphSurface viewBox="0 0 680 400">
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
                  color={isLit ? tierColor[active.risk] : "rgba(255,255,255,.12)"}
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
          {vendors.map((v) => {
            return (
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
            );
          })}
        </GraphSurface>
      </div>
      <div className="grid grid-cols-3 gap-3 border-t border-white/[.07] px-5 py-4 text-center">
        <div>
          <p className="font-display text-lg font-semibold" style={{ color: tierColor[active.risk] }}>{active.rating}</p>
          <p className="font-mono text-[10px] uppercase tracking-wide text-white/40">Rating</p>
        </div>
        <div>
          <p className="font-display text-lg font-semibold text-white">{active.criticality}</p>
          <p className="font-mono text-[10px] uppercase tracking-wide text-white/40">Criticality</p>
        </div>
        <div>
          <p className="font-display text-lg font-semibold text-white">{active.incidents}</p>
          <p className="font-mono text-[10px] uppercase tracking-wide text-white/40">Open findings</p>
        </div>
      </div>
    </Panel>
  );
}

function VendorDetail({ vendor }: { vendor: Vendor }) {
  return (
    <Panel className="flex flex-col justify-between p-5">
      <div>
        <div className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wide text-white/40">
          <Sparkles className="h-3 w-3 text-signal-indigo" /> AI risk score · scored by Intellicore
        </div>
        <div className="flex items-center gap-4">
          <RadialGauge value={vendor.aiScore} size={76} stroke={7} color={tierColor[vendor.risk]} label="/ 100" />
          <div>
            <h3 className="font-display text-lg font-semibold text-white">{vendor.name}</h3>
            <Tag tone={riskTone[vendor.risk]} className="mt-1.5">{vendor.risk} tier</Tag>
          </div>
        </div>
        <p className="mt-4 text-sm leading-6 text-white/60">{vendor.finding}</p>
      </div>
      <p className="mt-6 border-t border-white/10 pt-4 text-xs text-white/40">
        Hover any vendor in the graph to trace how its risk propagates upstream to your organization.
      </p>
    </Panel>
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
      <div className="grid gap-4 lg:grid-cols-3">
        <DependencyGraph active={active} onHover={setActive} />
        <VendorDetail vendor={active} />
      </div>
    </section>
  );
}
