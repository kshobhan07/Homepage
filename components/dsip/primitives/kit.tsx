"use client";

import React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMagnetic, useTilt } from "./magnetic";

export function Panel({
  children,
  className,
  tilt = true,
}: {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
}) {
  const { ref, rotateX, rotateY, onMouseMove: onTiltMove, onMouseLeave } = useTilt(3.5);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(480px circle at ${mx}% ${my}%, rgba(30,111,235,.16), transparent 68%)`;

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    onTiltMove(e);
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width) * 100);
    my.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  return (
    <motion.div
      ref={ref as React.Ref<HTMLDivElement>}
      onMouseMove={tilt ? handleMove : undefined}
      onMouseLeave={tilt ? onMouseLeave : undefined}
      style={tilt ? { rotateX, rotateY, transformPerspective: 1000 } : undefined}
      className={cn("dsip-panel group relative overflow-hidden", className)}
    >
      {tilt ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: spotlight }}
        />
      ) : null}
      <div className="relative z-[1]">{children}</div>
    </motion.div>
  );
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
    indigo: "border-signal-indigo/30 bg-signal-indigo/10 text-[#8fbdf5]",
  };
  return (
    <motion.span
      whileHover={{ scale: 1.045, y: -1 }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.08em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </motion.span>
  );
}

export function PulseDot({ tone = "teal", className }: { tone?: "teal" | "red" | "amber" | "blue"; className?: string }) {
  const colors: Record<string, string> = {
    teal: "#22d3ee",
    red: "#e23a4e",
    amber: "#f2a93b",
    blue: "#1e6feb",
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

type ButtonOwnProps = {
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "lg" | "icon";
  href?: string;
  magnetic?: boolean;
};

export function Button({
  children,
  className,
  variant = "primary",
  size = "default",
  href,
  magnetic = true,
  ...props
}: ButtonOwnProps & (React.ButtonHTMLAttributes<HTMLButtonElement> | React.AnchorHTMLAttributes<HTMLAnchorElement>)) {
  const { ref, x, y, onMouseMove, onMouseLeave } = useMagnetic(0.25, 10);
  const variants: Record<string, string> = {
    primary:
      "bg-signal-blue text-white shadow-[0_0_0_1px_rgba(30,111,235,.4),0_20px_50px_-12px_rgba(30,111,235,.6)] hover:bg-[#3a83f0]",
    secondary: "border border-white/15 bg-white/[.04] text-white/85 hover:border-white/30 hover:bg-white/[.08]",
    ghost: "text-white/70 hover:bg-white/[.06] hover:text-white",
  };
  const sizes: Record<string, string> = {
    default: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-sm",
    icon: "h-10 w-10",
  };
  const classes = cn(
    "relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full font-medium disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );

  const shine =
    variant === "primary" ? (
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-0 w-1/3 -skew-x-12 bg-white/25 blur-sm"
        initial={{ x: "-160%" }}
        whileHover={{ x: "360%" }}
        transition={{ duration: 0.65, ease: "easeInOut" }}
      />
    ) : null;

  const motionProps = magnetic
    ? {
        style: { x, y },
        onMouseMove,
        onMouseLeave,
        whileTap: { scale: 0.94 },
        transition: { type: "spring" as const, stiffness: 400, damping: 15 },
      }
    : { whileTap: { scale: 0.94 }, transition: { type: "spring" as const, stiffness: 400, damping: 15 } };

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        {...motionProps}
        {...(props as Record<string, unknown>)}
      >
        {shine}
        <span className="relative z-[1] inline-flex items-center gap-2">{children}</span>
      </motion.a>
    );
  }
  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      {...motionProps}
      {...(props as Record<string, unknown>)}
    >
      {shine}
      <span className="relative z-[1] inline-flex items-center gap-2">{children}</span>
    </motion.button>
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
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-white/45"
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", dotTone[tone])} />
      <span>{index}</span>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="h-px w-8 origin-left bg-white/15"
      />
      <span>{label}</span>
    </motion.div>
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
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-balance font-display text-4xl font-bold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]"
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={cn("mt-4 max-w-xl text-[15px] leading-7 text-white/55", align === "center" && "mx-auto")}
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  );
}
