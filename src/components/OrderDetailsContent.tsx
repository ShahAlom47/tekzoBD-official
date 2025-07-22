import { CheckoutDataType } from '@/Interfaces/checkoutDataInterface';
import React from 'react';

const OrderDetailsContent = ({ order }: { order: CheckoutDataType }) => {
    return (
        <div>
             <div className="bg-white shadow-md rounded-lg p-4">
      <p><strong>Order ID:</strong> {order?._id ? order._id.toString() : ''}</p>
      <p><strong>Status:</strong> {order?.meta?.orderStatus}</p>
      <p><strong>Payment Method:</strong> {order?.paymentInfo?.method}</p>
      {/* aro details add korte paro */}
    </div>
        </div>
    );
};

export default OrderDetailsContent;