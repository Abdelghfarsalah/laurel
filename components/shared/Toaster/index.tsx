"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, CircleAlert, Info, X } from "lucide-react";
import type { RootState } from "@/redux/app/store";
import { dismissToast, type ToastType } from "@/redux/features/ui/uiSlice";

const TOAST_DURATION = 3000;

const ICONS: Record<ToastType, typeof CheckCircle2> = {
  success: CheckCircle2,
  error: CircleAlert,
  info: Info,
};

const ICON_COLORS: Record<ToastType, string> = {
  success: "text-brand-primary",
  error: "text-red-500",
  info: "text-blue-500",
};

function ToastItem({
  id,
  message,
  type,
}: {
  id: number;
  message: string;
  type: ToastType;
}) {
  const t = useTranslations("Store.toasts");
  const dispatch = useDispatch();
  const Icon = ICONS[type];

  useEffect(() => {
    const timer = window.setTimeout(
      () => dispatch(dismissToast(id)),
      TOAST_DURATION
    );
    return () => window.clearTimeout(timer);
  }, [id, dispatch]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 40, transition: { duration: 0.2 } }}
      className="pointer-events-auto flex w-72 max-w-[calc(100vw-2rem)] items-center gap-3 rounded-2xl border border-neutral-l-grey/20 bg-background p-3 shadow-xl shadow-black/10 dark:bg-neutral-silver"
    >
      <Icon className={`size-5 shrink-0 ${ICON_COLORS[type]}`} />
      <p className="flex-1 text-sm font-medium text-neutral-d-grey dark:text-neutral-white">
        {message}
      </p>
      <button
        aria-label={t("dismiss")}
        onClick={() => dispatch(dismissToast(id))}
        className="grid size-6 shrink-0 place-items-center rounded-full text-neutral-grey transition-colors hover:bg-tint-t5 dark:hover:bg-white/10"
      >
        <X className="size-3.5" />
      </button>
    </motion.div>
  );
}

export default function Toaster() {
  const toasts = useSelector((s: RootState) => s.ui.toasts);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed bottom-4 end-4 z-[100] flex flex-col-reverse gap-2"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            id={toast.id}
            message={toast.message}
            type={toast.type}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
