"use client";

import React, { useState } from "react";
import { Fingerprint, Globe2, Server, ShieldAlert } from "lucide-react";
import { Panel, SectionHeading, Tag } from "../primitives/kit";
import { StatCounter } from "../primitives/stat";
import { GraphEdge, GraphNode, GraphSurface } from "../primitives/graph";
import { cn } from "@/lib/utils";

const stats = [
  { label: "Organizations", value: 100, suffix: "+", Icon: Globe2 },
  { label: "Internet-facing assets", value: 24680, suffix: "", Icon: Server },
  { label: "Critical exposures", value: 12, suffix: "", Icon: ShieldAlert },
  { label: "Certificates tracked", value: 3140, suffix: "", Icon: Fingerprint },
];

type Asset = {
  id: string;
  category: string;
  label: string;
  x: number;
  y: number;
  risk: "Critical" | "High" | "Medium" | "Low";
  detail: string;
};

const categories = [
  { id: "domains", label: "Domains", x: 230, y: 60 },
  { id: "subdomains", label: "Subdomains", x: 230, y: 150 },
  { id: "cloud", label: "Cloud assets", x: 230, y: 240 },
  { id: "certs", label: "Certificates", x: 230, y: 330 },
];

const assets: Asset[] = [
  { id: "a1", category: "domains", label: "portal.acme-corp.com", x: 470, y: 40, risk: "Critical", detail: "Expired TLS certificate on the primary customer login." },
  { id: "a2", category: "subdomains", label: "legacy-api.acme-corp.com", x: 470, y: 130, risk: "High", detail: "Unauthenticated API endpoint exposed to the public internet." },
  { id: "a3", category: "subdomains", label: "203.0.113.44", x: 470, y: 190, risk: "Medium", detail: "Open RDP on a non-standard port, no MFA enforced." },
  { id: "a4", category: "cloud", label: "s3://acme-marketing-assets", x: 470, y: 260, risk: "High", detail: "Public read access enabled on a bucket with internal documents." },
  { id: "a5", category: "certs", label: "*.acme-corp.com", x: 470, y: 340, risk: "Low", detail: "Wildcard certificate renews automatically in 11 days." },
];

const riskColor: Record<Asset["risk"], string> = {
  Critical: "#ff4d5e",
  High: "#f5a623",
  Medium: "#2f6fed",
  Low: "#2ee6b8",
};

const timeline = [
  { time: "00:02", event: "New subdomain discovered via certificate transparency logs" },
  { time: "00:41", event: "Cloud storage bucket enumerated and flagged for public access" },
  { time: "02:15", event: "Technology fingerprint updated — outdated CMS version detected" },
  { time: "03:58", event: "Risk score recalculated after asset criticality change" },
];

function TopologyExplorer() {
  const [active, setActive] = useState<Asset>(assets[0]);

  return (
    <Panel className="relative overflow-hidden !rounded-[18px] p-0 lg:col-span-2">
      <div className="flex items-center justify-between border-b border-white/[.07] px-5 py-3.5">
        <span className="font-mono text-[11px] uppercase tracking-wide text-white/45">Internet topology explorer</span>
        <Tag tone="teal">Live discovery</Tag>
      </div>
      <div className="relative h-[380px] overflow-hidden">
        <div className="dsip-scan-sweep pointer-events-none absolute inset-x-0 h-24" />
        <GraphSurface viewBox="0 0 640 400">
          <GraphNode x={70} y={195} width={140} height={44} color="#2f6fed">
            <span className="font-mono text-[11px] text-white/90">acme-corp.com</span>
            <span className="font-mono text-[9px] text-white/40">root domain</span>
          </GraphNode>

          {categories.map((cat) => (
            <React.Fragment key={cat.id}>
              <GraphEdge x1={140} y1={195} x2={cat.x - 60} y2={cat.y} color="rgba(255,255,255,.14)" />
              <GraphNode x={cat.x} y={cat.y} width={130} height={36} color="rgba(255,255,255,.2)">
                <span className="font-mono text-[10px] uppercase tracking-wide text-white/60">{cat.label}</span>
              </GraphNode>
            </React.Fragment>
          ))}

          {assets.map((asset) => {
            const cat = categories.find((c) => c.id === asset.category)!;
            const isActive = asset.id === active.id;
            return (
              <React.Fragment key={asset.id}>
                <GraphEdge
                  x1={cat.x + 60}
                  y1={cat.y}
                  x2={asset.x - 90}
                  y2={asset.y}
                  color={isActive ? riskColor[asset.risk] : "rgba(255,255,255,.1)"}
                  animated={isActive}
                />
                <g onMouseEnter={() => setActive(asset)} className="cursor-pointer">
                  <GraphNode x={asset.x} y={asset.y} width={180} height={40} color={riskColor[asset.risk]} critical={asset.risk === "Critical"}>
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate font-mono text-[10px] text-white/85">{asset.label}</span>
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: riskColor[asset.risk] }} />
                    </div>
                  </GraphNode>
                </g>
              </React.Fragment>
            );
          })}
        </GraphSurface>
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-white/[.07] px-5 py-3.5">
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-wide text-white/35">{active.category}</p>
          <p className="truncate text-sm text-white/85">{active.label}</p>
          <p className="mt-0.5 text-xs text-white/45">{active.detail}</p>
        </div>
        <span className={cn("shrink-0 rounded-full border px-3 py-1 font-mono text-[11px]")} style={{ borderColor: `${riskColor[active.risk]}4d`, background: `${riskColor[active.risk]}18`, color: riskColor[active.risk] }}>
          {active.risk}
        </span>
      </div>
    </Panel>
  );
}

function DiscoveryTimeline() {
  return (
    <Panel className="p-5">
      <h3 className="mb-5 font-mono text-[11px] uppercase tracking-wide text-white/45">Discovery timeline</h3>
      <div className="space-y-5">
        {timeline.map((item, index) => (
          <div key={item.time} className="relative pl-6">
            {index !== timeline.length - 1 ? (
              <span className="absolute left-[5px] top-4 h-full w-px bg-white/10" />
            ) : null}
            <span className="absolute left-0 top-1 h-2.5 w-2.5 rounded-full border border-signal-blue/60 bg-signal-blue/20" />
            <p className="font-mono text-[10px] text-white/35">{item.time}</p>
            <p className="text-sm text-white/78">{item.event}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}

export function AttackSurface() {
  return (
    <section id="attack-surface" className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8">
      <SectionHeading
        index="02"
        kicker="External Attack Surface Management"
        tone="teal"
        title="Every internet-facing asset, discovered and scored continuously"
        description="Domains, subdomains, IPs, ASN, DNS, WHOIS, certificates and cloud assets — mapped without agents, rendered as a live topology."
      />
      <Panel className="mb-4 flex flex-col divide-y divide-white/[.06] !rounded-[18px] p-0 sm:flex-row sm:divide-x sm:divide-y-0">
        {stats.map(({ label, value, suffix, Icon }) => (
          <div key={label} className="flex flex-1 items-center gap-3 p-5">
            <Icon className="h-4 w-4 shrink-0 text-signal-teal" />
            <div>
              <p className="font-display text-xl font-semibold text-white">
                <StatCounter value={value} suffix={suffix} />
              </p>
              <p className="font-mono text-[10px] uppercase tracking-wide text-white/40">{label}</p>
            </div>
          </div>
        ))}
      </Panel>
      <div className="grid gap-4 lg:grid-cols-3">
        <TopologyExplorer />
        <DiscoveryTimeline />
      </div>
    </section>
  );
}
