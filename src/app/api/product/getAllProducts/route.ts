
import { getProductCollection } from "@/lib/database/db_collections";
import { NextRequest, NextResponse } from "next/server";




export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);

    const currentPage = parseInt(
      url.searchParams.get("currentPage") || "1",
      10
    );
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);
    const searchTrim =
      url.searchParams.get("searchTrim")?.trim().toLowerCase() || "";

    if (isNaN(currentPage) || isNaN(pageSize)) {
      return NextResponse.json(
        { message: "Invalid query parameters", success: false },
        { status: 400 }
      );
    }

    const productCollection = await getProductCollection();
    const skip = (currentPage - 1) * pageSize;

   // ✅ Enhanced search filter
const searchFilter = searchTrim
  ? {
      $or: [
        { title: { $regex: searchTrim, $options: "i" } },
        { slug: { $regex: searchTrim, $options: "i" } },
        { description: { $regex: searchTrim, $options: "i" } },
        { category: { $regex: searchTrim, $options: "i" } },
        { "sourceInfo.supplierName": { $regex: searchTrim, $options: "i" } },
        { "sourceInfo.productSourceLink": { $regex: searchTrim, $options: "i" } },
        { "sourceInfo.supplierProductId": { $regex: searchTrim, $options: "i" } },
        { "sourceInfo.returnPolicy": { $regex: searchTrim, $options: "i" } },
        { "sourceInfo.deliveryTime": { $regex: searchTrim, $options: "i" } },
      ],
    }
  : {};

    // ✅ Fetch filtered + paginated data
    const [data, total] = await Promise.all([
      productCollection
        .find(searchFilter)
        .skip(skip)
        .limit(pageSize)
        .toArray(),
      productCollection.countDocuments(searchFilter),
    ]);

    return NextResponse.json(
      {
        message: "Product retrieved successfully",
        success: true,
        data,
        totalData: total,
        currentPage,
        totalPages: Math.ceil(total / pageSize),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET /api/product:", error);

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
