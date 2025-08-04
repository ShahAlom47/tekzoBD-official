
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { getMessaging, getToken } from "firebase/messaging";

export function useAdminFirebaseToken() {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user?.role || session.user.role !== "admin") return;

    const messaging = getMessaging();

    const sendTokenToServer = async (token: string) => {
      try {
        await fetch("/api/admin-token/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
      } catch (err) {
        console.error("Failed to send token to server:", err);
      }
    };

    const updateFirebaseToken = async () => {
      try {
        const currentToken = await getToken(messaging, {
          vapidKey: process.env.FIREBASE_VAPID_KEY,
        });

        if (currentToken) {
          const savedToken = localStorage.getItem("fcm_token");
          if (savedToken !== currentToken) {
            await sendTokenToServer(currentToken);
            localStorage.setItem("fcm_token", currentToken);
          }
        }
      } catch (error) {
        console.error("An error occurred while retrieving token. ", error);
      }
    };

    updateFirebaseToken();

    // Optional: try to recheck token every 12 hours or on visibility change
    const interval = setInterval(updateFirebaseToken, 12 * 60 * 60 * 1000); // 12 hours

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        updateFirebaseToken();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [session]);
}
