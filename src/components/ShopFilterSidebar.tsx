"use client";

import PriceFilter from "./PriceFilter";
import CategoryFilter from "./CategoryFilter";
import SortFilter from "./SortFiltering";


const ShopFilterSidebar = () => {
 
  

  return (
    <div className="p-4 rounded-lg shadow-md border text-sm space-y-5 bg-white text-blackMid">
      {/* sort  */}
      <SortFilter/>
      {/* Category */}
      <CategoryFilter></CategoryFilter>

      {/* Price Range */}
      <PriceFilter></PriceFilter>

      {/* Brand */}
      {/* <div>
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
      </div> */}

      {/* Rating */}
      {/* <div>
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
      </div> */}

      {/* Sort */}
      {/* <div>
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
      </div> */}

      {/* Buttons */}
      {/* <div className="flex flex-col gap-2">
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
      </div> */}
    </div>
  );
};

export default ShopFilterSidebar;
