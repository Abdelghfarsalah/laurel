import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategory } from "@/constant/categories";
import ProductsBody from "@/components/pages/Products/Body";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  return {
    title: category ? `${category.label} — NovaMart` : "Category — NovaMart",
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  return <ProductsBody slug={category.slug} label={category.label} />;
}
