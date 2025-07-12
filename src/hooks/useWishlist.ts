"use client";

import {
  getLocalWishlist,
  WISHLIST_NAME,
} from "@/utils/wishList/getLocalWishList";
import { useState, useEffect } from "react";
import { useUser } from "./useUser";
import { addWishlistWithSync } from "@/utils/wishList/addWishlistWithSync";
import { removeWishlistWithSync } from "@/utils/wishList/removeWishlistWithSync";
import {
  fetchWishlistFromDB,
  syncLocalWishlistToDB,
} from "@/utils/wishList/syncLocalWishlistToDB";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/reduxHook";
import { clearWishlistRedux, setWishlistRedux } from "@/redux/features/wishList/wishlistSlice";

const WISHLIST_KEY = WISHLIST_NAME;

export interface WishlistProduct {
  productId: string;
  addedAt: string; // ISO format
}

// ✅ LocalStorage থেকে ডেটা আনা
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
  const userEmail = user?.email || undefined;
  const dispatch = useAppDispatch();

  // ✅ Component load এ localStorage থেকে ডেটা সেট করো
  useEffect(() => {
    const local = getWishlistFromStorage();
    setWishlist(local);
    dispatch(setWishlistRedux(local.map((item) => item.productId)));
  }, []);

  // ✅ DB থেকে sync করে local এ বসাও (login অবস্থায়)
  useEffect(() => {
    if (userEmail) {
      const localWishlist = getLocalWishlist();

      if (localWishlist.length > 0) {
        syncLocalWishlistToDB(userEmail).then((fresh) => {
          if (fresh) {
            setWishlist(fresh);
            dispatch(setWishlistRedux(fresh.map((item) => item.productId)));
          }
        });
      } else {
        fetchWishlistFromDB(userEmail).then((fresh) => {
          if (fresh) {
            setWishlist(fresh);
            dispatch(setWishlistRedux(fresh.map((item) => item.productId)));
          }
        });
      }
    }
  }, [userEmail, dispatch]);

  // ✅ Add to wishlist
  const addToWishlist = async (productId: string) => {
    const stored = getWishlistFromStorage();
    const exists = stored.find((item) => item.productId === productId);
    if (!exists) {
      const updated = [
        ...stored,
        { productId, addedAt: new Date().toISOString() },
      ];
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
      setWishlist(updated);

      const productIdList = updated.map((item) => item.productId);
      dispatch(setWishlistRedux(productIdList));
    }
    if (userEmail) {
      const res = await addWishlistWithSync(productId, userEmail);
      if (res?.success) {
        toast.success(res?.message);
      }
    }
  };

  // ✅ Remove from wishlist
  const removeFromWishlist = async (productId: string) => {
    const stored = getWishlistFromStorage();
    const updated = stored.filter((item) => item.productId !== productId);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
    setWishlist(updated);

    dispatch(setWishlistRedux(updated.map((item) => item.productId)));

    if (userEmail) {
      const res = await removeWishlistWithSync(productId, userEmail);
      if (res?.success) {
        toast.success(res?.message);
      }
    }
  };

  // ✅ Toggle Wishlist
  const toggleWishlist = (productId: string) => {
    const stored = getWishlistFromStorage();
    const exists = stored.some((item) => item.productId === productId);
    let updated: WishlistProduct[];

    if (exists) {
      updated = stored.filter((item) => item.productId !== productId);
      if (userEmail) removeWishlistWithSync(productId, userEmail);
    } else {
      updated = [...stored, { productId, addedAt: new Date().toISOString() }];
      if (userEmail) addWishlistWithSync(productId, userEmail);
    }

    setWishlist(updated);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));

    dispatch(setWishlistRedux(updated.map((item) => item.productId)));
  };

  // ✅ Check if product is wishlisted
  const isWishlisted = (productId: string) => {
    return wishlist.some((item) => item.productId === productId);
  };

  // ✅ Clear wishlist
  const clearWishlist = () => {
    localStorage.removeItem(WISHLIST_KEY);
    setWishlist([]);
    dispatch(clearWishlistRedux());
  };

  // ✅ Product ID array
  const productIdList = wishlist.map((item) => item.productId);
   const wishlistIds = useAppSelector((state) => state.wishlist.wishlistIds)

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
