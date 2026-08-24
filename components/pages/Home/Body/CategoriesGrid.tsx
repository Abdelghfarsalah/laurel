"use client";

import { CATEGORIES } from "@/constant/categories";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Baby,
  BookOpen,
  Footprints,
  Laptop,
  Shirt,
  Smartphone,
  Sparkles,
  Watch,
} from "lucide-react";
import { useTranslations } from "next-intl";

const iconMap = {
  Smartphone,
  Laptop,
  Watch,
  Shirt,
  Sparkles,
  Baby,
  BookOpen,
  Footprints,
} as const;

export default function CategoriesGrid() {
  const t = useTranslations("Store.categories");

  return (
    <section id="categories" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 text-center"
      >
        <h2 className="text-28 font-bold text-neutral-black sm:text-36 dark:text-neutral-white">
          {t("title")}
        </h2>
        <p className="mt-2 text-neutral-grey">{t("subtitle")}</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {CATEGORIES.map((cat, i) => {
          const Icon = iconMap[cat.icon as keyof typeof iconMap] ?? Sparkles;
          return (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              whileHover={{ y: -6 }}
            >
              <Link
                href={`/products/${cat.slug}`}
                className="group flex h-full flex-col items-center gap-3 rounded-2xl border border-neutral-l-grey/20 bg-background p-6 text-center shadow-sm transition-shadow hover:border-brand-primary/40 hover:shadow-lg"
              >
                <span
                  className="grid size-14 place-items-center rounded-2xl text-white transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: cat.accent }}
                >
                  <Icon className="size-7" />
                </span>
                <span className="flex items-center gap-1 text-sm font-semibold text-neutral-black group-hover:text-brand-primary dark:text-neutral-white">
                  {cat.label}
                  <ArrowRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100 rtl:rotate-180" />
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
