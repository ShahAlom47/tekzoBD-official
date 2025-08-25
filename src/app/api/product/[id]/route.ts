import { getProductCollection } from "@/lib/database/db_collections";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

// ✅ Get Single Product
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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
        { message: "Product not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Product retrieved successfully",
        success: true,
        data: result,
      },
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

// ✅ Update Product
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { message: "Invalid request body", success: false },
        { status: 400 }
      );
    }

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid or missing ID", success: false },
        { status: 400 }
      );
    }

    if ("_id" in body) {
      delete body._id;
    }

    // ✅ Convert price to number if present
    if (body.price !== undefined) {
      const parsedPrice = Number(body.price);
      if (isNaN(parsedPrice)) {
        return NextResponse.json(
          { message: "Invalid price format", success: false },
          { status: 400 }
        );
      }
      body.price = parsedPrice;
    }

    const productCollection = await getProductCollection();
    const filter = { _id: new ObjectId(id) };

    const result = await productCollection.updateOne(filter, { $set: body });

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Product not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Product updated successfully", success: true, data: result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in PATCH /product/[id]:", error);
    return NextResponse.json(
      {
        message: "An error occurred while updating the product",
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
