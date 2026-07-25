"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { SectionKicker } from "../primitives/kit";
import { usePrefersReducedMotion } from "../primitives/hooks";

const SignalConvergenceScene = dynamic(() => import("../three/signal-convergence-scene"), { ssr: false });

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

function DifferentiatorTicker() {
  const [index, setIndex] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % differentiators.length), 3200);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <div className="relative mx-auto flex h-14 max-w-2xl items-center justify-center px-6 text-center">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute text-[15px] leading-6 text-white/70"
        >
          {differentiators[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

export function Differentiators() {
  const reduced = usePrefersReducedMotion();

  return (
    <section id="differentiators" className="relative mx-auto max-w-[1400px] overflow-hidden px-5 py-24 sm:px-8">
      <div className="mx-auto mb-6 max-w-2xl text-center">
        <SectionKicker index="01" label="Why DSIP" tone="blue" />
      </div>

      <div className="relative mx-auto h-[440px] max-w-4xl overflow-hidden sm:h-[560px]">
        <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle,rgba(110,124,246,.14),transparent_70%)]" />
        {!reduced ? (
          <SignalConvergenceScene />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="grid h-24 w-24 place-items-center rounded-full border border-signal-indigo/40 bg-signal-indigo/10">
              <span className="font-display text-sm font-bold text-white">DSIP</span>
            </div>
          </div>
        )}
      </div>

      <p className="mx-auto mb-2 mt-6 max-w-md text-center font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
        Nine independent signal sources <span className="text-signal-teal">converging into one intelligence graph</span>
      </p>

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-3xl text-balance text-center font-display text-4xl font-bold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]"
      >
        Built to see the threats other tools were never designed to find
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto mt-4 max-w-xl text-center text-[15px] leading-7 text-white/55"
      >
        One AI-native platform where attack surface, brand protection, threat intelligence and dark web monitoring share the same signal — instead of competing for your attention.
      </motion.p>

      <div className="mt-10 border-t border-white/[.06] pt-2">
        <DifferentiatorTicker />
      </div>
    </section>
  );
}
