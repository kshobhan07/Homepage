"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Radar, ShieldCheck } from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Button, PulseDot, Tag } from "../primitives/kit";
import { TerminalWindow } from "../primitives/terminal";
import { usePrefersReducedMotion } from "../primitives/hooks";
import { cn } from "@/lib/utils";

const bootLines = [
  "$ dsip --init --org=acme-corp",
  "> connecting 42 global sensor regions...",
  "> correlating threat intelligence, brand, dark web, cloud...",
  "> 12,480 signals online. exposure score computed.",
  "> core ready.",
];

function BootSequence() {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(reduced ? bootLines.length : 0);

  useEffect(() => {
    if (reduced) return;
    if (visible >= bootLines.length) return;
    const delay = visible === 0 ? 300 : 420;
    const id = setTimeout(() => setVisible((v) => v + 1), delay);
    return () => clearTimeout(id);
  }, [visible, reduced]);

  return (
    <TerminalWindow title="dsip-core — bootstrap" liveLabel="Booting" className="mx-auto max-w-md text-left">
      <div className="space-y-1.5 px-4 py-4 font-mono text-[12px] leading-relaxed">
        {bootLines.slice(0, visible).map((line, i) => (
          <p
            key={line}
            className={cn(
              i === 0 ? "text-white/60" : "text-signal-teal/80",
              i === visible - 1 && visible < bootLines.length ? "dsip-caret" : "",
            )}
          >
            {line}
          </p>
        ))}
      </div>
    </TerminalWindow>
  );
}

const orbitModules = ["ASM", "AI-ASM", "Threat Intel", "Dark Web", "Brand", "VIP", "TPRM", "Copilot"];

