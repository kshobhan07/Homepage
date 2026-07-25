"use client";

import React from "react";
import { motion } from "framer-motion";
import { LoginBackdrop } from "./login-backdrop";
import { AuthCard } from "./auth-card";

export function LoginExperience() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-16">
      <LoginBackdrop />
      <a
        href="/"
        className="absolute left-6 top-6 z-10 font-mono text-xs uppercase tracking-wide text-white/40 hover:text-white/70"
      >
        &larr; Back to dsip.kpmg.com
      </a>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        <AuthCard />
        <p className="mx-auto mt-6 max-w-md text-center text-xs leading-relaxed text-white/30">
          By signing in you agree to KPMG&rsquo;s acceptable use policy. Access is logged and monitored for your
          organization&rsquo;s security.
        </p>
      </motion.div>
    </div>
  );
}
