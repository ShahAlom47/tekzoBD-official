// components/NotificationCard.tsx
import { NotificationType } from "@/Interfaces/notificationInterfaces";

type Props = {
  notification: NotificationType;
  markAsRead: (id: string) => void;
  deleteNotif: (id: string) => void;
};

export default function NotificationCard({
  notification,
  markAsRead,
  deleteNotif,
}: Props) {
  return (
    <div
      className={`p-3 rounded-md shadow-sm border ${
        notification.isRead ? "bg-gray-100" : "bg-white"
      }`}
    >
      <h4 className="font-semibold text-sm">{notification.title}</h4>
      <p className="text-xs text-gray-600">{notification.message}</p>
      <div className="flex justify-end gap-2 mt-2 text-xs">
        {!notification.isRead && (
          <button
            className="text-blue-500 hover:underline"
            onClick={() => markAsRead(notification._id.toString())}
          >
            Mark as read
          </button>
        )}
        <button
          className="text-red-500 hover:underline"
          onClick={() => deleteNotif(notification._id.toString())}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
