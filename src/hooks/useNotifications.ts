import { useState, useEffect, useCallback } from "react";
import { NotificationType } from "@/Interfaces/notificationInterfaces";
import { deleteNotification, getAllNotifications, markNotificationAsRead, sendNotification } from "@/lib/allApiRequest/notificationRequest/notificationRequest";

type UseNotificationReturn = {
  notifications: NotificationType[];
  loading: boolean;
  error: string | null;
  fetchNotifications: () => Promise<void>;
  sendNewNotification: (data: Omit<NotificationType, "_id" | "createdAt" | "updatedAt" | "isRead"> & { token: string }) => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  deleteNotif: (id: string) => Promise<void>;
};

export function useNotifications(adminId: string): UseNotificationReturn {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Notifications নিয়ে আসা
  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllNotifications(adminId);
      const notificationData=data?.data as NotificationType[]
      setNotifications(notificationData);
    } catch  {
      setError("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  }, [adminId]);

  // নতুন notification পাঠানো
  const sendNewNotification = useCallback(async (notifData: Omit<NotificationType, "_id" | "createdAt" | "updatedAt" | "isRead"> & { token: string }) => {
    setLoading(true);
    setError(null);
    try {
      await sendNotification(notifData);
      // Send successful হলে নতুন ডাটা fetch করে নাও
      await fetchNotifications();
    } catch (err) {
      setError("Failed to send notification");
    } finally {
      setLoading(false);
    }
  }, [fetchNotifications]);

  // notification read mark করা
  const markAsRead = useCallback(async (id: string) => {
    try {
      await markNotificationAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch {
      setError("Failed to mark as read");
    }
  }, []);

  // notification delete করা
  const deleteNotif = useCallback(async (id: string) => {
    try {
      await deleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch {
      setError("Failed to delete notification");
    }
  }, []);

  // প্রথমে একবার নোটিফিকেশনগুলো নিয়ে আসি
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return {
    notifications,
    loading,
    error,
    fetchNotifications,
    sendNewNotification,
    markAsRead,
    deleteNotif,
  };
}
