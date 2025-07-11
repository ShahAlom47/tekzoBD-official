
import { getLocalWishlist, setLocalWishlist } from "./getLocalWishList";
import { removeWishData } from "@/lib/allApiRequest/wishListRequest/wishListRequest";

// ✅ 2. Remove product from wishlist with DB sync
export const removeWishlistWithSync = async (
  productId: string,
  userEmail?: string
) => {
  const current = getLocalWishlist();
  const updated = current.filter((item) => item.productId !== productId);
  setLocalWishlist(updated);

  if (userEmail) {
    try {
     const res= await removeWishData(productId,userEmail)
      console.log(res)
      return res
      
    } catch (err) {
      console.error("DB remove failed:", err);
    }
  }
};
