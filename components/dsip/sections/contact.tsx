"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  Check,
  Mail,
  MessageSquareText,
  Phone,
  Sparkles,
} from "lucide-react";
import { Button, Panel, PulseDot, SectionHeading, Tag } from "../primitives/kit";
import { SelectField, TextAreaField, TextField } from "../primitives/field";
import { useDemoModal } from "../primitives/demo-modal";
import { cn } from "@/lib/utils";

const CENTER_X = 300;
const CENTER_Y = 188;

type Office = {
  id: string;
  city: string;
  region: string;
  x: number;
  y: number;
  status: "online" | "after-hours";
  response: string;
};

const offices: Office[] = [
  { id: "ny", city: "New York", region: "Americas", x: 110, y: 145, status: "online", response: "Responds in ~20 min" },
  { id: "london", city: "London", region: "EMEA", x: 275, y: 100, status: "online", response: "Responds in ~15 min" },
  { id: "dubai", city: "Dubai", region: "EMEA", x: 360, y: 160, status: "online", response: "Responds in ~30 min" },
  { id: "mumbai", city: "Mumbai", region: "India", x: 415, y: 190, status: "online", response: "Responds in ~10 min" },
  { id: "singapore", city: "Singapore", region: "APAC", x: 460, y: 235, status: "after-hours", response: "Next available 06:00 SGT" },
  { id: "sydney", city: "Sydney", region: "APAC", x: 520, y: 300, status: "after-hours", response: "Next available 07:00 AEST" },
];

