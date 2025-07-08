"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PriceRangeSlider from "./ui/PriceRangeSlider";


const PriceFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialMin = parseInt(searchParams.get("minPrice") || "1000", 10);
  const initialMax = parseInt(searchParams.get("maxPrice") || "10000", 10);

  const [priceRange, setPriceRange] = useState<[number, number]>([
    initialMin,
    initialMax,
  ]);

  // Update local state when URL changes (optional)
  useEffect(() => {
    setPriceRange([initialMin, initialMax]);
  }, [initialMin, initialMax]);

  const handleApply = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("minPrice", String(priceRange[0]));
    params.set("maxPrice", String(priceRange[1]));
    params.set("page", "1"); // reset pagination if needed

    router.push(`/shop?${params.toString()}`);
  };

  const handleReset = () => {
    router.push("/shop");
    setPriceRange([1000, 10000]); // reset local state
  };

  return (
    <div className=" p-1 rounded-md space-y-3">
      <h3 className="font-semibold text-lg text-gray-700">Filter by Price</h3>

      <div>
        <PriceRangeSlider
          min={0}
          max={50000}
          step={100}
          defaultValue={priceRange}
          onChange={(val) => setPriceRange(val as [number, number])}
        />
        <div className="text-sm text-gray-600 mt-2">
          Selected: TK {priceRange[0]} - Tk {priceRange[1]}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleApply}
          className="btn-base py-0 "
        >
          Apply
        </button>
        <button
          onClick={handleReset}
          className="btn-bordered py-0 rounded-sm text-sm"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default PriceFilter;
