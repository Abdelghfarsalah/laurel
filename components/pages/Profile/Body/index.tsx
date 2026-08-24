"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  LogIn,
  LogOut,
  Package,
  Heart,
  Pencil,
  Check,
  ShoppingBag,
} from "lucide-react";
import type { RootState } from "@/redux/app/store";
import { logout, updateUser } from "@/redux/features/auth/authSlice";
import { pushToast } from "@/redux/features/ui/uiSlice";
import { Link } from "@/i18n/navigation";

export default function ProfileBody() {
  const t = useTranslations("Store.profile");
  const ta = useTranslations("Store.auth");
  const tt = useTranslations("Store.toasts");
  const dispatch = useDispatch();
  const user = useSelector((s: RootState) => s.auth.user);
  const orderCount = useSelector((s: RootState) => s.orders.orders.length);
  const wishlistCount = useSelector((s: RootState) => s.wishlist.items.length);
  const cartCount = useSelector((s: RootState) =>
    s.cart.items.reduce((acc, i) => acc + i.quantity, 0)
  );

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");

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

  const saveProfile = () => {
    const trimmedName = name.trim();
    if (trimmedName.length < 2 || !/^\S+@\S+\.\S+$/.test(email)) return;
    dispatch(updateUser({ name: trimmedName, email }));
    setEditing(false);
    dispatch(pushToast({ message: tt("profileUpdated") }));
  };

  const stats = [
    {
      href: "/orders",
      icon: Package,
      value: orderCount,
      label: t("statsOrders"),
    },
    {
      href: "/wishlist",
      icon: Heart,
      value: wishlistCount,
      label: t("statsWishlist"),
    },
    {
      href: "/cart",
      icon: ShoppingBag,
      value: cartCount,
      label: t("statsCart"),
    },
  ];

  return (
    <section className="mx-auto max-w-3xl">
      <h1 className="mb-8 text-28 font-bold text-neutral-black sm:text-36 dark:text-neutral-white">
        {t("title")}
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-3xl border border-neutral-l-grey/20 p-6 sm:p-8"
      >
        <div className="flex items-center gap-4">
          <span className="grid size-16 shrink-0 place-items-center rounded-full bg-brand-primary text-2xl font-bold text-white">
            {user.name.charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0 flex-1">
            {editing ? (
              <div className="space-y-2">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-label={ta("name")}
                  placeholder={ta("name")}
                  className="h-10 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/30"
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  aria-label={ta("email")}
                  placeholder={ta("email")}
                  className="h-10 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/30"
                />
              </div>
            ) : (
              <>
                <p className="truncate text-lg font-bold text-neutral-black dark:text-neutral-white">
                  {user.name}
                </p>
                <p className="truncate text-sm text-neutral-grey">{user.email}</p>
              </>
            )}
          </div>
          {editing ? (
            <button
              onClick={saveProfile}
              disabled={name.trim().length < 2 || !/^\S+@\S+\.\S+$/.test(email)}
              aria-label={t("save")}
              title={t("save")}
              className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-primary text-white shadow-md transition hover:bg-shade-s2 disabled:opacity-40"
            >
              <Check className="size-4" />
            </button>
          ) : (
            <button
              onClick={() => setEditing(true)}
              aria-label={t("edit")}
              title={t("edit")}
              className="grid size-10 shrink-0 place-items-center rounded-full border border-input text-neutral-d-grey transition-colors hover:bg-tint-t5 dark:text-neutral-l-grey dark:hover:bg-white/10"
            >
              <Pencil className="size-4" />
            </button>
          )}
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3">
          {stats.map(({ href, icon: Icon, value, label }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col items-center gap-1 rounded-2xl bg-neutral-silver p-4 text-center transition-colors hover:bg-tint-t5 dark:bg-white/5 dark:hover:bg-shade-s5/30"
            >
              <Icon className="size-5 text-brand-primary" />
              <span className="text-xl font-bold text-neutral-black dark:text-neutral-white">
                {value}
              </span>
              <span className="text-xs text-neutral-grey group-hover:text-shade-s2 dark:group-hover:text-brand-primary">
                {label}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 space-y-2 border-t border-neutral-l-grey/20 pt-6">
          <p className="pb-1 text-xs font-semibold uppercase tracking-wider text-neutral-grey">
            {t("quickLinks")}
          </p>
          <Link
            href="/orders"
            className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-tint-t5 dark:hover:bg-white/10"
          >
            {t("myOrders")}
            <Package className="size-4 text-neutral-grey" />
          </Link>
          <Link
            href="/wishlist"
            className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-tint-t5 dark:hover:bg-white/10"
          >
            {t("myWishlist")}
            <Heart className="size-4 text-neutral-grey" />
          </Link>
        </div>

        <button
          onClick={() => {
            dispatch(logout());
            dispatch(pushToast({ message: tt("loggedOut"), type: "info" }));
          }}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-red-500 py-2.5 text-sm font-semibold text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30"
        >
          <LogOut className="size-4 rtl:-scale-x-100" />
          {ta("logout")}
        </button>
      </motion.div>
    </section>
  );
}
