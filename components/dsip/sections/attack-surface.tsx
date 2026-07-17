"use client";

import React, { useState } from "react";
import { Fingerprint, Globe2, Server, ShieldAlert } from "lucide-react";
import { Panel, SectionHeading, Tag } from "../primitives/kit";
import { StatCounter } from "../primitives/stat";
import { cn } from "@/lib/utils";

const stats = [
  { label: "Organizations", value: 100, suffix: "+", Icon: Globe2 },
  { label: "Internet-facing assets", value: 24680, suffix: "", Icon: Server },
  { label: "Critical exposures", value: 12, suffix: "", Icon: ShieldAlert },
  { label: "Certificates tracked", value: 3140, suffix: "", Icon: Fingerprint },
];

type Category = {
  id: string;
  label: string;
  x: number;
  y: number;
  covers: string[];
  findings: { text: string; risk: "Critical" | "High" | "Medium" | "Low" }[];
};

const CENTER = 300;

const categories: Category[] = [
  {
    id: "internet",
    label: "Internet Assets",
    x: 300,
    y: 85,
    covers: ["Domains", "Subdomains", "DNS", "Certificates"],
    findings: [
      { text: "24,680 domains & subdomains mapped", risk: "Low" },
      { text: "3,140 certificates tracked", risk: "Low" },
      { text: "412 DNS records analyzed for drift", risk: "Medium" },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & OT Assets",
    x: 486,
    y: 192,
    covers: ["Cloud Assets", "OT Assets"],
    findings: [
      { text: "18 public cloud buckets identified", risk: "High" },
      { text: "6 OT / ICS endpoints exposed to the internet", risk: "Critical" },
      { text: "112 misconfigured storage services", risk: "High" },
    ],
  },
  {
    id: "tech",
    label: "Tech & Vulnerabilities",
    x: 486,
    y: 408,
    covers: ["Technology Disclosure", "Infrastructure Vulnerabilities", "CVEs"],
    findings: [
      { text: "6,795 CVEs correlated to your stack", risk: "High" },
      { text: "142 outdated technology fingerprints", risk: "Medium" },
      { text: "12 critical infrastructure vulnerabilities", risk: "Critical" },
    ],
  },
  {
    id: "rogue",
    label: "Rogue & Unknown Assets",
    x: 300,
    y: 515,
    covers: ["Rogue Assets", "Unknown Assets"],
    findings: [
      { text: "37 unknown assets discovered this month", risk: "Medium" },
      { text: "8 rogue subdomains flagged", risk: "High" },
      { text: "3 shadow cloud accounts identified", risk: "Critical" },
    ],
  },
  {
    id: "surface",
    label: "Open Surface",
    x: 114,
    y: 408,
    covers: ["Open Ports", "Login Panels"],
    findings: [
      { text: "9 open non-standard ports", risk: "Medium" },
      { text: "5 exposed admin login panels", risk: "High" },
      { text: "2 panels still on default credentials", risk: "Critical" },
    ],
  },
  {
    id: "email",
    label: "Email & SSL Posture",
    x: 114,
    y: 192,
    covers: ["Email Misconfiguration", "SSL Misconfiguration", "Security Headers"],
    findings: [
      { text: "SPF / DKIM / DMARC gaps on 4 domains", risk: "High" },
      { text: "11 expired or weak TLS certificates", risk: "Medium" },
      { text: "7 missing security headers", risk: "Low" },
    ],
  },
];

const riskColor: Record<string, string> = {
  Critical: "#e23a4e",
  High: "#f2a93b",
  Medium: "#1e6feb",
  Low: "#22d3ee",
};

function TopologyExplorer() {
  const [active, setActive] = useState<Category>(categories[1]);

  return (
    <Panel className="overflow-hidden !rounded-[20px] p-0 lg:col-span-2">
      <div className="flex items-center justify-between border-b border-white/[.07] px-5 py-3.5">
        <span className="font-mono text-[11px] uppercase tracking-wide text-white/45">Animated attack surface topology</span>
        <Tag tone="teal">Live discovery</Tag>
      </div>
      <div className="relative h-[440px] overflow-hidden">
        <div className="dsip-scan-sweep pointer-events-none absolute inset-x-0 h-24" />
        <svg viewBox="0 0 600 600" className="absolute inset-0 h-full w-full">
          <defs>
            <pattern id="asm-grid" width="26" height="26" patternUnits="userSpaceOnUse">
              <path d="M 26 0 L 0 0 0 26" fill="none" stroke="rgba(255,255,255,.045)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#asm-grid)" />
          <circle cx={CENTER} cy={CENTER} r={215} fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="1" />

          {categories.map((c) => {
            const isActive = c.id === active.id;
            return (
              <line
                key={`line-${c.id}`}
                x1={CENTER}
                y1={CENTER}
                x2={c.x}
                y2={c.y}
                stroke={isActive ? riskColor[c.findings[0].risk] : "rgba(255,255,255,.12)"}
                strokeWidth={isActive ? 1.6 : 1}
                className={isActive ? "dsip-edge-flow" : undefined}
              />
            );
          })}

          <circle cx={CENTER} cy={CENTER} r={58} fill="#0a1428" stroke="#1e6feb" strokeWidth="1.5" />
          <foreignObject x={CENTER - 56} y={CENTER - 56} width={112} height={112}>
            <div className="flex h-full w-full flex-col items-center justify-center text-center">
              <span className="font-display text-sm font-bold tracking-tight text-white">acme-corp</span>
              <span className="mt-0.5 font-mono text-[8px] uppercase text-white/40">attack surface</span>
            </div>
          </foreignObject>

          {categories.map((c) => {
            const isActive = c.id === active.id;
            return (
              <foreignObject key={c.id} x={c.x - 74} y={c.y - 22} width={148} height={44} style={{ overflow: "visible" }}>
                <button
                  onMouseEnter={() => setActive(c)}
                  onFocus={() => setActive(c)}
                  className={cn(
                    "mx-auto flex w-full items-center justify-center rounded-full border px-3 py-2 font-mono text-[10px] font-medium transition",
                    isActive
                      ? "border-white/40 bg-[#0a1428] text-white shadow-[0_0_20px_rgba(255,255,255,.08)]"
                      : "border-white/10 bg-[#0a1428]/85 text-white/60 hover:text-white/90",
                  )}
                  style={isActive ? { borderColor: riskColor[c.findings[0].risk] } : undefined}
                >
                  {c.label}
                </button>
              </foreignObject>
            );
          })}
        </svg>
      </div>
      <div className="border-t border-white/[.07] px-5 py-4">
        <div className="mb-2 flex flex-wrap items-center gap-1.5">
          {active.covers.map((c) => (
            <span key={c} className="rounded-full border border-white/10 bg-white/[.03] px-2.5 py-0.5 font-mono text-[9.5px] uppercase tracking-wide text-white/40">
              {c}
            </span>
          ))}
        </div>
        <div className="space-y-2">
          {active.findings.map((f) => (
            <div key={f.text} className="flex items-center justify-between gap-3 rounded-lg border border-white/[.07] bg-white/[.02] px-3.5 py-2.5">
              <span className="text-sm text-white/78">{f.text}</span>
              <span
                className="shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[10px]"
                style={{ borderColor: `${riskColor[f.risk]}4d`, background: `${riskColor[f.risk]}18`, color: riskColor[f.risk] }}
              >
                {f.risk}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

const timeline = [
  { time: "00:02", event: "New subdomain discovered via certificate transparency logs" },
  { time: "00:41", event: "Cloud storage bucket enumerated and flagged for public access" },
  { time: "02:15", event: "Technology fingerprint updated — outdated CMS version detected" },
  { time: "03:12", event: "Open RDP port found on non-standard port, no MFA enforced" },
  { time: "03:58", event: "Risk score recalculated after asset criticality change" },
];

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
        kicker="Attack Surface & AI Asset Discovery"
        tone="teal"
        title="Every asset you own — and every one you didn't know about"
        description="Internet, cloud and OT assets, email and SSL posture, open ports, technology and CVEs, rogue and unknown assets — mapped without agents, rendered as a live topology."
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
