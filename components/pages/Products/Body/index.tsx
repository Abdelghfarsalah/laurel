"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Search, ChevronDown, PackageSearch, RotateCcw } from "lucide-react";
import { useGetProductsQuery } from "@/redux/features/api/productsApi";
import ProductCard from "@/components/shared/ProductCard";
import { ProductCardSkeletonGrid } from "@/components/shared/ProductCardSkeleton";

interface ProductsBodyProps {
  slug: string;
  label: string;
}

type SortKey = "featured" | "low" | "high";

export default function ProductsBody({ slug, label }: ProductsBodyProps) {
  const t = useTranslations("Store.products");
  const { data, isLoading, isError, refetch } = useGetProductsQuery(slug);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");

  const filtered = useMemo(() => {
    if (!data) return [];
    const q = query.trim().toLowerCase();
    const list = q
      ? data.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            (p.Tag ?? "").toLowerCase().includes(q)
        )
      : data;
    const sorted = [...list];
    if (sort === "low") sorted.sort((a, b) => a.priceValue - b.priceValue);
    if (sort === "high") sorted.sort((a, b) => b.priceValue - a.priceValue);
    return sorted;
  }, [data, query, sort]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-28 font-bold text-neutral-black sm:text-36 dark:text-neutral-white">
          {label}
        </h1>
        <p className="mt-1 text-sm text-neutral-grey">
          {filtered.length} {t("results")}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="my-6 flex flex-col gap-3 sm:flex-row sm:items-center"
      >
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute start-3.5 top-1/2 size-4 -translate-y-1/2 text-neutral-grey" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            aria-label={t("searchPlaceholder")}
            className="h-11 w-full rounded-full border border-input bg-background ps-10 pe-4 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/30"
          />
        </div>
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            aria-label={t("sortBy")}
            className="h-11 w-full cursor-pointer appearance-none rounded-full border border-input bg-background ps-4 pe-10 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/30 sm:w-auto"
          >
            <option value="featured">{t("sortDefault")}</option>
            <option value="low">{t("sortPriceLow")}</option>
            <option value="high">{t("sortPriceHigh")}</option>
          </select>
          <ChevronDown className="pointer-events-none absolute end-3.5 top-1/2 size-4 -translate-y-1/2 text-neutral-grey" />
        </div>
      </motion.div>

      {isLoading && <ProductCardSkeletonGrid count={12} />}

      {isError && (
        <div className="flex flex-col items-center gap-4 rounded-2xl bg-red-50 p-12 text-center dark:bg-red-950/20">
          <p className="text-sm font-medium text-red-600 dark:text-red-400">{t("error")}</p>
          <button
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-shade-s2"
          >
            <RotateCcw className="size-4" />
            {t("retry")}
          </button>
        </div>
      )}

      {!isLoading && !isError && filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-neutral-l-grey/40 py-20 text-center"
        >
          <PackageSearch className="size-12 text-neutral-l-grey" />
          <p className="text-sm text-neutral-grey">{t("empty")}</p>
        </motion.div>
      )}

      <AnimatePresence mode="popLayout">
        {!isLoading && !isError && filtered.length > 0 && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {filtered.slice(0, 40).map((p, i) => (
              <ProductCard key={p.id} product={p} index={i % 8} />
            ))}
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
