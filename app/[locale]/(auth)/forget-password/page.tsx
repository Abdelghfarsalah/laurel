import type { Metadata } from "next";
import AuthShell from "@/components/pages/Auth/AuthShell";
import ForgotPasswordBody from "@/components/pages/Auth/ForgotPassword";

export const metadata: Metadata = {
  title: "Reset password — NovaMart",
};

export default function ForgetPasswordPage() {
  return (
    <AuthShell>
      <ForgotPasswordBody />
    </AuthShell>
  );
}
