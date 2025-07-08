/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOptions } from "@/Interfaces/productInterfaces";
import { getProductCollection } from "@/lib/database/db_collections";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "../../auth/authOptions/authOptions";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const productCollection = await getProductCollection();
    const session = await getServerSession(authOptions);
    const user = session?.user || null;
    const isDashboard = req.headers.get("x-from-dashboard") === "true";
    const isPublic = !isDashboard || !user;

    const currentPage = parseInt(url.searchParams.get("currentPage") || "1", 10);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);
    const skip = (currentPage - 1) * pageSize;

    const searchTrim = url.searchParams.get("searchTrim")?.trim().toLowerCase() || "";
    const sort = (url.searchParams.get("sort") as SortOptions | "offer") || "asc";
    const minPrice = url.searchParams.get("minPrice");
    const maxPrice = url.searchParams.get("maxPrice");
    const category = url.searchParams.get("category");
    const brand = url.searchParams.get("brand");
    const rating = url.searchParams.get("rating");
    const offerOnly = url.searchParams.get("offerOnly") === "true";

    if (isNaN(currentPage) || isNaN(pageSize)) {
      return NextResponse.json({ message: "Invalid query parameters", success: false }, { status: 400 });
    }

    const filter: any = {};

    // 🔐 Public only gets published products
    if (isPublic) {
      filter.isPublished = true;
    }

    // 🔍 Search
    if (searchTrim) {
      filter.$or = [
        { title: { $regex: searchTrim, $options: "i" } },
        { slug: { $regex: searchTrim, $options: "i" } },
        { description: { $regex: searchTrim, $options: "i" } },
        { category: { $regex: searchTrim, $options: "i" } },
        { "sourceInfo.supplierName": { $regex: searchTrim, $options: "i" } },
        { "sourceInfo.productSourceLink": { $regex: searchTrim, $options: "i" } },
        { "sourceInfo.supplierProductId": { $regex: searchTrim, $options: "i" } },
        { "sourceInfo.returnPolicy": { $regex: searchTrim, $options: "i" } },
        { "sourceInfo.deliveryTime": { $regex: searchTrim, $options: "i" } },
      ];
    }

    // 💰 Price filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (rating) filter["ratings.avg"] = { $gte: Number(rating) };

    // 🎯 Offer logic
    const now = new Date();
    const isoNow = now.toISOString();

    if (offerOnly || sort === "offer") {
      filter["offer.isActive"] = true;
      filter["offer.startDate"] = { $lte: isoNow };
      filter["offer.endDate"] = { $gte: isoNow };
    }

    // 🔃 Sorting
    const sortQuery: any = {};
    if (sort === "asc") sortQuery.price = 1;
    else if (sort === "desc") sortQuery.price = -1;
    else if (sort === "newest") sortQuery.createdAt = -1;
    else if (sort === "popular") sortQuery["ratings.count"] = -1;
    else if (sort === "offer") {
      // Optional: sort active offers first
      sortQuery["offer.isActive"] = -1;
      sortQuery["offer.startDate"] = 1;
    }

    const [data, total] = await Promise.all([
      productCollection.find(filter).sort(sortQuery).skip(skip).limit(pageSize).toArray(),
      productCollection.countDocuments(filter),
    ]);

    return NextResponse.json(
      {
        success: true,
        message: "Products retrieved successfully",
        data,
        totalData: total,
        currentPage,
        totalPages: Math.ceil(total / pageSize),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/products Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to retrieve products",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
