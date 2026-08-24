"use client";

import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import { loginSuccess } from "@/redux/features/auth/authSlice";
import { pushToast } from "@/redux/features/ui/uiSlice";
import { signupSchema, type SignupFormValues } from "@/lib/schemas";
import { PasswordField, fieldClass, SubmitButton } from "../fields";

export default function RegisterBody() {
  const t = useTranslations("Store.auth");
  const tt = useTranslations("Store.toasts");
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const submit = handleSubmit(async ({ name, email }) => {
    await new Promise((r) => setTimeout(r, 800));
    dispatch(loginSuccess({ name: name.trim(), email }));
    dispatch(pushToast({ message: tt("loggedIn") }));
    router.push("/");
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <h1 className="text-2xl font-bold text-neutral-black dark:text-neutral-white">
        {t("signupTitle")}
      </h1>
      <p className="mt-1 mb-6 text-sm text-neutral-grey">{t("signupSubtitle")}</p>

      <form onSubmit={submit} noValidate className="space-y-4">
        <div>
          <input
            {...register("name")}
            placeholder={t("name")}
            aria-label={t("name")}
            className={fieldClass(!!errors.name)}
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <input
            {...register("email")}
            type="email"
            placeholder={t("email")}
            aria-label={t("email")}
            className={fieldClass(!!errors.email)}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>
        <PasswordField
          placeholder={t("password")}
          error={errors.password?.message}
          {...register("password")}
        />
        <div>
          <input
            {...register("confirmPassword")}
            type="password"
            placeholder={t("confirmPassword")}
            aria-label={t("confirmPassword")}
            className={fieldClass(!!errors.confirmPassword)}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>
        <SubmitButton
          label={t("submitSignup")}
          submitting={t("submitting")}
          isSubmitting={isSubmitting}
          icon={<UserPlus className="size-4 rtl:-scale-x-100" />}
        />
      </form>

      <p className="mt-6 text-center text-sm text-neutral-grey">
        {t("toLogin")}{" "}
        <Link href="/login" className="font-semibold text-brand-primary hover:text-shade-s2">
          {t("toLoginLink")}
        </Link>
      </p>
    </motion.div>
  );
}
