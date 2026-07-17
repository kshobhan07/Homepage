"use client";

import React from "react";
import {
  BrainCircuit,
  Briefcase,
  Building2,
  Eye,
  Globe2,
  Network,
  RadioTower,
  Search,
  ShieldAlert,
  ShieldCheck,
  UserRoundCheck,
  Video,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDSIPStore } from "@/store/use-dsip-store";
import { SectionHeading } from "../primitives/kit";

// Rounded to avoid float-to-string hydration mismatches between server/client JS engines.
const round = (n: number) => Math.round(n * 100) / 100;

const modules: { name: string; Icon: LucideIcon; copy: string }[] = [
  { name: "Attack Surface Management", Icon: Globe2, copy: "Domains, subdomains, IPs, certificates and cloud assets, discovered continuously." },
  { name: "AI Attack Surface Management", Icon: BrainCircuit, copy: "Shadow AI, prompt leakage and model exposure across every business unit." },
  { name: "Threat Intelligence", Icon: RadioTower, copy: "Actors, campaigns, malware and CVEs correlated against your real footprint." },
  { name: "Vulnerability Management", Icon: ShieldAlert, copy: "CVSS, exploit availability and CISA KEV mapped to asset criticality." },
  { name: "Brand Protection", Icon: ShieldCheck, copy: "Fake domains, phishing kits, rogue apps and social abuse, tracked to takedown." },
  { name: "VIP Monitoring", Icon: UserRoundCheck, copy: "Executive impersonation, credential leaks and targeted campaign detection." },
  { name: "Deepfake Monitoring", Icon: Video, copy: "Audio, video and image detection across executive likenesses." },
  { name: "Dark Web Intelligence", Icon: Eye, copy: "Forums, marketplaces, Telegram and paste sites monitored for business impact." },
  { name: "Third-Party Risk", Icon: Building2, copy: "Vendor ratings, supply-chain mapping and incident correlation." },
  { name: "Due Diligence", Icon: Briefcase, copy: "Corporate intelligence, ownership, sanctions and historical incident review." },
  { name: "Investigations", Icon: Search, copy: "Cases, evidence and timelines linked by the knowledge graph." },
  { name: "Knowledge Graph", Icon: Network, copy: "Every organization, asset, actor and case, connected in one graph." },
];

function PlatformHub() {
  const { activeModule, setActiveModule } = useDSIPStore();
  const active = modules.find((m) => m.name === activeModule) ?? modules[0];
  const radius = 210;
  const center = 300;

  return (
    <div className="mx-auto hidden max-w-2xl md:block">
    <div className="relative mx-auto aspect-square w-full" style={{ maxWidth: 600 }}>
      <div
        className="dsip-radar-sweep pointer-events-none absolute left-1/2 top-1/2 h-[92%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60"
        style={{
          background: "conic-gradient(from 0deg, rgba(47,111,237,.18), transparent 24%, transparent 100%)",
          maskImage: "radial-gradient(circle, black 55%, transparent 76%)",
          WebkitMaskImage: "radial-gradient(circle, black 55%, transparent 76%)",
        }}
      />
      <svg viewBox="0 0 600 600" className="absolute inset-0 h-full w-full">
        {modules.map((m, i) => {
          const angle = (i / modules.length) * Math.PI * 2 - Math.PI / 2;
          const x = round(center + Math.cos(angle) * radius);
          const y = round(center + Math.sin(angle) * radius);
          const isActive = m.name === activeModule;
          return (
            <line
              key={m.name}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke={isActive ? "#2f6fed" : "rgba(255,255,255,.12)"}
              strokeWidth={isActive ? 1.5 : 1}
              className={isActive ? "dsip-edge-flow" : undefined}
            />
          );
        })}
        <circle cx={center} cy={center} r={54} fill="rgba(10,14,22,.96)" stroke="#2f6fed" strokeWidth={1.5} />
        <foreignObject x={center - 54} y={center - 54} width={108} height={108}>
          <div className="flex h-full w-full flex-col items-center justify-center text-center">
            <span className="font-display text-sm font-bold tracking-tight text-white">DSIP</span>
            <span className="mt-0.5 font-mono text-[9px] text-white/40">core</span>
          </div>
        </foreignObject>
        {modules.map((m, i) => {
          const angle = (i / modules.length) * Math.PI * 2 - Math.PI / 2;
          const x = round(center + Math.cos(angle) * radius);
          const y = round(center + Math.sin(angle) * radius);
          const isActive = m.name === activeModule;
          const Icon = m.Icon;
          return (
            <foreignObject key={m.name} x={x - 60} y={y - 20} width={120} height={40} style={{ overflow: "visible" }}>
              <button
                onMouseEnter={() => setActiveModule(m.name)}
                onFocus={() => setActiveModule(m.name)}
                className={cn(
                  "flex w-full items-center gap-1.5 rounded-full border px-2.5 py-1.5 font-mono text-[10px] font-medium transition",
                  isActive
                    ? "border-signal-blue/40 bg-signal-blue/15 text-white"
                    : "border-white/10 bg-[#0a0e16]/90 text-white/55 hover:text-white/85",
                )}
              >
                <Icon className="h-3 w-3 shrink-0" />
                <span className="truncate">{m.name}</span>
              </button>
            </foreignObject>
          );
        })}
      </svg>
    </div>
    <div className="mx-auto mt-6 max-w-md rounded-lg border border-white/10 bg-[#0a0e16]/95 p-4 text-center backdrop-blur-xl">
      <p className="text-sm font-bold text-white">{active.name}</p>
      <p className="mt-1 text-xs text-white/55">{active.copy}</p>
    </div>
    </div>
  );
}

function MobileModuleList() {
  const { activeModule, setActiveModule } = useDSIPStore();
  return (
    <div className="grid gap-2 md:hidden">
      {modules.map((m) => {
        const Icon = m.Icon;
        const isActive = m.name === activeModule;
        return (
          <button
            key={m.name}
            onClick={() => setActiveModule(m.name)}
            className={cn(
              "flex items-center gap-3 rounded-lg border p-3 text-left text-sm transition",
              isActive ? "border-signal-blue/30 bg-signal-blue/10 text-white" : "border-white/10 bg-white/[.035] text-white/62",
            )}
          >
            <Icon className="h-4 w-4 shrink-0 text-signal-blue" />
            <div>
              <span className="block font-semibold">{m.name}</span>
              {isActive ? <span className="mt-0.5 block text-xs text-white/55">{m.copy}</span> : null}
            </div>
          </button>
        );
      })}
    </div>
  );
}

export function Modules() {
  return (
    <section id="modules" className="mx-auto max-w-[1248px] px-5 py-24 sm:px-8">
      <SectionHeading
        index="06"
        align="center"
        kicker="Platform modules"
        title="Twelve capabilities. One core."
        description="Every module below writes to the same graph — hover a spoke to see what it feeds the core."
      />
      <PlatformHub />
      <MobileModuleList />
    </section>
  );
}
