"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, Loader2, Search, Sparkles, User } from "lucide-react";
import { Panel, SectionHeading } from "../primitives/kit";
import { cn } from "@/lib/utils";

const prompts = [
  {
    label: "Answer with evidence",
    steps: ["Scanning correlated signals across ASM, dark web and identity telemetry", "Cross-referencing knowledge graph for privileged account paths", "Scoring confidence from source reputation and corroboration"],
    response: [
      "Priority risk is a credential leak affecting two privileged accounts connected to a newly exposed VPN endpoint.",
      "Recommended actions: rotate credentials, disable stale access, validate MFA enforcement, and open a takedown case for related phishing infrastructure.",
      "Confidence: 92% based on source reputation, asset criticality and corroborated dark web sightings.",
    ],
  },
  {
    label: "Create takedown case",
    steps: ["Fingerprinting spoofed domain infrastructure", "Assembling WHOIS, hosting and screenshot evidence", "Filing case with registrar abuse workflow"],
    response: [
      "Drafted takedown case DSIP-4821 for a spoofed careers portal impersonating the brand across three regions.",
      "Evidence bundle attached: WHOIS registration, hosting provider, screenshot capture and phishing kit fingerprint.",
      "Estimated resolution: 3-5 business days once registrar abuse desk confirms receipt.",
    ],
  },
  {
    label: "Draft CISO brief",
    steps: ["Pulling this week's exposure delta", "Summarizing remediated vs. open critical findings", "Formatting board-ready narrative"],
    response: [
      "Weekly brief drafted: exposure trending down 12%, two critical findings remediated, one active credential leak in review.",
      "Top recommendation: enforce MFA on the newly discovered admin panel before Friday's change window.",
      "Confidence: 88% — pending confirmation from the identity team.",
    ],
  },
  {
    label: "Re-run enrichment",
    steps: ["Re-scoring 6,204 assets against latest threat feeds", "Rebuilding relationships in the knowledge graph", "Validating certificate and DNS changes"],
    response: [
      "Enrichment re-run across 6,204 assets. 18 new relationships added to the knowledge graph.",
      "Three previously unscored subdomains now carry a critical exposure rating due to expired certificates.",
      "Confidence: 95% — enrichment sources fully corroborated.",
    ],
  },
] as const;

function ChatTranscript({ index }: { index: number }) {
  const current = prompts[index];
  const [stepsDone, setStepsDone] = useState(0);
  const [showResponse, setShowResponse] = useState(false);

  useEffect(() => {
    setStepsDone(0);
    setShowResponse(false);
    const timers: number[] = [];
    current.steps.forEach((_, i) => {
      timers.push(window.setTimeout(() => setStepsDone(i + 1), 420 * (i + 1)));
    });
    timers.push(window.setTimeout(() => setShowResponse(true), 420 * current.steps.length + 380));
    return () => timers.forEach(clearTimeout);
  }, [current]);

  return (
    <div className="flex h-full flex-col p-6">
      <div className="mb-5 flex items-start gap-3">
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[.05]">
          <User className="h-3.5 w-3.5 text-white/60" />
        </div>
        <div className="rounded-2xl rounded-tl-sm border border-white/10 bg-white/[.04] px-4 py-2.5 text-sm text-white/85">
          {current.label}
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-signal-indigo/30 bg-signal-indigo/10">
          <Sparkles className="h-3.5 w-3.5 text-signal-indigo" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="mb-2.5 font-mono text-[11px] uppercase tracking-wide text-white/35">Intellicore AI</p>
          <div className="mb-3 space-y-2">
            {current.steps.map((step, i) => {
              const done = stepsDone > i;
              const active = stepsDone === i;
              if (stepsDone < i) return null;
              return (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 font-mono text-xs text-white/45"
                >
                  {done ? (
                    <Check className="h-3.5 w-3.5 shrink-0 text-signal-teal" />
                  ) : (
                    <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-signal-indigo" />
                  )}
                  <span className={active ? "text-white/70" : ""}>{step}</span>
                </motion.div>
              );
            })}
          </div>
          <AnimatePresence>
            {showResponse ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-3 rounded-xl border border-white/10 bg-white/[.03] p-4 text-sm leading-6 text-white/72"
              >
                {current.response.map((line, i) => (
                  <p key={i} className={i === current.response.length - 1 ? "text-signal-teal" : undefined}>
                    {line}
                  </p>
                ))}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export function AICopilot() {
  const [active, setActive] = useState(0);

  return (
    <section id="copilot" className="mx-auto max-w-[1200px] px-5 py-24 sm:px-8">
      <SectionHeading
        index="05"
        align="center"
        kicker="Intellicore AI"
        tone="indigo"
        title="Threat analysis with a real AI analyst"
        description="Ask DSIP to explain exposure, remove false positives, draft remediation plans, prepare executive summaries, and connect weak signals across dark web, brand, cloud and third-party telemetry."
      />
      <Panel className="mx-auto max-w-4xl overflow-hidden !rounded-[18px] p-0">
        <div className="border-b border-white/[.07] p-4">
          <div className="flex items-center gap-3 rounded-[8px] border border-white/10 bg-white/[.04] px-4 py-3">
            <Search className="h-4 w-4 text-white/40" />
            <span className="text-sm text-white/50">Summarize the highest business-impact threats this week&hellip;</span>
          </div>
        </div>
        <div className="grid md:grid-cols-[.85fr_1.15fr]">
          <div className="border-b border-white/[.07] p-3 md:border-b-0 md:border-r">
            {prompts.map((prompt, i) => (
              <button
                key={prompt.label}
                onClick={() => setActive(i)}
                className={cn(
                  "flex w-full items-center justify-between rounded-[8px] px-3 py-3 text-left text-sm transition",
                  i === active ? "bg-signal-indigo/10 text-[#c3c9fb]" : "text-white/65 hover:bg-white/[.04]",
                )}
              >
                {prompt.label}
                <ChevronRight className="h-4 w-4 text-white/25" />
              </button>
            ))}
          </div>
          <ChatTranscript index={active} />
        </div>
      </Panel>
    </section>
  );
}
