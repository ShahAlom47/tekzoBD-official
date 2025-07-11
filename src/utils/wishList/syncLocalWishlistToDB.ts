
import { getLocalWishlist, setLocalWishlist } from "./getLocalWishList";
import { WishlistProduct, WishlistType, } from "@/Interfaces/wishListInterfaces";
import { getUserWishList, syncWishlist } from "@/lib/allApiRequest/wishListRequest/wishListRequest";

// ✅ 3. Sync all local wishlist items to DB after login
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const syncLocalWishlistToDB = async (
  userEmail: string
): Promise<WishlistProduct[] | undefined> => {
  const localWishlist = getLocalWishlist();
  if (!userEmail || localWishlist.length === 0) return;

  try {
    const productIds = localWishlist.map((item) => item.productId);
    
    // ✅ userEmail sent here
    const res = await syncWishlist(productIds,userEmail)
    console.log(res)

    const getRes = await getUserWishList(userEmail)
    const data = getRes?.data as WishlistType
    const updated: WishlistProduct[] = data?.products || [];
    setLocalWishlist(updated);
    return updated;
  } catch (err) {
    console.error("Sync local to DB failed:", err);
    return;
  }
};



export const fetchWishlistFromDB = async (
  userEmail: string
): Promise<WishlistProduct[]> => {
  try {
  const getRes = await getUserWishList(userEmail)
    const data = getRes?.data as WishlistType
    const updated: WishlistProduct[] = data?.products || [];
    // LocalStorage-এ সেট করা হচ্ছে
    setLocalWishlist(updated);

    return updated;
  } catch (error) {
    console.error("Fetch wishlist from DB failed:", error);
    return [];
  }
};
