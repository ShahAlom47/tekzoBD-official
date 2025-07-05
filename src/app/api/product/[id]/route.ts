// /api/product/getSingleproduct/[id]/route.ts


import { getProductCollection } from "@/lib/database/db_collections";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid or missing ID", success: false },
        { status: 400 }
      );
    }

    const productCollection = await getProductCollection();
    const filter = { _id: new ObjectId(id) };
    const result = await productCollection.findOne(filter);

    if (!result) {
      return NextResponse.json(
        { message: "product not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "product retrieved successfully", success: true, data: result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET /product/[id]:", error);
    return NextResponse.json(
      {
        message: "An error occurred while retrieving the product",
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
