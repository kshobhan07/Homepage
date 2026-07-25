"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Fingerprint, Globe2, Server, ShieldAlert } from "lucide-react";
import { SectionHeading, Tag } from "../primitives/kit";
import { StatCounter } from "../primitives/stat";
import { TintWash } from "../primitives/section-backgrounds";
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
    y: 78,
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
    x: 500,
    y: 190,
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
    x: 500,
    y: 412,
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
    y: 522,
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
    x: 100,
    y: 412,
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
    x: 100,
    y: 190,
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

const timeline = [
  { time: "00:02", event: "New subdomain discovered via certificate transparency logs" },
  { time: "00:41", event: "Cloud storage bucket enumerated and flagged for public access" },
  { time: "02:15", event: "Technology fingerprint updated — outdated CMS version detected" },
  { time: "03:12", event: "Open RDP port found on non-standard port, no MFA enforced" },
  { time: "03:58", event: "Risk score recalculated after asset criticality change" },
];

function LiveTopology() {
  const [active, setActive] = useState<Category>(categories[1]);

  return (
    <div className="relative">
      <div className="mb-6 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-wide text-white/35">Live cyber topology</span>
        <Tag tone="teal">
          <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-signal-teal" /> Discovering
        </Tag>
      </div>

      <div className="relative grid gap-2 lg:grid-cols-[1fr_260px]">
        <div className="relative h-[560px] overflow-visible">
          <div className="dsip-scan-sweep pointer-events-none absolute inset-x-0 h-24" />
          <svg viewBox="0 0 600 600" className="absolute inset-0 h-full w-full overflow-visible">
            <defs>
              <radialGradient id="asm-core-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(30,111,235,.22)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <circle cx={CENTER} cy={CENTER} r={260} fill="url(#asm-core-glow)" />
            <circle cx={CENTER} cy={CENTER} r={215} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="1" strokeDasharray="2 6" />
            <circle cx={CENTER} cy={CENTER} r={150} fill="none" stroke="rgba(255,255,255,.05)" strokeWidth="1" />

            {categories.map((c) => {
              const isActive = c.id === active.id;
              return (
                <line
                  key={`line-${c.id}`}
                  x1={CENTER}
                  y1={CENTER}
                  x2={c.x}
                  y2={c.y}
                  stroke={isActive ? riskColor[c.findings[0].risk] : "rgba(255,255,255,.1)"}
                  strokeWidth={isActive ? 1.6 : 1}
                  className={isActive ? "dsip-edge-flow" : undefined}
                />
              );
            })}

            <circle cx={CENTER} cy={CENTER} r={58} fill="#050b18" stroke="#1e6feb" strokeWidth="1.5" />
            <foreignObject x={CENTER - 56} y={CENTER - 56} width={112} height={112}>
              <div className="flex h-full w-full flex-col items-center justify-center text-center">
                <span className="font-display text-sm font-bold tracking-tight text-white">acme-corp</span>
                <span className="mt-0.5 font-mono text-[8px] uppercase text-white/40">attack surface</span>
              </div>
            </foreignObject>

            {categories.map((c) => {
              const isActive = c.id === active.id;
              return (
                <foreignObject key={c.id} x={c.x - 84} y={c.y - 22} width={168} height={44} style={{ overflow: "visible" }}>
                  <button
                    onMouseEnter={() => setActive(c)}
                    onFocus={() => setActive(c)}
                    className={cn(
                      "mx-auto flex w-full items-center justify-center rounded-full border px-3 py-2 font-mono text-[10px] font-medium backdrop-blur-md transition-all",
                      isActive
                        ? "border-white/40 bg-[#0a1428]/90 text-white shadow-[0_0_28px_rgba(255,255,255,.1)]"
                        : "border-white/10 bg-[#0a1428]/60 text-white/55 hover:text-white/90",
                    )}
                    style={isActive ? { borderColor: riskColor[c.findings[0].risk] } : undefined}
                  >
                    {c.label}
                  </button>
                </foreignObject>
              );
            })}
          </svg>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-gradient-to-t from-[#050b18] via-[#050b18]/85 to-transparent px-2 pb-2 pt-16 sm:px-6"
            >
              <div className="flex flex-wrap items-center gap-1.5">
                {active.covers.map((c) => (
                  <span key={c} className="rounded-full border border-white/10 bg-white/[.03] px-2.5 py-0.5 font-mono text-[9.5px] uppercase tracking-wide text-white/40">
                    {c}
                  </span>
                ))}
              </div>
              <div className="grid gap-1.5 sm:grid-cols-3">
                {active.findings.map((f) => (
                  <div key={f.text} className="flex items-center justify-between gap-2 rounded-lg border border-white/[.06] bg-white/[.02] px-3 py-2 backdrop-blur-sm">
                    <span className="text-xs text-white/75">{f.text}</span>
                    <span
                      className="shrink-0 rounded-full border px-2 py-0.5 font-mono text-[9px]"
                      style={{ borderColor: `${riskColor[f.risk]}4d`, background: `${riskColor[f.risk]}18`, color: riskColor[f.risk] }}
                    >
                      {f.risk}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative hidden lg:block">
          <div className="pointer-events-none absolute -left-2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          <p className="mb-6 pl-5 font-mono text-[10px] uppercase tracking-wide text-white/30">Discovery feed</p>
          <div className="space-y-6 pl-5">
            {timeline.map((item, index) => (
              <motion.div
                key={item.time}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="relative"
              >
                <span className="absolute -left-5 top-1 h-1.5 w-1.5 rounded-full bg-signal-blue shadow-[0_0_10px_rgba(30,111,235,.8)]" />
                <p className="font-mono text-[10px] text-white/30">{item.time}</p>
                <p className="mt-0.5 text-xs leading-5 text-white/60">{item.event}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AttackSurface() {
  return (
    <section id="attack-surface" className="relative mx-auto max-w-[1400px] overflow-hidden px-5 py-24 sm:px-8">
      <TintWash tint="rgba(30,111,235,.10)" position="15% 0%" />
      <SectionHeading
        index="02"
        kicker="Attack Surface & AI Asset Discovery"
        tone="teal"
        title="Every asset you own — and every one you didn't know about"
        description="Internet, cloud and OT assets, email and SSL posture, open ports, technology and CVEs, rogue and unknown assets — mapped without agents, rendered as a live topology."
      />
      <div className="mb-10 flex flex-wrap items-center gap-x-10 gap-y-4 border-y border-white/[.06] py-5">
        {stats.map(({ label, value, suffix, Icon }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="flex items-center gap-3"
          >
            <Icon className="h-4 w-4 shrink-0 text-signal-teal" />
            <div>
              <p className="font-display text-xl font-semibold text-white">
                <StatCounter value={value} suffix={suffix} />
              </p>
              <p className="font-mono text-[10px] uppercase tracking-wide text-white/40">{label}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <LiveTopology />
    </section>
  );
}
