"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Flag,
  ListChecks,
  Loader2,
  Route,
  ScrollText,
  Search,
  Sparkles,
} from "lucide-react";
import { Panel, SectionHeading, Tag } from "../primitives/kit";
import { GraphEdge, GraphNode, GraphSurface } from "../primitives/graph";
import { NeuralField } from "../primitives/section-backgrounds";
import { usePrefersReducedMotion } from "../primitives/hooks";
import { cn } from "@/lib/utils";

/* ---------------------------- Threat summarization ---------------------------- */

const summarySteps = [
  "Scanning correlated signals across ASM, dark web and identity telemetry",
  "Cross-referencing knowledge base for privileged account paths",
  "Scoring confidence from source reputation and corroboration",
];
const summaryResponse = [
  "Priority risk is a credential leak affecting two privileged accounts connected to a newly exposed VPN endpoint.",
  "Recommended actions: rotate credentials, disable stale access, validate MFA enforcement, and open a takedown case for related phishing infrastructure.",
  "Confidence: 92% based on source reputation, asset criticality and corroborated dark web sightings.",
];

function ThreatSummarization() {
  const [stepsDone, setStepsDone] = useState(0);
  const [showResponse, setShowResponse] = useState(false);

  useEffect(() => {
    setStepsDone(0);
    setShowResponse(false);
    const timers: number[] = [];
    summarySteps.forEach((_, i) => timers.push(window.setTimeout(() => setStepsDone(i + 1), 420 * (i + 1))));
    timers.push(window.setTimeout(() => setShowResponse(true), 420 * summarySteps.length + 380));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="p-6">
      <p className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide text-white/40">
        <Sparkles className="h-3.5 w-3.5 text-signal-indigo" /> Weekly exposure summary
      </p>
      <div className="mb-4 space-y-2">
        {summarySteps.map((step, i) => {
          if (stepsDone < i) return null;
          const done = stepsDone > i;
          return (
            <motion.div key={step} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 font-mono text-xs text-white/45">
              {done ? <Check className="h-3.5 w-3.5 shrink-0 text-signal-teal" /> : <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-signal-indigo" />}
              <span className={stepsDone === i ? "text-white/70" : undefined}>{step}</span>
            </motion.div>
          );
        })}
      </div>
      <AnimatePresence>
        {showResponse ? (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3 rounded-xl border border-white/10 bg-white/[.03] p-4 text-sm leading-6 text-white/72">
            {summaryResponse.map((line, i) => (
              <p key={i} className={i === summaryResponse.length - 1 ? "text-signal-teal" : undefined}>{line}</p>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/* ---------------------------- Attack path analysis ---------------------------- */

const chain = [
  { id: "n1", label: "Exposed VPN endpoint", stage: "Initial access", x: 60, y: 130, color: "#1e6feb" },
  { id: "n2", label: "Leaked credential match", stage: "Credential access", x: 300, y: 50, color: "#f2a93b" },
  { id: "n3", label: "Stale admin account", stage: "Credential access", x: 300, y: 210, color: "#f2a93b" },
  { id: "n4", label: "Lateral movement — finance VLAN", stage: "Lateral movement", x: 540, y: 130, color: "#1552c4" },
  { id: "n5", label: "Critical asset: billing database", stage: "Impact", x: 780, y: 130, color: "#e23a4e" },
] as const;
const chainEdges: [string, string][] = [["n1", "n2"], ["n1", "n3"], ["n2", "n4"], ["n3", "n4"], ["n4", "n5"]];
const chainOrder = ["n1", "n2", "n3", "n4", "n5"];

function AttackPathAnalysis() {
  const reduced = usePrefersReducedMotion();
  const [step, setStep] = useState(chainOrder.length);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setStep((s) => (s >= chainOrder.length ? 0 : s + 1)), 1000);
    return () => clearInterval(id);
  }, [reduced]);

  const lit = new Set(chainOrder.slice(0, step));
  const currentStage = step > 0 && step <= chainOrder.length ? chain.find((c) => c.id === chainOrder[step - 1])?.stage : null;

  return (
    <div>
      <div className="flex items-center justify-between px-6 pt-6">
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide text-white/40">
          <Route className="h-3.5 w-3.5 text-signal-indigo" /> Tracing route from exposure to critical asset
        </p>
        <Tag tone="red">{currentStage ?? "Replaying"}</Tag>
      </div>
      <div className="h-[260px]">
        <GraphSurface viewBox="0 0 860 260">
          {chainEdges.map(([from, to]) => {
            const a = chain.find((c) => c.id === from)!;
            const b = chain.find((c) => c.id === to)!;
            const isLit = lit.has(from) && lit.has(to);
            return (
              <GraphEdge key={`${from}-${to}`} x1={a.x + 84} y1={a.y} x2={b.x - 84} y2={b.y} color={isLit ? b.color : "rgba(255,255,255,.12)"} animated={isLit} width={isLit ? 2 : 1.2} />
            );
          })}
          {chain.map((node) => {
            const isLit = lit.has(node.id);
            return (
              <GraphNode key={node.id} x={node.x} y={node.y} width={168} height={52} color={isLit ? node.color : "rgba(255,255,255,.18)"} critical={node.id === "n5" && isLit}>
                <span className="font-mono text-[10.5px] leading-tight text-white/90">{node.label}</span>
                <span className="mt-0.5 font-mono text-[9px] uppercase tracking-wide text-white/35">{node.stage}</span>
              </GraphNode>
            );
          })}
        </GraphSurface>
      </div>
    </div>
  );
}

/* ---------------------------- Natural language search ---------------------------- */

const searchResults = [
  { asset: "portal.acme-corp.com", category: "Domain", risk: "Critical" },
  { asset: "s3://acme-marketing-assets", category: "Cloud", risk: "High" },
  { asset: "billing.acme-corp.com", category: "Domain", risk: "High" },
  { asset: "203.0.113.44", category: "IP address", risk: "Medium" },
];
const searchRisk: Record<string, string> = { Critical: "#e23a4e", High: "#f2a93b", Medium: "#1e6feb" };

function NaturalLanguageSearch() {
  return (
    <div className="p-6">
      <p className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide text-white/40">
        <Search className="h-3.5 w-3.5 text-signal-indigo" /> Query
      </p>
      <div className="mb-5 rounded-xl border border-white/10 bg-white/[.04] px-4 py-3 text-sm text-white/80">
        &ldquo;Show every critical exposure tied to a customer-facing domain&rdquo;
      </div>
      <div className="space-y-2">
        {searchResults.map((r, i) => (
          <motion.div
            key={r.asset}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="flex items-center justify-between gap-3 rounded-lg border border-white/[.07] bg-white/[.02] px-3.5 py-2.5"
          >
            <div className="min-w-0">
              <p className="truncate font-mono text-xs text-white/85">{r.asset}</p>
              <p className="font-mono text-[9.5px] uppercase tracking-wide text-white/35">{r.category}</p>
            </div>
            <span
              className="shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[10px]"
              style={{ borderColor: `${searchRisk[r.risk]}4d`, background: `${searchRisk[r.risk]}18`, color: searchRisk[r.risk] }}
            >
              {r.risk}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------- Auto flagging & severity ---------------------------- */

type FlagRow = { id: string; text: string; outcome: "flagged" | "dismissed"; severity?: "P1" | "P2" };
const flagRows: FlagRow[] = [
  { id: "f1", text: "New login from unrecognized IP — Singapore", outcome: "flagged", severity: "P2" },
  { id: "f2", text: "Certificate renewal completed for *.acme-corp.com", outcome: "dismissed" },
  { id: "f3", text: "Unusual outbound traffic volume — finance VLAN", outcome: "flagged", severity: "P1" },
  { id: "f4", text: "Marketing newsletter domain registered by partner", outcome: "dismissed" },
  { id: "f5", text: "Credential pattern match on paste site", outcome: "flagged", severity: "P1" },
];

function AutoFlagging() {
  const [resolved, setResolved] = useState<Set<string>>(new Set());

  useEffect(() => {
    const timers = flagRows.map((row, i) => window.setTimeout(() => setResolved((s) => new Set(s).add(row.id)), 500 + i * 480));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="p-6">
      <p className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide text-white/40">
        <Flag className="h-3.5 w-3.5 text-signal-indigo" /> Auto-triage queue
      </p>
      <div className="space-y-2">
        {flagRows.map((row) => {
          const done = resolved.has(row.id);
          return (
            <div key={row.id} className="flex items-center justify-between gap-3 rounded-lg border border-white/[.07] bg-white/[.02] px-3.5 py-2.5">
              <span className="text-sm text-white/78">{row.text}</span>
              {done ? (
                row.outcome === "flagged" ? (
                  <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-signal-red/30 bg-signal-red/10 px-2.5 py-0.5 font-mono text-[10px] text-signal-red">
                    Flagged · {row.severity}
                  </span>
                ) : (
                  <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-signal-teal/30 bg-signal-teal/10 px-2.5 py-0.5 font-mono text-[10px] text-signal-teal">
                    <Check className="h-3 w-3" /> False positive
                  </span>
                )
              ) : (
                <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/[.03] px-2.5 py-0.5 font-mono text-[10px] text-white/40">
                  <Loader2 className="h-3 w-3 animate-spin" /> Analyzing
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------- Recommendations ---------------------------- */

const recommendations = [
  { priority: "P1", text: "Rotate credentials for the two privileged accounts tied to the exposed VPN endpoint.", tone: "red" as const },
  { priority: "P1", text: "Disable the stale admin account discovered during lateral-movement analysis.", tone: "red" as const },
  { priority: "P2", text: "Enforce MFA on the newly discovered admin panel before the next change window.", tone: "amber" as const },
  { priority: "P3", text: "Renew the two TLS certificates expiring within 14 days.", tone: "blue" as const },
];

function Recommendations() {
  return (
    <div className="p-6">
      <p className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide text-white/40">
        <ListChecks className="h-3.5 w-3.5 text-signal-indigo" /> Recommended actions
      </p>
      <div className="space-y-2.5">
        {recommendations.map((r) => (
          <div key={r.text} className="flex items-start gap-3 rounded-lg border border-white/[.07] bg-white/[.02] px-3.5 py-3">
            <Tag tone={r.tone} className="mt-0.5 shrink-0">{r.priority}</Tag>
            <p className="text-sm leading-6 text-white/78">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------- Section shell ---------------------------- */

const steps = [
  { id: "search", label: "Natural language search", Icon: Search },
  { id: "summary", label: "Threat summarization", Icon: ScrollText },
  { id: "attackpath", label: "Attack path analysis", Icon: Route },
  { id: "autoflag", label: "Auto flagging & severity", Icon: Flag },
  { id: "recommend", label: "Recommendations", Icon: ListChecks },
] as const;

export function Intellicore() {
  const [active, setActive] = useState<(typeof steps)[number]["id"]>("search");

  return (
    <section id="intellicore" className="relative mx-auto max-w-[1200px] overflow-hidden px-5 py-24 sm:px-8">
      <NeuralField />
      <SectionHeading
        index="03"
        align="center"
        kicker="Intellicore AI"
        tone="indigo"
        title="Watch an AI analyst investigate, in real time"
        description="Intellicore reasons across every signal DSIP collects — searching in plain language, tracing attack paths, summarizing exposure, triaging noise and recommending what to do next."
      />
      <div className="relative mx-auto mb-14 flex max-w-3xl items-start justify-between">
        <div className="absolute left-0 right-0 top-[15px] h-px bg-white/10" />
        <motion.div
          className="absolute top-[15px] h-px bg-gradient-to-r from-signal-indigo to-signal-teal"
          initial={false}
          animate={{
            left: `${(steps.findIndex((s) => s.id === active) / (steps.length - 1)) * 6}%`,
            width: `${(steps.findIndex((s) => s.id === active) / (steps.length - 1)) * 94 + 3}%`,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
        />
        {steps.map((step, i) => {
          const isActive = active === step.id;
          const isPast = i < steps.findIndex((s) => s.id === active);
          return (
            <button
              key={step.id}
              onClick={() => setActive(step.id)}
              className="group relative z-10 flex flex-1 flex-col items-center gap-3 text-center"
            >
              <motion.span
                animate={{ scale: isActive ? 1.3 : 1 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className={cn(
                  "grid h-[30px] w-[30px] place-items-center rounded-full border-2 backdrop-blur-sm transition-colors",
                  isActive
                    ? "border-signal-indigo bg-signal-indigo/20 text-signal-indigo shadow-[0_0_24px_rgba(110,124,246,.5)]"
                    : isPast
                      ? "border-signal-teal/50 bg-signal-teal/10 text-signal-teal"
                      : "border-white/15 bg-[#050b18] text-white/30 group-hover:border-white/30",
                )}
              >
                <step.Icon className="h-3.5 w-3.5" />
              </motion.span>
              <span className={cn("hidden max-w-[110px] font-mono text-[9.5px] uppercase leading-tight tracking-wide sm:block", isActive ? "text-white" : "text-white/35")}>
                {step.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="relative mx-auto max-w-3xl">
        <div className="pointer-events-none absolute -inset-x-6 -inset-y-6 rounded-[32px] bg-signal-indigo/[.04] blur-2xl" aria-hidden />
        <Panel className="relative overflow-hidden !rounded-[24px] p-0">
          <div className="relative min-h-[380px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                {active === "search" ? <NaturalLanguageSearch /> : null}
                {active === "summary" ? <ThreatSummarization /> : null}
                {active === "attackpath" ? <AttackPathAnalysis /> : null}
                {active === "autoflag" ? <AutoFlagging /> : null}
                {active === "recommend" ? <Recommendations /> : null}
              </motion.div>
            </AnimatePresence>
          </div>
        </Panel>
      </div>
    </section>
  );
}
