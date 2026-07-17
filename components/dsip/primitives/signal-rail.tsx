"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SECTIONS } from "../sections-config";
import { cn } from "@/lib/utils";

const toneDot: Record<string, string> = {
  blue: "bg-signal-blue",
  teal: "bg-signal-teal",
  amber: "bg-signal-amber",
  red: "bg-signal-red",
  indigo: "bg-signal-indigo",
};

export function SignalRail() {
  const [activeIndex, setActiveIndex] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targets = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = SECTIONS.findIndex((s) => s.id === entry.target.id);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={railRef}
      className="pointer-events-none fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
      aria-hidden={false}
    >
      <div className="pointer-events-auto relative flex flex-col items-start gap-[18px] py-2">
        <div className="absolute left-[3px] top-0 h-full w-px bg-white/10" />
        <motion.div
          className="absolute left-0 h-2 w-2 -translate-x-[2.5px] rounded-full shadow-[0_0_10px_currentColor]"
          animate={{ top: `${(activeIndex / (SECTIONS.length - 1)) * 100}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          style={{ color: "#2ee6b8" }}
        >
          <span className="block h-2 w-2 rounded-full bg-signal-teal" />
        </motion.div>

        {SECTIONS.map((section, i) => {
          const active = i === activeIndex;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="group relative flex items-center gap-2.5 pl-4"
              aria-current={active ? "true" : undefined}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 shrink-0 rounded-full border border-white/20 transition-all duration-300",
                  active ? cn(toneDot[section.tone], "scale-125 border-transparent") : "bg-transparent group-hover:bg-white/40",
                )}
              />
              <span
                className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.1em] text-white/0 transition-all duration-200 group-hover:text-white/70"
              >
                {section.index} · {section.label}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
