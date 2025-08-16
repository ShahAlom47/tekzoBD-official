"use client";

import React, { useState } from "react";
import { CheckoutDataType } from "@/Interfaces/checkoutDataInterface";
import { format } from "date-fns";
import { useConfirm } from "@/hooks/useConfirm";
import toast from "react-hot-toast";
import { updateOrderStatus } from "@/lib/allApiRequest/orderRequest/orderRequest";
import { queryClient } from "@/Providers/QueryProvider";
import { useNotifications } from "@/hooks/useNotifications";

interface OrderCardProps {
  order: CheckoutDataType;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-400 text-black",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const UserOrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const {
    _id,
    meta,
    cartProducts,
    pricing,
    paymentInfo,
    shippingInfo,
  } = order;

  console.log(cartProducts)

    const { sendNewNotification, } = useNotifications();

  const [isCancelling, setIsCancelling] = useState(false);
  const { confirm, ConfirmModal } = useConfirm();

  const formattedDate = meta?.checkoutAt
    ? format(new Date(meta.checkoutAt), "PPP, p")
    : "Date not available";

  const statusClass = statusColors[meta?.orderStatus ?? "pending"];
const handleCancelClick = async () => {
  if (!(_id)) return;

  const confirmed = await confirm({
    title: "Update Order Status",
    message: `Are you sure you want to cancel your Order?`,
    confirmText: "Yes",
    cancelText: "No",
  });

  if (!confirmed) return;

  try {
    setIsCancelling(true);
    const response = await updateOrderStatus(_id.toString(), "cancelled",true);
    if (response?.success) {
      toast.success("Order status updated successfully");

      // Invalidate query to refetch updated order list
      queryClient.invalidateQueries({ queryKey: ["userOrders"] });

      // Send cancellation notification to admin
      await sendNewNotification({
        title: "Order Cancelled",
      message: `${shippingInfo?.name || "A customer"} cancelled order ${_id || ""} worth ${pricing?.grandTotal?.toFixed(2) || "N/A"} BDT on ${new Date(meta?.checkoutAt || "").toLocaleString()}.`,
        type: "order_cancelled",
        link: `/dashboard/manageOrders/${_id}`,
        relatedId: _id.toString(),
      });
    } else {
      toast.error(response?.message || "Failed to update order status");
    }
  } catch (error) {
    console.error(error);
    toast.error("Error updating order status");
  } finally {
    setIsCancelling(false);
  }
};

  return (
    <div className="rounded-xl shadow-lg border border-gray-300 p-6 bg-white hover:shadow-xl transition-shadow duration-300 h-full flex flex-col justify-between">
      {/* হেডার */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          Order ID: {_id?.toString() ?? "N/A"}
        </h3>
        <span
          className={`mt-2 sm:mt-0 inline-block px-3 py-1 text-sm font-medium rounded-full ${statusClass}`}
        >
          {meta?.orderStatus.charAt(0).toUpperCase() + meta?.orderStatus.slice(1)}
        </span>
      </div>

      <p className="text-sm text-gray-500 mb-4">Ordered on: {formattedDate}</p>

      {/* আইটেম লিস্ট */}
      {cartProducts && cartProducts.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-2">Items:</h4>
          <ul className="divide-y divide-gray-200 max-h-48 overflow-y-auto">
            {cartProducts.map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center py-2 text-gray-700"
              >
                <span className="truncate max-w-[65%]">
                  {item.productName}
                </span>
                <span className="text-sm text-gray-600">× {item.quantity}</span>
                <span className="text-sm font-medium text-gray-900">
                  ${(item.discountedPrice * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ফুটার */}
      <div className="border-t border-gray-200 pt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm text-gray-700 space-y-2 sm:space-y-0">
        <div>
          <span className="font-semibold">Total: </span>
          {pricing?.grandTotal ? `$${pricing.grandTotal.toFixed(2)}` : "N/A"}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div>
            <span className="font-semibold">Payment:</span> {paymentInfo?.method ?? "N/A"}
          </div>
          <div>
            <span className="font-semibold">Delivery:</span> {shippingInfo?.deliveryMethod ?? "N/A"}
          </div>

          {/* Cancel Button - শুধু Pending অর্ডারের জন্য */}
          {meta?.orderStatus === "pending" && (
            <button
              disabled={isCancelling}
              onClick={handleCancelClick}
              className={`ml-4 px-2 py-1 rounded-md text-white font-semibold text-sm transition ${
                isCancelling ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
              }`}
              title="Cancel this order"
              type="button"
            >
              {isCancelling ? "Cancelling..." : "Cancel Order"}
            </button>
          )}
        </div>
      </div>
      {ConfirmModal}
    </div>
  );
};

export default UserOrderCard;
