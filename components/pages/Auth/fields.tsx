"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export const fieldClass = (hasError: boolean) =>
  `h-11 w-full rounded-xl border bg-background px-4 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/30 ${
    hasError ? "border-red-500" : "border-input"
  }`;

export function PasswordField({
  placeholder,
  error,
  ...props
}: { placeholder: string; error?: string } & React.ComponentProps<"input">) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          aria-label={placeholder}
          className={`h-11 w-full rounded-xl border border-input bg-background px-4 pe-11 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/30 ${
            error ? "border-red-500" : ""
          }`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          tabIndex={-1}
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute end-3 top-1/2 -translate-y-1/2 text-neutral-grey hover:text-neutral-d-grey"
        >
          {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export function SubmitButton({
  label,
  submitting,
  isSubmitting,
  icon,
}: {
  label: string;
  submitting: string;
  isSubmitting: boolean;
  icon: React.ReactNode;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      type="submit"
      disabled={isSubmitting}
      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-primary py-3 text-sm font-semibold text-white shadow-lg shadow-brand-primary/25 transition-colors hover:bg-shade-s2 disabled:opacity-60"
    >
      {isSubmitting ? submitting : (
        <>
          {icon}
          {label}
        </>
      )}
    </motion.button>
  );
}
