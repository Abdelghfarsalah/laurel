import type { Metadata } from "next";
import AuthShell from "@/components/pages/Auth/AuthShell";
import RegisterBody from "@/components/pages/Auth/Register";

export const metadata: Metadata = {
  title: "Create account — NovaMart",
};

export default function RegisterPage() {
  return (
    <AuthShell>
      <RegisterBody />
    </AuthShell>
  );
}
