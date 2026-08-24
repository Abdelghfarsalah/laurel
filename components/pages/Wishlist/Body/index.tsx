"use client";

import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import type { RootState } from "@/redux/app/store";
import { removeFromWishlist } from "@/redux/features/wishlist/wishlistSlice";
import { pushToast } from "@/redux/features/ui/uiSlice";
import ProductCard from "@/components/shared/ProductCard";
import { Link } from "@/i18n/navigation";
import { fromStoreProduct } from "@/utils/product";

export default function WishlistBody() {
  const t = useTranslations("Store.wishlist");
  const tt = useTranslations("Store.toasts");
  const dispatch = useDispatch();
  const items = useSelector((s: RootState) => s.wishlist.items);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8 flex items-center justify-between gap-4"
      >
        <h1 className="text-28 font-bold text-neutral-black sm:text-36 dark:text-neutral-white">
          {t("title")}
        </h1>
        {items.length > 0 && (
          <span className="rounded-full bg-tint-t5 px-4 py-1.5 text-sm font-semibold text-shade-s2 dark:bg-shade-s5/40 dark:text-brand-primary">
            {items.length} {t("count")}
          </span>
        )}
      </motion.div>

      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-neutral-l-grey/40 py-24 text-center"
        >
          <Heart className="size-14 text-neutral-l-grey" />
          <h2 className="text-xl font-bold text-neutral-black dark:text-neutral-white">
            {t("empty")}
          </h2>
          <p className="max-w-sm text-sm text-neutral-grey">{t("emptyHint")}</p>
          <Link
            href="/"
            className="mt-2 rounded-full bg-brand-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-shade-s2"
          >
            {t("emptyCta")}
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((product, i) => (
            <div key={product.id} className="relative">
              <ProductCard
                product={fromStoreProduct(product)}
                index={i % 8}
              />
              <button
                onClick={() => {
                  dispatch(removeFromWishlist(product.id));
                  dispatch(pushToast({ message: tt("removedFromWishlist"), type: "info" }));
                }}
                aria-label={t("remove")}
                title={t("remove")}
                className="absolute -top-2 -end-2 z-10 grid size-7 place-items-center rounded-full bg-background text-red-500 shadow-md ring-1 ring-neutral-l-grey/30 transition-colors hover:bg-red-50 dark:bg-neutral-silver dark:hover:bg-red-950/40"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
