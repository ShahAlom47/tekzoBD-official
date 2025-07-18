import { CheckoutDataType } from "@/Interfaces/checkoutDataInterface";
import { clearCheckoutData } from "@/redux/features/checkoutSlice/checkoutSlice";
import React from "react";
import { useDispatch } from "react-redux";

interface OrderSuccessContentProps {
  orderData: CheckoutDataType
}

const OrderSuccessContent: React.FC<OrderSuccessContentProps> = ({ orderData }) => {
  const {
    meta,
    pricing,
    paymentInfo,
    shippingInfo,
  } = orderData;

  

  const dispatch = useDispatch();

  const  handleOk=()=>{

     dispatch(clearCheckoutData());

  }

  return (
    <div className="space-y-2 px-2 py-4 text-black">
      <h2 className="text-xl font-bold text-center">Order Confirmed!</h2>
      <p className="text-center text-green-600 font-semibold text-sm">
        Thank you for your purchase.
      </p>

      <div className="border p-4 rounded bg-gray-50 space-y-2 text-sm">
        <h3 className="font-semibold">Order Info</h3>
        <p><strong>Order Status:</strong> {meta?.orderStatus || "Pending"}</p>
        <p><strong>Confirmed At:</strong> {meta?.checkoutAt ? new Date(meta.checkoutAt).toLocaleString() : "N/A"}</p>
        <p><strong>User ID:</strong> {meta?.userEmail || "Guest"}</p>
      </div>

      <div className="border p-4 rounded bg-gray-50 space-y-2 text-sm">
        <h3 className="font-semibold">Payment Details</h3>
        <p><strong>Method:</strong> {paymentInfo?.method || "N/A"}</p>
        <p><strong>Paid:</strong> {paymentInfo?.paymentStatus === "paid" ? "Yes" : "No"}</p>
        {paymentInfo?.transactionId && (
          <p><strong>Transaction ID:</strong> {paymentInfo.transactionId}</p>
        )}
        <p><strong>Total Paid:</strong> ৳{pricing?.grandTotal || 0}</p>
      </div>

      <div className="border p-4 rounded bg-gray-50 space-y-2">
        <h3 className="font-semibold">Shipping Address</h3>
        <p>{shippingInfo?.name}</p>
        <p>{shippingInfo?.phone}</p>
        <p>{shippingInfo?.address}</p>
        <p>{shippingInfo?.city} - {shippingInfo?.zipCode}</p>
      </div>
    </div>
  );
};

export default OrderSuccessContent;
