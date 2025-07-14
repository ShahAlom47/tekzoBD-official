import { getCartCollection } from "@/lib/database/db_collections";
import { NextResponse } from "next/server";
import { CartItem } from "@/Interfaces/cartInterface";

interface RequestBody {
  localItems: CartItem[];
  userEmail: string;
}

export async function POST(req: Request) {
  try {
    const body: RequestBody = await req.json();
    const { userEmail, localItems } = body;

    if (!userEmail || !Array.isArray(localItems)) {
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }

    const cartCollection = await getCartCollection();

    // Format items (make sure each item has productId, quantity, addedAt)
    const items = localItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      addedAt: item.addedAt || new Date().toISOString(),
    }));

    // Find existing cart and merge quantities if product already exists
    const existingCart = await cartCollection.findOne({ userEmail });

    let mergedItems: typeof items = [];

    if (existingCart && Array.isArray(existingCart.items)) {
      const itemMap = new Map<string, CartItem>();

      // Add existing items to map
      existingCart.items.forEach((item: CartItem) => {
        itemMap.set(item.productId, item);
      });

      // Merge local items into map
      items.forEach((item) => {
        if (itemMap.has(item.productId)) {
          const existingItem = itemMap.get(item.productId)!;
          existingItem.quantity += item.quantity;
          // Optionally update addedAt if you want latest
          existingItem.addedAt = item.addedAt;
          itemMap.set(item.productId, existingItem);
        } else {
          itemMap.set(item.productId, item);
        }
      });

      mergedItems = Array.from(itemMap.values()) as {
        productId: string;
        quantity: number;
        addedAt: string;
      }[];
    } else {
      mergedItems = items;
    }

    // Upsert cart with merged items
    const updatedCart = await cartCollection.findOneAndUpdate(
      { userEmail },
      {
        $set: {
          items: mergedItems,
          updatedAt: new Date().toISOString(),
        },
      },
      {
        upsert: true,
        returnDocument: "after",
      }
    );

    return NextResponse.json({
      message: "Cart synced successfully",
      cart: updatedCart,
    });
  } catch (error) {
    console.error("Sync cart error:", error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
