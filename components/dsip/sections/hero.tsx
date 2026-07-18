"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  Cloud,
  Globe2,
  Mail,
  Play,
  Server,
  Share2,
  Smartphone,
  Sparkles,
  EyeOff,
} from "lucide-react";
import { Button, Tag } from "../primitives/kit";
import { StatCounter } from "../primitives/stat";
import { usePrefersReducedMotion } from "../primitives/hooks";
import { cn } from "@/lib/utils";

type Source = {
  id: string;
  label: string;
  Icon: typeof Globe2;
  x: number;
  y: number;
  detail: string;
};

const CENTER = 320;

// Precomputed to two decimals (not derived from Math.cos/sin at render time) so
// server- and client-rendered SVG coordinates always serialize identically.
const sources: Source[] = [
  { id: "internet", label: "Internet", Icon: Globe2, x: 320, y: 70, detail: "Domains, subdomains, IPs and certificates discovered continuously across the open internet." },
  { id: "cloud", label: "Cloud", Icon: Cloud, x: 497, y: 143, detail: "Cloud storage, misconfigured buckets and exposed services across every provider." },
  { id: "social", label: "Social Media", Icon: Share2, x: 570, y: 320, detail: "Impersonation, fake affiliations and executive imposters across every platform." },
  { id: "darkweb", label: "Dark Web", Icon: EyeOff, x: 497, y: 497, detail: "Forums, marketplaces, Telegram and paste sites monitored for leaked data." },
  { id: "email", label: "Email", Icon: Mail, x: 320, y: 570, detail: "Misconfigurations, spoofing risk and phishing infrastructure targeting your domain." },
  { id: "mobile", label: "Mobile", Icon: Smartphone, x: 143, y: 497, detail: "Rogue and cloned mobile applications distributed outside official app stores." },
  { id: "infra", label: "Infrastructure", Icon: Server, x: 70, y: 320, detail: "Open ports, login panels and infrastructure vulnerabilities, scored by exploitability." },
  { id: "ai", label: "AI Systems", Icon: BrainCircuit, x: 143, y: 143, detail: "Shadow AI, model exposure and prompt-leakage across every business unit." },
];

function IntelligenceEngine() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState<Source>(sources[0]);

  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[85%] w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] opacity-70 blur-3xl"
        style={{ background: "radial-gradient(ellipse at center, rgba(34,211,238,.28), rgba(30,111,235,.16) 45%, transparent 72%)" }}
      />
      <div className="relative aspect-square w-full">
        <div
          className="dsip-radar-sweep pointer-events-none absolute inset-[6%] rounded-full opacity-70"
          style={{
            background: "conic-gradient(from 0deg, rgba(30,111,235,.22), transparent 26%, transparent 100%)",
            maskImage: "radial-gradient(circle, black 55%, transparent 78%)",
            WebkitMaskImage: "radial-gradient(circle, black 55%, transparent 78%)",
          }}
        />
        <svg viewBox="0 0 640 640" className="absolute inset-0 h-full w-full overflow-visible">
          <circle cx={CENTER} cy={CENTER} r={252} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="1" />
          <circle cx={CENTER} cy={CENTER} r={190} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="1" />

          {!reduced &&
            [0, 1, 2].map((i) => (
              <circle
                key={`sonar-${i}`}
                cx={CENTER}
                cy={CENTER}
                r={92}
                fill="none"
                stroke="#22d3ee"
                strokeWidth="1.5"
                className="dsip-sonar-ring"
                style={{ animationDelay: `${i * 1.1}s` }}
              />
            ))}

          {sources.map((s) => {
            const isActive = s.id === active.id;
            return (
              <line
                key={`line-${s.id}`}
                x1={s.x}
                y1={s.y}
                x2={CENTER}
                y2={CENTER}
                stroke={isActive ? "#22d3ee" : "rgba(255,255,255,.14)"}
                strokeWidth={isActive ? 1.6 : 1}
                className={isActive ? "dsip-edge-flow" : undefined}
              />
            );
          })}

          {!reduced &&
            sources.map((s) => (
              <circle key={`p-${s.id}`} r="3" fill="#22d3ee">
                <animateMotion
                  dur="2.8s"
                  begin={`${sources.indexOf(s) * 0.35}s`}
                  repeatCount="indefinite"
                  path={`M${s.x},${s.y} L${CENTER},${CENTER}`}
                />
              </circle>
            ))}

          <circle cx={CENTER} cy={CENTER} r={92} fill="#050b18" stroke="#1e6feb" strokeWidth="1.5" />
          <circle cx={CENTER} cy={CENTER} r={92} fill="rgba(30,111,235,.12)" />
          <foreignObject x={CENTER - 88} y={CENTER - 88} width={176} height={176}>
            <div className="flex h-full w-full flex-col items-center justify-center text-center">
              <span className="font-display text-2xl font-extrabold tracking-tight text-white">DSIP</span>
              <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.1em] text-white/50">
                Insights Core
              </span>
            </div>
          </foreignObject>

          {sources.map((s) => {
            const isActive = s.id === active.id;
            const Icon = s.Icon;
            return (
              <foreignObject
                key={s.id}
                x={s.x - 54}
                y={s.y - 26}
                width={108}
                height={52}
                style={{ overflow: "visible" }}
              >
                <button
                  onMouseEnter={() => setActive(s)}
                  onFocus={() => setActive(s)}
                  className={cn(
                    "mx-auto flex w-fit flex-col items-center gap-1.5 rounded-xl border px-3 py-2 backdrop-blur-sm transition",
                    isActive
                      ? "border-signal-teal/50 bg-[#0a1428]/95 shadow-[0_0_24px_rgba(34,211,238,.25)]"
                      : "border-white/10 bg-[#0a1428]/85 hover:border-white/25",
                  )}
                >
                  <Icon className={cn("h-4 w-4", isActive ? "text-signal-teal" : "text-white/60")} />
                  <span className="whitespace-nowrap font-mono text-[9.5px] uppercase tracking-wide text-white/70">
                    {s.label}
                  </span>
                </button>
              </foreignObject>
            );
          })}
        </svg>
      </div>

      <motion.div
        key={active.id}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mx-auto mt-2 max-w-sm rounded-xl border border-white/10 bg-white/[.03] px-4 py-3 text-center backdrop-blur-sm"
      >
        <p className="font-mono text-[10px] uppercase tracking-wide text-signal-teal">{active.label}</p>
        <p className="mt-1 text-xs leading-5 text-white/55">{active.detail}</p>
      </motion.div>
    </div>
  );
}

