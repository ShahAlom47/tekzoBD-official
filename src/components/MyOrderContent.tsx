"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserOrders } from "@/lib/allApiRequest/orderRequest/orderRequest";
import { CheckoutDataType } from "@/Interfaces/checkoutDataInterface";
import Loading from "@/app/loading";
import Error from "@/app/error";

interface Props {
  userEmail: string;
}

const MyOrderContent: React.FC<Props> = ({ userEmail }) => {
  const { data:orders, error, isLoading } = useQuery({
    queryKey:["userOrders", userEmail],
    queryFn:async () =>{
      const res = await getUserOrders(userEmail)
      return res?.data as CheckoutDataType[]; 
    },
  } );

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (<Error></Error> );
  }
  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold text-gray-600">You have no orders yet.</h2>
      </div>
    );
  }
////////////////////////////




  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4">
      {orders.map((order) => (
        <div
          key={order._id?.toString()}
          className="rounded-xl shadow-md border border-gray-200 p-6 bg-white hover:shadow-lg transition duration-300"
        >
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-800 truncate">
              Order ID: {order._id?.toString()}
            </h3>
            {/* প্রয়োজনমত আরও ডাটা দেখাতে পারো */}
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
      ))}
    </div>
  );
};

export default MyOrderContent;
