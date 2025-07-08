"use client";

import PriceFilter from "./PriceFilter";
import CategoryFilter from "./CategoryFilter";
import SortFilter from "./SortFiltering";
import BrandFilter from "./BrandFilter";


const ShopFilterSidebar = () => {
 
  

  return (
    <div className="p-4 rounded-lg shadow-md border text-sm space-y-5 bg-white text-blackMid">
      {/* sort  */}
      <SortFilter/>
      {/* Category */}
      <CategoryFilter></CategoryFilter>

      {/* Price Range */}
      <PriceFilter></PriceFilter>

      {/* Brand Filter */}
      <BrandFilter></BrandFilter>

     
   
    </div>
  );
};

export default ShopFilterSidebar;