function GlobalOpsGlobe() {
  const [active, setActive] = useState<Office>(offices[3]);
  const color = active.status === "online" ? "#22d3ee" : "#f2a93b";

  return (
    <div className="relative">
      <div className="mb-6 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-wide text-white/35">Global coverage</span>
        <Tag tone="teal">
          <PulseDot tone="teal" className="mr-1.5" /> Live
        </Tag>
      </div>

      <div className="relative aspect-[16/10] w-full">
        <svg viewBox="0 0 600 375" className="absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <radialGradient id="contactGlow" cx="50%" cy="45%" r="65%">
              <stop offset="0%" stopColor="rgba(30,111,235,.2)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <rect width="600" height="375" fill="url(#contactGlow)" />
          {[40, 70, 100, 130].map((ry) => (
            <ellipse key={ry} cx={CENTER_X} cy={CENTER_Y} rx={280} ry={ry} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="0.6" />
          ))}
          {[280, 200, 120, 40].map((rx) => (
            <ellipse key={rx} cx={CENTER_X} cy={CENTER_Y} rx={rx} ry={112} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="0.6" />
          ))}
          <circle cx={CENTER_X} cy={CENTER_Y} r={280} fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="1" />

          {offices.map((o) => {
            const isActive = o.id === active.id;
            const c = o.status === "online" ? "#22d3ee" : "#f2a93b";
            return (
              <g key={o.id} onMouseEnter={() => setActive(o)} className="cursor-pointer">
                <line x1={CENTER_X} y1={CENTER_Y} x2={o.x} y2={o.y} stroke={isActive ? c : "rgba(255,255,255,.1)"} strokeWidth={isActive ? 1.2 : 0.6} />
                <circle cx={o.x} cy={o.y} r={isActive ? 15 : 9} fill={`${c}18`} className={isActive ? "dsip-sonar-ring" : undefined} />
                <circle cx={o.x} cy={o.y} r={isActive ? 5 : 3.5} fill={c} className={o.status === "online" ? "dsip-pulse" : undefined} />
                <foreignObject x={o.x - 60} y={o.y + (o.y > CENTER_Y ? 10 : -26)} width={120} height={18} style={{ overflow: "visible" }}>
                  <p
                    className={cn(
                      "text-center font-mono text-[9px] uppercase tracking-wide transition-opacity",
                      isActive ? "opacity-100 text-white" : "opacity-45 text-white/70",
                    )}
                  >
                    {o.city}
                  </p>
                </foreignObject>
              </g>
            );
          })}
        </svg>

        <div className="pointer-events-none absolute left-0 top-2 sm:top-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.2 }}
            >
              <p className="font-mono text-[10px] uppercase tracking-wide text-white/35">{active.city} · {active.region}</p>
              <p className="mt-0.5 flex items-center gap-2 text-sm text-white/80">
                {active.response}
                <span className="rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide" style={{ color, background: `${color}18`, border: `1px solid ${color}4d` }}>
                  {active.status === "online" ? "Online now" : "After hours"}
                </span>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

const supportCards = [
  { Icon: Mail, label: "Email", value: "dsip@kpmg.com", pos: "left-[3%] top-[8%]", delay: 0.1 },
  { Icon: Phone, label: "Phone", value: "+1 (555) 010-2030", pos: "right-[2%] top-[16%]", delay: 0.3 },
  { Icon: Check, label: "SOC coverage", value: "24 / 7 monitoring", pos: "left-[6%] bottom-[6%]", delay: 0.5 },
];

function FloatingSupportCards() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 hidden xl:block">
      {supportCards.map((c) => (
        <motion.div
          key={c.label}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: c.delay }}
          className={`animate-signal-drift absolute ${c.pos} flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#0a1428]/90 px-3.5 py-2.5`}
        >
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-signal-blue/10">
            <c.Icon className="h-4 w-4 text-signal-blue" />
          </span>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-wide text-white/35">{c.label}</p>
            <p className="text-xs text-white/80">{c.value}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

const inquiryTypes = ["Request a demo", "Schedule an assessment", "Partnership inquiry", "Media & press", "Other"];

function ConsultationForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Panel className="overflow-hidden !rounded-[22px] p-0 shadow-[0_40px_100px_-30px_rgba(0,0,0,.7)]">
      <div className="flex items-center justify-between border-b border-white/[.06] px-5 py-3.5">
        <span className="font-mono text-[11px] uppercase tracking-wide text-white/45">Talk to our cyber experts</span>
        <MessageSquareText className="h-4 w-4 text-signal-teal" />
      </div>
      <div className="p-6">
        {submitted ? (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center py-10 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-full border border-signal-teal/40 bg-signal-teal/10">
              <Check className="h-6 w-6 text-signal-teal" />
            </span>
            <p className="mt-4 font-display text-xl font-bold text-white">Message received</p>
            <p className="mt-1.5 max-w-xs text-sm text-white/50">A specialist from your nearest KPMG office will reach out shortly.</p>
          </motion.div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-3.5"
          >
            <div className="grid gap-3.5 sm:grid-cols-2">
              <TextField label="Full name" required placeholder="Jordan Smith" />
              <TextField label="Work email" required type="email" placeholder="you@company.com" />
            </div>
            <TextField label="Organization" placeholder="Acme Corp" />
            <SelectField label="What can we help with?" options={inquiryTypes} />
            <TextAreaField label="Tell us more" rows={3} placeholder="Tell us about your environment…" />
            <Button type="submit" size="lg" className="w-full justify-center">
              Send message
            </Button>
          </form>
        )}
      </div>
    </Panel>
  );
}

export function Contact() {
  const { open } = useDemoModal();

  return (
    <section id="contact" className="relative mx-auto max-w-[1400px] overflow-hidden px-5 py-24 sm:px-8">
      <FloatingSupportCards />
      <SectionHeading
        index="10"
        align="center"
        kicker="Talk to our cyber experts"
        tone="teal"
        title="A global operations center, always on"
        description="Six regional teams, one shared exposure picture. Reach the desk closest to you, or ask Intellicore directly."
      />

      <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
        <Button size="lg" onClick={() => open("demo")}>
          <Sparkles className="h-4 w-4" /> Request demo
        </Button>
        <Button size="lg" variant="secondary" onClick={() => open("consult")}>
          <Calendar className="h-4 w-4" /> Schedule assessment
        </Button>
        <Button size="lg" variant="secondary" href="#intellicore">
          <MessageSquareText className="h-4 w-4" /> Ask Intellicore
        </Button>
      </div>

      <div className="relative mx-auto max-w-[1200px] lg:min-h-[520px]">
        <div className="lg:w-[68%]">
          <GlobalOpsGlobe />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-8 lg:absolute lg:bottom-2 lg:right-0 lg:mt-0 lg:w-[380px]"
        >
          <ConsultationForm />
        </motion.div>
      </div>
    </section>
  );
}
