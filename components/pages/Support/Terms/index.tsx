import { useTranslations } from "next-intl";
import PageHeader from "@/components/pages/Support/PageHeader";

export default function TermsBody() {
  const t = useTranslations("Store.support");
  const th = useTranslations("Store.help");

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <PageHeader title={th("terms.title")} subtitle={th("terms.subtitle")} />
      <div className="rounded-3xl border border-neutral-l-grey/20 bg-background p-8">
        <p className="text-sm leading-relaxed text-neutral-d-grey dark:text-neutral-l-grey">
          {t("termsIntro")}
        </p>
        <ol className="mt-6 list-inside list-decimal space-y-4 marker:font-semibold marker:text-brand-primary">
          {[1, 2, 3, 4].map((n) => (
            <li
              key={n}
              className="ps-2 text-sm leading-relaxed text-neutral-d-grey dark:text-neutral-l-grey"
            >
              {t(`termsItem${n}`)}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
