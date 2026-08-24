import type { Metadata } from "next";
import OrdersBody from "@/components/pages/Orders/Body";

export const metadata: Metadata = {
  title: "My Orders — NovaMart",
};

export default function OrdersPage() {
  return <OrdersBody />;
}
