"use client";

import React, { useState } from "react";

type OrderFiltersProps = {
  onFilterChange: (filters: {
    orderStatus: string;
    paymentMethod: string;
    deliveryMethod: string;
    fromDate: string;
    toDate: string;
  }) => void;
};

const OrderFilters: React.FC<OrderFiltersProps> = ({ onFilterChange }) => {

  const [orderStatus, setOrderStatus] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleApplyFilters = () => {
    onFilterChange({  orderStatus, paymentMethod, deliveryMethod, fromDate, toDate });
  };

  const handleResetFilters = () => {
    setOrderStatus("");
    setPaymentMethod("");
    setDeliveryMethod("");
    setFromDate("");
    setToDate("");
    onFilterChange({  orderStatus: "", paymentMethod: "", deliveryMethod: "", fromDate: "", toDate: "" });
  };

  return (
    <div className="mb-6 p-4 bg-white rounded-md shadow-md grid grid-cols-1 md:grid-cols-3 gap-4">
    

      <select
        value={orderStatus}
        onChange={(e) => setOrderStatus(e.target.value)}
        className="my-input"
      >
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="confirmed">Confirmed</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select>

      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="my-input"
      >
        <option value="">All Payment Methods</option>
        <option value="card">Card</option>
        <option value="cash-on-delivery">Cash on Delivery</option>
        <option value="bkash">Bkash</option>
        <option value="nagad">Nagad</option>
      </select>

      <select
        value={deliveryMethod}
        onChange={(e) => setDeliveryMethod(e.target.value)}
        className="my-input"
      >
        <option value="">All Delivery Types</option>
        <option value="home-delivery">Home Delivery</option>
        <option value="standard">Standard</option>
        <option value="express">Express</option>
        <option value="pickup">Pickup</option>
      </select>

      <div>
        <label className="block mb-1 text-sm font-medium">From Date</label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="my-input"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">To Date</label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="my-input"
        />
      </div>

      <div className="md:col-span-3 flex gap-4 mt-2">
        <button
          onClick={handleApplyFilters}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Apply
        </button>
        <button
          onClick={handleResetFilters}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default OrderFilters;