function CoreOrbit() {
  return (
    <div className="relative grid h-full min-h-[320px] place-items-center overflow-hidden p-6">
      <div className="dsip-radar-sweep pointer-events-none absolute h-[340px] w-[340px] rounded-full" style={{
        background: "conic-gradient(from 0deg, rgba(47,111,237,.22), transparent 26%, transparent 100%)",
        maskImage: "radial-gradient(circle, black 55%, transparent 76%)",
        WebkitMaskImage: "radial-gradient(circle, black 55%, transparent 76%)",
      }} />
      <div className="relative h-72 w-72 rounded-full border border-white/10">
        <div className="absolute inset-6 rounded-full border border-dashed border-white/10" />
        <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal-blue/40 bg-signal-blue/10">
          <div className="flex h-full w-full flex-col items-center justify-center text-center">
            <span className="font-display text-xs font-bold tracking-tight text-white">DSIP</span>
            <span className="font-mono text-[8px] uppercase text-white/40">core</span>
          </div>
        </div>
        {orbitModules.map((item, index) => (
          <motion.div
            key={item}
            className="absolute rounded-full border border-white/10 bg-[#0a0e16]/90 px-2.5 py-1 font-mono text-[10px] font-medium text-white/80"
            style={{
              left: `${50 + Math.cos((index / orbitModules.length) * Math.PI * 2) * 46}%`,
              top: `${50 + Math.sin((index / orbitModules.length) * Math.PI * 2) * 46}%`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: index * 0.25, ease: "easeInOut" }}
          >
            {item}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const liveEvents = [
  { label: "Credential leak tied to finance tenant", tone: "red" as const },
  { label: "Rogue mobile app impersonating brand", tone: "amber" as const },
  { label: "New cloud bucket exposed to internet", tone: "blue" as const },
];

const sparkline = [
  { t: 0, v: 62 }, { t: 1, v: 58 }, { t: 2, v: 66 }, { t: 3, v: 51 }, { t: 4, v: 44 }, { t: 5, v: 38 }, { t: 6, v: 29 },
];

function LivePreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="dsip-panel mx-auto mt-16 max-w-6xl overflow-hidden !rounded-[20px]"
    >
      <div className="flex items-center justify-between border-b border-white/[.07] bg-white/[.02] px-5 py-3.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-signal-red/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-signal-amber/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-signal-teal/70" />
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-white/45">
          <PulseDot tone="teal" />
          Digital Signals Command Center — live session
        </div>
      </div>
      <div className="grid lg:grid-cols-[1.1fr_.9fr]">
        <div className="border-b border-white/[.07] lg:border-b-0 lg:border-r">
          <CoreOrbit />
        </div>
        <div className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wide text-white/40">Risk posture</p>
              <h3 className="font-display text-2xl font-semibold text-white">1,284 signals prioritized</h3>
            </div>
          </div>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparkline}>
                <defs>
                  <linearGradient id="heroSpark" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2f6fed" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#2f6fed" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip
                  contentStyle={{ background: "#0a0e16", border: "1px solid rgba(255,255,255,.1)", borderRadius: 8, fontSize: 12 }}
                  labelFormatter={() => "Exposure"}
                />
                <Area type="monotone" dataKey="v" stroke="#2f6fed" fill="url(#heroSpark)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2.5">
            {liveEvents.map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-3 rounded-[8px] border border-white/[.07] bg-white/[.03] px-3.5 py-2.5">
                <span className="text-sm text-white/75">{item.label}</span>
                <Tag tone={item.tone}>{item.tone === "red" ? "P1" : item.tone === "amber" ? "P2" : "P3"}</Tag>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FloatingTelemetry() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 hidden lg:block" aria-hidden>
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.9 }}
        className="animate-signal-drift absolute left-[4%] top-[18%] flex items-center gap-2 rounded-full border border-signal-red/25 bg-[#0a0e16]/90 px-3 py-2 font-mono text-[11px] text-white/80"
      >
        <PulseDot tone="red" /> Live attack indicator
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 1.1 }}
        className="animate-signal-drift absolute right-[4%] top-[10%] flex items-center gap-2 rounded-full border border-signal-indigo/25 bg-[#0a0e16]/90 px-3 py-2 font-mono text-[11px] text-white/80"
        style={{ animationDelay: "1.4s" }}
      >
        <Bot className="h-3.5 w-3.5 text-signal-indigo" /> Intellicore AI is watching
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 1.3 }}
        className="animate-signal-drift absolute bottom-[6%] left-[8%] flex items-center gap-2 rounded-full border border-signal-teal/25 bg-[#0a0e16]/90 px-3 py-2 font-mono text-[11px] text-white/80"
        style={{ animationDelay: "2.1s" }}
      >
        <ShieldCheck className="h-3.5 w-3.5 text-signal-teal" /> 4 exposures remediated today
      </motion.div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden px-5 pb-24 pt-40 text-center sm:pt-48">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_38%_at_50%_10%,rgba(47,111,237,.16),transparent)]" />

      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-8 flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[.03] py-1.5 pl-1.5 pr-4"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[10px] font-black tracking-tight text-kpmg">
          KPMG
        </span>
        <span className="h-3 w-px bg-white/15" />
        <span className="font-mono text-xs tracking-wide text-white/60">Digital Signals Intelligence Platform</span>
      </motion.div>

      <div className="mb-10 flex justify-center">
        <BootSequence />
      </div>

      <div className="relative">
        <FloatingTelemetry />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto max-w-5xl text-balance font-display text-5xl font-semibold leading-[1.03] tracking-tight text-white sm:text-7xl lg:text-[5.5rem]"
        >
          See every signal.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-signal-blue via-white to-signal-teal">
            Stop every breach.
          </span>
        </motion.h1>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/58"
      >
        DSIP continuously discovers your digital footprint, correlates threat intelligence into business context,
        and prioritizes what actually matters — from one AI-native command center.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
      >
        <Button size="lg">
          Request platform demo <ArrowRight className="h-4 w-4" />
        </Button>
        <Button size="lg" variant="secondary">
          <Radar className="h-4 w-4" />
          Explore modules
        </Button>
      </motion.div>

      <LivePreview />
    </section>
  );
}
