"use client";

import React, { useState } from "react";
import { AudioLines, Film, ScanFace, UserRoundCheck } from "lucide-react";
import { Panel, SectionHeading, Tag } from "../primitives/kit";
import { RadialGauge } from "../primitives/stat";
import { cn } from "@/lib/utils";

const vipEvents = [
  { day: "Mon", label: "Executive impersonation", detail: "Fake LinkedIn profile using the CFO's name and photo, sending connection requests.", severity: "High" as const },
  { day: "Wed", label: "Credential leak", detail: "Personal email of a board member found in a third-party breach dataset.", severity: "Medium" as const },
  { day: "Thu", label: "Targeted campaign", detail: "Spear-phishing attempt referencing the CEO's recent public appearance.", severity: "Critical" as const },
  { day: "Fri", label: "Impersonation attempt", detail: "Lookalike domain used to send a wire-transfer request as the CFO.", severity: "High" as const },
];

const severityColor = { Critical: "#e23a4e", High: "#f2a93b", Medium: "#1e6feb" } as const;

function ExposureTimeline() {
  const [active, setActive] = useState(vipEvents[2]);
  return (
    <Panel className="p-6">
      <div className="mb-6 flex items-center gap-2">
        <UserRoundCheck className="h-5 w-5 text-signal-red" />
        <h3 className="font-mono text-[11px] uppercase tracking-wide text-white/45">Executive exposure — this week</h3>
      </div>
      <div className="relative mb-8 mt-10 h-px bg-white/10">
        {vipEvents.map((event) => {
          const isActive = event.label === active.label;
          const pos = (vipEvents.indexOf(event) / (vipEvents.length - 1)) * 100;
          return (
            <button
              key={event.label}
              onMouseEnter={() => setActive(event)}
              onFocus={() => setActive(event)}
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${pos}%` }}
              aria-label={event.label}
            >
              <span
                className={cn("dsip-pulse block rounded-full border-2 transition-transform", isActive ? "h-4 w-4" : "h-3 w-3")}
                style={{ background: `${severityColor[event.severity]}30`, borderColor: severityColor[event.severity] }}
              />
              <span className="absolute left-1/2 top-5 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] text-white/40">{event.day}</span>
            </button>
          );
        })}
      </div>
      <div className="rounded-lg border border-white/10 bg-white/[.035] p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-white/90">{active.label}</span>
          <span
            className="rounded-full border px-2.5 py-0.5 font-mono text-xs"
            style={{ borderColor: `${severityColor[active.severity]}4d`, background: `${severityColor[active.severity]}1a`, color: severityColor[active.severity] }}
          >
            {active.severity}
          </span>
        </div>
        <p className="mt-1.5 text-xs text-white/50">{active.detail}</p>
      </div>
    </Panel>
  );
}

const deepfakes = [
  { id: "video", label: "Synthetic video", Icon: Film, confidence: 96, detail: "Manipulated video circulating on social media misattributing statements to the CEO." },
  { id: "voice", label: "Voice clone", Icon: AudioLines, confidence: 91, detail: "Audio sample used in a vishing attempt against the finance team." },
];

function AuthenticityAnalyzer() {
  const [selected, setSelected] = useState(deepfakes[0]);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<(typeof deepfakes)[number] | null>(null);

  function analyze(item: (typeof deepfakes)[number]) {
    setSelected(item);
    setResult(null);
    setAnalyzing(true);
    window.setTimeout(() => {
      setAnalyzing(false);
      setResult(item);
    }, 900);
  }

  return (
    <Panel className="p-6">
      <div className="mb-6 flex items-center gap-2">
        <ScanFace className="h-5 w-5 text-signal-indigo" />
        <h3 className="font-mono text-[11px] uppercase tracking-wide text-white/45">Deepfake authenticity analyzer</h3>
      </div>
      <div className="mb-4 flex gap-2">
        {deepfakes.map((item) => (
          <button
            key={item.id}
            onClick={() => analyze(item)}
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition",
              selected.id === item.id ? "border-signal-indigo/40 bg-signal-indigo/15 text-white" : "border-white/10 text-white/55 hover:text-white/85",
            )}
          >
            <item.Icon className="h-3.5 w-3.5" />
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-5 rounded-lg border border-white/10 bg-white/[.035] p-4">
        <div className="flex h-16 items-end gap-[3px]" aria-hidden>
          {Array.from({ length: 18 }, (_, i) => (
            <span
              key={i}
              className={cn("w-1 rounded-full bg-signal-indigo/70", analyzing && "animate-pulse")}
              style={{
                height: analyzing ? `${20 + ((i * 37) % 60)}%` : `${12 + ((i * 23) % 40)}%`,
                animationDelay: `${i * 60}ms`,
                opacity: analyzing ? 1 : 0.35,
              }}
            />
          ))}
        </div>
        <div className="flex-1">
          {analyzing ? (
            <p className="text-sm text-white/55">Analyzing signal for synthetic artifacts&hellip;</p>
          ) : result ? (
            <div className="flex items-center gap-4">
              <RadialGauge value={result.confidence} size={64} stroke={6} color="#e23a4e" label="conf." />
              <div>
                <Tag tone="red">Synthetic media detected</Tag>
                <p className="mt-1.5 text-xs text-white/50">{result.detail}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-white/45">Select a sample to run detection.</p>
          )}
        </div>
      </div>
    </Panel>
  );
}

export function VipDeepfake() {
  return (
    <section id="vip" className="mx-auto max-w-[1248px] px-5 py-24 sm:px-8">
      <SectionHeading
        index="06"
        kicker="VIP & Deepfake Monitoring"
        tone="red"
        title="Protect the people whose reputation is the company's risk"
        description="Executive exposure on a timeline. Synthetic media caught by an analyzer, not a claim."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <ExposureTimeline />
        <AuthenticityAnalyzer />
      </div>
    </section>
  );
}
