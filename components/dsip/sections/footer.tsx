"use client";

import React from "react";
import { Fingerprint } from "lucide-react";

const footerColumns = [
  ["Product", ["Why DSIP", "Intellicore AI", "Our approach", "Platform snapshot"]],
  ["Risk domains", ["Attack surface", "Brand protection", "Dark web", "VIP & deepfake", "Third-party risk"]],
  ["Company", ["KPMG India", "Contact", "Privacy"]],
] as const;

export function Footer() {
  return (
    <footer className="border-t border-white/[.07] px-5 py-12 sm:px-8">
      <div className="mx-auto grid max-w-[1128px] gap-8 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <Fingerprint className="h-5 w-5 text-signal-blue" />
            <span className="font-display font-semibold text-white">KPMG DSIP</span>
          </div>
          <p className="max-w-xs text-sm leading-6 text-white/45">
            Digital Signals Insights Platform — complete 360° protection against digital threats, powered by
            Gen AI.
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
      <div className="mx-auto mt-10 flex max-w-[1128px] flex-col gap-2 border-t border-white/[.06] pt-6 font-mono text-[11px] text-white/30 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} KPMG. Digital Signals Insights Platform. All rights reserved.</span>
        <span>Powered on Microsoft Azure</span>
      </div>
    </footer>
  );
}
