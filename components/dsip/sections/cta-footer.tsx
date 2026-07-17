"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Fingerprint, LockKeyhole } from "lucide-react";
import { Button, Panel } from "../primitives/kit";

const footerColumns = [
  ["Product", ["Overview", "Platform modules", "Intellicore AI", "Architecture"]],
  ["Risk domains", ["Attack surface", "AI attack surface", "Dark web", "Brand protection", "Third-party risk"]],
  ["Company", ["KPMG India", "Contact", "Privacy"]],
] as const;

function RequestAccessPanel() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <Panel className="relative mx-auto max-w-2xl overflow-hidden !rounded-[16px] p-0">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(47,111,237,.28),transparent_70%)]" />
      <div className="flex items-center justify-between border-b border-white/[.07] px-5 py-3.5">
        <span className="font-mono text-[11px] uppercase tracking-wide text-white/45">secure-access.request</span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide text-white/35">
          <LockKeyhole className="h-3 w-3" /> Encrypted
        </span>
      </div>
      <div className="p-8 text-center sm:p-12">
        <h2 className="text-balance font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          Secure your digital perimeter with DSIP
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/58">
          Get in touch with KPMG professionals to identify, assess and respond to emerging digital risks with
          tailored strategies and actionable intelligence.
        </p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-8 flex max-w-sm items-center justify-center gap-2 rounded-full border border-signal-teal/30 bg-signal-teal/10 px-5 py-3 font-mono text-sm text-signal-teal"
          >
            <Check className="h-4 w-4" /> Request received — a specialist will follow up shortly.
          </motion.div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Work email address"
              className="h-12 flex-1 rounded-full border border-white/15 bg-white/[.04] px-5 text-sm text-white placeholder:text-white/35 focus:border-signal-blue/50 focus:outline-none"
            />
            <Button size="lg" type="submit">
              Request access <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        )}
      </div>
    </Panel>
  );
}

export function CTAFooter() {
  return (
    <>
      <section id="contact" className="mx-auto max-w-[1128px] px-5 py-24 sm:px-8">
        <RequestAccessPanel />
      </section>
      <footer className="border-t border-white/[.07] px-5 py-12 sm:px-8">
        <div className="mx-auto grid max-w-[1128px] gap-8 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Fingerprint className="h-5 w-5 text-signal-blue" />
              <span className="font-display font-semibold text-white">KPMG DSIP</span>
            </div>
            <p className="max-w-xs text-sm leading-6 text-white/45">
              Digital Signals Intelligence Platform for AI-powered cyber, brand and external risk operations.
            </p>
          </div>
          {footerColumns.map(([title, items]) => (
            <div key={title}>
              <h4 className="mb-3 font-mono text-xs uppercase tracking-wide text-white/60">{title}</h4>
              <div className="space-y-2">
                {items.map((item) => (
                  <a key={item} href="#" className="block text-sm text-white/45 hover:text-white/80">
                    {item}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-[1128px] border-t border-white/[.06] pt-6 font-mono text-[11px] text-white/30">
          © {new Date().getFullYear()} KPMG. Digital Signals Intelligence Platform. All rights reserved.
        </div>
      </footer>
    </>
  );
}
