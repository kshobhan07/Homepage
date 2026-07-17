"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { KeyRound, MessageCircle, ShoppingBag, StickyNote } from "lucide-react";
import { SectionHeading } from "../primitives/kit";
import { TerminalWindow } from "../primitives/terminal";
import { cn } from "@/lib/utils";

const feed = [
  {
    Icon: KeyRound,
    source: "Credential dump",
    detail: "2,140 credentials matching corporate domain found in a combolist.",
    reveal: "j.patel@acme-corp.com : ••••••••2091",
    time: "12m ago",
  },
  {
    Icon: MessageCircle,
    source: "Telegram channel",
    detail: "Access broker offering VPN credentials for sale, referencing your ASN.",
    reveal: "listing #4471 : vpn-admin@acme-corp.com",
    time: "48m ago",
  },
  {
    Icon: ShoppingBag,
    source: "Marketplace listing",
    detail: "Database dump advertised, allegedly sourced from a third-party vendor.",
    reveal: "sample row : 8842-●●●●-9910 : rotated",
    time: "2h ago",
  },
  {
    Icon: StickyNote,
    source: "Paste site",
    detail: "Internal configuration file with hardcoded API keys posted publicly.",
    reveal: "AKIA●●●●●●●●●●●●2F91 : revoked",
    time: "5h ago",
  },
];

function LeakFeed() {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <TerminalWindow title="darkweb-intel — monitoring session" liveLabel="Streaming" className="mx-auto max-w-3xl">
      <div className="dsip-scanlines divide-y divide-white/[.06]">
        {feed.map((item, i) => (
          <motion.div
            key={item.source}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            onMouseEnter={() => setHovered(item.source)}
            onMouseLeave={() => setHovered(null)}
            className="flex items-start gap-4 px-5 py-4"
          >
            <div className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-[8px] border border-white/10 bg-white/[.04]">
              <item.Icon className="h-4 w-4 text-signal-red" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-white/90">{item.source}</p>
                <span className="shrink-0 font-mono text-[10px] text-white/35">{item.time}</span>
              </div>
              <p className="mt-1 text-sm text-white/55">{item.detail}</p>
              <p
                className={cn(
                  "mt-1.5 font-mono text-[11px] text-signal-teal/70 blur-[5px] transition-all duration-300 select-none",
                  hovered === item.source && "blur-none",
                )}
              >
                {item.reveal}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="flex items-center gap-2 border-t border-white/[.07] px-5 py-3 font-mono text-[11px] text-white/35">
        <span className="text-signal-teal">$</span>
        <span>listening on 1,900+ sources</span>
        <span className="dsip-caret" />
      </div>
    </TerminalWindow>
  );
}

export function DarkWeb() {
  return (
    <section id="dark-web" className="mx-auto max-w-[1128px] px-5 py-24 sm:px-8">
      <SectionHeading
        index="05"
        align="center"
        kicker="Dark Web Intelligence"
        tone="red"
        title="Criminal chatter, turned into business context"
        description="Forums, Telegram, paste sites and marketplaces monitored continuously. Hover a finding to reveal the matched signal."
      />
      <LeakFeed />
    </section>
  );
}
