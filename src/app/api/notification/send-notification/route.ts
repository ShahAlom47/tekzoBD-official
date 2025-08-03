import { getNotificationCollection } from "@/lib/database/db_collections";
import admin from "@/lib/firebaseNotification/firebase-admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, title,  message } = body;

    // Input validation
    if (!token || !title || !message) {
      return NextResponse.json(
        { success: false, message: "Token, title, and message are required." },
        { status: 400 }
      );
    }

    // Optional: You can log or store the notification in DB if needed
    const notificationCollection = await getNotificationCollection();
    await notificationCollection.insertOne(body);

    // FCM Payload
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
