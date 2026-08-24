"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import {
  Package,
  PackageOpen,
  Truck,
  CheckCircle2,
  ChevronRight,
  LogIn,
} from "lucide-react";
import type { RootState } from "@/redux/app/store";
import type { OrderStatus } from "@/redux/features/orders/ordersSlice";
import { Link } from "@/i18n/navigation";

const STATUS_STYLES: Record<OrderStatus, { icon: typeof Truck; classes: string }> = {
  processing: {
    icon: Package,
    classes: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
  },
  shipped: {
    icon: Truck,
    classes: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
  },
  delivered: {
    icon: CheckCircle2,
    classes: "bg-tint-t5 text-shade-s2 dark:bg-shade-s5/40 dark:text-brand-primary",
  },
};

export default function OrdersBody() {
  const t = useTranslations("Store.orders");
  const ta = useTranslations("Store.auth");
  const orders = useSelector((s: RootState) => s.orders.orders);
  const user = useSelector((s: RootState) => s.auth.user);

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-neutral-l-grey/40 py-24 text-center"
      >
        <LogIn className="size-14 text-neutral-l-grey rtl:-scale-x-100" />
        <h2 className="text-xl font-bold text-neutral-black dark:text-neutral-white">
          {t("loginRequired")}
        </h2>
        <p className="max-w-sm text-sm text-neutral-grey">{t("loginHint")}</p>
        <Link
          href="/login"
          className="rounded-full bg-brand-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-shade-s2"
        >
          {ta("submitLogin")}
        </Link>
      </motion.div>
    );
  }

  if (orders.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-neutral-l-grey/40 py-24 text-center"
      >
        <PackageOpen className="size-14 text-neutral-l-grey" />
        <h2 className="text-xl font-bold text-neutral-black dark:text-neutral-white">
          {t("empty")}
        </h2>
        <Link
          href="/products/mobiles"
          className="rounded-full bg-brand-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-shade-s2"
        >
          {t("emptyCta")}
        </Link>
      </motion.div>
    );
  }

  return (
    <section>
      <div className="mb-8 flex items-center justify-between gap-4">
        <h1 className="text-28 font-bold text-neutral-black sm:text-36 dark:text-neutral-white">
          {t("title")}
        </h1>
        <span className="rounded-full bg-tint-t5 px-4 py-1.5 text-sm font-semibold text-shade-s2 dark:bg-shade-s5/40 dark:text-brand-primary">
          {orders.length} {t("countLabel")}
        </span>
      </div>

      <ul className="space-y-4">
        <AnimatePresence initial={false}>
          {orders.map((order) => {
            const status = STATUS_STYLES[order.status];
            const StatusIcon = status.icon;
            return (
              <motion.li
                key={order.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="overflow-hidden rounded-3xl border border-neutral-l-grey/20"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-l-grey/20 bg-neutral-silver px-5 py-3 dark:bg-white/5">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm">
                    <span className="font-bold text-neutral-black dark:text-neutral-white">
                      {t("orderLabel")} {order.id}
                    </span>
                    <span className="text-neutral-grey">
                      {new Date(order.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${status.classes}`}
                    >
                      <StatusIcon className="size-3.5" />
                      {t(`status.${order.status}`)}
                    </span>
                  </div>
                  <span className="text-base font-bold text-brand-primary">
                    ₹{order.total.toLocaleString()}
                  </span>
                </div>

                <ul className="divide-y divide-neutral-l-grey/10">
                  {order.items.map(({ product, quantity }) => (
                    <li key={product.id}>
                      <Link
                        href={`/products/${product.category}/${product.id}`}
                        className="flex items-center gap-4 px-5 py-3 transition-colors hover:bg-tint-t5/50 dark:hover:bg-white/5"
                      >
                        <div className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-neutral-silver dark:bg-white/10">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            unoptimized
                            sizes="48px"
                            className="object-contain p-1"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">{product.name}</p>
                          <p className="text-xs text-neutral-grey">×{quantity}</p>
                        </div>
                        <span className="text-sm font-semibold">
                          ₹{(product.price * quantity).toLocaleString()}
                        </span>
                        <ChevronRight className="size-4 shrink-0 text-neutral-l-grey rtl:-scale-x-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </section>
  );
}
