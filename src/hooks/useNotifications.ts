import { onMessage } from 'firebase/messaging';
import { useState, useEffect, useCallback } from "react";
import { NotificationType } from "@/Interfaces/notificationInterfaces";
import {
  deleteNotification,
  getAllNotifications,
  markNotificationAsRead,
  sendNotification,
} from "@/lib/allApiRequest/notificationRequest/notificationRequest";
import { getMessagingInstance } from '@/lib/firebaseNotification/firebase';

type SendNotificationInput = Omit<
  NotificationType,
  "_id" | "createdAt" | "updatedAt" | "isRead"
> & { token: string };

type UseNotificationReturn = {
  notifications: NotificationType[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  fetchNotifications: () => Promise<void>;
  sendNewNotification: (data: SendNotificationInput) => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  deleteNotif: (id: string) => Promise<void>;
};

export function useNotifications(adminEmail: string): UseNotificationReturn {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getAllNotifications(adminEmail); // ✅ এখন email ব্যবহার করা হচ্ছে
      const data = res?.data as NotificationType[];
      setNotifications(data);
    } catch {
      setError("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  }, [adminEmail]);

  const sendNewNotification = useCallback(
    async (notifData: SendNotificationInput) => {
      try {
        setLoading(true);
        setError(null);
        await sendNotification(notifData);
        await fetchNotifications();
      } catch {
        setError("Failed to send notification");
      } finally {
        setLoading(false);
      }
    },
    [fetchNotifications]
  );

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

  const deleteNotif = useCallback(async (id: string) => {
    try {
      await deleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch {
      setError("Failed to delete notification");
    }
  }, []);

  const unreadCount = notifications?.filter((n) => !n.isRead).length ||0;

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);


useEffect(() => {
  let unsubscribe: (() => void) | undefined;

  const setupMessaging = async () => {
    const messaging = await getMessagingInstance();
    if (messaging) {
      unsubscribe = onMessage(messaging, (payload) => {
        console.log("🔔 Push notification received:", payload);
        fetchNotifications() 
      });
    }
  };

  setupMessaging();

  return () => {
    if (unsubscribe) unsubscribe();
  };
}, []);
  return {
    notifications,
    unreadCount,
    loading,
    error,
    fetchNotifications,
    sendNewNotification,
    markAsRead,
    deleteNotif,
  };
}
