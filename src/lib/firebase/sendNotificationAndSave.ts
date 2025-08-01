import admin from "@/lib/firebase/firebase-admin";
import { getNotificationCollection } from "../database/db_collections";
import { NotificationType } from "@/Interfaces/notificationInterfaces";

type NotificationPayload = {
  token: string;
  type: NotificationType["type"];
  title: string;
  message: string;
  link?: string | null;
  relatedId?: string | null;
  adminId?: string | null;
};

export const sendNotificationAndSave = async ({
  token,
  type,
  title,
  message,
  link = null,
  relatedId = null,
  adminId = null,
}: NotificationPayload) => {
  const notificationCollection = await getNotificationCollection();

  if (!token || !title || !message) {
    throw new Error("Missing notification data");
  }

  // Firebase notification পাঠানো হচ্ছে
  const firebaseResponse = await admin.messaging().send({
    notification: {
      title,
      body: message,
    },
    token,
  });

  // ডাটাবেজে নোটিফিকেশন সেভ করা হচ্ছে
  await notificationCollection.insertOne({
    type,
    title,
    message,
    link,
    relatedId,
    isRead: false,
    adminId,
    createdAt: new Date().toISOString(),
  } as NotificationType);

  return firebaseResponse;
};
