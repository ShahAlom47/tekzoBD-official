// app/api/user/info/[userEmail]/route.ts
import { getUserCollection } from "@/lib/database/db_collections";
import { withAuth } from "@/ProtectedRoute/withAuth";
import { NextRequest, NextResponse } from "next/server";

const handler = async (
  req: NextRequest,
  context: { params: { userEmail: string } }
) => {
  try {
    if (req.method !== "PATCH") {
      return NextResponse.json(
        { message: "Method Not Allowed" },
        { status: 405 }
      );
    }

    const { userEmail } = context.params;
    const body = await req.json(); // fixed
    if (!userEmail) {
      return NextResponse.json(
        { message: "User email is required" },
        { status: 400 }
      );
    }

    console.log("update body:", body);

    const userCollection = await getUserCollection();

    const userInfo = await userCollection.findOne({ email: userEmail });
    if (!userInfo) {
      return NextResponse.json(
        { message: "User not found", data: {} },
        { status: 404 }
      );
    }

    // Update only provided fields
    const updatedUser = await userCollection.findOneAndUpdate(
      { email: userEmail },
      { $set: body }, // only update given fields
      { returnDocument: "after" } // return updated doc
    );

    return NextResponse.json({
      success: true,
      message: "User info updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user info:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error", error },
      { status: 500 }
    );
  }
};

// Only allow user to update their own data (or admin)
export const PATCH = withAuth(handler, {
  allowedRoles: ["user", "admin"],
  matchUserParamEmail: true,
});
