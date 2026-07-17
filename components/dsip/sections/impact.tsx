"use client";

import React from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Quote, Zap } from "lucide-react";
import { Panel, SectionHeading } from "../primitives/kit";
import { RadialGauge } from "../primitives/stat";

const riskTrend = [
  { day: "Day 1", score: 82 },
  { day: "Day 15", score: 76 },
  { day: "Day 30", score: 64 },
  { day: "Day 45", score: 58 },
  { day: "Day 60", score: 47 },
  { day: "Day 75", score: 36 },
  { day: "Day 90", score: 29 },
];

function ImpactDashboard() {
  return (
    <Panel className="grid overflow-hidden !rounded-[18px] p-0 lg:grid-cols-[1.3fr_1fr]">
      <div className="p-6">
        <p className="font-mono text-[10px] uppercase tracking-wide text-white/40">Exposure score — first 90 days</p>
        <p className="mt-1 font-display text-2xl font-bold text-signal-teal">82 &rarr; 29</p>
        <div className="mt-4 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={riskTrend}>
              <defs>
                <linearGradient id="outcomeScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2ee6b8" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#2ee6b8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,.4)", fontSize: 10 }} axisLine={false} tickLine={false} interval={1} />
              <YAxis hide domain={[0, 100]} />
              <Tooltip contentStyle={{ background: "#0a0e16", border: "1px solid rgba(255,255,255,.1)", borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="score" stroke="#2ee6b8" fill="url(#outcomeScore)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-5 border-t border-white/[.07] p-6 lg:border-l lg:border-t-0">
        <div className="flex items-center gap-4">
          <RadialGauge value={63} size={56} stroke={5} color="#2f6fed" />
          <div>
            <p className="text-sm font-semibold text-white/85">63% faster detection</p>
            <p className="text-xs text-white/45">Mean time to detect exposure</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <RadialGauge value={98} size={56} stroke={5} color="#2ee6b8" />
          <div>
            <p className="text-sm font-semibold text-white/85">98% triaged in 24h</p>
            <p className="text-xs text-white/45">Of all critical findings</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-signal-amber/40 bg-signal-amber/10">
            <span className="flex items-center gap-0.5 font-display text-lg font-extrabold text-signal-amber">
              <Zap className="h-4 w-4" />
              4.2x
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white/85">Faster takedown resolution</p>
            <p className="text-xs text-white/45">Versus a manual process</p>
          </div>
        </div>
      </div>
    </Panel>
  );
}

function ExecutiveQuote() {
  return (
    <Panel className="mx-auto mt-4 flex max-w-3xl items-start gap-4 p-6">
      <Quote className="h-6 w-6 shrink-0 text-white/25" />
      <div>
        <p className="text-base leading-7 text-white/80">
          DSIP gave our security team a single, defensible view of external risk — the kind of report we can
          actually bring to the board without translation.
        </p>
        <div className="mt-4 flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[.06] font-mono text-xs font-bold text-white/70">
            GFS
          </span>
          <div>
            <p className="text-sm font-semibold text-white/85">CISO</p>
            <p className="text-xs text-white/45">Global Financial Services Group</p>
          </div>
        </div>
      </div>
    </Panel>
  );
}

export function Impact() {
  return (
    <section id="impact" className="mx-auto max-w-[1128px] px-5 py-24 sm:px-8">
      <SectionHeading index="14" align="center" kicker="Customer impact" tone="teal" title="What security teams see in the first 90 days" />
      <ImpactDashboard />
      <ExecutiveQuote />
    </section>
  );
}
