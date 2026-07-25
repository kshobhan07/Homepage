"use client";

import { useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "./hooks";

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

/** Cursor-attraction offset for buttons/icons — subtle pull toward the pointer. */
export function useMagnetic(strength = 0.35, max = 16) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

  function onMouseMove(e: React.MouseEvent) {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(clamp(relX * strength, -max, max));
    y.set(clamp(relY * strength, -max, max));
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return { ref, x: springX, y: springY, onMouseMove, onMouseLeave };
}

/** Cursor-following perspective tilt for cards/panels. */
export function useTilt(max = 5) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springRx = useSpring(rx, { stiffness: 220, damping: 22 });
  const springRy = useSpring(ry, { stiffness: 220, damping: 22 });

  function onMouseMove(e: React.MouseEvent) {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(clamp(px * max * 2, -max, max));
    rx.set(clamp(-py * max * 2, -max, max));
  }

  function onMouseLeave() {
    rx.set(0);
    ry.set(0);
  }

  return { ref, rotateX: springRx, rotateY: springRy, onMouseMove, onMouseLeave };
}
