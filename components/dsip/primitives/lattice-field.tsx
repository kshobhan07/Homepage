"use client";

import React, { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "./hooks";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

type Pulse = {
  from: number;
  to: number;
  t: number;
  speed: number;
};

/**
 * The page's connective tissue: a dim mesh of drifting nodes with occasional
 * signal pulses traveling between them, fixed behind every section. It is the
 * one visual thread that ties the whole scroll together — "signals in motion".
 */
export function LatticeField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let raf = 0;
    let linkDistance = 190;

    function seed() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = width < 640 ? 26 : width < 1024 ? 40 : 58;
      linkDistance = width < 640 ? 140 : 190;
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
      }));
      pulses = Array.from({ length: 5 }, () => spawnPulse());
    }

    function spawnPulse(): Pulse {
      const from = Math.floor(Math.random() * nodes.length);
      const to = Math.floor(Math.random() * nodes.length);
      return { from, to, t: 0, speed: 0.004 + Math.random() * 0.006 };
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDistance) {
            const alpha = (1 - dist / linkDistance) * 0.14;
            ctx!.strokeStyle = `rgba(140,160,200,${alpha})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx!.fillStyle = "rgba(170,190,230,.35)";
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, 1.3, 0, Math.PI * 2);
        ctx!.fill();
      }

      if (!reduced) {
        for (const p of pulses) {
          const a = nodes[p.from];
          const b = nodes[p.to];
          if (!a || !b) continue;
          const x = a.x + (b.x - a.x) * p.t;
          const y = a.y + (b.y - a.y) * p.t;
          const grd = ctx!.createRadialGradient(x, y, 0, x, y, 5);
          grd.addColorStop(0, "rgba(34,211,238,.9)");
          grd.addColorStop(1, "rgba(34,211,238,0)");
          ctx!.fillStyle = grd;
          ctx!.beginPath();
          ctx!.arc(x, y, 5, 0, Math.PI * 2);
          ctx!.fill();
        }
      }
    }

    function step() {
      if (!reduced) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
        }
        for (const p of pulses) {
          p.t += p.speed;
          if (p.t >= 1) {
            const next = spawnPulse();
            p.from = next.from;
            p.to = next.to;
            p.t = 0;
            p.speed = next.speed;
          }
        }
      }
      draw();
      raf = requestAnimationFrame(step);
    }

    seed();
    step();

    function handleResize() {
      seed();
    }
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className ?? "pointer-events-none fixed inset-0 -z-10 opacity-70"}
    />
  );
}
