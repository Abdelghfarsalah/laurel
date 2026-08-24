"use client";

import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import { loginSuccess } from "@/redux/features/auth/authSlice";
import { loginSchema, type LoginFormValues } from "@/lib/schemas";
import { PasswordField, fieldClass, SubmitButton } from "../fields";

export default function LoginBody() {
  const t = useTranslations("Store.auth");
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const submit = handleSubmit(async ({ email }) => {
    await new Promise((r) => setTimeout(r, 800));
    const name = email.split("@")[0] || "Customer";
    dispatch(loginSuccess({ name, email }));
    router.push("/");
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <h1 className="text-2xl font-bold text-neutral-black dark:text-neutral-white">
        {t("loginTitle")}
      </h1>
      <p className="mt-1 mb-6 text-sm text-neutral-grey">{t("loginSubtitle")}</p>

      <form onSubmit={submit} noValidate className="space-y-4">
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
        <div className="flex justify-end">
          <Link
            href="/forget-password"
            className="text-sm font-medium text-brand-primary hover:text-shade-s2"
          >
            {t("forgotTitle")}
          </Link>
        </div>
        <SubmitButton
          label={t("submitLogin")}
          submitting={t("submitting")}
          isSubmitting={isSubmitting}
          icon={<LogIn className="size-4 rtl:-scale-x-100" />}
        />
      </form>

      <p className="mt-6 text-center text-sm text-neutral-grey">
        {t("toSignup")}{" "}
        <Link href="/register" className="font-semibold text-brand-primary hover:text-shade-s2">
          {t("toSignupLink")}
        </Link>
      </p>
    </motion.div>
  );
}
