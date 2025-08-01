import admin from "@/lib/firebase/firebase-admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, title, body: messageBody } = body;

    if (!token || !title || !messageBody) {
      return NextResponse.json({ message: "Missing data" }, { status: 400 });
    }

    const payload = {
      notification: {
        title,
        body: messageBody,
      },
      token,
    };

    const response = await admin.messaging().send(payload);
    return NextResponse.json({ message: "Notification sent", response });
  } catch (error) {
    console.error("Notification error:", error);
    return NextResponse.json({ message: "Failed to send notification", error }, { status: 500 });
  }
}
