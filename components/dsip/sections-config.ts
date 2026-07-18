export type Tone = "blue" | "teal" | "amber" | "red" | "indigo";

export type SectionMeta = {
  id: string;
  index: string;
  label: string;
  tone: Tone;
};

export const SECTIONS: SectionMeta[] = [
  { id: "hero", index: "00", label: "Overview", tone: "blue" },
  { id: "differentiators", index: "01", label: "Why DSIP", tone: "blue" },
  { id: "attack-surface", index: "02", label: "Attack Surface", tone: "teal" },
  { id: "intellicore", index: "03", label: "Intellicore AI", tone: "indigo" },
  { id: "brand-protection", index: "04", label: "Brand Protection", tone: "amber" },
  { id: "dark-web", index: "05", label: "Dark Web", tone: "red" },
  { id: "vip", index: "06", label: "VIP & Deepfake", tone: "red" },
  { id: "third-party", index: "07", label: "Third-Party Risk", tone: "amber" },
  { id: "architecture", index: "08", label: "Our Approach", tone: "blue" },
  { id: "platform-snapshot", index: "09", label: "Platform Snapshot", tone: "teal" },
  { id: "contact", index: "10", label: "Request Access", tone: "blue" },
];
