"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { PulseDot } from "./kit";

function useTicker(base: number, jitter: number, intervalMs = 2200) {
  const [value, setValue] = useState(base);
  useEffect(() => {
    const id = setInterval(() => {
      setValue(Math.round(base + (Math.random() - 0.5) * jitter));
    }, intervalMs);
    return () => clearInterval(id);
  }, [base, jitter, intervalMs]);
  return value;
}

export function StatusBar() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const signals = useTicker(12480, 340);
  const latency = useTicker(41, 6);
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }),
      );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 hidden border-t border-white/[.06] bg-[#050b18]/85 backdrop-blur-xl md:block">
      <motion.div className="h-[2px] origin-left bg-gradient-to-r from-signal-blue via-signal-teal to-signal-indigo" style={{ scaleX: progress }} />
      <div className="mx-auto flex h-9 max-w-[1400px] items-center justify-between px-6 font-mono text-[10px] uppercase tracking-[0.1em] text-white/40">
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5 text-white/60">
            <PulseDot tone="teal" />
            Core online
          </span>
          <span>Signals/min · {signals.toLocaleString()}</span>
          <span className="hidden lg:inline">Latency · {latency}ms</span>
          <span className="hidden lg:inline">Regions · 42 active</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="hidden sm:inline">Intellicore AI · listening</span>
          <span suppressHydrationWarning>{time ?? "--:--:--"} UTC</span>
        </div>
      </div>
    </div>
  );
}
