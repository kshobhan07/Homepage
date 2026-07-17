"use client";

import React, { useState } from "react";
import { Panel, SectionHeading } from "../primitives/kit";
import { RadialGauge } from "../primitives/stat";
import { cn } from "@/lib/utils";

const shadowAssets = [
  { name: "Marketing copy assistant", risk: 82, x: 30, y: 28 },
  { name: "Support chat widget", risk: 91, x: 68, y: 20 },
  { name: "Internal model endpoint", risk: 96, x: 52, y: 55 },
  { name: "Sales note-taker", risk: 44, x: 20, y: 62 },
  { name: "Code review bot", risk: 58, x: 78, y: 60 },
  { name: "Recruiting screener", risk: 35, x: 40, y: 82 },
  { name: "Analytics copilot", risk: 27, x: 65, y: 85 },
];

const riskColor = (risk: number) => (risk >= 80 ? "#ff4d5e" : risk >= 50 ? "#f5a623" : "#2ee6b8");

function ShadowAIRadar() {
  const [active, setActive] = useState(shadowAssets[2]);
  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
      <div className="relative mx-auto aspect-square w-full max-w-md">
        <div
          className="dsip-radar-sweep pointer-events-none absolute inset-0 rounded-full"
          style={{
            background: "conic-gradient(from 0deg, rgba(110,124,246,.24), transparent 26%, transparent 100%)",
            maskImage: "radial-gradient(circle, black 58%, transparent 78%)",
            WebkitMaskImage: "radial-gradient(circle, black 58%, transparent 78%)",
          }}
        />
        <div className="absolute inset-0 rounded-full border border-white/10" />
        <div className="absolute inset-[16%] rounded-full border border-white/[.06]" />
        <div className="absolute inset-[32%] rounded-full border border-white/[.06]" />
        {shadowAssets.map((asset) => {
          const isActive = asset.name === active.name;
          return (
            <button
              key={asset.name}
              onMouseEnter={() => setActive(asset)}
              onFocus={() => setActive(asset)}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition"
              style={{ left: `${asset.x}%`, top: `${asset.y}%` }}
              aria-label={asset.name}
            >
              <span
                className={cn("dsip-pulse block rounded-full", isActive ? "h-4 w-4" : "h-2.5 w-2.5")}
                style={{ background: riskColor(asset.risk) }}
              />
            </button>
          );
        })}
      </div>
      <Panel className="p-5">
        <p className="font-mono text-[10px] uppercase tracking-wide text-white/40">Selected asset</p>
        <h3 className="mt-1 font-display text-lg font-semibold text-white">{active.name}</h3>
        <div className="mt-4 flex items-center gap-4">
          <RadialGauge value={active.risk} size={72} stroke={6} color={riskColor(active.risk)} label="risk" />
          <p className="text-sm leading-6 text-white/55">
            {active.risk >= 80
              ? "Unowned, internet-reachable, and handling sensitive input. Prioritize this week."
              : active.risk >= 50
                ? "Partially governed — flag for the next ownership review."
                : "Low exposure, monitored, acceptable for now."}
          </p>
        </div>
      </Panel>
    </div>
  );
}

export function AIAttackSurface() {
  return (
    <section id="ai-asm" className="mx-auto max-w-[1128px] px-5 py-24 sm:px-8">
      <SectionHeading
        index="03"
        align="center"
        kicker="AI Attack Surface Management"
        tone="indigo"
        title="Find the AI your organization doesn't know it's running"
        description="142 shadow AI applications discovered this quarter. Hover any point to see what DSIP found."
      />
      <ShadowAIRadar />
    </section>
  );
}
