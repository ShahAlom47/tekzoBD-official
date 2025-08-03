// app/api/notification/route.ts

import { getNotificationCollection } from "@/lib/database/db_collections";
import { withAuth } from "@/ProtectedRoute/withAuth";
import {  NextResponse } from "next/server";

const handler = async () => {
  try {
    const notificationCollection = await getNotificationCollection();

    const notifications = await notificationCollection
      .find({})
      .sort({ createdAt: -1 }) // Latest first
      .toArray();

    return NextResponse.json(
      {
        message: "Notifications fetched successfully",
        success: true,
        data: notifications,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch notifications",
        success: false,
      },
      { status: 500 }
    );
  }
};

export const GET = withAuth(handler, {
  allowedRoles: ["admin"],
});
