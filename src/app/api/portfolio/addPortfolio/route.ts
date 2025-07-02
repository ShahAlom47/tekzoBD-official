import { getPortfolioCollection } from "@/lib/database/db_collections";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { message: "Invalid request body", success: false },
        { status: 400 }
      );
    }

    const portfolioCollection = await getPortfolioCollection();

    const addResult = await portfolioCollection.insertOne(body);

    if (!addResult.acknowledged) {
      return NextResponse.json(
        { message: "Failed to add portfolio", success: false },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Portfolio added successfully",
        success: true,
        insertedId: addResult.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/portfolio:", error);

    return NextResponse.json(
      {
        message: "An error occurred while adding the portfolio",
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
