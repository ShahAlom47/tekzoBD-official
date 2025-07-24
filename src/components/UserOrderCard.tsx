// components/OrderCard.tsx
"use client"
import React from "react";
import { CheckoutDataType } from "@/Interfaces/checkoutDataInterface";

interface OrderCardProps {
  order: CheckoutDataType;
}

const UserOrderCard: React.FC<OrderCardProps> = ({ order }) => {
  return (
    <div
      key={order._id?.toString()}
      className="rounded-xl shadow-md border border-gray-200 p-6 bg-white hover:shadow-lg transition duration-300"
    >
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-800 truncate">
          Order ID: {order._id?.toString()}
        </h3>
        
      </div>

      {order.cartProducts && order.cartProducts.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold text-gray-800 mb-2">Items:</h4>
          <ul className="space-y-1 text-sm list-disc list-inside text-gray-600">
            {order.cartProducts.map((item, index) => (
              <li key={index}>
                {item.productId.toString()} × {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserOrderCard;
