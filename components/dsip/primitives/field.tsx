"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

function FieldShell({
  label,
  focused,
  setFocused,
  children,
}: {
  label: string;
  focused: boolean;
  setFocused: (v: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="block" onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
      <motion.span
        animate={{ color: focused ? "#22d3ee" : "rgba(255,255,255,.4)" }}
        className="mb-1.5 block font-mono text-[10px] uppercase tracking-wide"
      >
        {label}
      </motion.span>
      <div className="relative">
        {children}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-signal-blue/60"
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: focused ? 1 : 0, scale: focused ? 1 : 0.985 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ boxShadow: focused ? "0 0 0 4px rgba(34,211,238,.12)" : "none" }}
        />
      </div>
    </label>
  );
}

const baseInput =
  "h-11 w-full rounded-lg border border-white/12 bg-white/[.04] px-3.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-signal-teal/50";

export function TextField({
  label,
  className,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const [focused, setFocused] = useState(false);
  return (
    <FieldShell label={label} focused={focused} setFocused={setFocused}>
      <input {...props} className={cn(baseInput, className)} />
    </FieldShell>
  );
}

export function TextAreaField({
  label,
  className,
  ...props
}: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const [focused, setFocused] = useState(false);
  return (
    <FieldShell label={label} focused={focused} setFocused={setFocused}>
      <textarea {...props} className={cn(baseInput, "h-auto resize-none py-2.5", className)} />
    </FieldShell>
  );
}

export function SelectField({
  label,
  options,
  required = true,
  className,
  ...props
}: {
  label: string;
  options: string[];
  required?: boolean;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const [focused, setFocused] = useState(false);
  return (
    <FieldShell label={label} focused={focused} setFocused={setFocused}>
      <div className="relative">
        <select
          required={required}
          defaultValue=""
          {...props}
          className={cn(baseInput, "appearance-none pr-9 text-white/85", className)}
        >
          <option value="" disabled>
            Select&hellip;
          </option>
          {options.map((o) => (
            <option key={o} value={o} className="bg-[#0a1428]">
              {o}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/35" />
      </div>
    </FieldShell>
  );
}
