"use client";
import { requestFirebaseNotificationPermission } from "@/lib/firebaseNotification/requestPermission";
import { useEffect } from "react";
import { onMessage } from "firebase/messaging";
import { getMessagingInstance } from "@/lib/firebaseNotification/firebase";

export default function PushNotificationInit() {
  useEffect(() => {
    requestFirebaseNotificationPermission().then((token) => {
      if (token) {
        console.log("Device token:", token);
      }
    });
  }, []);
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    async function setupListener() {
      const messaging = await getMessagingInstance();
      if (!messaging) return;

      unsubscribe = onMessage(messaging, (payload) => {
        console.log("Push notification received: ", payload);

        if (Notification.permission === "granted") {
          const { title, body, } = payload.notification;

          new Notification(title, {
            body,
            icon: "/logo.png",
          });
        }
      });
    }

    setupListener();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);


  return null;
}
