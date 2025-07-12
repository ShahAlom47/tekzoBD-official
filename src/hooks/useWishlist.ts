"use client";

import {
  getLocalWishlist,
  WISHLIST_NAME,
} from "@/utils/wishList/getLocalWishList";
import { useState, useEffect, useCallback } from "react";
import { useUser } from "./useUser";
import { addWishlistWithSync } from "@/utils/wishList/addWishlistWithSync";
import { removeWishlistWithSync } from "@/utils/wishList/removeWishlistWithSync";
import {
  fetchWishlistFromDB,
  syncLocalWishlistToDB,
} from "@/utils/wishList/syncLocalWishlistToDB";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/reduxHook";
import {
  clearWishlistRedux,
  setWishlistRedux,
} from "@/redux/features/wishList/wishlistSlice";
import { queryClient } from "@/Providers/QueryProvider";

const WISHLIST_KEY = WISHLIST_NAME;

export interface WishlistProduct {
  productId: string;
  addedAt: string;
}

const getWishlistFromStorage = (): WishlistProduct[] => {
  try {
    const stored = localStorage.getItem(WISHLIST_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<WishlistProduct[]>([]);
  const { user } = useUser();
  const userEmail = user?.email;
  const dispatch = useAppDispatch();
  const wishlistIds = useAppSelector((state) => state.wishlist.wishlistIds);

  // ✅ Helper to update all sources consistently
  const updateWishlist = useCallback(
    (newWishlist: WishlistProduct[], showToast = true) => {
      setWishlist(newWishlist);
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(newWishlist));
      dispatch(setWishlistRedux(newWishlist.map((item) => item.productId)));
      queryClient.invalidateQueries({ queryKey: ["wishlistData"] });
      if (showToast) toast.success("Wishlist updated!");
    },
    [dispatch]
  );

  // ✅ Initial load from localStorage
  useEffect(() => {
    const local = getWishlistFromStorage();
    updateWishlist(local, false);
  }, [updateWishlist]);

  // ✅ Sync local wishlist with DB when user logs in
  useEffect(() => {
    if (!userEmail) return;

    const localWishlist = getLocalWishlist();

    const syncOrFetch = async () => {
      try {
        const freshWishlist = localWishlist.length
          ? await syncLocalWishlistToDB(userEmail)
          : await fetchWishlistFromDB(userEmail);

        if (freshWishlist) {
          updateWishlist(freshWishlist, false);
        }
      } catch (error) {
        console.error("Wishlist sync error:", error);
        toast.error("Failed to sync wishlist.");
      }
    };

    syncOrFetch();
  }, [userEmail, updateWishlist]);

  // ✅ Add item to wishlist
  const addToWishlist = useCallback(
    async (productId: string) => {
      if (wishlist.find((item) => item.productId === productId)) {
        toast("Already in wishlist");
        return;
      }

      const updated = [
        ...wishlist,
        { productId, addedAt: new Date().toISOString() },
      ];

      updateWishlist(updated, false);

      if (userEmail) {
        try {
          const res = await addWishlistWithSync(productId, userEmail);
          if (res?.success) toast.success(res.message);
        } catch {
          toast.error("Failed to add wishlist on server");
        }
      }
    },
    [wishlist, userEmail, updateWishlist]
  );

  // ✅ Remove item from wishlist
  const removeFromWishlist = useCallback(
    async (productId: string) => {
      const updated = wishlist.filter((item) => item.productId !== productId);

      updateWishlist(updated, false);

      if (userEmail) {
        try {
          const res = await removeWishlistWithSync(productId, userEmail);
          if (res?.success) toast.success(res.message);
        } catch {
          toast.error("Failed to remove wishlist on server");
        }
      }
    },
    [wishlist, userEmail, updateWishlist]
  );

  // ✅ Toggle wishlist state for a product
  const toggleWishlist = useCallback(
    async (productId: string) => {
      if (wishlist.some((item) => item.productId === productId)) {
        await removeFromWishlist(productId);
      } else {
        await addToWishlist(productId);
      }
    },
    [wishlist, addToWishlist, removeFromWishlist]
  );

  // ✅ Check if product is wishlisted
  const isWishlisted = useCallback(
    (productId: string) => {
      return wishlist.some((item) => item.productId === productId);
    },
    [wishlist]
  );

  // ✅ Clear wishlist completely
  const clearWishlist = useCallback(() => {
    setWishlist([]);
    localStorage.removeItem(WISHLIST_KEY);
    dispatch(clearWishlistRedux());
    queryClient.invalidateQueries({ queryKey: ["wishlistData"] });
    toast.success("Wishlist cleared");
  }, [dispatch]);

  // ✅ Derived data: productId list
  const productIdList = wishlist.map((item) => item.productId);

  return {
    wishlist,
    wishlistIds,
    productIdList,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isWishlisted,
    clearWishlist,
  };
};
