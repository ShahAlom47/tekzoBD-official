"use client";

import React, { useState, useEffect, useMemo } from "react";
import Drawer from "./Drawer";
import { BsBookmarkHeart } from "react-icons/bs";
import { useWishlist } from "@/hooks/useWishlist";
import WishListContent from "./WishListContent";
import Loading from "@/app/loading";
import { useUser } from "@/hooks/useUser";

const NavWishList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { user } = useUser();

  const {
    wishlistProducts,
    isProductsLoading,
    isProductsError,
    refetchProducts,
    productIdList,
    stableProductIdList,
  } = useWishlist();

  // Make sure the component is rendered on client only
  useEffect(() => {
    setIsClient(true);
  }, []);

   const wishCount = useMemo(() => {
    const count = productIdList?.length || 0;
    return count > 98 ? "99+" : `${count}`;
  }, [productIdList]);


  

  // Trigger refetch only when drawer opens and user is logged in
  useEffect(() => {
    if (isClient && user && isOpen && stableProductIdList?.length>0) {
      refetchProducts();
    }
  }, [isClient, user, isOpen, refetchProducts]);

 

  return (
    <div className="relative flex items-center">
      <button
        onClick={() => setIsOpen(true)}
        className="text-gray-700 md:text-3xl text-xl font-light relative hover:scale-90 transition-transform"
        title="Wishlist"
      >
        <BsBookmarkHeart />
        <span className="md:h-5 md:w-5 h-4 w-4 bg-brandPrimary rounded-full absolute -top-2 -right-2 md:text-[9px] text-[8px] text-white flex items-center justify-center font-semibold shadow">
          {wishCount}
        </span>
      </button>

      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        direction="right"
        width="w-[90%] md:w-[40%]"
      >
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 pb-2 border-b-2">My Wishlist</h3>

          <div className="max-h-[86vh] overflow-y-auto">
            {isProductsLoading && !wishlistProducts && <Loading />}

            {isProductsError && (
              <div className="text-red-500 text-sm text-center">
                Failed to load wishlist.{" "}
                <button
                  onClick={() => refetchProducts()}
                  className="underline text-brandPrimary hover:text-red-600"
                >
                  Try again
                </button>
              </div>
            )}

            {!isProductsLoading &&
              !isProductsError &&
              wishlistProducts?.length === 0 && (
                <div className="text-center text-gray-500 mt-6">
                  No products in your wishlist.
                </div>
              )}

            {!isProductsLoading &&
              !isProductsError &&
              productIdList &&
              wishlistProducts?.length > 0 && (
                <WishListContent products={wishlistProducts} contentType="drawer" />
              )}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default NavWishList;
