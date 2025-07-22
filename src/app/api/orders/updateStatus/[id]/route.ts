import { getOrderCollection } from "@/lib/database/db_collections";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { status } = body;

    const allowedStatuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

    if (!id) {
      return NextResponse.json(
        { message: "ID is required", success: false },
        { status: 400 }
      );
    }

    if (!status) {
      return NextResponse.json(
        { message: "Status is required", success: false },
        { status: 400 }
      );
    }

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { message: "Invalid status value", success: false },
        { status: 400 }
      );
    }

    const orderCollection = await getOrderCollection();

    const filter = { _id: new ObjectId(id) };

    // Update the meta.orderStatus field
    const updateDoc = {
      $set: { "meta.orderStatus": status }
    };

    const result = await orderCollection.updateOne(filter, updateDoc);

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Order not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Order status updated successfully", success: true },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error updating order status:", error);
    return NextResponse.json(
      {
        message: "An error occurred while updating order status",
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
