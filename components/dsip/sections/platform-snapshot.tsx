"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  FileText,
  Globe2,
  LayoutDashboard,
  Mic,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Panel, PulseDot, SectionHeading, Tag } from "../primitives/kit";
import { RadialGauge, StatCounter } from "../primitives/stat";
import { HoloDashGlow } from "../primitives/section-backgrounds";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Overview", Icon: LayoutDashboard },
  { label: "ASM", Icon: Globe2 },
  { label: "Brand Protection", Icon: ShieldCheck },
  { label: "Darkweb", Icon: Eye },
  { label: "Reports", Icon: FileText },
];

const tiles = [
  { label: "Total threat feed", value: 7371 },
  { label: "Total zero-day feed", value: 13232 },
  { label: "Total CVE count", value: 6795 },
];

const aiSummary = [
  "Plaintext credential leaks detected across 3 employee accounts, posing high risk of unauthorized access.",
  "Misconfigured services flagged on 2 domains resembling known phishing infrastructure.",
  "Sensitive data exposure identified across unencrypted credential stores in 4 sources.",
];

function OverviewPane() {
  return (
    <div className="grid gap-4 p-5 lg:grid-cols-[.9fr_1.1fr]">
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[.02] p-6 text-center">
        <p className="font-mono text-[10px] uppercase tracking-wide text-white/40">Threat score</p>
        <RadialGauge value={350} max={700} size={104} stroke={9} color="#f2a93b" label="/ 700" />
        <p className="font-display text-sm font-semibold text-white">Democorp</p>
        <p className="font-mono text-[10px] text-white/35">democorp.com</p>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {tiles.map((t) => (
            <div key={t.label} className="rounded-xl border border-white/10 bg-white/[.02] p-3.5 text-center">
              <p className="font-display text-xl font-bold text-white">
                <StatCounter value={t.value} />
              </p>
              <p className="mt-1 font-mono text-[9px] uppercase leading-tight tracking-wide text-white/35">{t.label}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-signal-indigo/20 bg-signal-indigo/[.05] p-4">
          <p className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wide text-white/45">
            <Sparkles className="h-3.5 w-3.5 text-signal-indigo" /> AI threat summary
          </p>
          <div className="space-y-2.5">
            {aiSummary.map((s) => (
              <p key={s} className="flex gap-2 text-xs leading-5 text-white/65">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-signal-indigo" />
                {s}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const phishingRows = [
  { domain: "1basic4d1-demo.site", date: "13-01-2025", status: 200, state: "Unreported", type: "Unreported" },
  { domain: "acme-secure-portal.com", date: "14-01-2025", status: 200, state: "Reported", type: "Phishing" },
  { domain: "acme.myrewards-verify.com", date: "15-01-2025", status: 403, state: "Takedown filed", type: "Phishing" },
  { domain: "careers-acme-corp.io", date: "16-01-2025", status: 200, state: "Under review", type: "Recruitment scam" },
];

function PhishingPane() {
  return (
    <div className="p-5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[.03] px-3 py-2 text-sm text-white/40 sm:w-64">
          <Search className="h-3.5 w-3.5" /> Search domains…
        </div>
        <div className="flex gap-2">
          <Tag>Filter</Tag>
          <Tag>Date filter</Tag>
          <Tag tone="indigo">Ask AI</Tag>
        </div>
      </div>
      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/[.07] bg-white/[.02] font-mono text-[10px] uppercase tracking-wide text-white/35">
              <th className="px-4 py-2.5 font-normal">Domain</th>
              <th className="px-4 py-2.5 font-normal">Scanned date</th>
              <th className="px-4 py-2.5 font-normal">HTTP status</th>
              <th className="px-4 py-2.5 font-normal">Status</th>
              <th className="px-4 py-2.5 font-normal">Type</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[.06]">
            {phishingRows.map((r, i) => (
              <motion.tr
                key={r.domain}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="transition-colors hover:bg-white/[.03]"
              >
                <td className="px-4 py-2.5 font-mono text-xs text-white/80">{r.domain}</td>
                <td className="px-4 py-2.5 font-mono text-xs text-white/45">{r.date}</td>
                <td className="px-4 py-2.5 font-mono text-xs text-white/45">{r.status}</td>
                <td className="px-4 py-2.5 text-xs text-white/60">{r.state}</td>
                <td className="px-4 py-2.5 text-xs text-white/60">{r.type}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const prompts = ["Give insights on IP vulnerabilities", "What are the top 3 risks for this domain?", "Show me a table of leaked credentials", "Give insights only on critical CVEs"];

function ChatPane() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-full border border-signal-indigo/30 bg-signal-indigo/10">
        <Sparkles className="h-6 w-6 text-signal-indigo" />
      </div>
      <p className="mt-4 font-display text-lg font-semibold text-white">Hello! I&rsquo;m Intellicore AI</p>
      <p className="mt-1 text-sm text-white/45">Ask me anything to get started</p>
      <div className="mt-5 flex max-w-md flex-wrap justify-center gap-2">
        {prompts.map((p) => (
          <span key={p} className="rounded-full border border-white/10 bg-white/[.03] px-3 py-1.5 text-xs text-white/60">
            {p}
          </span>
        ))}
      </div>
      <div className="mt-6 flex w-full max-w-md items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-4 py-2.5">
        <span className="flex-1 text-left text-xs text-white/35">Type your question here…</span>
        <Mic className="h-3.5 w-3.5 text-white/35" />
        <span className="grid h-7 w-7 place-items-center rounded-full bg-signal-blue">
          <Send className="h-3 w-3 text-white" />
        </span>
      </div>
    </div>
  );
}

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "phishing", label: "Phishing threats" },
  { id: "chat", label: "Ask Intellicore" },
] as const;

export function PlatformSnapshot() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("overview");

  return (
    <section id="platform-snapshot" className="relative mx-auto max-w-[1300px] overflow-hidden px-5 py-24 sm:px-8">
      <HoloDashGlow />
      <SectionHeading
        index="09"
        align="center"
        kicker="Platform Snapshot"
        tone="teal"
        title="This is the product, not a mockup"
        description="A live look at the console your team works in every day — self-scan, threat scoring, phishing evidence and Intellicore AI, in one place."
      />
      <div className="relative mx-auto max-w-[1100px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none absolute inset-0 translate-x-3 translate-y-4 rounded-[26px] border border-white/[.05] opacity-50 blur-[1px]"
          aria-hidden
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="pointer-events-none absolute inset-0 translate-x-6 translate-y-8 rounded-[26px] border border-white/[.03] opacity-30 blur-[2px]"
          aria-hidden
        />

        <div className="mb-3 flex items-center justify-between px-1">
          <span className="font-mono text-[10px] uppercase tracking-wide text-white/35">app.dsip.kpmg.com / self-scan</span>
          <Tag tone="teal">
            <PulseDot tone="teal" className="mr-1.5" /> Live
          </Tag>
        </div>

        <Panel className="overflow-hidden !rounded-[26px] p-0 shadow-[0_60px_140px_-40px_rgba(30,111,235,.35)]">
          <div className="grid md:grid-cols-[68px_1fr]">
            <div className="hidden flex-col items-center gap-3 border-r border-white/[.05] py-6 md:flex">
              <span className="mb-2 grid h-8 w-8 place-items-center rounded-[7px] bg-white text-[8px] font-black text-kpmg">KPMG</span>
              {nav.map((n) => (
                <button
                  key={n.label}
                  title={n.label}
                  className={cn(
                    "grid h-9 w-9 place-items-center rounded-full transition-colors",
                    n.label === "Overview" ? "bg-signal-blue/15 text-signal-blue" : "text-white/30 hover:bg-white/[.05] hover:text-white/60",
                  )}
                >
                  <n.Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
            <div>
              <div className="flex gap-1 border-b border-white/[.05] px-5 pt-4">
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={cn(
                      "relative rounded-t-lg px-3.5 py-2 font-mono text-[11px] uppercase tracking-wide transition-colors",
                      tab === t.id ? "text-white" : "text-white/35 hover:text-white/60",
                    )}
                  >
                    {t.label}
                    {tab === t.id ? (
                      <motion.span
                        layoutId="snapshot-tab-underline"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        className="absolute inset-0 -z-10 rounded-t-lg bg-white/[.05]"
                      />
                    ) : null}
                  </button>
                ))}
              </div>
              <div className="min-h-[360px]">
                {tab === "overview" ? <OverviewPane /> : null}
                {tab === "phishing" ? <PhishingPane /> : null}
                {tab === "chat" ? <ChatPane /> : null}
              </div>
            </div>
          </div>
        </Panel>
      </div>
    </section>
  );
}
