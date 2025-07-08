"use client";

import {
  setGlobalSearchValue,
  clearGlobalSearchValue,
} from "@/redux/features/search/GlobalSearchSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/reduxHook";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const GlobalSearchBox: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [searchText, setSearchText] = useState<string>("");

  const searchTerm = useAppSelector(
    (state) => state.globalSearch.globalSearchValue
  );

  // ✅ Handle search & redirect
  const handleSearch = () => {
    const trimmed = searchText.trim();
    if (!trimmed) return;

    dispatch(setGlobalSearchValue(trimmed));
    router.push(`/shop?searchTrim=${encodeURIComponent(trimmed)}`);
  };

  // ✅ Clear search & go back to shop without query
  const handleClearSearch = () => {
    setSearchText("");
    dispatch(clearGlobalSearchValue());
    router.push("/shop");
  };

  // ✅ Live update input
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="relative w-full max-w-screen-md mx-auto rounded-full border-2 border-brandPrimary">
      <input
        type="text"
        value={searchText}
        onChange={handleSearchChange}
        placeholder="Search products..."
        className="w-full px-4 py-1 bg-transparent focus:outline-none rounded-full text-black focus:ring-2 focus:ring-brandPrimary transition duration-300"
      />

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brandPrimary"
      >
        <FaSearch />
      </button>

      {/* Clear (X) Button */}
      {searchText && (
        <button
          onClick={handleClearSearch}
          className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition"
        >
          <IoClose size={18} />
        </button>
      )}
    </div>
  );
};

export default GlobalSearchBox;
