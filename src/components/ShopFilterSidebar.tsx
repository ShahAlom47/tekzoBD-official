"use client";

// import { useCategories } from "@/hooks/useCategory";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const categories = ["Electronics", "Clothing", "Shoes", "Accessories"];
const brands = ["Samsung", "Apple", "Nike", "Adidas"];
const sortOptions = [
  { label: "Default", value: "" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest", value: "newest" },
  { label: "Most Popular", value: "popular" },
];

const ShopFilterSidebar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
//   const {categories}= useCategories()

  // States
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [brand, setBrand] = useState(searchParams.get("brand") || "");
  const [rating, setRating] = useState(searchParams.get("rating") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "");

  // Handle Apply Filters
  const handleApply = () => {
    const params = new URLSearchParams(searchParams);

    if (minPrice) {
      params.set("minPrice", minPrice);
    } else {
      params.delete("minPrice");
    }
    if (maxPrice) {
      params.set("maxPrice", maxPrice);
    } else {
      params.delete("maxPrice");
    }
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    if (brand) {
      params.set("brand", brand);
    } else {
      params.delete("brand");
    }
    if (rating) {
      params.set("rating", rating);
    } else {
      params.delete("rating");
    }
    if (sort) {
      params.set("sort", sort);
    } else {
      params.delete("sort");
    }

    params.set("page", "1"); // Reset page

    router.push(`/shop?${params.toString()}`);
  };

  // Handle Reset
  const handleReset = () => {
    router.push("/shop");
    setMinPrice("");
    setMaxPrice("");
    setCategory("");
    setBrand("");
    setRating("");
    setSort("");
  };

  return (
    <div className="p-4 border rounded space-y-4">
      {/* Price Filter */}
      <div>
        <h3 className="font-semibold mb-2">Price Range</h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-1/2 border px-2 py-1"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-1/2 border px-2 py-1"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <h3 className="font-semibold mb-2">Category</h3>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border px-2 py-1"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Brand Filter */}
      <div>
        <h3 className="font-semibold mb-2">Brand</h3>
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="w-full border px-2 py-1"
        >
          <option value="">All Brands</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {/* Rating Filter */}
      <div>
        <h3 className="font-semibold mb-2">Minimum Rating</h3>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-full border px-2 py-1"
        >
          <option value="">All</option>
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} & up
            </option>
          ))}
        </select>
      </div>

      {/* Sort Option */}
      <div>
        <h3 className="font-semibold mb-2">Sort By</h3>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full border px-2 py-1"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-2 mt-4">
        <button
          onClick={handleApply}
          className="bg-brandPrimary text-white px-4 py-2 rounded"
        >
          Apply Filters
        </button>
        <button
          onClick={handleReset}
          className="border text-brandPrimary border-brandPrimary px-4 py-2 rounded"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default ShopFilterSidebar;
