"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Store, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { CATEGORIES } from "@/constant/categories";

export default function Footer() {
  const t = useTranslations("Store.footer");
  const tStore = useTranslations("Store");

  return (
    <footer className="mt-20 border-t border-neutral-l-grey/20 bg-neutral-silver dark:bg-white/5">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <span className="grid size-9 place-items-center rounded-xl bg-brand-primary text-white">
              <Store className="size-5" />
            </span>
            Nova<span className="-ms-2 text-brand-primary">Mart</span>
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-neutral-grey">{t("tagline")}</p>
          <ul className="space-y-2 text-sm text-neutral-d-grey dark:text-neutral-l-grey">
            <li className="flex items-center gap-2">
              <Mail className="size-4 text-brand-primary" /> support@novamart.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 text-brand-primary" /> +1 (555) 000-1234
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-4 text-brand-primary" /> 123 Market Street, NYC
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="mb-4 font-semibold text-neutral-black dark:text-neutral-white">
            {t("shopTitle")}
          </h3>
          <ul className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2 lg:grid-cols-1">
            {CATEGORIES.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/products/${c.slug}`}
                  className="text-neutral-grey transition-colors hover:text-brand-primary"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          <h3 className="mb-4 font-semibold text-neutral-black dark:text-neutral-white">
            {t("supportTitle")}
          </h3>
          <ul className="space-y-2 text-sm">
            {(
              [
                { href: "/support", key: "supportTitle" },
                { href: "/faq", key: "faq" },
                { href: "/shipping-returns", key: "shipping" },
                { href: "/terms", key: "terms" },
                { href: "/privacy", key: "privacy" },
              ] as const
            ).map(({ href, key }) => (
              <li key={key}>
                <Link
                  href={href}
                  className="text-neutral-grey transition-colors hover:text-brand-primary"
                >
                  {t(key)}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                className="text-neutral-grey transition-colors hover:text-brand-primary"
              >
                {tStore("nav.contact")}
              </Link>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="mb-2 font-semibold text-neutral-black dark:text-neutral-white">
            {t("newsletterTitle")}
          </h3>
          <p className="mb-4 text-sm text-neutral-grey">{t("newsletterSubtitle")}</p>
          <form className="flex overflow-hidden rounded-full border border-input bg-background focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30">
            <input
              type="email"
              placeholder={t("newsletterPlaceholder")}
              aria-label={t("newsletterPlaceholder")}
              className="w-full bg-transparent px-4 py-2.5 text-sm outline-none"
            />
            <button
              type="submit"
              className="shrink-0 bg-brand-primary px-4 text-sm font-medium text-white transition-colors hover:bg-shade-s2"
            >
              {t("subscribe")}
            </button>
          </form>
        </motion.div>
      </div>

      <div className="border-t border-neutral-l-grey/20 py-5 text-center text-sm text-neutral-grey">
        © {new Date().getFullYear()} NovaMart. {t("rights")}
      </div>
    </footer>
  );
}
