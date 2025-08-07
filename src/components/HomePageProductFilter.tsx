"use client";
import React from "react";
import SortFilter from "./SortFiltering";
import CategoryFilter from "./CategoryFilter";
import ClientOnly from "./wrappers/ClientOnly";

const HomePageProductFilter = () => {
  return (
    <div className="flex flex-col  md:flex-row md:w-fit w-full  md:absolute top-26 left-5">
      <ClientOnly>
        {/* sort  */}
        <SortFilter />
        {/* Category */}
        <CategoryFilter></CategoryFilter>
      </ClientOnly>
    </div>
  );
};

export default HomePageProductFilter;
