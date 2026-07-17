"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function TerminalWindow({
  title,
  children,
  className,
  liveLabel = "Live",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  liveLabel?: string;
}) {
  return (
    <div className={cn("dsip-panel overflow-hidden !rounded-[14px]", className)}>
      <div className="flex items-center justify-between border-b border-white/[.07] bg-white/[.02] px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-signal-red/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-signal-amber/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-signal-teal/70" />
        </div>
        <span className="font-mono text-[11px] text-white/40">{title}</span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide text-white/35">
          <span className="h-1.5 w-1.5 rounded-full bg-signal-teal" />
          {liveLabel}
        </span>
      </div>
      {children}
    </div>
  );
}
