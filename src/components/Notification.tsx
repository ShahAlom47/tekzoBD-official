"use client";

import React, { useState } from "react";
import Drawer from "./Drawer";
import { useUser } from "@/hooks/useUser";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useNotifications } from "@/hooks/useNotifications";
import NotificationCard from "./NotificationCard"; // তুমি যদি আলাদা করে নোটিফিকেশন কার্ড বানাও

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  const {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    deleteNotif,
  } = useNotifications(user?.email || "");

  const renderNotifications = () => {
    if (loading) {
      return <p className="text-center text-sm">Loading notifications...</p>;
    }

    if (error) {
      return (
        <p className="text-center text-sm text-red-500">
          Failed to load notifications.
        </p>
      );
    }

    if (!notifications || notifications.length === 0) {
      return (
        <p className="text-center text-sm text-gray-600">
          No notifications available.
        </p>
      );
    }

    return notifications.map((notif) => (
      <NotificationCard
        key={notif._id.toString()}
        notification={notif}
        markAsRead={markAsRead}
        deleteNotif={deleteNotif}
      />
    ));
  };

  return (
    <div className="relative flex items-center">
      <button
        onClick={() => setIsOpen(true)}
        title="Notification"
        className="text-black md:text-3xl text-2xl font-light relative hover:scale-90 transition-transform"
      >
        <IoIosNotificationsOutline />
        {unreadCount > 0 && (
          <span className="md:h-5 md:w-5 h-4 w-4 bg-brandPrimary rounded-full absolute -top-2 -right-2 md:text-[9px] text-[8px] text-white flex items-center justify-center font-semibold shadow">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        direction="right"
        width="w-[90%] md:w-[40%]"
      >
        <div className="p-4 min-h-screen flex flex-col">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">
            Notifications
          </h3>

          <div className="overflow-y-auto flex-1 space-y-2">
            {renderNotifications()}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Notification;
