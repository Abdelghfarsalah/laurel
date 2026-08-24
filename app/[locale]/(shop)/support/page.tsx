import type { Metadata } from "next";
import SupportHub from "@/components/pages/Support/Hub";

export const metadata: Metadata = {
  title: "Support — NovaMart",
};

export default function SupportPage() {
  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8">
      <SupportHub />
    </section>
  );
}
