// 

import { getToken } from "firebase/messaging";
import { getMessagingInstance } from '@/lib/firebaseNotification/firebase';

export const requestFirebaseNotificationPermission = async (): Promise<string | null> => {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.warn("Notification permission not granted.");
      return null;
    }

    const messagingInstance = await getMessagingInstance();

    if (!messagingInstance) {
      console.warn("Firebase messaging is not supported in this browser.");
      return null;
    }

    const token = await getToken(messagingInstance, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });

    return token || null;
  } catch (error) {
    console.error("Error while getting notification permission or token:", error);
    return null;
  }
};
