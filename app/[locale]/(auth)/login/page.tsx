import type { Metadata } from "next";
import AuthShell from "@/components/pages/Auth/AuthShell";
import LoginBody from "@/components/pages/Auth/Login";

export const metadata: Metadata = {
  title: "Log in — NovaMart",
};

export default function LoginPage() {
  return (
    <AuthShell>
      <LoginBody />
    </AuthShell>
  );
}
