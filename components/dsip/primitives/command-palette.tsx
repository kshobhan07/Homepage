"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Command, CornerDownLeft, Search, Sparkles } from "lucide-react";
import { SECTIONS } from "../sections-config";
import { cn } from "@/lib/utils";

const prompts = [
  {
    q: "Summarize the highest business-impact threats this week",
    a: "Priority risk: a credential leak affecting two privileged accounts tied to a newly exposed VPN endpoint. Confidence 92%, corroborated across three dark web sources.",
  },
  {
    q: "Show unresolved brand impersonation cases",
    a: "5 open cases. 2 takedowns filed in the last 24h. Highest priority: spoofed careers portal live across 3 regions.",
  },
  {
    q: "Draft this week's CISO brief",
    a: "Draft ready — exposure trending down 12%, two critical findings remediated, one active credential leak in review.",
  },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [activePrompt, setActivePrompt] = useState<number | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) setActivePrompt(null);
  }, [open]);

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.96 }}
        className="flex h-9 items-center gap-2 rounded-full border border-white/10 bg-white/[.03] px-3.5 text-xs text-white/50 transition-colors hover:border-white/20 hover:bg-white/[.06] hover:text-white/75"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Ask Intellicore</span>
        <kbd className="ml-1 hidden items-center gap-0.5 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-white/40 sm:flex">
          <Command className="h-2.5 w-2.5" />K
        </kbd>
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[100] flex items-start justify-center bg-black/70 px-4 pt-[12vh] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="dsip-panel w-full max-w-xl overflow-hidden !rounded-2xl"
            >
              <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
                <Sparkles className="h-4 w-4 text-signal-indigo" />
                <span className="text-sm text-white/50">Ask Intellicore anything about your exposure&hellip;</span>
              </div>
              <div className="max-h-[50vh] overflow-y-auto p-2">
                {activePrompt === null ? (
                  <>
                    <p className="px-3 pb-1 pt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-white/30">Suggested</p>
                    {prompts.map((p, i) => (
                      <motion.button
                        key={p.q}
                        onClick={() => setActivePrompt(i)}
                        whileHover="hover"
                        initial="rest"
                        animate="rest"
                        className="group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm text-white/75 transition-colors hover:bg-white/[.06]"
                      >
                        {p.q}
                        <motion.span variants={{ rest: { x: 0, opacity: 0.4 }, hover: { x: 3, opacity: 1 } }}>
                          <CornerDownLeft className="h-3.5 w-3.5 text-signal-teal" />
                        </motion.span>
                      </motion.button>
                    ))}
                    <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-white/30">Jump to</p>
                    <div className="grid grid-cols-2 gap-1 p-1">
                      {SECTIONS.filter((s) => s.id !== "hero").map((s) => (
                        <motion.a
                          key={s.id}
                          href={`#${s.id}`}
                          onClick={() => setOpen(false)}
                          whileHover={{ x: 2 }}
                          className="rounded-lg px-3 py-2 text-xs text-white/55 transition-colors hover:bg-white/[.06] hover:text-white/85"
                        >
                          {s.label}
                        </motion.a>
                      ))}
                    </div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="p-3"
                  >
                    <p className="mb-3 text-sm font-medium text-white/85">{prompts[activePrompt].q}</p>
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.12 }}
                      className="flex items-start gap-2 rounded-lg border border-signal-indigo/20 bg-signal-indigo/[.06] p-3"
                    >
                      <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal-indigo" />
                      <p className="text-sm leading-6 text-white/75">{prompts[activePrompt].a}</p>
                    </motion.div>
                    <button
                      onClick={() => setActivePrompt(null)}
                      className="mt-3 font-mono text-[11px] uppercase tracking-wide text-white/35 transition-colors hover:text-white/60"
                    >
                      &larr; Back
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
