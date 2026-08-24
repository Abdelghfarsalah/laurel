import type { Metadata } from "next";
import PrivacyBody from "@/components/pages/Support/Privacy";

export const metadata: Metadata = {
  title: "Privacy policy — NovaMart",
};

export default function PrivacyPage() {
  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8">
      <PrivacyBody />
    </section>
  );
}
