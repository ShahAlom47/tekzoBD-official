// /api/portfolio/getSinglePortfolio/[id]/route.ts

import { getPortfolioCollection } from "@/lib/database/db_collections";
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

    const portfolioCollection = await getPortfolioCollection();
    const filter = { _id: new ObjectId(id) };
    const result = await portfolioCollection.findOne(filter);

    if (!result) {
      return NextResponse.json(
        { message: "Portfolio not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Portfolio retrieved successfully", success: true, data: result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET /portfolio/[id]:", error);
    return NextResponse.json(
      {
        message: "An error occurred while retrieving the portfolio",
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
