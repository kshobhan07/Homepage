import type { Metadata } from "next";
import { LoginExperience } from "@/components/dsip/login/login-experience";

export const metadata: Metadata = {
  title: "Sign in — DSIP | KPMG",
  description: "Enterprise sign-in for KPMG's Digital Signals Insights Platform.",
};

export default function LoginPage() {
  return <LoginExperience />;
}
