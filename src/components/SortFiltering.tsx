"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const sortOptions = [
  { label: "Default", value: "" },
  { label: "Price: Low to High", value: "asc" },
  { label: "Price: High to Low", value: "desc" },
  { label: "Newest", value: "newest" },
  { label: "Most Popular", value: "popular" },
  { label: "Offer First", value: "offer" },
];

const SortFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSort = searchParams.get("sort") || "";

  const [selectedSort, setSelectedSort] = useState(initialSort);

  useEffect(() => {
    setSelectedSort(initialSort);
  }, [initialSort]);

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    params.set("page", "1"); // Reset page on sort change
    setSelectedSort(value);
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <div className="mb-4">
      <label className="font-medium  text-gray-700">Sort By</label>
      <select
        value={selectedSort}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full my-input"
      >
        {sortOptions.map(({ label, value }) => (
          <option key={value || "default"} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortFilter;
