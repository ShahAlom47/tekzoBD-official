"use client";

import { useEffect, useState } from "react";
import { ProductType } from "@/Interfaces/productInterfaces";
import ProductCard from "./ProductCard";
import { getRecentViewedIds } from "@/utils/recentViewHelper";
import { getRecentProductsByIds } from "@/lib/allApiRequest/productRequest/productRequest";

const RecentViewProducts = () => {
  const [recentProducts, setRecentProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchRecentProducts = async () => {
      const ids = getRecentViewedIds();

      if (ids.length > 0) {
        const res = await getRecentProductsByIds(ids);
        setRecentProducts((res?.data ?? []) as ProductType[]);
      }
    };

    fetchRecentProducts();
  }, []);

  if (recentProducts.length === 0) return null;

  return (
    <div className="my-8 py-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Recently Viewed</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recentProducts.map((item) => (
          <ProductCard key={String(item._id)} item={item} layout="grid-4" />
        ))}
      </div>
    </div>
  );
};

export default RecentViewProducts;
