import { getPortfolioCollection } from "@/lib/database/db_collections";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    console.log(body)

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

    const portfolioCollection = await getPortfolioCollection();
    const filter = { _id: new ObjectId(id) };

    const result = await portfolioCollection.updateOne(filter, { $set: body });

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Portfolio not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Portfolio updated successfully", success: true, data: result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in PATCH /portfolio/[id]:", error);
    return NextResponse.json(
      {
        message: "An error occurred while updating the portfolio",
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
