"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Truck, BadgePercent } from "lucide-react";
import { Link } from "@/i18n/navigation";

const perks = [
  { icon: Truck, key: "free" as const },
  { icon: ShieldCheck, key: "secure" as const },
  { icon: BadgePercent, key: "offers" as const },
];

export default function Hero() {
  const t = useTranslations("Store.hero");

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--color-tint-t5),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top_right,rgba(102,187,106,0.12),transparent_55%)]"
      />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
        <motion.span
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 rounded-full border border-brand-primary/30 bg-tint-t5 px-4 py-1.5 text-sm font-medium text-shade-s2 dark:bg-shade-s5/40 dark:text-brand-primary"
        >
          <Sparkles className="size-4" />
          {t("badge")}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-36 font-bold leading-tight tracking-tight text-neutral-black sm:text-5xl lg:text-6xl dark:text-neutral-white"
        >
          {t("title")}{" "}
          <span className="bg-gradient-to-r from-brand-primary to-shade-s2 bg-clip-text text-transparent">
            {t("titleAccent")}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl text-base leading-relaxed text-neutral-grey sm:text-lg"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
        >
          <Link
            href="/products/mobiles"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-primary/30 transition-all hover:bg-shade-s2 hover:shadow-xl sm:w-auto"
          >
            {t("cta")}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
          </Link>
          <a
            href="#categories"
            className="inline-flex w-full items-center justify-center rounded-full border border-neutral-d-grey/30 px-8 py-3.5 text-sm font-semibold text-neutral-d-grey transition-colors hover:border-brand-primary hover:text-brand-primary sm:w-auto dark:text-neutral-l-grey"
          >
            {t("secondary")}
          </a>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {perks.map(({ icon: Icon }, i) => (
            <li
              key={i}
              className="flex items-center justify-center gap-2 rounded-2xl border border-neutral-l-grey/20 bg-background/70 px-4 py-3 text-sm font-medium text-neutral-d-grey backdrop-blur dark:text-neutral-l-grey"
            >
              <Icon className="size-5 text-brand-primary" />
              <PerkLabel index={i} />
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

function PerkLabel({ index }: { index: number }) {
  const labels = ["Free shipping over $50", "Secure checkout", "Weekly deals"];
  return <span>{labels[index]}</span>;
}
