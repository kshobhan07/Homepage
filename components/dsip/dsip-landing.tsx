"use client";

import React from "react";
import { LatticeField } from "./primitives/lattice-field";
import { SignalRail } from "./primitives/signal-rail";
import { StatusBar } from "./primitives/status-bar";
import { DemoModalProvider } from "./primitives/demo-modal";
import { EntryLoader } from "./primitives/entry-loader";
import { Header } from "./sections/header";
import { Hero } from "./sections/hero";
import { Differentiators } from "./sections/differentiators";
import { AttackSurface } from "./sections/attack-surface";
import { Intellicore } from "./sections/intellicore";
import { BrandProtection } from "./sections/brand-protection";
import { DarkWeb } from "./sections/dark-web";
import { VipDeepfake } from "./sections/vip-deepfake";
import { ThirdPartyRisk } from "./sections/third-party-risk";
import { Architecture } from "./sections/architecture";
import { PlatformSnapshot } from "./sections/platform-snapshot";
import { Contact } from "./sections/contact";
import { Footer } from "./sections/footer";

export function DSIPLanding() {
  return (
    <DemoModalProvider>
      <EntryLoader />
      <LatticeField />
      <Header />
      <SignalRail />
      <main className="pb-9">
        <Hero />
        <Differentiators />
        <AttackSurface />
        <Intellicore />
        <BrandProtection />
        <DarkWeb />
        <VipDeepfake />
        <ThirdPartyRisk />
        <Architecture />
        <PlatformSnapshot />
        <Contact />
      </main>
      <Footer />
      <StatusBar />
    </DemoModalProvider>
  );
}
