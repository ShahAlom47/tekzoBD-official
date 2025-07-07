import { SortOptions } from "@/Interfaces/productInterfaces";
import { getProductCollection } from "@/lib/database/db_collections";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);

    const currentPage = parseInt(url.searchParams.get("currentPage") || "1", 10);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);
    const searchTrim = url.searchParams.get("searchTrim")?.trim().toLowerCase() || "";
    const sort = url.searchParams.get("sort") as SortOptions || "asc";

    const minPrice = url.searchParams.get("minPrice");
    const maxPrice = url.searchParams.get("maxPrice");
    const category = url.searchParams.get("category");
    const brand = url.searchParams.get("brand");
    const rating = url.searchParams.get("rating");

    if (isNaN(currentPage) || isNaN(pageSize)) {
      return NextResponse.json({ message: "Invalid query parameters", success: false }, { status: 400 });
    }

    const productCollection = await getProductCollection();
    const skip = (currentPage - 1) * pageSize;

    // ✅ Main search filter
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const searchFilter: any = searchTrim
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

    // ✅ Additional filters
    if (minPrice || maxPrice) {
      searchFilter.price = {};
      if (minPrice) searchFilter.price.$gte = Number(minPrice);
      if (maxPrice) searchFilter.price.$lte = Number(maxPrice);
    }

    if (category) {
      searchFilter.category = category;
    }

    if (brand) {
      searchFilter.brand = brand;
    }

    if (rating) {
      searchFilter.rating = { $gte: Number(rating) };
    }

    // ✅ Sorting logic
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sortQuery: any = {};
    if (sort === "asc") sortQuery.price = 1;
    else if (sort === "desc") sortQuery.price = -1;
    else if (sort === "newest") sortQuery.createdAt = -1;
    else if (sort === "popular") sortQuery.totalSold = -1; // you can change based on your schema

    // ✅ Final fetch
    const [data, total] = await Promise.all([
      productCollection.find(searchFilter).sort(sortQuery).skip(skip).limit(pageSize).toArray(),
      productCollection.countDocuments(searchFilter),
    ]);

    return NextResponse.json(
      {
        message: "Products retrieved successfully",
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
        message: "An error occurred while retrieving the products",
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
