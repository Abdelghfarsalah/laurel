import { useTranslations } from "next-intl";
import { FileCheck2, ShieldCheck } from "lucide-react";
import PageHeader from "@/components/pages/Support/PageHeader";

export default function PrivacyBody() {
  const t = useTranslations("Store.support");
  const th = useTranslations("Store.help");

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <PageHeader title={th("privacy.title")} subtitle={th("privacy.subtitle")} />
      <div className="space-y-4">
        {[
          { icon: ShieldCheck, body: t("privacyBody1") },
          { icon: FileCheck2, body: t("privacyBody2") },
        ].map(({ icon: Icon, body }, i) => (
          <div
            key={i}
            className="flex items-start gap-4 rounded-3xl border border-neutral-l-grey/20 bg-background p-8"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-tint-t5 text-brand-primary dark:bg-shade-s5/40">
              <Icon className="size-5" />
            </span>
            <p className="text-sm leading-relaxed text-neutral-d-grey dark:text-neutral-l-grey">
              {body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
