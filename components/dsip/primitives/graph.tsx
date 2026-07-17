"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function GraphSurface({
  viewBox,
  children,
  className,
}: {
  viewBox: string;
  children: React.ReactNode;
  className?: string;
}) {
  const markerId = React.useId().replace(/[:]/g, "");
  return (
    <svg viewBox={viewBox} className={cn("h-full w-full", className)}>
      <defs>
        <pattern id={`grid-${markerId}`} width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M 28 0 L 0 0 0 28" fill="none" stroke="rgba(255,255,255,.05)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#grid-${markerId})`} />
      {children}
    </svg>
  );
}

export function GraphEdge({
  x1,
  y1,
  x2,
  y2,
  color = "rgba(255,255,255,.16)",
  animated = false,
  width = 1.4,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  animated?: boolean;
  width?: number;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={color}
      strokeWidth={width}
      className={animated ? "dsip-edge-flow" : undefined}
    />
  );
}

export function GraphNode({
  x,
  y,
  width = 168,
  height = 52,
  color = "#2f6fed",
  critical = false,
  children,
}: {
  x: number;
  y: number;
  width?: number;
  height?: number;
  color?: string;
  critical?: boolean;
  children: React.ReactNode;
}) {
  return (
    <foreignObject x={x - width / 2} y={y - height / 2} width={width} height={height} style={{ overflow: "visible" }}>
      <div
        className={cn(
          "flex h-full w-full flex-col justify-center rounded-[10px] border px-3 py-2 backdrop-blur-sm",
          critical ? "bg-signal-red/[.12]" : "bg-[#0a0e16]/95",
        )}
        style={{ borderColor: color, boxShadow: `0 0 26px ${color}25` }}
      >
        {children}
      </div>
    </foreignObject>
  );
}
