"use client";

import React from "react";
import { SectionHeading, Tag } from "../primitives/kit";
import { TerminalWindow } from "../primitives/terminal";
import { cn } from "@/lib/utils";

const actors = [
  { name: "APT-Nightshade", campaigns: 4, target: "Financial services" },
  { name: "ScatterVoid", campaigns: 2, target: "Retail & e-commerce" },
  { name: "GhostLedger", campaigns: 6, target: "Manufacturing" },
];

const cves = [
  { id: "CVE-2025-31337", severity: "Critical", kev: true, cvss: 9.8 },
  { id: "CVE-2025-20441", severity: "High", kev: true, cvss: 8.6 },
  { id: "CVE-2025-11209", severity: "High", kev: false, cvss: 7.4 },
  { id: "CVE-2024-58932", severity: "Medium", kev: false, cvss: 6.1 },
];

const mitre = ["Initial Access", "Credential Access", "Lateral Movement", "Exfiltration", "Command & Control"];

const severityTone: Record<string, string> = {
  Critical: "text-signal-red",
  High: "text-signal-amber",
  Medium: "text-signal-blue",
};

export function ThreatIntel() {
  return (
    <section id="threat-intel" className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8">
      <SectionHeading
        index="04"
        kicker="Threat Intelligence"
        tone="amber"
        title="Actors, campaigns and CVEs, correlated to your real exposure"
        description="Open, deep and dark source aggregation mapped against MITRE ATT&CK and CISA KEV — read like a live analyst workstation."
      />
      <TerminalWindow title="threat-intel — correlation feed" liveLabel="Streaming">
        <div className="dsip-scanlines grid divide-white/[.07] lg:grid-cols-3 lg:divide-x">
          <div className="p-5">
            <h3 className="mb-4 font-mono text-[11px] uppercase tracking-wide text-white/45">Tracked threat actors</h3>
            <div className="space-y-3">
              {actors.map((actor) => (
                <div key={actor.name} className="rounded-[8px] border border-white/10 bg-white/[.03] p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white/90">{actor.name}</span>
                    <Tag>{actor.campaigns} campaigns</Tag>
                  </div>
                  <p className="mt-1 text-xs text-white/45">Targeting: {actor.target}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-white/[.07] p-5 lg:border-t-0">
            <h3 className="mb-4 font-mono text-[11px] uppercase tracking-wide text-white/45">CVE &amp; KEV exposure</h3>
            <div className="space-y-3">
              {cves.map((cve) => (
                <div key={cve.id} className="flex items-center justify-between rounded-[8px] border border-white/10 bg-white/[.03] px-3 py-2.5">
                  <div>
                    <p className="font-mono text-xs text-white/85">{cve.id}</p>
                    <p className={cn("text-xs", severityTone[cve.severity])}>{cve.severity} · CVSS {cve.cvss}</p>
                  </div>
                  {cve.kev ? <Tag tone="red">CISA KEV</Tag> : null}
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-white/[.07] p-5 lg:border-t-0">
            <h3 className="mb-4 font-mono text-[11px] uppercase tracking-wide text-white/45">MITRE ATT&amp;CK coverage</h3>
            <div className="flex flex-wrap gap-2">
              {mitre.map((tactic) => (
                <span key={tactic} className="rounded-full border border-signal-indigo/25 bg-signal-indigo/10 px-3 py-1.5 text-xs text-[#b7bdf9]">
                  {tactic}
                </span>
              ))}
            </div>
            <p className="mt-5 text-sm leading-6 text-white/55">
              Observed techniques are automatically mapped to ATT&amp;CK tactics so investigations start with
              context, not raw indicators.
            </p>
          </div>
        </div>
      </TerminalWindow>
    </section>
  );
}
