import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import PageHeader from "@/components/pages/Support/PageHeader";
import FaqList from "@/components/pages/Support/Faq";

export const metadata: Metadata = {
  title: "FAQ — NovaMart",
};

export default function FaqPage() {
  const th = useTranslations("Store.help");

  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-8">
        <PageHeader title={th("faq.title")} subtitle={th("faq.subtitle")} />
        <FaqList />
      </div>
    </section>
  );
}
