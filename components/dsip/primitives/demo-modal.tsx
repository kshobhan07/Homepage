"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Check, Loader2, Sparkles, X } from "lucide-react";
import { Button } from "./kit";
import { SelectField, TextField } from "./field";

type ModalMode = "demo" | "consult";

type DemoModalContextValue = {
  open: (mode?: ModalMode) => void;
};

const DemoModalContext = createContext<DemoModalContextValue | null>(null);

export function useDemoModal() {
  const ctx = useContext(DemoModalContext);
  if (!ctx) throw new Error("useDemoModal must be used within DemoModalProvider");
  return ctx;
}

const industries = ["Financial Services", "Government", "Healthcare", "Energy & Utilities", "Retail & E-commerce", "Manufacturing", "Technology", "Other"];
const employeeBands = ["1 – 200", "201 – 1,000", "1,001 – 5,000", "5,000+"];
const useCases = [
  "Attack Surface Management",
  "Brand Protection",
  "Threat Intelligence",
  "Dark Web Monitoring",
  "VIP & Deepfake Protection",
  "Third-Party Risk",
  "Full Platform",
];

const modeCopy: Record<ModalMode, { title: string; sub: string; cta: string }> = {
  demo: {
    title: "Request a platform demo",
    sub: "See DSIP correlate real signals across your digital footprint, live.",
    cta: "Request demo",
  },
  consult: {
    title: "Schedule a consultation",
    sub: "Talk through your exposure with a KPMG cyber specialist.",
    cta: "Schedule consultation",
  },
};

const dateInputClass =
  "h-11 w-full rounded-lg border border-white/12 bg-white/[.04] px-3.5 pr-9 text-sm text-white outline-none transition-colors focus:border-signal-teal/50 [color-scheme:dark]";

function DemoForm({ mode, onSubmitted }: { mode: ModalMode; onSubmitted: () => void }) {
  const [submitting, setSubmitting] = useState(false);
  const copy = modeCopy[mode];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      onSubmitted();
    }, 900);
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 sm:p-8">
      <div className="mb-6 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-signal-teal" />
        <span className="font-mono text-[11px] uppercase tracking-wide text-white/40">DSIP · {mode === "demo" ? "Demo request" : "Consultation"}</span>
      </div>
      <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">{copy.title}</h3>
      <p className="mt-2 text-sm text-white/55">{copy.sub}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <SelectField label="Industry" options={industries} />
        <TextField label="Organization" required type="text" placeholder="Acme Corp" />
        <SelectField label="Employees" options={employeeBands} />
        <TextField label="Work email" required type="email" placeholder="you@company.com" />
        <TextField label="Phone" type="tel" placeholder="+1 (555) 000-0000" />
        <label className="block">
          <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-wide text-white/40">Preferred date</span>
          <div className="relative">
            <input type="date" className={dateInputClass} />
            <Calendar className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/35" />
          </div>
        </label>
        <div className="sm:col-span-2">
          <SelectField label="Primary use case" options={useCases} />
        </div>
      </div>

      <Button type="submit" size="lg" disabled={submitting} className="mt-7 w-full justify-center">
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Submitting&hellip;
          </>
        ) : (
          copy.cta
        )}
      </Button>
      <p className="mt-3 text-center text-xs text-white/35">A KPMG specialist responds within one business day.</p>
    </form>
  );
}

function SuccessState({ mode, onClose }: { mode: ModalMode; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center px-8 py-16 text-center"
    >
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
        className="grid h-16 w-16 place-items-center rounded-full border border-signal-teal/40 bg-signal-teal/10"
      >
        <Check className="h-7 w-7 text-signal-teal" />
      </motion.div>
      <h3 className="mt-6 font-display text-2xl font-bold text-white">
        {mode === "demo" ? "Demo requested" : "Consultation scheduled"}
      </h3>
      <p className="mt-2 max-w-sm text-sm text-white/55">
        Your request has reached the DSIP team. Check your inbox for a confirmation and next steps shortly.
      </p>
      <Button variant="secondary" size="lg" onClick={onClose} className="mt-8">
        Done
      </Button>
    </motion.div>
  );
}

export function DemoModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<ModalMode>("demo");
  const [submitted, setSubmitted] = useState(false);

  const open = useCallback((m: ModalMode = "demo") => {
    setMode(m);
    setSubmitted(false);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  return (
    <DemoModalContext.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="dsip-panel relative w-full max-w-lg overflow-hidden !rounded-[20px]"
            >
              <motion.button
                onClick={close}
                aria-label="Close"
                whileHover={{ rotate: 90, scale: 1.06 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 350, damping: 18 }}
                className="absolute right-4 top-4 z-10 grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/[.04] text-white/50 hover:text-white"
              >
                <X className="h-4 w-4" />
              </motion.button>
              {submitted ? <SuccessState mode={mode} onClose={close} /> : <DemoForm mode={mode} onSubmitted={() => setSubmitted(true)} />}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </DemoModalContext.Provider>
  );
}
