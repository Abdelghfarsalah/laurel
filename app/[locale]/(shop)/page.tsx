import Hero from "@/components/pages/Home/Header";
import CategoriesGrid from "@/components/pages/Home/Body/CategoriesGrid";
import FeaturedSections from "@/components/pages/Home/Body/FeaturedSections";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoriesGrid />
      <FeaturedSections />
    </>
  );
}
