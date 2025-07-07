"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const ShopFilterSidebar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    params.set("page", "1"); // Reset to first page on new filter

    router.push(`/shop?${params.toString()}`);
  };

  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-bold mb-2">Filter by Price</h3>
      <input
        type="number"
        placeholder="Min"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="w-full border px-2 py-1 mb-2"
      />
      <input
        type="number"
        placeholder="Max"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="w-full border px-2 py-1 mb-2"
      />
      <button
        onClick={handleFilter}
        className="bg-brandPrimary text-white px-4 py-2 rounded w-full"
      >
        Apply
      </button>
    </div>
  );
};

export default ShopFilterSidebar;
