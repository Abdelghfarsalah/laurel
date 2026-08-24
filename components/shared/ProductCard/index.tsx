"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Check, Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import type { NormalizedProduct } from "@/redux/features/api/productsApi";
import type { RootState } from "@/redux/app/store";
import { addToCart } from "@/redux/features/cart/cartSlice";
import {
  removeFromWishlist,
  toggleWishlist,
} from "@/redux/features/wishlist/wishlistSlice";
import { pushToast } from "@/redux/features/ui/uiSlice";
import { Link } from "@/i18n/navigation";
import StarRating from "@/components/shared/StarRating";
import { getProductRating } from "@/utils/rating";
import { toStoreProduct } from "@/utils/product";

interface ProductCardProps {
  product: NormalizedProduct;
  index?: number;
}

const PLACEHOLDER =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0iIzRhNGE0YSI+PHBhdGggZD0iTTQgNWgxNnYxNEg0eiIvPjwvc3ZnPg==";

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const t = useTranslations("Store.products");
  const tt = useTranslations("Store.toasts");
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  const storeProduct = toStoreProduct(product);
  const wishlisted = useSelector((s: RootState) =>
    s.wishlist.items.some((item) => item.id === product.id)
  );
  const rating = getProductRating(product.id);
  const detailsHref = `/products/${product.category}/${product.id}`;

  const handleAdd = () => {
    dispatch(addToCart({ product: storeProduct }));
    dispatch(pushToast({ message: tt("addedToCart") }));
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const handleToggleWishlist = () => {
    if (wishlisted) {
      dispatch(removeFromWishlist(product.id));
      dispatch(pushToast({ message: tt("removedFromWishlist"), type: "info" }));
    } else {
      dispatch(toggleWishlist(storeProduct));
      dispatch(pushToast({ message: tt("addedToWishlist") }));
    }
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4), ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-l-grey/20 bg-background shadow-sm transition-shadow hover:shadow-xl hover:shadow-brand-primary/10"
    >
      <div className="relative aspect-square overflow-hidden bg-neutral-silver dark:bg-white/5">
        <Link href={detailsHref} aria-label={product.name} className="block size-full">
          <Image
            src={product.Image || PLACEHOLDER}
            alt={product.name}
            fill
            unoptimized
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        {product.Tag && (
          <span className="absolute start-3 top-3 rounded-full bg-tint-t5 px-2.5 py-1 text-[11px] font-semibold capitalize text-shade-s2 dark:bg-shade-s5/60 dark:text-brand-primary">
            {product.Tag.split(",")[0]}
          </span>
        )}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={handleToggleWishlist}
          aria-label={wishlisted ? t("removeFromWishlist") : t("addToWishlist")}
          title={wishlisted ? t("removeFromWishlist") : t("addToWishlist")}
          className={`absolute end-3 top-3 grid size-9 place-items-center rounded-full shadow-sm backdrop-blur transition-colors ${
            wishlisted
              ? "bg-rose-500 text-white"
              : "bg-white/80 text-neutral-d-grey hover:text-rose-500 dark:bg-black/40 dark:text-neutral-l-grey"
          }`}
        >
          <Heart className="size-4" fill={wishlisted ? "currentColor" : "none"} />
        </motion.button>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link href={detailsHref} className="min-h-10">
          <h3 className="line-clamp-2 text-sm font-medium leading-5 text-neutral-black transition-colors group-hover:text-brand-primary dark:text-neutral-white">
            {product.name}
          </h3>
        </Link>
        <p className="line-clamp-1 text-xs text-neutral-grey">{product.description}</p>
        <div className="flex items-center gap-1.5">
          <StarRating value={rating.rate} size="size-3.5" />
          <span className="text-xs text-neutral-grey">({rating.count})</span>
        </div>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <span className="text-lg font-bold text-shade-s2 dark:text-brand-primary">
            {product.Price}
          </span>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleAdd}
            aria-label={t("addToCart")}
            title={t("addToCart")}
            className={`grid size-10 place-items-center rounded-full text-white shadow-md transition-colors ${
              added ? "bg-shade-s2" : "bg-brand-primary hover:bg-shade-s2"
            }`}
          >
            {added ? <Check className="size-5" /> : <ShoppingCart className="size-5" />}
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
