"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useGetProductsQuery } from "@/redux/features/api/productsApi";
import ProductCard from "@/components/shared/ProductCard";
import { ProductCardSkeletonGrid } from "@/components/shared/ProductCardSkeleton";

interface FeaturedRowProps {
  slug: string;
  label: string;
}

function FeaturedRow({ slug, label }: FeaturedRowProps) {
  const t = useTranslations("Store.featured");
  const { data, isLoading, isError } = useGetProductsQuery(slug);

  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h3 className="text-20 font-bold text-neutral-black sm:text-28 dark:text-neutral-white">
            {label}
          </h3>
          <p className="text-sm text-neutral-grey">{t("subtitle")}</p>
        </div>
        <Link
          href={`/products/${slug}`}
          className="group flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-primary hover:text-shade-s2"
        >
          {t("viewAll")}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
        </Link>
      </div>

      {isLoading && <ProductCardSkeletonGrid count={4} />}

      {isError && (
        <p className="rounded-xl bg-red-50 p-4 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
          {t("error", {})}
        </p>
      )}

      {data && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {data.slice(0, 8).map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </motion.section>
  );
}

export default function FeaturedSections() {
  const rows = [
    { slug: "mobiles", label: "Mobiles" },
    { slug: "watches", label: "Watches" },
    { slug: "books", label: "Books" },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-16 px-4 pb-8 sm:px-6 lg:px-8">
      {rows.map((r) => (
        <FeaturedRow key={r.slug} slug={r.slug} label={r.label} />
      ))}
    </div>
  );
}
