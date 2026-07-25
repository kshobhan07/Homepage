"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Copy, Globe, MessagesSquare, Smartphone, type LucideIcon } from "lucide-react";
import { Panel, SectionHeading } from "../primitives/kit";
import { ScanGridField } from "../primitives/section-backgrounds";

type Stage = "Detected" | "Investigating" | "Takedown filed" | "Resolved";

const stageColor: Record<Stage, string> = {
  Detected: "#1e6feb",
  Investigating: "#f2a93b",
  "Takedown filed": "#1552c4",
  Resolved: "#22d3ee",
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

const evidence = [
  { url: "acme-corp-login.io/user/login.html", ip: "194.195.116.77", registrar: "Bizcn.com, Inc." },
  { url: "acme-secure-portal.com/verify/account", ip: "151.101.2.137", registrar: "EuroDNS S.A" },
  { url: "acme.myrewards-verify.com/signin", ip: "18.163.190.53", registrar: "Gname.com Pte. Ltd." },
];

function PhishingEvidence() {
  return (
    <Panel className="mt-4 overflow-hidden !rounded-[18px] p-0">
      <div className="flex items-center justify-between border-b border-white/[.07] px-5 py-3.5">
        <span className="font-mono text-[11px] uppercase tracking-wide text-white/45">Potential phishing domains — matched evidence</span>
        <span className="rounded-full border border-signal-red/30 bg-signal-red/10 px-2.5 py-0.5 font-mono text-[10px] text-signal-red">3 identified · High</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/[.07] font-mono text-[10px] uppercase tracking-wide text-white/35">
              <th className="px-5 py-3 font-normal">URL</th>
              <th className="px-5 py-3 font-normal">IP</th>
              <th className="px-5 py-3 font-normal">Registrar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[.06]">
            {evidence.map((e, i) => (
              <motion.tr
                key={e.url}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="transition-colors hover:bg-signal-red/[.04]"
              >
                <td className="px-5 py-3 font-mono text-xs text-white/80">{e.url}</td>
                <td className="px-5 py-3 font-mono text-xs text-white/50">{e.ip}</td>
                <td className="px-5 py-3 text-xs text-white/50">{e.registrar}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

export function BrandProtection() {
  return (
    <section id="brand-protection" className="relative mx-auto max-w-[1400px] overflow-hidden px-5 py-24 sm:px-8">
      <ScanGridField />
      <SectionHeading
        index="04"
        kicker="Brand Protection"
        tone="amber"
        title="Catch impersonation before customers do"
        description="Every case moves through one investigation queue, start to takedown — this is that queue, live."
      />
      <InvestigationBoard />
      <PhishingEvidence />
    </section>
  );
}
