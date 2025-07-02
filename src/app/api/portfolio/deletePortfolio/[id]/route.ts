// /api/portfolio/deletePortfolio/[id]/route.ts
import { getPortfolioCollection } from "@/lib/database/db_collections";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const portfolioCollection = await getPortfolioCollection();
    console.log("Valid ObjectId?", ObjectId.isValid(id));

    if (!id) {
      return NextResponse.json(
        { message: "ID is required", success: false },
        { status: 400 }
      );
    }

    // MongoDB এর ObjectId তে রূপান্তর
    const filter = { _id: new ObjectId(id) };
    const result = await portfolioCollection.deleteOne(filter);
    console.log("Delete result:", result);

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Portfolio not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Portfolio deleted successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in DELETE /portfolio/deletePortfolio/[id]:", error);
    return NextResponse.json(
      {
        message: "An error occurred while deleting the portfolio",
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
