import { NotificationType } from "@/Interfaces/notificationInterfaces";
import { request } from "../apiRequests";


// 📩 Notification পাঠানোর জন্য
export const sendNotification = async (data: Omit<NotificationType, "_id" | "createdAt" | "updatedAt" | "isRead">) => {
  return request("POST", "/notification/send-notification", {...data});
};

// 📥 সব notification আনার জন্য (admin এর জন্য)
export const getAllNotifications = async (adminEmail: string) => {
  return request("GET", `/notification/admin/${adminEmail}`);
};

// ✅ একটিকে read হিসেবে mark করার জন্য
export const markNotificationAsRead = async (id: string) => {
  return request("PATCH", `/notification/mark-as-read/${id}`);
};

// ❌ notification delete
export const deleteNotification = async (id: string) => {
  return request("DELETE", `/notification/${id}`);
};
