import {
  getNotificationCollection,
  getAdminTokenCollection,
} from "@/lib/database/db_collections";
import admin from "@/lib/firebaseNotification/firebase-admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, message } = body;

    if (!title || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Title, and message are required.",
        },
        { status: 400 }
      );
    }

    // Get token from DB
    const adminTokenCollection = await getAdminTokenCollection();
    const adminDoc = await adminTokenCollection.findOne();
       console.log(adminDoc,"dbToken")

    if (!adminDoc?.token || typeof adminDoc.token !== "string") {
      return NextResponse.json(
        { success: false, message: "Token not found or invalid." },
        { status: 404 }
      );
    }

    const token = adminDoc.token;
 

    // Optional: Store notification
    const notificationCollection = await getNotificationCollection();
    await notificationCollection.insertOne({ isRead: false, ...body });

    // Payload for FCM
    const payload = {
      notification: {
        title,
        body: message,
      },
      token,
    };

    const response = await admin.messaging().send(payload);

    return NextResponse.json(
      {
        success: true,
        message: "Notification sent successfully.",
        fcmResponse: response,
      },
      { status: 200 }
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Notification send error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send notification.",
        error: error?.message || error,
      },
      { status: 500 }
    );
  }
}
