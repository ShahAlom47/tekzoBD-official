"use client";

import React, { useState } from "react";
import { ObjectId } from "mongodb";
import { useConfirm } from "@/hooks/useConfirm";
import toast from "react-hot-toast";
import { updateOrderStatus } from "@/lib/allApiRequest/orderRequest/orderRequest";

type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

interface Props {
  id: string | ObjectId;
  status: OrderStatus;
  onStatusChange?: (newStatus: OrderStatus) => void;
}

const statusOptions: OrderStatus[] = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
];

const OrderStatusSelect: React.FC<Props> = ({ id, status, onStatusChange }) => {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(status);
  const { ConfirmModal, confirm } = useConfirm();

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as OrderStatus;

    if (newStatus === selectedStatus) return;

    const ok = await confirm({
      title: "Update Order Status",
      message: `Are you sure you want to change status to "${newStatus}"?`,
      confirmText: "Yes",
      cancelText: "No",
    });

    if (ok) {
      try {
        const res = await updateOrderStatus(id, newStatus);
        if (res.success) {
          setSelectedStatus(newStatus);
          toast.success("Order status updated successfully");
          onStatusChange?.(newStatus);
        } else {
          toast.error("Failed to update order status");
        }
      } catch (err) {
        toast.error("Error updating order status");
        console.error(err);
      }
    }
  };

  return (
    <div className="inline-block">
    <select
  value={selectedStatus}
  onChange={handleChange}
  className={`px-3 py-1 rounded border capitalize text-sm cursor-pointer text-white
    ${
      selectedStatus === "pending"
        ? "bg-yellow-500"
        : selectedStatus === "confirmed"
        ? "bg-blue-500"
        : selectedStatus === "shipped"
        ? "bg-purple-500"
        : selectedStatus === "delivered"
        ? "bg-green-600"
        : selectedStatus === "cancelled"
        ? "bg-red-500"
        : "bg-gray-200"
    }
  `}
>
  {statusOptions.map((option) => (
    <option key={option} value={option} className="capitalize text-black">
      {option}
    </option>
  ))}
</select>


      {ConfirmModal}
    </div>
  );
};

export default OrderStatusSelect;
