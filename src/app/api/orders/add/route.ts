// app/api/order/add/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getOrderCollection, getProductCollection } from "@/lib/database/db_collections";
import { CheckoutDataType } from "@/Interfaces/checkoutDataInterface";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CheckoutDataType;
    const productCollection= getProductCollection();

    if (!body?.cartProducts?.length || !body?.shippingInfo || !body?.pricing || !body?.paymentInfo) {
      return NextResponse.json(
        { success: false, message: "Missing required order fields." },
        { status: 400 }
      );
    }

    // যদি checkoutAt না থাকে, নতুন টাইমস্ট্যাম্প দিন
    if (!body.meta.checkoutAt) {
      body.meta.checkoutAt = new Date().toISOString();
    }

    // অথবা চাইলে এখানে Date অবজেক্টও ব্যবহার করতে পারেন
    // body.meta.checkoutAt = new Date();

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


