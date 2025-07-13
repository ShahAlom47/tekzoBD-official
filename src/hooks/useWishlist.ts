"use client";

import { useEffect, useCallback, useState } from "react";
import { useUser } from "./useUser";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/reduxHook";
import {
  setWishlistRedux,
  clearWishlistRedux,
} from "@/redux/features/wishList/wishlistSlice";
import { queryClient } from "@/Providers/QueryProvider";
import { WishlistType } from "@/Interfaces/wishListInterfaces";
import {
  addWishList,
  getUserWishList,
  removeWishData,
} from "@/lib/allApiRequest/wishListRequest/wishListRequest";
import { ProductType } from "@/Interfaces/productInterfaces";

export const useWishlist = () => {
  const { user } = useUser();
  const userEmail = user?.email;
  const dispatch = useAppDispatch();
  const wishlistData = useAppSelector((state) => state.wishlist.data); // WishlistType | null

  const [loading, setLoading] = useState(false);

  // ✅ Load wishlist for logged-in user
  useEffect(() => {
    if (!userEmail) return;

    const loadWishlist = async () => {
      setLoading(true);
      try {
        const result = await getUserWishList(userEmail);
        const data = result?.data as WishlistType;
        if (result) {
          dispatch(setWishlistRedux(data));
        } else {
          dispatch(clearWishlistRedux());
        }
      } catch {
        toast.error("Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    };

    loadWishlist();
  }, [userEmail, dispatch]);

  // ✅ Add a product to wishlist
  const addToWishlist = useCallback(
    async (productId: string) => {
      if (!userEmail) {
        toast.error("Login required to add wishlist");
        return;
      }

      const exists = wishlistData?.products.find(
        (p) => p.productId === productId
      );
      if (exists) {
        toast("Already in wishlist");
        return;
      }

      try {
        const res = await addWishList({
          productId,
          addedAt: new Date().toISOString(),
          userEmail,
        });
        if (res?.success) {
          const updated: WishlistType = {
            ...(wishlistData || { userEmail, products: [] }),
            products: [
              ...(wishlistData?.products || []),
              { productId, addedAt: new Date().toISOString() },
            ],
          };
          dispatch(setWishlistRedux(updated));
          queryClient.invalidateQueries({ queryKey: ["wishlistData"] });
          toast.success(res.message || "Added to wishlist");
        }
      } catch {
        toast.error("Failed to add to wishlist");
      }
    },
    [userEmail, wishlistData, dispatch]
  );

  // ✅ Remove a product from wishlist
  const removeFromWishlist = useCallback(
    async (productId: string) => {
      if (!userEmail) {
        toast.error("Login required");
        return;
      }

      try {
        const res = await removeWishData(productId, userEmail);
        if (res?.success) {
          const updated: WishlistType = {
            ...(wishlistData || { userEmail, products: [] }),
            products:
              wishlistData?.products.filter((p) => p.productId !== productId) ||
              [],
          };
          dispatch(setWishlistRedux(updated));

          // Update local cached query UI
          queryClient.setQueryData(
            ["wishlistData"],
            (old: ProductType[] = []) => old.filter((p) => p._id !== productId)
          );
          toast.success(res.message || "Removed from wishlist");
        }
      } catch {
        toast.error("Failed to remove from wishlist");
      }
    },
    [userEmail, wishlistData, dispatch]
  );

  // ✅ Toggle wishlist
  const toggleWishlist = useCallback(
    async (productId: string) => {
      const exists = wishlistData?.products.find(
        (p) => p.productId === productId
      );
      if (exists) {
        await removeFromWishlist(productId);
      } else {
        await addToWishlist(productId);
      }
    },
    [wishlistData, addToWishlist, removeFromWishlist]
  );

  // ✅ Check if wishlisted
  const isWishlisted = useCallback(
    (productId: string) => {
      return (
        wishlistData?.products.some((p) => p.productId === productId) || false
      );
    },
    [wishlistData]
  );

  // ✅ Clear wishlist from Redux
  const clearWishlist = useCallback(() => {
    dispatch(clearWishlistRedux());
    queryClient.invalidateQueries({ queryKey: ["wishlistData"] });
  }, [dispatch]);

  const productIdList = wishlistData?.products.map((p) => p.productId) || [];

  return {
    wishlist: wishlistData,
    wishlistProducts: wishlistData?.products || [],
    productIdList,
    loading,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isWishlisted,
    clearWishlist,
  };
};
