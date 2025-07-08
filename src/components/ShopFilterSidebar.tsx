"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PriceFilter from "./PriceFilter";
import CategoryFilter from "./CategoryFilter";

const brands = ["Samsung", "Apple", "Nike", "Adidas"];
const sortOptions = [
  { label: "Default", value: "" },
  { label: "Price: Low to High", value: "asc" },
  { label: "Price: High to Low", value: "desc" },
  { label: "Newest", value: "newest" },
  { label: "Most Popular", value: "popular" },
  { label: "Only Offers", value: "offer" },
];

const ShopFilterSidebar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    category: "",
    brand: "",
    rating: "",
    sort: "",
  });

  useEffect(() => {
    // Initialize filter from URL
    setFilters({
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      category: searchParams.get("category") || "",
      brand: searchParams.get("brand") || "",
      rating: searchParams.get("rating") || "",
      sort: searchParams.get("sort") || "",
    });
  }, [searchParams]);

  const handleChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    params.set("page", "1");
    router.push(`/shop?${params.toString()}`);
  };

  const handleReset = () => {
    router.push("/shop");
  };

  return (
    <div className="p-4 rounded-lg shadow-md border text-sm space-y-5 bg-white text-blackMid">
   

      {/* Price Range */}

      <PriceFilter></PriceFilter>

      {/* Category */}
      <CategoryFilter></CategoryFilter>

     

      {/* Brand */}
      <div>
        <label className="block font-medium mb-1">Brand</label>
        <select
          value={filters.brand}
          onChange={(e) => handleChange("brand", e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">All Brands</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {/* Rating */}
      <div>
        <label className="block font-medium mb-1">Minimum Rating</label>
        <select
          value={filters.rating}
          onChange={(e) => handleChange("rating", e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">All</option>
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={String(r)}>
              {r} ★ & Up
            </option>
          ))}
        </select>
      </div>

      {/* Sort */}
      <div>
        <label className="block font-medium mb-1">Sort By</label>
        <select
          value={filters.sort}
          onChange={(e) => handleChange("sort", e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-2">
        <button
          onClick={handleApply}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          ✅ Apply Filters
        </button>
        <button
          onClick={handleReset}
          className="border border-blue-600 text-blue-600 py-2 rounded hover:bg-blue-50 transition"
        >
          🔄 Reset Filters
        </button>
      </div>
    </div>
  );
};

export default ShopFilterSidebar;
