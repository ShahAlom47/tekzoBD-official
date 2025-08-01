"use client";
import { requestFirebaseNotificationPermission } from "@/lib/firebase/requestPermission";
import { useEffect } from "react";

export default function PushNotificationInit() {
  useEffect(() => {
    requestFirebaseNotificationPermission().then((token) => {
      if (token) {
        console.log("Device token:", token);
      }
    });
  }, []);

  return null;
}
