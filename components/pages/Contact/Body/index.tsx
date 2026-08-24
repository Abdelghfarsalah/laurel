"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { contactSchema, type ContactFormValues } from "@/lib/schemas";

export default function ContactBody() {
  const t = useTranslations("Store.contact");
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 900));
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 4000);
  };

  const inputClass = (hasError: boolean) =>
    `w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/30 ${
      hasError ? "border-red-500" : "border-input"
    }`;

  return (
    <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[320px_1fr]">
      <motion.aside
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="h-fit space-y-6 rounded-3xl bg-gradient-to-br from-brand-primary to-shade-s2 p-8 text-white"
      >
        <h2 className="text-2xl font-bold">{t("title")}</h2>
        <p className="text-sm leading-relaxed text-white/85">{t("subtitle")}</p>
        <ul className="space-y-4 pt-2">
          <li className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-white/15">
              <Mail className="size-5" />
            </span>
            support@novamart.com
          </li>
          <li className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-white/15">
              <MessageSquare className="size-5" />
            </span>
            +1 (555) 000-1234
          </li>
        </ul>
      </motion.aside>

      <motion.form
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-4 rounded-3xl border border-neutral-l-grey/20 p-8"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium">
              {t("name")}
            </label>
            <input id="contact-name" {...register("name")} placeholder={t("name")} className={inputClass(!!errors.name)} />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium">
              {t("email")}
            </label>
            <input id="contact-email" type="email" {...register("email")} placeholder={t("email")} className={inputClass(!!errors.email)} />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="contact-subject" className="mb-1.5 block text-sm font-medium">
            {t("subject")}
          </label>
          <input id="contact-subject" {...register("subject")} placeholder={t("subject")} className={inputClass(!!errors.subject)} />
          {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>}
        </div>

        <div>
          <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium">
            {t("message")}
          </label>
          <textarea
            id="contact-message"
            rows={5}
            {...register("message")}
            placeholder={t("message")}
            className={`${inputClass(!!errors.message)} resize-none`}
          />
          {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-primary/25 transition-colors hover:bg-shade-s2 disabled:opacity-60"
        >
          <Send className="size-4 rtl:rotate-180" />
          {isSubmitting ? t("sending") : t("send")}
        </motion.button>

        <AnimatePresence>
          {sent && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 rounded-xl bg-tint-t5 px-4 py-3 text-sm font-medium text-shade-s2 dark:bg-shade-s5/40 dark:text-brand-primary"
            >
              <CheckCircle2 className="size-4" />
              {t("success")}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.form>
    </div>
  );
}
