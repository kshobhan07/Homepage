"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { Panel, SectionHeading, Tag } from "../primitives/kit";
import { SignalStreamsField } from "../primitives/section-backgrounds";
import { cn } from "@/lib/utils";

type Group = { id: string; title: string; layer: string; items: string[] };

const leftGroups: Group[] = [
  { id: "asm", title: "Attack Surface Management", layer: "Surface Web", items: ["Unknown asset discovery", "Login panels", "Sub-domain & IP range scanning", "Zero-day news"] },
  { id: "phishing", title: "Phishing & Social Engineering", layer: "Surface Web", items: ["Phishing domains", "Mobile applications", "Parked domains", "Social engineering sites"] },
  { id: "rogue", title: "Rogue Applications", layer: "Deep Web", items: ["Fake mobile applications", "Open login portals", "Malware distribution"] },
  { id: "ti", title: "Threat Intelligence", layer: "Deep Web", items: ["Breached passwords", "Compromised accounts", "Sensitive data leaks — credentials, code, documents, API"] },
];

const rightGroups: Group[] = [
  { id: "brand", title: "Brand Infringement", layer: "Social Web", items: ["Document & IP infringement", "Logo infringement", "Deepfake", "Public groups"] },
  { id: "affiliation", title: "Fake Affiliation", layer: "Social Web", items: ["Fake affiliation claims", "Fake jobs & recruitment scams", "Vendor / supplier claims"] },
  { id: "imposters", title: "Social Imposters", layer: "Social Web", items: ["Brand imposters", "Executive imposters", "Customer support accounts", "Fake mobile numbers"] },
  { id: "darkweb", title: "Dark Web", layer: "Dark Web", items: ["Employee passwords", "Breached accounts", "Sensitive data", "PII information"] },
];

const differentiators = [
  "In-house platform, customized to every client's environment",
  "AI-enabled modules with a conversational insights chatbot",
  "Experienced consultants tailoring threats to your context",
  "Automatic takedown execution, not just detection",
  "Auto severity scoring and auto false-positive triage",
  "Continuous insights on zero-day and emerging threat feeds",
  "Multi-tenant, multi-language by design",
  "Open API for SIEM, SOAR and ServiceNow integration",
];

function GroupRow({
  group,
  align,
  open,
  onToggle,
}: {
  group: Group;
  align: "left" | "right";
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={cn("rounded-xl border transition-colors", open ? "border-signal-blue/35 bg-signal-blue/[.06]" : "border-white/10 bg-white/[.02]")}>
      <button onClick={onToggle} className={cn("flex w-full items-center gap-3 px-4 py-3", align === "right" && "flex-row-reverse text-right")}>
        <ChevronDown className={cn("h-3.5 w-3.5 shrink-0 text-white/35 transition-transform", open && "rotate-180")} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white/90">{group.title}</p>
          <p className="font-mono text-[9.5px] uppercase tracking-wide text-white/35">{group.layer}</p>
        </div>
      </button>
      {open ? (
        <div className={cn("space-y-1.5 px-4 pb-4", align === "right" && "text-right")}>
          {group.items.map((item) => (
            <p key={item} className="text-xs leading-5 text-white/55">
              {item}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function CoverageConstellation() {
  const [open, setOpen] = useState<string>("asm");
  const toggle = (id: string) => setOpen((cur) => (cur === id ? "" : id));

  return (
    <Panel className="overflow-hidden !rounded-[20px] p-6 sm:p-8">
      <div className="mb-8 flex flex-col items-center gap-2 text-center">
        <Tag tone="blue">AI-Powered SaaS for Continuous Threat Detection</Tag>
        <p className="max-w-lg text-sm text-white/50">
          Every category below writes into three connected insight engines — Cyber, Social and Dark-Web — feeding
          one exposure picture.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-start">
        <div className="space-y-3">
          {leftGroups.map((g) => (
            <GroupRow key={g.id} group={g} align="left" open={open === g.id} onToggle={() => toggle(g.id)} />
          ))}
        </div>

        <div className="mx-auto flex w-full max-w-[220px] flex-col items-center gap-3 py-6 lg:py-0">
          <div className="relative grid h-40 w-40 place-items-center rounded-full border border-signal-blue/30 bg-[radial-gradient(circle,rgba(30,111,235,.16),transparent_70%)]">
            <div className="absolute inset-3 rounded-full border border-dashed border-white/10" />
            <div className="text-center">
              <p className="font-display text-lg font-extrabold text-white">DSIP</p>
              <p className="font-mono text-[8px] uppercase tracking-wide text-white/40">Insights Core</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Tag tone="blue">Cyber Insights</Tag>
            <Tag tone="teal">Social Insights</Tag>
            <Tag tone="red">Dark-Web Insights</Tag>
          </div>
        </div>

        <div className="space-y-3">
          {rightGroups.map((g) => (
            <GroupRow key={g.id} group={g} align="right" open={open === g.id} onToggle={() => toggle(g.id)} />
          ))}
        </div>
      </div>
      <div className="mt-8 rounded-full border border-white/10 bg-white/[.03] py-2.5 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-white/50">
        Takedown support across every category
      </div>
    </Panel>
  );
}

function KeyDifferentiators() {
  return (
    <Panel className="mt-6 overflow-hidden !rounded-[20px] p-0">
      <div className="border-b border-white/[.07] px-6 py-4">
        <p className="font-mono text-[11px] uppercase tracking-wide text-white/45">Key differentiators</p>
      </div>
      <div className="grid divide-white/[.06] sm:grid-cols-2 sm:divide-x">
        {[differentiators.slice(0, 4), differentiators.slice(4)].map((col, colIndex) => (
          <div key={colIndex} className="divide-y divide-white/[.06]">
            {col.map((item) => (
              <div key={item} className="flex items-start gap-3 px-6 py-4">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-signal-teal/15">
                  <Check className="h-3 w-3 text-signal-teal" />
                </span>
                <p className="text-sm leading-6 text-white/78">{item}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Panel>
  );
}

export function Differentiators() {
  return (
    <section id="differentiators" className="relative mx-auto max-w-[1400px] overflow-hidden px-5 py-24 sm:px-8">
      <SignalStreamsField tint="#1e6feb" />
      <SectionHeading
        index="01"
        kicker="Why DSIP"
        tone="blue"
        title="Built to see the threats other tools were never designed to find"
        description="One AI-native platform where attack surface, brand protection, threat intelligence and dark web monitoring share the same signal — instead of competing for your attention."
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        <CoverageConstellation />
        <KeyDifferentiators />
      </motion.div>
    </section>
  );
}
