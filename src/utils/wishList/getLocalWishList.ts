import { WishlistProduct } from "@/Interfaces/wishListInterfaces";
export const WISHLIST_NAME= "wishlist";

export const getLocalWishlist = (): WishlistProduct[] => {
  try {
    const stored = localStorage.getItem(WISHLIST_NAME);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};



export const setLocalWishlist = (wishlist: WishlistProduct[]) => {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
};
