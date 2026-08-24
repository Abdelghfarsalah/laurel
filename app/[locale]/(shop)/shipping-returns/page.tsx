import type { Metadata } from "next";
import ShippingReturnsBody from "@/components/pages/Support/ShippingReturns";

export const metadata: Metadata = {
  title: "Shipping & Returns — NovaMart",
};

export default function ShippingReturnsPage() {
  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8">
      <ShippingReturnsBody />
    </section>
  );
}
