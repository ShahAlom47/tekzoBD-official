import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { getToken } from "firebase/messaging";
import { getMessagingInstance } from "@/lib/firebaseNotification/firebase";

interface TokenPayload {
  token: string;
  device?: string;
}

export function useAdminFirebaseToken() {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user?.role || session.user.role !== "admin") return;


    const setupToken = async () => {
      const messaging = await getMessagingInstance();
      if (!messaging) {
        console.warn("Firebase messaging instance not available.");
        return;
      }

      const sendTokenToServer = async (payload: TokenPayload) => {
        try {
          await fetch("/api/admin-token/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        } catch (err) {
          console.error("Failed to send token to server:", err);
        }
      };

      const updateFirebaseToken = async () => {
        try {
          const currentToken = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY || "",
          });

          if (currentToken) {
            const savedToken = localStorage.getItem("fcm_token");
            if (savedToken !== currentToken) {
              const deviceName = window.navigator.userAgent || "unknown_device";
              await sendTokenToServer({ token: currentToken, device: deviceName });
              localStorage.setItem("fcm_token", currentToken);
            }
          }
        } catch (error) {
          console.error("An error occurred while retrieving token.", error);
        }
      };

      await updateFirebaseToken();

      const interval = setInterval(updateFirebaseToken, 12 * 60 * 60 * 1000);

      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          updateFirebaseToken();
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);

      // Cleanup
      return () => {
        clearInterval(interval);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    };

    // ✅ async ফাংশন call করা হলো
    setupToken();
  }, [session]);
}
