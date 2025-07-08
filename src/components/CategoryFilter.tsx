"use client";

import { useCategories } from "@/hooks/useCategory";
import { CategorySelect } from "./CategorySelect";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CategoryFilter = () => {
  const { categories } = useCategories();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get initial selected slug from URL
  const initialSlug = searchParams.get("category") || "";

  // Get the _id of the category based on current slug
  const getIdFromSlug = (slug: string): string => {
    const category = categories.find((cat) => cat.slug === slug);
    return category?._id?.toString() || "";
  };

  // local state for dropdown
  const [selectedId, setSelectedId] = useState<string>("");

  // Sync selected ID with URL slug (when categories loaded or URL changes)
  useEffect(() => {
    if (categories.length > 0) {
      const currentId = getIdFromSlug(initialSlug);
      setSelectedId(currentId);
    }
  }, [categories, initialSlug]);

  // Handle dropdown change
  const handleChange = (categoryId: string) => {
    setSelectedId(categoryId);

    const params = new URLSearchParams(searchParams.toString());

    if (categoryId === "all-category") {
      params.delete("category"); // Remove filter
    } else {
      const selectedCategory = categories.find((cat) => cat._id === categoryId);
      const selectedSlug = selectedCategory?.slug;
      if (!selectedSlug) return;

      params.set("category", selectedSlug);
    }

    params.set("page", "1");

    router.push(`/shop?${params.toString()}`);
  };

  return (
     <div className=" p-1 rounded-md space-y-3">
      <h3 className="font-medium  text-gray-700">Filter by Category</h3>
    <div className="mb-4">
      <CategorySelect
        value={selectedId}
        onChange={handleChange}
        placeholder="Filter by category"
        allCategory={true}
      />
    </div>
    </div>
  );
};

export default CategoryFilter;
