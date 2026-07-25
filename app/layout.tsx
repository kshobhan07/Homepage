import type { Metadata, Viewport } from "next";
import { Inter, Barlow_Condensed, JetBrains_Mono } from "next/font/google";
import { CursorGlow } from "@/components/dsip/primitives/cursor-glow";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const condensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-condensed",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DSIP — Digital Signals Insights Platform | KPMG",
  description:
    "Complete 360° protection against digital threats, powered by Gen AI. DSIP unifies attack surface management, brand protection, threat intelligence and dark web monitoring into one AI-native platform — built by KPMG.",
  metadataBase: new URL("https://dsip.kpmg.com"),
};

export const viewport: Viewport = {
  themeColor: "#050b18",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${condensed.variable} ${mono.variable}`}>
      <body>
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
