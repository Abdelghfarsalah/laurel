"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, PackageSearch, LoaderCircle } from "lucide-react";
import {
  useGetProductsQuery,
  type NormalizedProduct,
} from "@/redux/features/api/productsApi";
import ProductCard from "@/components/shared/ProductCard";

export default function SearchBody() {
  const t = useTranslations("Store.products");
  const ts = useTranslations("Store.search");
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") ?? "";

  const mobiles = useGetProductsQuery("mobiles");
  const laptops = useGetProductsQuery("laptops");
  const watches = useGetProductsQuery("watches");
  const menswear = useGetProductsQuery("menswear");
  const womenswear = useGetProductsQuery("womenswear");
  const kidswear = useGetProductsQuery("kidswear");
  const books = useGetProductsQuery("books");
  const malefootwear = useGetProductsQuery("malefootwear");
  const femalefootwear = useGetProductsQuery("femalefootwear");
  const kidsfootwear = useGetProductsQuery("kidsfootwear");

  const datasets = [
    mobiles,
    laptops,
    watches,
    menswear,
    womenswear,
    kidswear,
    books,
    malefootwear,
    femalefootwear,
    kidsfootwear,
  ];

  const fetching =
    datasets.some((d) => d.isFetching) ||
    datasets.every((d) => !d.data && !d.isError);

  const results: NormalizedProduct[] = datasets.flatMap((d) => d.data ?? []);

  const [query, setQuery] = useState(urlQuery);
  const [prevUrlQuery, setPrevUrlQuery] = useState(urlQuery);
  if (urlQuery !== prevUrlQuery) {
    setPrevUrlQuery(urlQuery);
    setQuery(urlQuery);
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.Tag ?? "").toLowerCase().includes(q) ||
        (p.Brand ?? "").toLowerCase().includes(q)
    );
  }, [results, query]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-28 font-bold text-neutral-black sm:text-36 dark:text-neutral-white">
          {ts("title")}
        </h1>
      </motion.div>

      <form onSubmit={(e) => e.preventDefault()} role="search" className="relative my-6 max-w-xl">
        <Search className="pointer-events-none absolute start-4 top-1/2 size-5 -translate-y-1/2 text-neutral-grey" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("searchPlaceholder")}
          aria-label={t("searchPlaceholder")}
          className="h-12 w-full rounded-full border border-input bg-background ps-12 pe-4 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/30"
        />
      </form>

      {fetching ? (
        <div className="flex flex-col items-center gap-3 py-24 text-center">
          <LoaderCircle className="size-10 animate-spin text-brand-primary" />
          <p className="text-sm text-neutral-grey">{ts("loading")}</p>
        </div>
      ) : (
        <>
          {!query.trim() ? (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-neutral-l-grey/40 py-20 text-center">
              <Search className="size-12 text-neutral-l-grey" />
              <p className="text-sm text-neutral-grey">{ts("prompt")}</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-neutral-l-grey/40 py-20 text-center">
              <PackageSearch className="size-12 text-neutral-l-grey" />
              <p className="text-sm text-neutral-grey">{t("empty")}</p>
            </div>
          ) : (
            <>
              <p className="mb-4 text-sm text-neutral-grey">
                {filtered.length} {t("results")}
              </p>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {filtered.slice(0, 40).map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i % 8} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}
