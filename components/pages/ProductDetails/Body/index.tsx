"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Truck,
  RotateCcw,
  PackageSearch,
} from "lucide-react";
import { useGetProductsQuery } from "@/redux/features/api/productsApi";
import type { RootState } from "@/redux/app/store";
import {
  removeFromWishlist,
  toggleWishlist,
} from "@/redux/features/wishlist/wishlistSlice";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { pushToast } from "@/redux/features/ui/uiSlice";
import { Link, useRouter } from "@/i18n/navigation";
import ProductCard from "@/components/shared/ProductCard";
import StarRating from "@/components/shared/StarRating";
import { getProductRating, getReviewKeysForProduct } from "@/utils/rating";
import { toStoreProduct } from "@/utils/product";

interface ProductDetailsBodyProps {
  slug: string;
  productId: string;
}

interface ReviewItem {
  name: string;
  date: string;
  text: string;
}

export default function ProductDetailsBody({
  slug,
  productId,
}: ProductDetailsBodyProps) {
  const t = useTranslations("Store.details");
  const tt = useTranslations("Store.toasts");
  const tr = useTranslations("Store.reviews");
  const dispatch = useDispatch();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const { data, isLoading } = useGetProductsQuery(slug);

  const product = useMemo(
    () => data?.find((p) => p.id === productId),
    [data, productId]
  );
  const related = useMemo(
    () => data?.filter((p) => p.id !== productId).slice(0, 4) ?? [],
    [data, productId]
  );

  const wishlisted = useSelector((s: RootState) =>
    s.wishlist.items.some((item) => item.id === productId)
  );
  const rating = getProductRating(productId);
  const reviewKeys = useMemo(() => getReviewKeysForProduct(productId), [productId]);

  if (isLoading) {
    return (
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="aspect-square animate-pulse rounded-3xl bg-neutral-silver dark:bg-white/5" />
        <div className="space-y-4 py-4">
          {[80, 60, 40, 100].map((w, i) => (
            <div
              key={i}
              className={`h-5 w-[${w}%] animate-pulse rounded bg-neutral-silver dark:bg-white/5`}
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-28 text-center">
        <PackageSearch className="size-14 text-neutral-l-grey" />
        <p className="text-sm text-neutral-grey">{t("notFound")}</p>
        <Link
          href={`/products/${slug}`}
          className="rounded-full bg-brand-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-shade-s2"
        >
          {t("backToCategory")}
        </Link>
      </section>
    );
  }

  const storeProduct = toStoreProduct(product);

  const handleAddToCart = (goCheckout?: boolean) => {
    dispatch(addToCart({ product: storeProduct, quantity }));
    if (goCheckout) {
      router.push("/checkout");
    } else {
      dispatch(pushToast({ message: tt("addedToCart") }));
    }
  };

  const handleToggleWishlist = () => {
    if (wishlisted) {
      dispatch(removeFromWishlist(productId));
      dispatch(pushToast({ message: tt("removedFromWishlist"), type: "info" }));
    } else {
      dispatch(toggleWishlist(storeProduct));
      dispatch(pushToast({ message: tt("addedToWishlist") }));
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        aria-label="Breadcrumb"
        className="mb-6 flex flex-wrap items-center gap-1 text-sm text-neutral-grey"
      >
        <Link href="/" className="transition-colors hover:text-brand-primary">
          {t("breadcrumbHome")}
        </Link>
        <ChevronRight className="size-3.5 rtl:-scale-x-100" />
        <Link
          href={`/products/${slug}`}
          className="capitalize transition-colors hover:text-brand-primary"
        >
          {slug}
        </Link>
        <ChevronRight className="size-3.5 rtl:-scale-x-100" />
        <span className="line-clamp-1 max-w-48 font-medium text-neutral-d-grey dark:text-neutral-l-grey">
          {product.name}
        </span>
      </motion.nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="relative aspect-square overflow-hidden rounded-3xl border border-neutral-l-grey/20 bg-neutral-silver dark:bg-white/5"
        >
          <Image
            src={product.Image || ""}
            alt={product.name}
            fill
            unoptimized
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            className="object-contain p-8"
          />
          {product.Tag && (
            <span className="absolute start-4 top-4 rounded-full bg-tint-t5 px-3 py-1 text-xs font-semibold capitalize text-shade-s2 dark:bg-shade-s5/60 dark:text-brand-primary">
              {product.Tag.split(",")[0]}
            </span>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col gap-4"
        >
          <h1 className="text-28 font-bold leading-snug text-neutral-black sm:text-36 dark:text-neutral-white">
            {product.name}
          </h1>

          <div className="flex items-center gap-2">
            <StarRating value={rating.rate} size="size-4" />
            <span className="text-sm font-semibold text-neutral-d-grey dark:text-neutral-l-grey">
              {rating.rate}
            </span>
            <span className="text-sm text-neutral-grey">
              {tr("basedOn", { count: rating.count })}
            </span>
          </div>

          <p className="text-36 font-extrabold text-shade-s2 dark:text-brand-primary">
            {product.Price}
          </p>

          <p className="text-sm leading-relaxed text-neutral-grey">
            {product.description || t("noDescription")}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-full border border-input">
              <button
                aria-label={t("decreaseQuantity")}
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                className="grid size-11 place-items-center rounded-full disabled:opacity-40"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-10 text-center font-semibold">{quantity}</span>
              <button
                aria-label={t("increaseQuantity")}
                onClick={() => setQuantity((q) => q + 1)}
                className="grid size-11 place-items-center rounded-full"
              >
                <Plus className="size-4" />
              </button>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => handleAddToCart()}
              className="inline-flex h-12 flex-1 min-w-40 items-center justify-center gap-2 rounded-full bg-brand-primary px-6 text-sm font-semibold text-white shadow-lg shadow-brand-primary/25 transition-colors hover:bg-shade-s2"
            >
              <ShoppingBag className="size-4" />
              {t("addToCart")}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleToggleWishlist}
              aria-label={wishlisted ? t("removeFromWishlist") : t("addToWishlist")}
              title={wishlisted ? t("removeFromWishlist") : t("addToWishlist")}
              className={`grid size-12 place-items-center rounded-full border transition-colors ${
                wishlisted
                  ? "border-rose-500 bg-rose-500 text-white"
                  : "border-input text-neutral-d-grey hover:border-rose-300 hover:text-rose-500 dark:text-neutral-l-grey"
              }`}
            >
              <Heart
                className="size-5 rtl:-scale-x-100"
                fill={wishlisted ? "currentColor" : "none"}
              />
            </motion.button>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => handleAddToCart(true)}
            className="inline-flex h-12 items-center justify-center rounded-full border-2 border-brand-primary px-6 text-sm font-semibold text-brand-primary transition-colors hover:bg-tint-t5 dark:hover:bg-shade-s5/40"
          >
            {t("buyNow")}
          </motion.button>

          <ul className="mt-2 grid gap-3 rounded-2xl border border-neutral-l-grey/20 p-4 text-sm text-neutral-grey sm:grid-cols-3">
            <li className="flex items-center gap-2">
              <Truck className="size-4 shrink-0 text-brand-primary" />
              {t("freeShipping")}
            </li>
            <li className="flex items-center gap-2">
              <RotateCcw className="size-4 shrink-0 text-brand-primary" />
              {t("easyReturns")}
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="size-4 shrink-0 text-brand-primary" />
              {t("securePayment")}
            </li>
          </ul>
        </motion.div>
      </div>

      <div className="mt-16">
        <h2 className="text-20 font-bold text-neutral-black sm:text-28 dark:text-neutral-white">
          {tr("title")}
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-[240px_1fr]">
          <div className="h-fit space-y-2 rounded-3xl border border-neutral-l-grey/20 bg-neutral-silver p-6 text-center lg:sticky lg:top-24 dark:bg-white/5">
            <p className="text-64 font-extrabold leading-none text-neutral-black dark:text-neutral-white">
              {rating.rate}
            </p>
            <StarRating value={rating.rate} size="size-5" />
            <p className="pt-1 text-sm text-neutral-grey">
              {tr("basedOn", { count: rating.count })}
            </p>
          </div>
          <ul className="space-y-4">
            {reviewKeys.map((key, i) => {
              const item = tr.raw(`items.${key}`) as ReviewItem;
              return (
                <motion.li
                  key={key}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                  className="rounded-3xl border border-neutral-l-grey/20 p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-semibold text-neutral-black dark:text-neutral-white">
                      {item.name}
                    </span>
                    <span className="text-xs text-neutral-grey">{item.date}</span>
                  </div>
                  <div className="mt-2">
                    <StarRating value={rating.rate >= 4.5 ? 5 : Math.round(rating.rate)} size="size-3.5" />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-grey">
                    {item.text}
                  </p>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-20 font-bold text-neutral-black sm:text-28 dark:text-neutral-white">
            {t("relatedTitle")}
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
