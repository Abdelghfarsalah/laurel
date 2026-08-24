"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  ChevronDown,
  PackageSearch,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";
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
  const tf = useTranslations("Store.filters");
  const { data, isLoading, isError, refetch } = useGetProductsQuery(slug);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");
  const [brand, setBrand] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const brands = useMemo(() => {
    if (!data) return [];
    return Array.from(
      new Set(
        data
          .map((p) => p.Brand?.trim())
          .filter((b): b is string => Boolean(b && b.length > 0))
      )
    ).sort((a, b) => a.localeCompare(b));
  }, [data]);

  const filtered = useMemo(() => {
    if (!data) return [];
    const q = query.trim().toLowerCase();
    const min = minPrice ? Number.parseFloat(minPrice) : null;
    const max = maxPrice ? Number.parseFloat(maxPrice) : null;
    const list = data.filter((p) => {
      if (
        q &&
        !p.name.toLowerCase().includes(q) &&
        !p.description.toLowerCase().includes(q) &&
        !(p.Tag ?? "").toLowerCase().includes(q)
      ) {
        return false;
      }
      if (brand !== "all" && (p.Brand ?? "").trim() !== brand) return false;
      if (min !== null && p.priceValue < min) return false;
      if (max !== null && p.priceValue > max) return false;
      return true;
    });
    const sorted = [...list];
    if (sort === "low") sorted.sort((a, b) => a.priceValue - b.priceValue);
    if (sort === "high") sorted.sort((a, b) => b.priceValue - a.priceValue);
    return sorted;
  }, [data, query, sort, brand, minPrice, maxPrice]);

  const hasActiveFilters =
    query !== "" || brand !== "all" || minPrice !== "" || maxPrice !== "";

  const clearFilters = () => {
    setQuery("");
    setSort("featured");
    setBrand("all");
    setMinPrice("");
    setMaxPrice("");
  };

  const inputClass =
    "h-11 rounded-full border border-input bg-background px-4 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/30";

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
        className="my-6 flex flex-col gap-3"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute start-3.5 top-1/2 size-4 -translate-y-1/2 text-neutral-grey" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              aria-label={t("searchPlaceholder")}
              className={`${inputClass} w-full ps-10 pe-4`}
            />
          </div>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              aria-label={t("sortBy")}
              className={`${inputClass} w-full cursor-pointer appearance-none ps-4 pe-10 sm:w-auto`}
            >
              <option value="featured">{t("sortDefault")}</option>
              <option value="low">{t("sortPriceLow")}</option>
              <option value="high">{t("sortPriceHigh")}</option>
            </select>
            <ChevronDown className="pointer-events-none absolute end-3.5 top-1/2 size-4 -translate-y-1/2 text-neutral-grey" />
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex h-11 items-center gap-1.5 self-start rounded-full px-4 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 sm:self-auto dark:hover:bg-red-950/40"
            >
              <RotateCcw className="size-3.5" />
              {tf("clear")}
            </button>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap items-center gap-3 rounded-3xl border border-neutral-l-grey/20 p-3"
        >
          <span className="inline-flex items-center gap-1.5 px-1 text-sm font-semibold text-neutral-d-grey dark:text-neutral-l-grey">
            <SlidersHorizontal className="size-4 text-brand-primary" />
            {tf("title")}
          </span>

          <div className="relative">
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              aria-label={tf("brand")}
              className="h-9 cursor-pointer appearance-none rounded-full bg-neutral-silver pe-8 ps-3 text-xs font-medium text-neutral-d-grey outline-none transition focus:border-ring dark:bg-white/10 dark:text-neutral-l-grey"
            >
              <option value="all">{tf("allBrands")}</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute end-2.5 top-1/2 size-3.5 -translate-y-1/2 text-neutral-grey" />
          </div>

          <label className="flex items-center gap-1.5 text-xs font-medium text-neutral-grey">
            {tf("priceFrom")}
            <input
              type="number"
              min={0}
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="0"
              aria-label={tf("priceFrom")}
              className="h-9 w-20 rounded-full border border-input bg-transparent px-2.5 text-center text-xs outline-none focus:border-ring dark:text-neutral-white"
            />
          </label>
          <label className="flex items-center gap-1.5 text-xs font-medium text-neutral-grey">
            {tf("priceTo")}
            <input
              type="number"
              min={0}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="99999"
              aria-label={tf("priceTo")}
              className="h-9 w-20 rounded-full border border-input bg-transparent px-2.5 text-center text-xs outline-none focus:border-ring dark:text-neutral-white"
            />
          </label>
        </motion.div>
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
