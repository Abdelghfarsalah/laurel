"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQ_ITEMS = [1, 2, 3, 4, 5, 6] as const;

export default function FaqList() {
  const t = useTranslations("Store.support");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {FAQ_ITEMS.map((n, i) => {
        const open = openIndex === i;
        return (
          <div
            key={n}
            className={`overflow-hidden rounded-2xl border bg-background transition-colors ${
              open
                ? "border-brand-primary/40"
                : "border-neutral-l-grey/20 hover:border-neutral-l-grey/50"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              aria-controls={`faq-panel-${n}`}
              id={`faq-trigger-${n}`}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start"
            >
              <span className="text-sm font-semibold text-neutral-black sm:text-base dark:text-neutral-white">
                {t(`faq${n}q`)}
              </span>
              <ChevronDown
                className={`size-4 shrink-0 text-brand-primary transition-transform duration-300 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="panel"
                  id={`faq-panel-${n}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${n}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="border-t border-neutral-l-grey/20 px-5 pt-4 pb-5 text-sm leading-relaxed text-neutral-grey">
                    {t(`faq${n}a`)}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
