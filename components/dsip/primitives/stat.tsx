"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView as useFramerInView, useMotionValue, useSpring } from "framer-motion";

export function StatCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useFramerInView(ref, { once: true, margin: "-40px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { damping: 30, stiffness: 90 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    const unsub = spring.on("change", (latest) => {
      setDisplay(latest.toFixed(decimals));
    });
    return unsub;
  }, [spring, decimals]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export function RadialGauge({
  value,
  max = 100,
  size = 88,
  stroke = 7,
  color = "#1e6feb",
  trackColor = "rgba(255,255,255,.08)",
  label,
}: {
  value: number;
  max?: number;
  size?: number;
  stroke?: number;
  color?: string;
  trackColor?: string;
  label?: string;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.max(0, Math.min(1, value / max));
  const offset = mounted ? circumference * (1 - pct) : circumference;

  return (
    <div className="relative inline-flex shrink-0 items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={trackColor} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.16,1,.3,1)" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="font-mono text-lg font-semibold leading-none">{Math.round(value)}</span>
        {label ? <span className="mt-1 font-mono text-[9px] uppercase tracking-wide text-white/40">{label}</span> : null}
      </div>
    </div>
  );
}
