"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, Store, LogIn, LogOut } from "lucide-react";
import { CATEGORIES } from "@/constant/categories";
import { RootState } from "@/redux/app/store";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/features/auth/authSlice";

const navLinks = [
  { href: "/", key: "home" },
  { href: "/products/mobiles", key: "shop" },
  { href: "/contact", key: "contact" },
] as const;

export default function Navbar() {
  const t = useTranslations("Store");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((s: RootState) => s.auth.user);
  const cartCount = useSelector((s: RootState) =>
    s.cart.items.reduce((acc, i) => acc + i.quantity, 0)
  );

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-l-grey/20 bg-background/80 backdrop-blur-lg">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <span className="grid size-9 place-items-center rounded-xl bg-brand-primary text-white">
            <Store className="size-5" />
          </span>
          <span className="text-neutral-black dark:text-neutral-white">
            Nova<span className="text-brand-primary">Mart</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ href, key }) => {
            const active =
              href === "/" ? pathname === "/" : pathname.startsWith(href.split("?")[0]);
            return (
              <li key={key}>
                <Link
                  href={href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-tint-t5 text-shade-s2 dark:bg-shade-s5/40 dark:text-brand-primary"
                      : "text-neutral-d-grey hover:bg-silver dark:hover:bg-white/10"
                  }`}
                >
                  {t(`nav.${key}`)}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <AnimatePresence mode="wait" initial={false}>
            {user ? (
              <motion.div
                key="user-chip"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="hidden items-center gap-2 rounded-full border border-brand-primary/30 bg-tint-t5 py-1 pe-1 ps-3 dark:bg-shade-s5/40 sm:flex"
              >
                <span className="grid size-7 place-items-center rounded-full bg-brand-primary text-xs font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <span className="max-w-28 truncate text-sm font-semibold text-neutral-black dark:text-neutral-white">
                  {user.name}
                </span>
                <button
                  onClick={() => dispatch(logout())}
                  aria-label={t("auth.loggedOut")}
                  title={t("auth.loggedOut")}
                  className="grid size-7 place-items-center rounded-full text-neutral-grey transition-colors hover:bg-white/60 hover:text-red-500 dark:hover:bg-white/10"
                >
                  <LogOut className="size-4 rtl:-scale-x-100" />
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="login-btn"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="hidden sm:block"
              >
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 rounded-full bg-button-header-color px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-primary"
                >
                  <LogIn className="size-4 rtl:-scale-x-100" />
                  {t("nav.login")}
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          <Link
            href="/cart"
            aria-label={t("nav.cart")}
            className="relative grid size-10 place-items-center rounded-full transition-colors hover:bg-tint-t5 dark:hover:bg-white/10"
          >
            <ShoppingBag className="size-5" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key="badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -end-0.5 -top-0.5 grid min-w-5 place-items-center rounded-full bg-brand-primary px-1 text-[11px] font-bold text-white"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            className="grid size-10 place-items-center rounded-full transition-colors hover:bg-tint-t5 md:hidden dark:hover:bg-white/10"
          >
            {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-neutral-l-grey/20 md:hidden"
          >
            <div className="space-y-1 px-4 py-3">
              {navLinks.map(({ href, key }) => (
                <Link
                  key={key}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-tint-t5 dark:hover:bg-white/10"
                >
                  {t(`nav.${key}`)}
                </Link>
              ))}
              {user ? (
                <div className="flex items-center justify-between rounded-lg bg-tint-t5 px-3 py-2 dark:bg-shade-s5/40">
                  <span className="flex items-center gap-2 text-sm font-semibold text-neutral-black dark:text-neutral-white">
                    <span className="grid size-7 place-items-center rounded-full bg-brand-primary text-xs font-bold text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                    {user.name}
                  </span>
                  <button
                    aria-label={t("auth.loggedOut")}
                    onClick={() => {
                      dispatch(logout());
                      setMobileOpen(false);
                    }}
                    className="grid size-8 place-items-center rounded-full text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
                  >
                    <LogOut className="size-4 rtl:-scale-x-100" />
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="mt-1 flex items-center gap-1.5 rounded-lg bg-button-header-color px-3 py-2 text-sm font-semibold text-white"
                >
                  <LogIn className="size-4 rtl:-scale-x-100" />
                  {t("nav.login")}
                </Link>
              )}
              <p className="px-3 pt-3 pb-1 text-xs font-semibold uppercase tracking-wider text-neutral-grey">
                {t("categories.title")}
              </p>
              <div className="grid grid-cols-2 gap-1">
                {CATEGORIES.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/products/${c.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm hover:bg-tint-t5 dark:hover:bg-white/10"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
