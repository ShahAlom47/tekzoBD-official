// app/api/save-admin-token/route.ts (App Router)

import { NextRequest, NextResponse } from "next/server";
import { getAdminTokenCollection } from "@/lib/database/db_collections";
import { getServerSession } from "next-auth/next";
import authOptions from "../../auth/authOptions/authOptions";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const { token,updatedAt } = body;

  if (!token || typeof token !== "string") {
    return NextResponse.json({ message: "Invalid token" }, { status: 400 });
  }

  try {
    const adminTokenCollection = await getAdminTokenCollection();
    const userEmail = session?.user.email ||"";

    const existing = await adminTokenCollection.findOne({ userEmail });

    if (!existing || existing.token !== token) {
      await adminTokenCollection.updateOne(
        { userEmail },
        {
          $set: {
            token,
            updatedAt:updatedAt|| new Date().toISOString(),
          },
        },
        { upsert: true }
      );
    }

    return NextResponse.json({ message: "Token saved or unchanged" });
  } catch (error) {
    console.error("Error saving admin token:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
