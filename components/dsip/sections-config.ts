export type Tone = "blue" | "teal" | "amber" | "red" | "indigo";

export type SectionMeta = {
  id: string;
  index: string;
  label: string;
  tone: Tone;
};

export const SECTIONS: SectionMeta[] = [
  { id: "hero", index: "00", label: "Overview", tone: "blue" },
  { id: "command-center", index: "01", label: "Command Center", tone: "blue" },
  { id: "attack-surface", index: "02", label: "Attack Surface", tone: "teal" },
  { id: "ai-asm", index: "03", label: "AI Attack Surface", tone: "indigo" },
  { id: "threat-intel", index: "04", label: "Threat Intel", tone: "amber" },
  { id: "copilot", index: "05", label: "AI Copilot", tone: "indigo" },
  { id: "modules", index: "06", label: "Platform Modules", tone: "blue" },
  { id: "brand-protection", index: "07", label: "Brand Protection", tone: "amber" },
  { id: "dark-web", index: "08", label: "Dark Web", tone: "red" },
  { id: "vip", index: "09", label: "VIP & Deepfake", tone: "red" },
  { id: "third-party", index: "10", label: "Third-Party Risk", tone: "amber" },
  { id: "attack-path", index: "11", label: "Attack Simulation", tone: "red" },
  { id: "knowledge-graph", index: "12", label: "Knowledge Graph", tone: "teal" },
  { id: "architecture", index: "13", label: "Architecture", tone: "blue" },
  { id: "impact", index: "14", label: "Impact", tone: "teal" },
  { id: "contact", index: "15", label: "Request Access", tone: "blue" },
];
