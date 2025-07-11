import { NextResponse } from "next/server";
import { getWishlistCollection } from "@/lib/database/db_collections";

interface RequestBody {
  userEmail: string;
  productId: string;
  addedAt: string;      
  createdAt: string;   
  updatedAt: string;    
}

export const POST = async (req: Request): Promise<NextResponse> => {
  try {
    const wishlistCollection = await getWishlistCollection();
    const body: RequestBody = await req.json();
    const { userEmail, productId, addedAt, createdAt, updatedAt } = body;

    if (!userEmail || !productId || !addedAt || !createdAt || !updatedAt) {
      return NextResponse.json(
        { success: false, message: "userEmail, productId, addedAt, createdAt and updatedAt are required" },
        { status: 400 }
      );
    }

    // Check if wishlist for userEmail exists
    const existingWishlist = await wishlistCollection.findOne({ userEmail });

    if (existingWishlist) {
      // Check if productId already in products array
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const productExists = existingWishlist.products.some((p: any) => {
        const pid = typeof p.productId === "string" ? p.productId : p.productId.toString();
        return pid === productId;
      });

      if (productExists) {
        return NextResponse.json(
          { success: false, message: "Product already in wishlist" },
          { status: 409 }
        );
      }

      // Add product to products array & update updatedAt
      await wishlistCollection.updateOne(
        { userEmail },
        {
          $push: {
            products: {
              productId: productId,
              addedAt,
            },
          },
          $set: { updatedAt },
        }
      );

      return NextResponse.json(
        { success: true, message: "Product added to wishlist" },
        { status: 200 }
      );
    } else {
      // Create new wishlist document with createdAt and updatedAt
      await wishlistCollection.insertOne({
        userEmail,
        products: [{productId, addedAt }],
        createdAt,
        updatedAt,
      });

      return NextResponse.json(
        { success: true, message: "Wishlist created and product added" },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Add to wishlist error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};
