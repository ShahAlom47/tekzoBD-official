// app/api/order/add/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getOrderCollection } from "@/lib/database/db_collections";
import { CheckoutDataType } from "@/Interfaces/checkoutDataInterface";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CheckoutDataType;

    // Optional: minimal manual validation
    if (!body?.cartProducts?.length || !body?.shippingInfo || !body?.pricing || !body?.paymentInfo) {
      return NextResponse.json(
        { success: false, message: "Missing required order fields." },
        { status: 400 }
      );
    }

  

    const orderCollection = await getOrderCollection();
    const result = await orderCollection.insertOne(body);

    if (result.insertedId) {
      return NextResponse.json(
        { success: true, id: result.insertedId, message: "Order created successfully." },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Order creation failed." },
      { status: 500 }
    );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("[ORDER_CREATE_ERROR]", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error", error: error?.message },
      { status: 500 }
    );
  }
}

// Optional: Reject unsupported methods (good for production)
export async function GET() {
  return NextResponse.json(
    { success: false, message: "Method not allowed" },
    { status: 405 }
  );
}
