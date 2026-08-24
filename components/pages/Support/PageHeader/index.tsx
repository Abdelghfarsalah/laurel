import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  const t = useTranslations("Store.help");

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/support"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-grey transition-colors hover:text-brand-primary"
      >
        <ArrowLeft className="size-4 rtl:-scale-x-100" />
        {t("backToSupport")}
      </Link>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-neutral-black sm:text-4xl dark:text-neutral-white">
        {title}
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-neutral-grey sm:text-base">{subtitle}</p>
    </div>
  );
}
