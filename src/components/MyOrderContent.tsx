"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserOrders } from "@/lib/allApiRequest/orderRequest/orderRequest";
import { CheckoutDataType } from "@/Interfaces/checkoutDataInterface";
import Loading from "@/app/loading";
import Error from "@/app/error";
import UserOrderCard from "./UserOrderCard";

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
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2  p-4">
      {orders.map((order) => (
        <div
          key={order._id?.toString()}
          className=""
        >
        <UserOrderCard order={order}></UserOrderCard>
        </div>
      ))}
    </div>
  );
};

export default MyOrderContent;
