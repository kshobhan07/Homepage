"use client";

import React from "react";
import { LatticeField } from "./primitives/lattice-field";
import { SignalRail } from "./primitives/signal-rail";
import { StatusBar } from "./primitives/status-bar";
import { Header } from "./sections/header";
import { Hero } from "./sections/hero";
import { CommandCenter } from "./sections/command-center";
import { AttackSurface } from "./sections/attack-surface";
import { AIAttackSurface } from "./sections/ai-asm";
import { ThreatIntel } from "./sections/threat-intel";
import { AICopilot } from "./sections/ai-copilot";
import { Modules } from "./sections/modules";
import { BrandProtection } from "./sections/brand-protection";
import { DarkWeb } from "./sections/dark-web";
import { VipDeepfake } from "./sections/vip-deepfake";
import { ThirdPartyRisk } from "./sections/third-party-risk";
import { AttackPath } from "./sections/attack-path";
import { KnowledgeGraph } from "./sections/knowledge-graph";
import { Architecture } from "./sections/architecture";
import { Impact } from "./sections/impact";
import { CTAFooter } from "./sections/cta-footer";

export function DSIPLanding() {
  return (
    <>
      <LatticeField />
      <Header />
      <SignalRail />
      <main className="pb-9">
        <Hero />
        <CommandCenter />
        <AttackSurface />
        <AIAttackSurface />
        <ThreatIntel />
        <AICopilot />
        <Modules />
        <BrandProtection />
        <DarkWeb />
        <VipDeepfake />
        <ThirdPartyRisk />
        <AttackPath />
        <KnowledgeGraph />
        <Architecture />
        <Impact />
        <CTAFooter />
      </main>
      <StatusBar />
    </>
  );
}
