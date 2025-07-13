"use client";
import React, { useState } from "react";
import Drawer from "./Drawer";
import { BsBookmarkHeart } from "react-icons/bs";
import { useWishlist } from "@/hooks/useWishlist";
import WishListContent from "./WishListContent";
import { useQuery } from "@tanstack/react-query";
import { getWishListProductByIds } from "@/lib/allApiRequest/wishListRequest/wishListRequest";
import { ProductType } from "@/Interfaces/productInterfaces";
import Loading from "@/app/loading";

const NavWishList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { productIdList } = useWishlist();
  console.log(productIdList);

  const {
    data: products,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["wishlistData", productIdList],
    queryFn: async () => {
      const res = await getWishListProductByIds(productIdList);
      return res.data as ProductType[];
    },
    enabled: isOpen && productIdList.length > 0,
    staleTime: 1000 * 60 * 2, // 2 minutes stale time - data considered fresh for 2 mins
  });

  const wishCount = () => {
    const count = productIdList?.length || 0;
    return count > 98 ? "99+" : `${count}`;
  };

  return (
    <div className="relative flex items-center">
      {/* Wishlist Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-gray-700 md:text-3xl text-xl font-light relative hover:scale-90"
        title="Wishlist"
      >
        <BsBookmarkHeart />
        <span className="md:h-5 md:w-5 h-4 w-4 p-1 bg-brandPrimary rounded-full absolute -top-2 -right-2 md:text-[9px] text-[8px] text-white flex items-center justify-center font-semibold shadow">
          {wishCount()}
        </span>
      </button>

      {/* Drawer */}
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        direction="right"
        width="w-[90%] md:w-[40%]"
      >
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 pb-2 border-b-2">
            My Wishlist
          </h3>

          <div className="max-h-[86vh] overflow-y-scroll">
            {/* Loading State */}
            {isLoading && !products && <Loading />}

            {/* Error State */}
            {isError && (
              <div className="text-red-500 text-sm text-center">
                Failed to load wishlist.{" "}
                <button
                  onClick={() => refetch()}
                  className="underline text-brandPrimary hover:text-red-600"
                >
                  Try again
                </button>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !isError && products?.length === 0 && (
              <div className="text-center text-gray-500 mt-6">
                No products in your wishlist.
              </div>
            )}

            {/* Success Content */}
            {!isLoading && !isError && products && products.length > 0 && (
              <WishListContent products={products} contentType="drawer" />
            )}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default NavWishList;
