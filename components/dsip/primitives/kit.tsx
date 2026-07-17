"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function Panel({
  children,
  className,
  as: As = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  return <As className={cn("dsip-panel", className)}>{children}</As>;
}

export function Tag({
  children,
  className,
  tone = "neutral",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "neutral" | "blue" | "teal" | "amber" | "red" | "indigo";
}) {
  const tones: Record<string, string> = {
    neutral: "border-white/12 bg-white/[.04] text-white/60",
    blue: "border-signal-blue/30 bg-signal-blue/10 text-[#7fa6ff]",
    teal: "border-signal-teal/30 bg-signal-teal/10 text-signal-teal",
    amber: "border-signal-amber/30 bg-signal-amber/10 text-signal-amber",
    red: "border-signal-red/30 bg-signal-red/10 text-signal-red",
    indigo: "border-signal-indigo/30 bg-signal-indigo/10 text-[#a7b0f9]",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.08em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function PulseDot({ tone = "teal", className }: { tone?: "teal" | "red" | "amber" | "blue"; className?: string }) {
  const colors: Record<string, string> = {
    teal: "#2ee6b8",
    red: "#ff4d5e",
    amber: "#f5a623",
    blue: "#2f6fed",
  };
  return (
    <span className={cn("relative inline-flex h-2 w-2 shrink-0", className)} aria-hidden>
      <span
        className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
        style={{ background: colors[tone] }}
      />
      <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: colors[tone] }} />
    </span>
  );
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "default",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "lg" | "icon";
}) {
  const variants: Record<string, string> = {
    primary:
      "bg-signal-blue text-white shadow-[0_0_0_1px_rgba(47,111,237,.4),0_20px_50px_-12px_rgba(47,111,237,.6)] hover:bg-[#4a80f2]",
    secondary: "border border-white/15 bg-white/[.04] text-white/85 hover:bg-white/[.08]",
    ghost: "text-white/70 hover:bg-white/[.06] hover:text-white",
  };
  const sizes: Record<string, string> = {
    default: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-sm",
    icon: "h-10 w-10",
  };
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-200 active:scale-[.97] disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function SectionKicker({
  index,
  label,
  tone = "blue",
}: {
  index: string;
  label: string;
  tone?: "blue" | "teal" | "amber" | "red" | "indigo";
}) {
  const dotTone: Record<string, string> = {
    blue: "bg-signal-blue",
    teal: "bg-signal-teal",
    amber: "bg-signal-amber",
    red: "bg-signal-red",
    indigo: "bg-signal-indigo",
  };
  return (
    <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-white/45">
      <span className={cn("h-1.5 w-1.5 rounded-full", dotTone[tone])} />
      <span>{index}</span>
      <span className="h-px w-8 bg-white/15" />
      <span>{label}</span>
    </div>
  );
}

export function SectionHeading({
  index,
  kicker,
  title,
  description,
  tone = "blue",
  align = "left",
}: {
  index: string;
  kicker: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  tone?: "blue" | "teal" | "amber" | "red" | "indigo";
  align?: "left" | "center";
}) {
  return (
    <div className={cn("mb-12 max-w-3xl", align === "center" && "mx-auto text-center")}>
      <SectionKicker index={index} label={kicker} tone={tone} />
      <h2 className="text-balance font-display text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {description ? (
        <p className={cn("mt-4 max-w-xl text-[15px] leading-7 text-white/55", align === "center" && "mx-auto")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
