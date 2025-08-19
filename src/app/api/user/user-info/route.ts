// app/api/user/info/route.ts
import { getUserCollection } from "@/lib/database/db_collections";
import { withAuth } from "@/ProtectedRoute/withAuth";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get("userEmail");

    if (!userEmail) {
      return NextResponse.json(
        { message: "User email is required" },
        { status: 400 }
      );
    }

    const userCollection = await getUserCollection();

    const userInfo = await userCollection.findOne(
      { email: userEmail },
      { projection: { password: 0 } } // hide password
    );

       console.log("   userInfo",userInfo)
    if (!userInfo) {
      return NextResponse.json(
        { message: "User not found", data: {} },
        { status: 404 }
      );
    }


 
    // Explicitly remove password just in case
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safeUser } = userInfo;

    console.log("   safeUser",safeUser)

    return NextResponse.json({
      success: true,
      message: "User info fetched successfully",
      data: safeUser,
    });
  } catch (error) {
    console.error("Error fetching user info:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error", error },
      { status: 500 }
    );
  }
};

// Only allow user to fetch their own data (or admin)
export const GET = withAuth(handler, {
  allowedRoles: ["user", "admin"],
//   matchUserParamEmail: true,
});
