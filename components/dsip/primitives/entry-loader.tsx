"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "./hooks";

const STORAGE_KEY = "dsip-entered";

const steps = [
  "AI Initializing…",
  "Loading Threat Intelligence…",
  "Connecting to Intelligence Sources…",
  "Loading Executive Dashboard…",
  "Enter Platform",
];

const STEP_MS = 380;
const START_DELAY = 400;

/**
 * Renders the full-screen boot overlay by default on both server and client
 * so the first paint is always the loader, never a flash of the raw page.
 * The session/reduced-motion check only runs client-side, and fast-dismisses
 * instead of gating the initial render (which would let the page show through
 * during hydration).
 */
export function EntryLoader() {
  const reduced = usePrefersReducedMotion();
  const [dismissed, setDismissed] = useState(false);
  const [stepIndex, setStepIndex] = useState(-1);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      alreadySeen = false;
    }

    if (alreadySeen || reduced) {
      setDismissed(true);
      return;
    }

    const timers: number[] = [];
    steps.forEach((_, i) => {
      timers.push(window.setTimeout(() => setStepIndex(i), START_DELAY + i * STEP_MS));
    });
    const finishAt = START_DELAY + steps.length * STEP_MS;
    timers.push(window.setTimeout(() => setExiting(true), finishAt + 260));
    timers.push(
      window.setTimeout(() => {
        setDismissed(true);
        try {
          sessionStorage.setItem(STORAGE_KEY, "1");
        } catch {
          /* noop */
        }
      }, finishAt + 760),
    );
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (dismissed) return null;

  const totalMs = START_DELAY + steps.length * STEP_MS;

  return (
    <motion.div
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center overflow-hidden bg-[#050b18]"
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onAnimationComplete={() => {
        if (exiting) setDismissed(true);
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(30,111,235,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(30,111,235,.12) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
          maskImage: "radial-gradient(circle at 50% 45%, black 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 45%, black 0%, transparent 70%)",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(30,111,235,.22),transparent_70%)] blur-3xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative grid h-16 w-16 place-items-center rounded-2xl bg-white text-sm font-black tracking-tight text-kpmg shadow-[0_0_60px_rgba(30,111,235,.35)]"
      >
        KPMG
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="mt-6 text-center"
      >
        <p className="font-display text-2xl font-extrabold uppercase tracking-tight text-white sm:text-3xl">
          Digital Signals <span className="text-signal-teal">Insights Platform</span>
        </p>
      </motion.div>

      <div className="mt-10 h-5 text-center">
        {stepIndex >= 0 ? (
          <motion.p
            key={stepIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
            className="font-mono text-xs uppercase tracking-[0.14em] text-white/50"
          >
            {steps[stepIndex]}
          </motion.p>
        ) : null}
      </div>

      <div className="relative mt-5 h-[3px] w-56 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-signal-blue to-signal-teal"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: totalMs / 1000, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
}
