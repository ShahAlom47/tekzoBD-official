"use client";

import React, { useState, useEffect } from "react";

type Filters = {
  orderStatus: string;
  paymentMethod: string;
  deliveryMethod: string;
  fromDate: string;
  toDate: string;
};

type OrderFiltersProps = {
  onFilterChange: (filters: Filters) => void;
};

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

const OrderFilters: React.FC<OrderFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<Filters>({
    orderStatus: "",
    paymentMethod: "",
    deliveryMethod: "",
    fromDate: "",
    toDate: "",
  });

  const debouncedFilters = useDebounce(filters, 500);

  useEffect(() => {
    onFilterChange(debouncedFilters);
  }, [debouncedFilters, onFilterChange]);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResetFilters = () => {
    const emptyFilters: Filters = {
      orderStatus: "",
      paymentMethod: "",
      deliveryMethod: "",
      fromDate: "",
      toDate: "",
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  return (
    <div className="mb-6 p-4 bg-white rounded-md shadow-md grid grid-cols-1 md:grid-cols-3 gap-4">
      <select
        name="orderStatus"
        value={filters.orderStatus}
        onChange={handleChange}
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
        name="paymentMethod"
        value={filters.paymentMethod}
        onChange={handleChange}
        className="my-input"
      >
        <option value="">All Payment Methods</option>
        <option value="card">Card</option>
        <option value="cash-on-delivery">Cash on Delivery</option>
        <option value="bkash">Bkash</option>
        <option value="nagad">Nagad</option>
      </select>

      <select
        name="deliveryMethod"
        value={filters.deliveryMethod}
        onChange={handleChange}
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
          name="fromDate"
          value={filters.fromDate}
          onChange={handleChange}
          className="my-input"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">To Date</label>
        <input
          type="date"
          name="toDate"
          value={filters.toDate}
          onChange={handleChange}
          className="my-input"
        />
      </div>

      <div className="md:col-span-3 flex gap-4 mt-2">
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
