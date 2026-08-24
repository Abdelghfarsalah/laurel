import { Store } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AuthShell({ children }: { children: React.ReactNode }) {
  const t = useTranslations("Store.auth");

  return (
    <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-neutral-l-grey/20 bg-background shadow-xl md:grid-cols-[1fr_1.2fr]">
      <aside className="relative hidden flex-col justify-between bg-gradient-to-br from-brand-primary to-shade-s2 p-10 text-white md:flex">
        <div
          aria-hidden
          className="pointer-events-none absolute -end-20 -top-20 size-64 rounded-full bg-white/10"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -start-16 size-72 rounded-full bg-black/10"
        />
        <div className="relative flex items-center gap-2 text-xl font-bold">
          <span className="grid size-9 place-items-center rounded-xl bg-white/15">
            <Store className="size-5" />
          </span>
          NovaMart
        </div>
        <div className="relative space-y-3">
          <h2 className="text-3xl font-bold leading-snug whitespace-pre-line">
            {t("brandTitle")}
          </h2>
          <p className="text-sm leading-relaxed text-white/85">{t("brandText")}</p>
        </div>
      </aside>

      <section className="p-6 sm:p-10">{children}</section>
    </div>
  );
}
