"use client";

import React, { useEffect } from "react";
import Loading from "@/app/loading";
import WishListContent from "./WishListContent";
import { useWishlist } from "@/hooks/useWishlist";
import { usePathname } from "next/navigation";

const MyWishListContent = () => {
  const {
    wishlistProducts,
    isProductsLoading,
    refetchProducts,
    stableProductIdList,
  } = useWishlist();
  const pathname = usePathname();

  // Trigger refetch only when drawer opens and user is logged in

  useEffect(() => {
    if (pathname?.includes("/my-wishlist") && stableProductIdList?.length > 0) {
      refetchProducts();
    }
  }, [pathname, stableProductIdList,refetchProducts]);

  return (
    <div>
      {isProductsLoading ? (
        <Loading />
      ) : wishlistProducts.length === 0 ? (
        <p>No products in wishlist.</p>
      ) : (
        <WishListContent products={wishlistProducts} contentType="page" />
      )}
    </div>
  );
};

export default MyWishListContent;
