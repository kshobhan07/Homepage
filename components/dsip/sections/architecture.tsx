"use client";

import React from "react";
import { Cloud, Fingerprint, Globe2, MessageSquareWarning, ShieldAlert } from "lucide-react";
import { Panel, SectionHeading, Tag } from "../primitives/kit";
import { usePrefersReducedMotion } from "../primitives/hooks";

const sources = [
  { label: "Domains & DNS", Icon: Globe2, y: 40 },
  { label: "Cloud assets", Icon: Cloud, y: 110 },
  { label: "Dark web", Icon: MessageSquareWarning, y: 180 },
  { label: "Vulnerabilities", Icon: ShieldAlert, y: 250 },
  { label: "Certificates", Icon: Fingerprint, y: 320 },
];

const outputs = ["Splunk", "Sentinel", "ServiceNow", "Slack", "Jira", "CrowdStrike", "Okta", "AWS Sec Hub", "PagerDuty", "Salesforce"];

function FlowParticles({ x1, y1, x2, y2, delay = 0 }: { x1: number; y1: number; x2: number; y2: number; delay?: number }) {
  const reduced = usePrefersReducedMotion();
  if (reduced) return null;
  const d = `M${x1},${y1} L${x2},${y2}`;
  return (
    <circle r="2.4" fill="#2ee6b8">
      <animateMotion dur="2.6s" begin={`${delay}s`} repeatCount="indefinite" path={d} />
    </circle>
  );
}

function LivingArchitecture() {
  const coreX = 330;
  const coreY = 180;
  const sourceX = 90;
  const outputX = 570;

  return (
    <Panel className="overflow-hidden !rounded-[18px] p-0">
      <div className="flex items-center justify-between border-b border-white/[.07] px-5 py-3.5">
        <span className="font-mono text-[11px] uppercase tracking-wide text-white/45">Platform architecture — live data flow</span>
        <Tag tone="blue">Signals in. Action out.</Tag>
      </div>
      <div className="relative h-[420px] w-full overflow-hidden lg:h-[380px]">
        <svg viewBox="0 0 660 360" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
          <defs>
            <pattern id="arch-grid" width="26" height="26" patternUnits="userSpaceOnUse">
              <path d="M 26 0 L 0 0 0 26" fill="none" stroke="rgba(255,255,255,.045)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#arch-grid)" />

          {sources.map((s, i) => (
            <line key={s.label} x1={sourceX + 58} y1={s.y} x2={coreX - 70} y2={coreY} stroke="rgba(255,255,255,.1)" strokeWidth="1" />
          ))}
          {sources.map((s, i) => (
            <FlowParticles key={s.label} x1={sourceX + 58} y1={s.y} x2={coreX - 70} y2={coreY} delay={i * 0.4} />
          ))}

          {outputs.slice(0, 6).map((name, i) => {
            const y = 60 + i * 48;
            return <line key={`l-${name}`} x1={coreX + 70} y1={coreY} x2={outputX - 4} y2={y} stroke="rgba(255,255,255,.1)" strokeWidth="1" />;
          })}
          {outputs.slice(0, 6).map((name, i) => {
            const y = 60 + i * 48;
            return <FlowParticles key={`p-${name}`} x1={coreX + 70} y1={coreY} x2={outputX - 4} y2={y} delay={i * 0.35} />;
          })}
        </svg>

        <div className="absolute inset-y-0 left-0 flex w-[130px] flex-col justify-around py-4 pl-3">
          {sources.map((s) => (
            <div key={s.label} className="flex items-center gap-2 rounded-full border border-white/10 bg-[#0a0e16]/90 px-2.5 py-1.5">
              <s.Icon className="h-3 w-3 shrink-0 text-signal-blue" />
              <span className="truncate font-mono text-[9.5px] text-white/65">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-2xl border border-signal-blue/40 bg-signal-blue/10 px-6 py-5 text-center shadow-[0_0_50px_rgba(47,111,237,.25)]">
          <span className="font-display text-sm font-bold text-white">Correlation Core</span>
          <span className="font-mono text-[9px] uppercase tracking-wide text-white/50">Intellicore AI · Knowledge Graph</span>
        </div>

        <div className="absolute inset-y-0 right-0 flex w-[150px] flex-col justify-around py-3 pr-3">
          {outputs.slice(0, 6).map((name) => (
            <div key={name} className="rounded-full border border-white/10 bg-[#0a0e16]/90 px-3 py-1.5 text-center font-mono text-[10px] text-white/70">
              {name}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 border-t border-white/[.07] px-5 py-4">
        {outputs.map((name) => (
          <span key={name} className="rounded-full border border-white/10 bg-white/[.03] px-3 py-1 font-mono text-[10px] text-white/45">
            {name}
          </span>
        ))}
      </div>
    </Panel>
  );
}

export function Architecture() {
  return (
    <section id="architecture" className="mx-auto max-w-[1200px] px-5 py-24 sm:px-8">
      <SectionHeading
        index="13"
        align="center"
        kicker="Platform Architecture"
        tone="blue"
        title="One living system, not a stack of point tools"
        description="Every signal source feeds the same correlation core, and every finding pushes into the tools your team already lives in — no new inbox to check."
      />
      <LivingArchitecture />
    </section>
  );
}
