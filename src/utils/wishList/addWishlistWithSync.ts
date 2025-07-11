
import { WishlistProduct } from "@/hooks/useWishlist";
import { addWishList } from "@/lib/allApiRequest/wishListRequest/wishListRequest";

const WISHLIST_KEY = "wishlist";

// LocalStorage থেকে current wishlist আনবে
const getLocalWishlist = (): WishlistProduct[] => {
  try {
    const stored = localStorage.getItem(WISHLIST_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// LocalStorage-এ wishlist সেট করবে
const setLocalWishlist = (wishlist: WishlistProduct[]) => {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
};

// ✅ 1. Add product to wishlist with DB sync
export const addWishlistWithSync = async (
  productId: string,
  userEmail?: string
) => {
  const current = getLocalWishlist();
  const exists = current.find((item) => item.productId === productId);
  if (!exists) {
    const newItem: WishlistProduct = {
      productId,
      addedAt: new Date().toISOString(),
    };
    const updated = [...current, newItem];
    setLocalWishlist(updated);

    if (userEmail) {
      try {
        const now = new Date().toISOString();
        const res = await addWishList ( {
          userEmail,
          productId,
          addedAt: now,
        });
        console.log(res)
        return res
      } catch (err) {
        console.error("DB add failed:", err);
      }
    }
  }
};
