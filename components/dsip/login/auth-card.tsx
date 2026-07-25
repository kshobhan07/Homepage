"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button, Tag } from "../primitives/kit";
import { cn } from "@/lib/utils";

type Step = "credentials" | "mfa" | "success";

const inputClass =
  "h-12 w-full rounded-xl border border-white/12 bg-white/[.04] pl-10 pr-3 text-sm text-white placeholder:text-white/30 focus:border-signal-blue/50 focus:outline-none";

function MicrosoftMark() {
  return (
    <span className="grid h-4 w-4 grid-cols-2 grid-rows-2 gap-[1.5px]" aria-hidden>
      <span className="bg-[#f25022]" />
      <span className="bg-[#7fba00]" />
      <span className="bg-[#00a4ef]" />
      <span className="bg-[#ffb900]" />
    </span>
  );
}

function CredentialsStep({ onSubmit }: { onSubmit: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [forgotSent, setForgotSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      onSubmit();
    }, 700);
  }

  return (
    <div className="p-7 sm:p-9">
      <div className="mb-6 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-wide text-white/40">Enterprise login</span>
        <Tag tone="teal">
          <ShieldCheck className="mr-1 h-3 w-3" /> Encrypted
        </Tag>
      </div>

      <Button variant="secondary" className="w-full justify-center gap-2.5 !bg-white !text-[#1b1b1b] hover:!bg-white/90">
        <MicrosoftMark /> Continue with Microsoft SSO
      </Button>

      <div className="mt-3 grid grid-cols-2 gap-2.5">
        <Button variant="secondary" className="justify-center gap-2 text-xs">
          <span className="font-bold text-[#4285f4]">G</span> Google
        </Button>
        <Button variant="secondary" className="justify-center gap-2 text-xs">
          <span className="font-bold text-signal-teal">Okta</span>
        </Button>
      </div>

      <div className="my-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-white/10" />
        <span className="font-mono text-[10px] uppercase tracking-wide text-white/30">or continue with email</span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
          <input required type="email" placeholder="you@company.com" className={inputClass} />
        </div>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
          <input required type={showPassword ? "text" : "password"} placeholder="Password" className={cn(inputClass, "pr-10")} />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        <div className="flex items-center justify-between pt-1 text-xs">
          <label className="flex items-center gap-2 text-white/50">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-3.5 w-3.5 rounded border-white/20 bg-white/5 accent-[#1e6feb]"
            />
            Remember me
          </label>
          <button type="button" onClick={() => setForgotSent(true)} className="text-signal-teal hover:text-white">
            Forgot password?
          </button>
        </div>

        <AnimatePresence>
          {forgotSent ? (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden rounded-lg border border-signal-teal/25 bg-signal-teal/[.06] px-3 py-2 text-xs text-signal-teal"
            >
              If an account matches that email, a reset link is on its way.
            </motion.p>
          ) : null}
        </AnimatePresence>

        <Button type="submit" size="lg" disabled={loading} className="mt-2 w-full justify-center">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Sign in <ShieldCheck className="h-4 w-4" /></>}
        </Button>
      </form>
    </div>
  );
}

function MfaStep({ onBack, onVerified }: { onBack: () => void; onVerified: () => void }) {
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendIn, setResendIn] = useState(30);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  React.useEffect(() => {
    if (resendIn <= 0) return;
    const id = setTimeout(() => setResendIn((v) => v - 1), 1000);
    return () => clearTimeout(id);
  }, [resendIn]);

  function setDigit(i: number, v: string) {
    const clean = v.replace(/[^0-9]/g, "").slice(-1);
    const next = [...digits];
    next[i] = clean;
    setDigits(next);
    if (clean && i < 5) refs.current[i + 1]?.focus();
  }

  function onKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus();
  }

  const complete = digits.every((d) => d !== "");

  function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!complete) return;
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      onVerified();
    }, 700);
  }

  return (
    <div className="p-7 sm:p-9">
      <button onClick={onBack} className="mb-5 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-white/40 hover:text-white/70">
        <ArrowLeft className="h-3.5 w-3.5" /> Back
      </button>
      <div className="mb-2 flex items-center gap-2">
        <KeyRound className="h-4 w-4 text-signal-teal" />
        <span className="font-mono text-[11px] uppercase tracking-wide text-white/40">Multi-factor verification</span>
      </div>
      <h3 className="font-display text-xl font-bold text-white">Enter your one-time code</h3>
      <p className="mt-1.5 text-sm text-white/50">We sent a 6-digit code to your registered device.</p>

      <form onSubmit={handleVerify} className="mt-6">
        <div className="flex justify-between gap-2">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              value={d}
              onChange={(e) => setDigit(i, e.target.value)}
              onKeyDown={(e) => onKeyDown(i, e)}
              inputMode="numeric"
              maxLength={1}
              className="h-13 w-full rounded-xl border border-white/12 bg-white/[.04] text-center font-mono text-lg text-white focus:border-signal-blue/50 focus:outline-none"
              style={{ height: 52 }}
            />
          ))}
        </div>

        <Button type="submit" size="lg" disabled={!complete || loading} className="mt-6 w-full justify-center">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify & sign in"}
        </Button>
        <button
          type="button"
          disabled={resendIn > 0}
          onClick={() => setResendIn(30)}
          className="mt-4 w-full text-center text-xs text-white/40 disabled:opacity-50"
        >
          {resendIn > 0 ? `Resend code in ${resendIn}s` : "Resend code"}
        </button>
      </form>
    </div>
  );
}

function SuccessStep() {
  const router = useRouter();

  React.useEffect(() => {
    const id = window.setTimeout(() => router.push("/"), 1500);
    return () => clearTimeout(id);
  }, [router]);

  return (
    <div className="flex flex-col items-center px-8 py-14 text-center">
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="grid h-16 w-16 place-items-center rounded-full border border-signal-teal/40 bg-signal-teal/10"
      >
        <Check className="h-7 w-7 text-signal-teal" />
      </motion.div>
      <h3 className="mt-6 font-display text-2xl font-bold text-white">Access granted</h3>
      <p className="mt-2 flex items-center gap-2 text-sm text-white/50">
        <Loader2 className="h-3.5 w-3.5 animate-spin" /> Redirecting to your command center&hellip;
      </p>
    </div>
  );
}

export function AuthCard() {
  const [step, setStep] = useState<Step>("credentials");

  return (
    <div className="dsip-panel w-full max-w-md overflow-hidden !rounded-[22px]">
      <div className="border-b border-white/[.07] px-7 py-6 text-center sm:px-9">
        <div className="mx-auto flex w-fit items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-[6px] bg-white text-[10px] font-black tracking-tight text-kpmg">
            KPMG
          </span>
          <span className="h-4 w-px bg-white/15" />
          <span className="font-display text-[15px] font-semibold text-white">DSIP</span>
        </div>
        <h1 className="mt-4 font-display text-2xl font-bold text-white">Welcome to Digital Signals Insights Platform</h1>
        <p className="mt-1.5 text-sm text-white/50">Complete 360° protection against digital threats.</p>
        <Tag tone="teal" className="mt-3">
          <Sparkles className="mr-1 h-3 w-3" /> Powered by Gen AI
        </Tag>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.25 }}
        >
          {step === "credentials" ? <CredentialsStep onSubmit={() => setStep("mfa")} /> : null}
          {step === "mfa" ? <MfaStep onBack={() => setStep("credentials")} onVerified={() => setStep("success")} /> : null}
          {step === "success" ? <SuccessStep /> : null}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
