import type { Metadata } from "next";
import TermsBody from "@/components/pages/Support/Terms";

export const metadata: Metadata = {
  title: "Terms of service — NovaMart",
};

export default function TermsPage() {
  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8">
      <TermsBody />
    </section>
  );
}
