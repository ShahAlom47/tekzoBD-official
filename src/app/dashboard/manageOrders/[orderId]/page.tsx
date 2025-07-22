"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getSingleOrder } from "@/lib/allApiRequest/orderRequest/orderRequest";
import Loading from "@/app/loading";
import Error from "@/app/error";
import OrderDetailsContent from "@/components/OrderDetailsContent";
import { CheckoutDataType } from "@/Interfaces/checkoutDataInterface";

const OrderDetails = () => {
  const { id } = useParams();

  const {
    data: order,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["order-details", id],
    queryFn: async () =>{
        const res = await getSingleOrder(id?.toString() || "");
        return res?.data  as CheckoutDataType;
    },
    enabled: !!id,
  });

  if (isLoading) return <Loading />;

  if (isError)
    return (
      <Error
      />
    );

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Order Details</h2>
      {order ? (
        <OrderDetailsContent order={order} />
      ) : (
        <div>No order details found.</div>
      )}
    </div>
  );
};

export default OrderDetails;
