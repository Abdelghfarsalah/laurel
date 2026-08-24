"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Link,
  usePathname,
  useRouter,
} from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Menu,
  X,
  Store,
  LogIn,
  LogOut,
  Heart,
  Search,
  User,
  Package,
  ChevronDown,
} from "lucide-react";
import { CATEGORIES } from "@/constant/categories";
import type { RootState } from "@/redux/app/store";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/features/auth/authSlice";
import { pushToast } from "@/redux/features/ui/uiSlice";
import ThemeToggle from "@/components/shared/ThemeToggle";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";

const navLinks = [
  { href: "/", key: "home" },
  { href: "/products/mobiles", key: "shop" },
  { href: "/contact", key: "contact" },
] as const;

export default function Navbar() {
  const t = useTranslations("Store");
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const user = useSelector((s: RootState) => s.auth.user);
  const cartCount = useSelector((s: RootState) =>
    s.cart.items.reduce((acc, i) => acc + i.quantity, 0)
  );
  const wishlistCount = useSelector((s: RootState) => s.wishlist.items.length);

  useEffect(() => {
    const closeMenu = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", closeMenu);
      return () => document.removeEventListener("mousedown", closeMenu);
    }
  }, [menuOpen]);

  const submitSearch = (
    e: React.FormEvent,
    value?: string,
    isMobile = false
  ) => {
    e.preventDefault();
    const q = (value ?? query).trim();
    if (!q) return;
    if (isMobile) setMobileOpen(false);
    setMenuOpen(false);
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(pushToast({ message: t("toasts.loggedOut"), type: "info" }));
    setMenuOpen(false);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-l-grey/20 bg-background/80 backdrop-blur-lg">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-xl font-bold tracking-tight"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-brand-primary text-white">
            <Store className="size-5" />
          </span>
          <span className="text-neutral-black dark:text-neutral-white">
            Nova<span className="text-brand-primary">Mart</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map(({ href, key }) => {
            const active =
              href === "/"
                ? pathname === "/"
                : pathname.startsWith(href.split("?")[0]);
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

        <form
          onSubmit={(e) => submitSearch(e)}
          role="search"
          className="relative hidden min-w-0 flex-1 max-w-xs md:block lg:max-w-sm"
        >
          <Search className="pointer-events-none absolute start-3.5 top-1/2 size-4 -translate-y-1/2 text-neutral-grey" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("products.searchPlaceholder")}
            aria-label={t("products.searchPlaceholder")}
            className="h-10 w-full rounded-full border border-input bg-background ps-10 pe-4 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/30"
          />
        </form>

        <div className="flex items-center gap-1">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <ThemeToggle />

          <AnimatePresence mode="wait" initial={false}>
            {user ? (
              <motion.div
                key="user-menu"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                ref={menuRef}
                className="relative hidden sm:block"
              >
                <button
                  onClick={() => setMenuOpen((o) => !o)}
                  aria-haspopup="menu"
                  aria-expanded={menuOpen}
                  className="flex items-center gap-2 rounded-full border border-brand-primary/30 bg-tint-t5 py-1 pe-2 ps-1 transition-colors hover:border-brand-primary/60 dark:bg-shade-s5/40"
                >
                  <span className="grid size-7 place-items-center rounded-full bg-brand-primary text-xs font-bold text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="max-w-24 truncate text-sm font-semibold text-neutral-black dark:text-neutral-white">
                    {user.name}
                  </span>
                  <ChevronDown
                    className={`size-3.5 text-neutral-grey transition-transform ${menuOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      role="menu"
                      className="absolute end-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-neutral-l-grey/20 bg-background p-1.5 shadow-xl shadow-black/10"
                    >
                      <Link
                        href="/profile"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-neutral-d-grey hover:bg-tint-t5 dark:text-neutral-l-grey dark:hover:bg-white/10"
                      >
                        <User className="size-4" />
                        {t("nav.profile")}
                      </Link>
                      <Link
                        href="/orders"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-neutral-d-grey hover:bg-tint-t5 dark:text-neutral-l-grey dark:hover:bg-white/10"
                      >
                        <Package className="size-4" />
                        {t("nav.orders")}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
                      >
                        <LogOut className="size-4 rtl:-scale-x-100" />
                        {t("auth.logout")}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
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
            href="/wishlist"
            aria-label={t("nav.wishlist")}
            title={t("nav.wishlist")}
            className="relative grid size-10 place-items-center rounded-full transition-colors hover:bg-tint-t5 dark:hover:bg-white/10"
          >
            <Heart className="size-5" />
            <AnimatePresence>
              {wishlistCount > 0 && (
                <motion.span
                  key="wishlist-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -end-0.5 -top-0.5 grid min-w-5 place-items-center rounded-full bg-rose-500 px-1 text-[11px] font-bold text-white"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <Link
            href="/cart"
            aria-label={t("nav.cart")}
            title={t("nav.cart")}
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
            className="grid size-10 place-items-center rounded-full transition-colors hover:bg-tint-t5 lg:hidden dark:hover:bg-white/10"
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
            className="overflow-hidden border-t border-neutral-l-grey/20 lg:hidden"
          >
            <div className="space-y-1 px-4 py-3">
              <form
                onSubmit={(e) => submitSearch(e, undefined, true)}
                role="search"
                className="relative mb-2"
              >
                <Search className="pointer-events-none absolute start-3.5 top-1/2 size-4 -translate-y-1/2 text-neutral-grey" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("products.searchPlaceholder")}
                  aria-label={t("products.searchPlaceholder")}
                  className="h-11 w-full rounded-full border border-input bg-background ps-10 pe-4 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/30"
                />
              </form>

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
              <Link
                href="/wishlist"
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-tint-t5 dark:hover:bg-white/10"
              >
                {t("nav.wishlist")}
              </Link>

              {user ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-tint-t5 dark:hover:bg-white/10"
                  >
                    {t("nav.profile")}
                  </Link>
                  <Link
                    href="/orders"
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-tint-t5 dark:hover:bg-white/10"
                  >
                    {t("nav.orders")}
                  </Link>
                  <div className="flex items-center justify-between rounded-lg bg-tint-t5 px-3 py-2 dark:bg-shade-s5/40">
                    <span className="flex min-w-0 items-center gap-2 text-sm font-semibold text-neutral-black dark:text-neutral-white">
                      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-primary text-xs font-bold text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                      <span className="truncate">{user.name}</span>
                    </span>
                    <button
                      aria-label={t("auth.logout")}
                      onClick={handleLogout}
                      className="grid size-8 place-items-center rounded-full text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
                    >
                      <LogOut className="size-4 rtl:-scale-x-100" />
                    </button>
                  </div>
                </>
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

              <div className="flex items-center justify-between pt-2">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
