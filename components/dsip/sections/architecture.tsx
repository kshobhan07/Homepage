"use client";

import React, { useEffect, useState } from "react";
import { Panel, SectionHeading, Tag } from "../primitives/kit";
import { usePrefersReducedMotion } from "../primitives/hooks";
import { cn } from "@/lib/utils";

type Step = { text: string; who: "A" | "M" };
type Phase = { id: string; label: string; steps: Step[] };

const phases: Phase[] = [
  { id: "gather", label: "Gather", steps: [{ text: "Identify risks & scope", who: "A" }, { text: "Define reporting cadence", who: "A" }] },
  { id: "discover", label: "Discover", steps: [{ text: "Configure & scan platform", who: "M" }, { text: "Apply industry risk taxonomy", who: "M" }] },
  { id: "analyze", label: "Analyze", steps: [{ text: "Classify via local LLM", who: "M" }, { text: "Correlate & tune with analyst feedback", who: "A" }] },
  { id: "report", label: "Report", steps: [{ text: "Generate AI threat reports", who: "M" }, { text: "Visualize risk & impact", who: "A" }] },
  { id: "remediate", label: "Remediate", steps: [{ text: "Evaluate probability & impact", who: "A" }, { text: "Act: takedown & re-scan", who: "M" }] },
];

function ProcessFlow() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setActive((a) => (a + 1) % phases.length), 2600);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <Panel className="overflow-hidden !rounded-[20px] p-6 sm:p-8">
      <div className="relative mb-10 hidden items-center justify-between sm:flex">
        <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/10" />
        {!reduced ? (
          <svg viewBox="0 0 1000 4" preserveAspectRatio="none" className="absolute inset-x-0 top-1/2 h-2 w-full -translate-y-1/2 overflow-visible">
            <circle r="4" fill="#22d3ee">
              <animateMotion dur="6s" repeatCount="indefinite" path="M0,2 L1000,2" />
            </circle>
          </svg>
        ) : null}
        {phases.map((phase, i) => (
          <button
            key={phase.id}
            onClick={() => setActive(i)}
            className="relative z-10 flex flex-col items-center gap-2"
          >
            <span
              className={cn(
                "grid h-4 w-4 place-items-center rounded-full border-2 transition-all",
                i === active ? "border-signal-blue bg-signal-blue scale-125" : "border-white/25 bg-[#050b18]",
              )}
            />
            <span className={cn("font-mono text-[11px] uppercase tracking-wide", i === active ? "text-white" : "text-white/40")}>
              {phase.label}
            </span>
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-5">
        {phases.map((phase, i) => (
          <div
            key={phase.id}
            onMouseEnter={() => setActive(i)}
            className={cn(
              "rounded-xl border p-4 transition-colors",
              i === active ? "border-signal-blue/40 bg-signal-blue/[.06]" : "border-white/10 bg-white/[.02]",
            )}
          >
            <p className="mb-3 font-mono text-[10px] uppercase tracking-wide text-white/40 sm:hidden">{phase.label}</p>
            <div className="space-y-2.5">
              {phase.steps.map((step) => (
                <div key={step.text} className="flex items-start gap-2">
                  <span
                    className={cn(
                      "mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-[4px] font-mono text-[9px] font-bold",
                      step.who === "A" ? "bg-signal-indigo/25 text-[#9fc4f5]" : "bg-signal-teal/20 text-signal-teal",
                    )}
                  >
                    {step.who}
                  </span>
                  <p className="text-xs leading-5 text-white/70">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
        <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-wide text-white/35">
          <span className="flex items-center gap-1.5">
            <span className="grid h-4 w-4 place-items-center rounded-[4px] bg-signal-indigo/25 text-[9px] font-bold text-[#9fc4f5]">A</span> Analyst
          </span>
          <span className="flex items-center gap-1.5">
            <span className="grid h-4 w-4 place-items-center rounded-[4px] bg-signal-teal/20 text-[9px] font-bold text-signal-teal">M</span> Machine
          </span>
        </div>
        <Tag tone="blue">Powered on Microsoft Azure</Tag>
      </div>
    </Panel>
  );
}

export function Architecture() {
  return (
    <section id="architecture" className="mx-auto max-w-[1200px] px-5 py-24 sm:px-8">
      <SectionHeading
        index="08"
        align="center"
        kicker="Our Approach"
        tone="blue"
        title="Gather. Discover. Analyze. Report. Remediate."
        description="A twelve-step cycle shared between analyst judgment and machine speed — the same pipeline that runs behind every module above."
      />
      <ProcessFlow />
    </section>
  );
}
