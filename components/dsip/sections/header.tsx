"use client";

import React, { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { LogIn, Menu, X } from "lucide-react";
import { Button } from "../primitives/kit";
import { CommandPalette } from "../primitives/command-palette";
import { useDemoModal } from "../primitives/demo-modal";
import { SECTIONS } from "../sections-config";
import { cn } from "@/lib/utils";

export function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const { open: openDemo } = useDemoModal();
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => setSolid(latest > 16));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        solid ? "border-white/[.06] bg-[#050b18]/80 backdrop-blur-xl" : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:px-8">
        <motion.a
          href="#hero"
          className="flex items-center gap-3"
          whileHover="hover"
          initial="rest"
          animate="rest"
        >
          <motion.span
            variants={{ rest: { rotate: 0, scale: 1 }, hover: { rotate: -6, scale: 1.06 } }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className="grid h-8 w-8 place-items-center rounded-[6px] bg-white text-[10px] font-black tracking-tight text-kpmg"
          >
            KPMG
          </motion.span>
          <span className="h-4 w-px bg-white/15" />
          <span className="font-display text-[15px] font-semibold tracking-tight text-white">
            DSIP
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-white/35 sm:inline">
            v3.0
          </span>
        </motion.a>

        <div className="hidden items-center gap-3 lg:flex">
          <CommandPalette />
          <motion.a
            href="/login"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-1.5 rounded-full border border-white/10 px-3.5 py-2 text-sm text-white/70 transition-colors hover:border-white/25 hover:text-white"
          >
            <LogIn className="h-3.5 w-3.5" /> Login
          </motion.a>
          <Button size="default" onClick={() => openDemo("demo")}>Request access</Button>
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/70 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "close" : "open"}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.18 }}
              className="grid place-items-center"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/[.06] bg-[#050b18]/95 backdrop-blur-xl lg:hidden"
          >
            <div className="grid grid-cols-2 gap-1 p-4">
              {SECTIONS.filter((s) => s.id !== "hero").map((s, i) => (
                <motion.a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.03 }}
                  whileTap={{ scale: 0.96 }}
                  className="rounded-lg px-3 py-2.5 font-mono text-xs uppercase tracking-wide text-white/60 transition-colors hover:bg-white/[.06] hover:text-white"
                >
                  {s.index} {s.label}
                </motion.a>
              ))}
            </div>
            <div className="flex gap-2 px-4 pb-4">
              <a
                href="/login"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-white/10 px-3.5 py-2.5 text-sm text-white/70"
              >
                <LogIn className="h-3.5 w-3.5" /> Login
              </a>
              <Button className="flex-1" onClick={() => openDemo("demo")}>Request access</Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
