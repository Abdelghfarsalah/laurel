import type { Metadata } from "next";
import ContactBody from "@/components/pages/Contact/Body";

export const metadata: Metadata = {
  title: "Contact — NovaMart",
};

export default function ContactPage() {
  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8">
      <ContactBody />
    </section>
  );
}
