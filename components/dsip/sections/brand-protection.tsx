"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Copy, Globe, MessagesSquare, Smartphone, type LucideIcon } from "lucide-react";
import { Panel, SectionHeading } from "../primitives/kit";

type Stage = "Detected" | "Investigating" | "Takedown filed" | "Resolved";

const stageColor: Record<Stage, string> = {
  Detected: "#2f6fed",
  Investigating: "#f5a623",
  "Takedown filed": "#6e7cf6",
  Resolved: "#2ee6b8",
};

type Case = { Icon: LucideIcon; title: string; detail: string; stage: Stage };

const cases: Case[] = [
  { Icon: Smartphone, title: "Rogue mobile app", detail: "Sideloaded APK cloning the brand's banking app interface.", stage: "Detected" },
  { Icon: Briefcase, title: "Recruitment scam", detail: "Fraudulent job posting collecting personal data under the brand name.", stage: "Investigating" },
  { Icon: MessagesSquare, title: "Social media impersonation", detail: "Verified-looking account soliciting crypto payments from followers.", stage: "Investigating" },
  { Icon: Globe, title: "Fake domain registered", detail: "acme-corp-login.io mimicking the customer portal, registered 6 hours ago.", stage: "Takedown filed" },
  { Icon: Copy, title: "Trademark abuse", detail: "Counterfeit storefront using brand assets across a marketplace, now removed.", stage: "Resolved" },
];

const stages: { name: Stage; count: number }[] = [
  { name: "Detected", count: 47 },
  { name: "Investigating", count: 18 },
  { name: "Takedown filed", count: 11 },
  { name: "Resolved", count: 63 },
];

function InvestigationBoard() {
  return (
    <div className="grid gap-3 lg:grid-cols-4">
      {stages.map((stage, colIndex) => {
        const stageCases = cases.filter((c) => c.stage === stage.name);
        const color = stageColor[stage.name];
        return (
          <motion.div
            key={stage.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: colIndex * 0.08 }}
          >
            <Panel className="flex h-full flex-col !rounded-[14px] p-0">
              <div className="flex items-center justify-between border-b border-white/[.07] px-4 py-3">
                <span className="flex items-center gap-2 text-sm font-medium text-white/85">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
                  {stage.name}
                </span>
                <span className="font-mono text-sm font-semibold" style={{ color }}>
                  {stage.count}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-2.5 p-3">
                {stageCases.length ? (
                  stageCases.map((c) => (
                    <div key={c.title} className="rounded-[10px] border border-white/[.08] bg-white/[.03] p-3.5">
                      <c.Icon className="mb-3 h-4 w-4 text-white/50" />
                      <h4 className="mb-1 text-sm font-semibold text-white/90">{c.title}</h4>
                      <p className="text-xs leading-5 text-white/50">{c.detail}</p>
                    </div>
                  ))
                ) : (
                  <div className="grid flex-1 place-items-center rounded-[10px] border border-dashed border-white/[.08] p-6">
                    <span className="font-mono text-[10px] uppercase tracking-wide text-white/25">Queue empty</span>
                  </div>
                )}
              </div>
            </Panel>
          </motion.div>
        );
      })}
    </div>
  );
}

export function BrandProtection() {
  return (
    <section id="brand-protection" className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8">
      <SectionHeading
        index="07"
        kicker="Brand Protection"
        tone="amber"
        title="Catch impersonation before customers do"
        description="Every case moves through one investigation queue, start to takedown — this is that queue, live."
      />
      <InvestigationBoard />
    </section>
  );
}
