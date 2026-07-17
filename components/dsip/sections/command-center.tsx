"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { Panel, SectionHeading, Tag } from "../primitives/kit";
import { RadialGauge, StatCounter } from "../primitives/stat";
import { cn } from "@/lib/utils";

type Hub = { name: string; x: number; y: number; metric: string; severity: "critical" | "elevated" | "normal" };

const hubs: Hub[] = [
  { name: "New York", x: 21, y: 40, metric: "3 active", severity: "elevated" },
  { name: "London", x: 46, y: 30, metric: "1 critical", severity: "critical" },
  { name: "Frankfurt", x: 50, y: 33, metric: "nominal", severity: "normal" },
  { name: "Mumbai", x: 64, y: 52, metric: "2 active", severity: "elevated" },
  { name: "Singapore", x: 73, y: 62, metric: "nominal", severity: "normal" },
  { name: "Tokyo", x: 84, y: 40, metric: "1 active", severity: "elevated" },
  { name: "Sydney", x: 85, y: 82, metric: "nominal", severity: "normal" },
  { name: "São Paulo", x: 30, y: 78, metric: "nominal", severity: "normal" },
];

const severityColor: Record<Hub["severity"], string> = {
  critical: "#ff4d5e",
  elevated: "#f5a623",
  normal: "#2ee6b8",
};

function GlobalOpsMap() {
  const [active, setActive] = useState<Hub>(hubs[1]);
  const cx = 50;
  const cy = 50;

  return (
    <Panel className="relative overflow-hidden !rounded-[18px] p-0">
      <div className="flex items-center justify-between border-b border-white/[.07] px-5 py-3.5">
        <span className="font-mono text-[11px] uppercase tracking-wide text-white/45">Global operations map</span>
        <Tag tone="teal">42 regions online</Tag>
      </div>
      <div className="relative aspect-[16/10] w-full">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          <defs>
            <radialGradient id="opsGlow" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="rgba(47,111,237,.16)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <rect width="100" height="100" fill="url(#opsGlow)" />
          {[18, 30, 42].map((ry) => (
            <ellipse key={ry} cx={cx} cy={cy} rx={46} ry={ry} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="0.25" />
          ))}
          {[46, 30, 12].map((rx) => (
            <ellipse key={rx} cx={cx} cy={cy} rx={rx} ry={42} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="0.25" />
          ))}
          <ellipse cx={cx} cy={cy} rx={46} ry={42} fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="0.3" />

          {hubs.map((hub) => (
            <line
              key={`edge-${hub.name}`}
              x1={cx}
              y1={cy}
              x2={hub.x}
              y2={hub.y}
              stroke={hub.name === active.name ? severityColor[hub.severity] : "rgba(255,255,255,.1)"}
              strokeWidth={hub.name === active.name ? 0.4 : 0.2}
              className={hub.name === active.name ? "dsip-edge-flow" : undefined}
            />
          ))}

          <circle cx={cx} cy={cy} r={2.2} fill="#2f6fed" />
          <circle cx={cx} cy={cy} r={4} fill="none" stroke="#2f6fed" strokeWidth="0.3" opacity="0.5" />

          {hubs.map((hub) => {
            const isActive = hub.name === active.name;
            return (
              <g key={hub.name} onMouseEnter={() => setActive(hub)} className="cursor-pointer">
                <circle cx={hub.x} cy={hub.y} r={isActive ? 6 : 4} fill={`${severityColor[hub.severity]}18`} />
                <circle
                  cx={hub.x}
                  cy={hub.y}
                  r={isActive ? 1.6 : 1.1}
                  fill={severityColor[hub.severity]}
                  className={hub.severity !== "normal" ? "dsip-pulse" : undefined}
                />
              </g>
            );
          })}
        </svg>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap gap-x-4 gap-y-1 bg-gradient-to-t from-[#05070c] via-[#05070c]/70 to-transparent p-4 pt-10">
          {hubs.map((hub) => (
            <button
              key={hub.name}
              onMouseEnter={() => setActive(hub)}
              className={cn(
                "pointer-events-auto flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide transition",
                hub.name === active.name ? "text-white" : "text-white/35 hover:text-white/60",
              )}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: severityColor[hub.severity] }} />
              {hub.name}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-white/[.07] px-5 py-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wide text-white/35">{active.name}</p>
          <p className="text-sm text-white/75">{active.metric} exposures tracked in region</p>
        </div>
        <Tag tone={active.severity === "critical" ? "red" : active.severity === "elevated" ? "amber" : "teal"}>
          {active.severity}
        </Tag>
      </div>
    </Panel>
  );
}

type Trend = "up" | "down" | "flat";
type Kpi = { label: string; value: number; suffix: string; decimals: number; trend: Trend; trendLabel: string };

const kpis: Kpi[] = [
  { label: "Exposure score", value: 341, suffix: "", decimals: 0, trend: "down", trendLabel: "-58 since remediation" },
  { label: "Assets monitored", value: 24680, suffix: "", decimals: 0, trend: "up", trendLabel: "+1,204 this month" },
  { label: "Active investigations", value: 37, suffix: "", decimals: 0, trend: "flat", trendLabel: "steady week over week" },
  { label: "Critical exposures", value: 12, suffix: "", decimals: 0, trend: "down", trendLabel: "-4 resolved this week" },
  { label: "Mean time to detect", value: 6.4, suffix: "h", decimals: 1, trend: "down", trendLabel: "-1.2h improvement" },
];

const trendIcon = { up: ArrowUpRight, down: ArrowDownRight, flat: Minus } as const;
const trendColor = { up: "text-signal-teal", down: "text-[#7fa6ff]", flat: "text-white/40" } as const;

function InstrumentStrip() {
  return (
    <Panel className="flex flex-col divide-y divide-white/[.06] !rounded-[18px] p-0 sm:flex-row sm:divide-x sm:divide-y-0">
      <div className="flex items-center gap-4 p-5 sm:w-56">
        <RadialGauge value={82} max={100} size={76} stroke={6} color="#2f6fed" label="/100" />
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wide text-white/40">Cyber risk score</p>
          <div className="mt-1 flex items-center gap-1 text-xs text-signal-teal">
            <ArrowUpRight className="h-3.5 w-3.5" /> +6 this quarter
          </div>
        </div>
      </div>
      {kpis.map((kpi) => {
        const Icon = trendIcon[kpi.trend];
        return (
          <div key={kpi.label} className="flex-1 p-5">
            <p className="font-mono text-[10px] uppercase tracking-wide text-white/40">{kpi.label}</p>
            <div className="mt-2 font-display text-2xl font-semibold text-white">
              <StatCounter value={kpi.value} suffix={kpi.suffix} decimals={kpi.decimals} />
            </div>
            <div className={cn("mt-2 flex items-center gap-1 text-[11px]", trendColor[kpi.trend])}>
              <Icon className="h-3 w-3" /> {kpi.trendLabel}
            </div>
          </div>
        );
      })}
    </Panel>
  );
}

export function CommandCenter() {
  return (
    <section id="command-center" className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8">
      <SectionHeading
        index="01"
        kicker="Executive Command Center"
        tone="blue"
        title="One live view of organizational cyber risk, built for the boardroom"
        description="Every module below feeds a single exposure score, refreshed continuously as new signals are correlated across every region."
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="grid gap-4"
      >
        <GlobalOpsMap />
        <InstrumentStrip />
      </motion.div>
    </section>
  );
}
