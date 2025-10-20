"use client";
import { useState } from "react";
import CategoriesSection from "@/components/sections/CategoriesSection";
import ProductsSection from "@/components/sections/ProductsSection";
import CarouselBanner from "@/components/sections/CarouselBanner";

export default function HomePage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  return (
    <>
    <CarouselBanner />
      <CategoriesSection
        onCategorySelect={setSelectedCategoryId}
        selectedCategoryId={selectedCategoryId}
      />
      <ProductsSection selectedCategoryId={selectedCategoryId} />
    </>
  );
}
