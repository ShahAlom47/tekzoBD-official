"use client";
import { WISHLIST_NAME } from "@/utils/wishList/getLocalWishList";
import { useState, useEffect } from "react";
import { useUser } from "./useUser";
import { addWishlistWithSync } from "@/utils/wishList/addWishlistWithSync";
import { removeWishlistWithSync } from "@/utils/wishList/removeWishlistWithSync";

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

  // ✅ Component load এ localStorage থেকে ডেটা সেট করো
  useEffect(() => {
    setWishlist(getWishlistFromStorage());
  }, []);

  // ✅ Add to wishlist
  const addToWishlist = (productId: string) => {
    const stored = getWishlistFromStorage();
    const exists = stored.find((item) => item.productId === productId);
    if (!exists) {
      const updated = [
        ...stored,
        { productId, addedAt: new Date().toISOString() },
      ];
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
      setWishlist(updated);
    }
    if (userEmail) {
      addWishlistWithSync(productId, userEmail);
    }
  };

  // ✅ Remove from wishlist
  const removeFromWishlist = (productId: string) => {
    const stored = getWishlistFromStorage();
    const updated = stored.filter((item) => item.productId !== productId);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
    setWishlist(updated);
    if (userEmail) {
      removeWishlistWithSync(productId, userEmail);
    }
  };

  // ✅ Toggle (Add/Remove)
  const toggleWishlist = (productId: string) => {
    const stored = getWishlistFromStorage();
    const exists = stored.find((item) => item.productId === productId);
    let updated: WishlistProduct[] = [];

    if (exists) {
      updated = stored.filter((item) => item.productId !== productId);
      if (userEmail) {
        removeWishlistWithSync(productId, userEmail);
      }
    } else {
      updated = [...stored, { productId, addedAt: new Date().toISOString() }];
      if (userEmail) {
        addWishlistWithSync(productId, userEmail);
      }
    }

    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
    setWishlist(updated);
  };

  // ✅ Check if in wishlist
  const isWishlisted = (productId: string) => {
    return wishlist.some((item) => item.productId === productId);
  };

  // ✅ Clear wishlist
  const clearWishlist = () => {
    localStorage.removeItem(WISHLIST_KEY);
    setWishlist([]);
  };

  // ✅ Product ID array
  const productIdList = wishlist.map((item) => item.productId);

  return {
    wishlist,
    productIdList,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isWishlisted,
    clearWishlist,
  };
};
