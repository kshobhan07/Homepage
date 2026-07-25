"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "./hooks";

const INTERACTIVE_SELECTOR = "a, button, input, select, textarea, [data-cursor-hover], [role='button']";

export function CursorGlow() {
  const reduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.5 });
  const visible = useRef(false);

  useEffect(() => {
    const canHover = window.matchMedia("(pointer: fine)").matches;
    if (!canHover || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add("dsip-cursor-none");

    function onMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible.current) visible.current = true;
    }
    function onOver(e: MouseEvent) {
      const target = e.target as Element | null;
      setHovering(!!target?.closest(INTERACTIVE_SELECTOR));
    }
    function onDown() {
      setPressed(true);
    }
    function onUp() {
      setPressed(false);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      document.documentElement.classList.remove("dsip-cursor-none");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[999] h-2 w-2 rounded-full bg-signal-teal mix-blend-screen"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[998] rounded-full border border-signal-blue/50"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 52 : 32,
          height: hovering ? 52 : 32,
          opacity: pressed ? 0.4 : 0.7,
          borderColor: hovering ? "rgba(34,211,238,.7)" : "rgba(30,111,235,.5)",
          backgroundColor: hovering ? "rgba(34,211,238,.08)" : "rgba(30,111,235,.04)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      />
    </>
  );
}
