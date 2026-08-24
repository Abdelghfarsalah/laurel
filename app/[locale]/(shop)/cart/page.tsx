import type { Metadata } from "next";
import CartBody from "@/components/pages/Cart/Body";

export const metadata: Metadata = {
  title: "Your Cart — NovaMart",
};

export default function CartPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <CartBody />
    </section>
  );
}
