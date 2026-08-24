import { Suspense } from "react";
import type { Metadata } from "next";
import SearchBody from "@/components/pages/Search/Body";

export const metadata: Metadata = {
  title: "Search — NovaMart",
};

export default function SearchPage() {
  return (
    <Suspense>
      <SearchBody />
    </Suspense>
  );
}
