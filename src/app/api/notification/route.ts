// app/api/notification/route.ts
import { getNotificationCollection } from "@/lib/database/db_collections";
import { NextRequest, NextResponse } from "next/server";


    const notificationCollection= await getNotificationCollection();
export async function GET() {
    const notificationCollection= await getNotificationCollection();
  const notifications = await notificationCollection.find().toArray();
  return NextResponse.json(notifications);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = await notificationCollection.insertOne(body);
  return NextResponse.json({ insertedId: result.insertedId });
}



// await fetch("/api/notification", {
//   method: "POST",
//   body: JSON.stringify({ title: "New!", message: "You got a message!" }),
// });
// socket.emit("send-notification", { title: "New!", message: "You got a message!" });