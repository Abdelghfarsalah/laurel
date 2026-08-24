import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategory } from "@/constant/categories";
import ProductDetailsBody from "@/components/pages/ProductDetails/Body";

interface ProductPageProps {
  params: Promise<{ category: string; id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  return {
    title: `${category?.label ?? "Product"} — NovaMart`,
  };
}

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const { category: slug, id } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  return <ProductDetailsBody slug={category.slug} productId={id} />;
}
