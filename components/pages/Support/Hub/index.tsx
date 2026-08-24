"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  HelpCircle,
  Mail,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Link } from "@/i18n/navigation";

const TOPICS = [
  { href: "/faq", labelKey: "faq", descPrefix: "faq", icon: HelpCircle },
  { href: "/shipping-returns", labelKey: "shipping", descPrefix: "shipping", icon: Truck },
  { href: "/terms", labelKey: "terms", descPrefix: "terms", icon: FileText },
  { href: "/privacy", labelKey: "privacy", descPrefix: "privacy", icon: ShieldCheck },
] as const;

export default function SupportHub() {
  const t = useTranslations("Store.support");
  const th = useTranslations("Store.help");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="mx-auto max-w-5xl space-y-12"
    >
      <header className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-black sm:text-4xl dark:text-neutral-white">
          {t("title")}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-neutral-grey sm:text-base">
          {t("subtitle")}
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {TOPICS.map(({ href, labelKey, descPrefix, icon: Icon }, i) => (
          <motion.div
            key={href}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
          >
            <Link
              href={href}
              className="group flex h-full items-start gap-4 rounded-3xl border border-neutral-l-grey/20 bg-background p-6 transition-all hover:-translate-y-0.5 hover:border-brand-primary/40 hover:shadow-lg"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-tint-t5 text-brand-primary dark:bg-shade-s5/40">
                <Icon className="size-5" />
              </span>
              <span className="flex-1">
                <span className="flex items-center justify-between gap-2 font-semibold text-neutral-black dark:text-neutral-white">
                  {t(labelKey)}
                  <ArrowRight className="size-4 text-brand-primary transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-neutral-grey">
                  {th(`${descPrefix}.subtitle`)}
                </span>
              </span>
            </Link>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.24 }}
          className="sm:col-span-2"
        >
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-gradient-to-br from-brand-primary to-shade-s2 p-8 text-white sm:flex-row sm:items-center">
            <div className="flex items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white/15">
                <Mail className="size-5" />
              </span>
              <div>
                <h2 className="text-xl font-bold">{t("contactCtaTitle")}</h2>
                <p className="mt-1 text-sm text-white/85">{t("contactCtaText")}</p>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-shade-s2 transition-colors hover:bg-neutral-silver"
            >
              {t("contactCtaButton")}
              <ArrowRight className="size-4 rtl:-scale-x-100" />
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
