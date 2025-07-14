import { getProductCollection } from "@/lib/database/db_collections";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

interface CartItem {
  productId: string;
  quantity: number;
  addedAt?: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, userEmail } = body;

    if (!Array.isArray(items) || !userEmail) {
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }

    const productIds = items.map((item: CartItem) => new ObjectId(item.productId));

    const productCollection = await getProductCollection();

    const products = await productCollection
      .find({ _id: { $in: productIds } })
      .toArray();

    return NextResponse.json({
      message: "Cart products fetched",
      data:products,
    });
  } catch (error) {
    console.error("Cart product fetch error:", error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
