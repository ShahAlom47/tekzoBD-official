import { messaging } from "./firebase";
import { getToken } from "firebase/messaging";

export const requestFirebaseNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const messagingInstance = await messaging;
      if (!messagingInstance) {
        console.warn("Firebase messaging is not supported on this browser.");
        return null;
      }

      const token = await getToken(messagingInstance, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error("Notification permission error", err);
    return null;
  }
};
