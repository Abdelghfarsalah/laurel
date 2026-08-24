import type { Metadata } from "next";
import CheckoutBody from "@/components/pages/Checkout/Body";

export const metadata: Metadata = {
  title: "Checkout — NovaMart",
};

export default function CheckoutPage() {
  return <CheckoutBody />;
}
