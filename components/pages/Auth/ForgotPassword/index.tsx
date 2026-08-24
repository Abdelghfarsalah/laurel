"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Lock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { forgotPasswordSchema, type ForgotPasswordFormValues } from "@/lib/schemas";
import { fieldClass, SubmitButton } from "../fields";

export default function ForgotPasswordBody() {
  const t = useTranslations("Store.auth");
  const [sentEmail, setSentEmail] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const submit = handleSubmit(async ({ email }) => {
    await new Promise((r) => setTimeout(r, 800));
    setSentEmail(email);
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <h1 className="text-2xl font-bold text-neutral-black dark:text-neutral-white">
        {t("forgotTitle")}
      </h1>
      <p className="mt-1 mb-6 text-sm text-neutral-grey">{t("forgotSubtitle")}</p>

      <AnimatePresence mode="wait" initial={false}>
        {sentEmail ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <p className="flex items-start gap-3 rounded-xl bg-tint-t5 px-4 py-3 text-sm font-medium text-shade-s2 dark:bg-shade-s5/40 dark:text-brand-primary">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
              {t("forgotSent", { email: sentEmail })}
            </p>
            <Link
              href="/login"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-brand-primary/40 py-3 text-sm font-semibold text-brand-primary transition-colors hover:bg-tint-t5 dark:hover:bg-shade-s5/40"
            >
              {t("toLoginLink")}
            </Link>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.25 }}
            onSubmit={submit}
            noValidate
            className="space-y-4"
          >
            <div>
              <input
                {...register("email")}
                type="email"
                placeholder={t("email")}
                aria-label={t("email")}
                className={fieldClass(!!errors.email)}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>
            <SubmitButton
              label={t("submitForgot")}
              submitting={t("submitting")}
              isSubmitting={isSubmitting}
              icon={<Lock className="size-4" />}
            />
          </motion.form>
        )}
      </AnimatePresence>

      <p className="mt-6 text-center text-sm text-neutral-grey">
        {t("toLogin")}{" "}
        <Link href="/login" className="font-semibold text-brand-primary hover:text-shade-s2">
          {t("toLoginLink")}
        </Link>
      </p>
    </motion.div>
  );
}
