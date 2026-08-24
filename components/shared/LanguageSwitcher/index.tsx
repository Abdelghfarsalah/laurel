"use client";

import { useTranslations } from "next-intl";
import { Languages } from "lucide-react";
import { useChangeLanguage } from "@/hooks/useChangeLanguage";

export default function LanguageSwitcher() {
  const t = useTranslations("Store.language");
  const { locale, changeLanguage } = useChangeLanguage();
  const nextLocale = locale === "en" ? "ar" : "en";

  return (
    <button
      onClick={() => changeLanguage(nextLocale)}
      aria-label={t("switch")}
      title={t("switch")}
      className="flex h-10 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-neutral-d-grey transition-colors hover:bg-tint-t5 dark:text-neutral-l-grey dark:hover:bg-white/10"
    >
      <Languages className="size-5" />
      <span>{locale === "en" ? "عربي" : "EN"}</span>
    </button>
  );
}