const stats = [
  { value: 5, decimals: 0, prefix: "", suffix: "M", label: "Domains scanned daily" },
  { value: 180, decimals: 0, prefix: "", suffix: "K+", label: "Threats reported" },
  { value: 800, decimals: 0, prefix: "", suffix: "+", label: "Executives protected" },
  { value: 225, decimals: 0, prefix: "", suffix: "+", label: "Brands monitored" },
  { value: 45, decimals: 0, prefix: "", suffix: "K+", label: "Threats taken down / 24h" },
  { value: 95, decimals: 0, prefix: "", suffix: "%", label: "Phishing sites down in 8-16h" },
];

function StatStrip() {
  return (
    <div className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-6">
      {stats.map((s) => (
        <div key={s.label} className="bg-[#050b18] px-4 py-6 text-center">
          <p className="font-display text-3xl font-bold text-white">
            <StatCounter value={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
          </p>
          <p className="mt-1.5 font-mono text-[10px] uppercase leading-tight tracking-wide text-white/40">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden px-5 pb-20 pt-40 text-center sm:pt-48">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_40%_at_50%_8%,rgba(30,111,235,.18),transparent)]" />

      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-10 flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[.03] py-1.5 pl-1.5 pr-4"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[10px] font-black tracking-tight text-kpmg">
          KPMG
        </span>
        <span className="h-3 w-px bg-white/15" />
        <span className="font-mono text-xs tracking-wide text-white/60">External Attack Surface · Brand Protection · Threat Intelligence</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.06 }}
        className="mx-auto max-w-5xl text-balance font-display text-[3.4rem] font-extrabold uppercase leading-[0.96] tracking-tight text-white sm:text-7xl lg:text-8xl"
      >
        Digital Signals
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-signal-blue via-white to-signal-teal">
          Insights Platform
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.14 }}
        className="mx-auto mt-6 max-w-2xl text-balance font-display text-2xl font-semibold text-white/90 sm:text-3xl"
      >
        Complete 360° protection against digital threats.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-5 flex justify-center"
      >
        <Tag tone="teal">
          <Sparkles className="mr-1 h-3 w-3" /> Powered by Gen AI
        </Tag>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.26 }}
        className="mx-auto mt-6 max-w-xl text-[15px] leading-7 text-white/55"
      >
        One AI-native platform unifying attack surface management, brand protection, threat intelligence and
        dark web monitoring — so nothing about your digital footprint stays unknown.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.32 }}
        className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
      >
        <Button size="lg">
          Request platform demo <ArrowRight className="h-4 w-4" />
        </Button>
        <Button size="lg" variant="secondary">
          <Play className="h-3.5 w-3.5" />
          See it in action
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mt-16"
      >
        <IntelligenceEngine />
        <div className="mx-auto mt-10 grid max-w-xl grid-cols-3 gap-4 font-mono text-[11px] uppercase tracking-wide text-white/45">
          <span>One Platform</span>
          <span className="text-signal-teal">Complete Visibility</span>
          <span>AI-Powered Intelligence</span>
        </div>
      </motion.div>

      <StatStrip />
    </section>
  );
}
