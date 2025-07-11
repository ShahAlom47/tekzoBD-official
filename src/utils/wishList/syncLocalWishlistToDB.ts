import axios from "axios";
import { getLocalWishlist, setLocalWishlist } from "./getLocalWishList";
import { WishlistProduct } from "@/Interfaces/wishListInterfaces";

// ✅ 3. Sync all local wishlist items to DB after login
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const syncLocalWishlistToDB = async (userEmail: string) => {
  const localWishlist = getLocalWishlist();

  if (localWishlist.length === 0) return;

  try {
    const productIds = localWishlist.map((item) => item.productId);
    await axios.post("/api/sync-wishlist", {
      productIds,
    });

    // (Optional) DB থেকে fresh wishlist আনো
    const { data } = await axios.get("/api/user-wishlist");
    const updated: WishlistProduct[] = data?.products || [];
    setLocalWishlist(updated);
  } catch (err) {
    console.error("Sync local to DB failed:", err);
  }
};
