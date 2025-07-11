// pages/api/remove-wishlist.ts (Next.js route handler)
import { NextResponse } from "next/server";
import { getWishlistCollection } from "@/lib/database/db_collections";
import { ObjectId } from "mongodb";

export const DELETE = async (req: Request): Promise<NextResponse> => {
  try {
    const { userEmail, productId } = await req.json();
    const wishlistCollection = await getWishlistCollection();

    await wishlistCollection.updateOne(
      { userEmail },
      { $pull: { products: { productId: new ObjectId(productId) } }, $set: { updatedAt: new Date().toISOString() } }
    );

    return NextResponse.json({ success: true, message: "Removed from wishlist" }, { status: 200 });
  } catch (error) {
    console.error("Remove error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
};
