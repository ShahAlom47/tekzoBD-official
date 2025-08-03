"use client";
import React, { useState } from "react";
import Drawer from "./Drawer";
import { useUser } from "@/hooks/useUser";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useNotifications } from "@/hooks/useNotifications";

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const {
    notifications,
    unreadCount,
    loading,
    error,
    fetchNotifications,
    sendNewNotification,
    markAsRead,
    deleteNotif,
  } = useNotifications(user?.email||'');

  return (
    <div className="relative flex items-center">
      <button
        onClick={() => setIsOpen(true)}
        title="Notification"
        className="text-black md:text-3xl text-2xl font-light relative hover:scale-90 transition-transform"
      >
        <IoIosNotificationsOutline />
        <span className="md:h-5 md:w-5 h-4 w-4 p-1 bg-brandPrimary rounded-full absolute -top-2 -right-2 md:text-[9px] text-[8px] text-white flex items-center justify-center font-semibold shadow">
        {unreadCount>99?unreadCount:"99+"}  
        </span>
      </button>

      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        direction="right"
        width="w-[90%] md:w-[40%] product"
      >
        <div className="p-2 min-h-screen flex flex-col">
          <h3 className="text-lg font-semibold mb-2 pb-2 border-b-2">
            Notification
          </h3>

          <div className="flex flex-col justify-between gap-2 p-2 product h-[90vh] ">
            <div className="overflow-y-scroll flex-1 h-full product ">
              {/* {isLoading && !products && <Loading />} */}

              {/* {isError && (
                <div className="text-red-500 text-sm text-center ">
                  Failed to load cart products.{" "}
                  <button
                    onClick={() => refetch()}
                    className="underline text-brandPrimary hover:text-red-600"
                  >
                    Try again
                  </button>
                </div>
              )} */}

              {/* Empty Cart Message */}
              {/* {!isLoading &&
                !isError &&
                (!products || products.length === 0) && (
                  <div className="flex flex-col items-center justify-center mt-10 text-gray-900 px-4 ">
                    <BsCartDash size={40} />
                    <p className="text-lg font-semibold mb-2">
                      Your cart is empty
                    </p>
                    <p className="text-sm text-gray-900 mb-4">
                      Looks like you haven’t added anything yet.
                    </p>
                    <button
                      onClick={() => {
                        router.push("/shop");
                        setIsOpen(false);
                      }}
                      className="btn-bordered"
                    >
                      Continue Shopping
                    </button>
                  </div>
                )}
              {!isLoading && !isError && products && products.length > 0 && (
                <CartContent
                  products={products}
                  cartItems={cartItems}
                  contentType={"drawer"}
                />
              )} */}
            </div>

            <div></div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Notification;
