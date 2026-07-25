"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export function useChangeLanguage() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (newLocale: "en" | "ar") => {
    router.replace(pathname, { locale: newLocale });
  };

  return {
    locale,
    changeLanguage,
  };
}