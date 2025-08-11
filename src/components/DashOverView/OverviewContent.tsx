"use client";

import React, { useState } from "react";
import SummaryCard from "./SummaryCard";
import { FaUsers, FaShoppingCart, FaBoxOpen, FaDollarSign } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getAllOverview } from "@/lib/allApiRequest/dashOverviewRequest/dashOverviewRequest";

const OverviewContent = () => {
  // Date states with default values (last 30 days)
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d.toISOString().slice(0, 10);
  });
  const [endDate, setEndDate] = useState(() => {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  });

  // Fetch data with react-query
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["overview-data", startDate, endDate],
    queryFn: async () => {
      const res = await getAllOverview({ startDate, endDate });
      return res?.data;
    },
 
  });

  // Handler for date change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "startDate") setStartDate(e.target.value);
    else setEndDate(e.target.value);
  };

  // Show loading and error states
  if (isLoading) return <p>Loading overview data...</p>;
  if (isError) return <p>Failed to load overview data.</p>;

  // Prepare values for cards
  const userValues = [
    { label: "Total Users", value: data?.users?.totalUsers ?? 0 },
    { label: "New Users", value: data?.users?.newUsers ?? 0 },
  ];

  const orderValues = [
    { label: "Total Orders", value: data?.orders?.totalOrders ?? 0 },
    { label: "Pending Orders", value: data?.orders?.pendingOrders ?? 0 },
    { label: "Completed Orders", value: data?.orders?.completedOrders ?? 0 },
    { label: "Cancelled Orders", value: data?.orders?.cancelledOrders ?? 0 },
  ];

  const productValues = [
    { label: "Total Products", value: data?.products?.totalProducts ?? 0 },
    { label: "In Stock", value: data?.products?.inStockProducts ?? 0 },
    { label: "Out of Stock", value: data?.products?.outOfStockProducts ?? 0 },
  ];

  const salesValues = [
    {
      label: "Total Sales",
      value: `$${data?.sales?.totalSalesAmount?.toFixed(2) ?? "0.00"}`,
    },
  ];

  return (
    <div className="p-4 bg-gray-50 rounded shadow-md">
      {/* Date pickers */}
      <div className="flex gap-4 mb-6 items-center">
        <div>
          <label htmlFor="startDate" className="block font-medium mb-1">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={startDate}
            onChange={handleDateChange}
            max={endDate}
            className="border rounded px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block font-medium mb-1">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={endDate}
            onChange={handleDateChange}
            min={startDate}
            max={new Date().toISOString().slice(0, 10)}
            className="border rounded px-3 py-2"
          />
        </div>
        <button
          onClick={() => refetch()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Refresh
        </button>
      </div>

      {/* Summary cards */}
      <div className="flex flex-wrap gap-6">
        <SummaryCard title="Users" values={userValues}>
          <FaUsers className="text-blue-500" />
        </SummaryCard>
        <SummaryCard title="Orders" values={orderValues}>
          <FaShoppingCart className="text-green-500" />
        </SummaryCard>
        <SummaryCard title="Products" values={productValues}>
          <FaBoxOpen className="text-yellow-500" />
        </SummaryCard>
        <SummaryCard title="Sales" values={salesValues}>
          <FaDollarSign className="text-red-500" />
        </SummaryCard>
      </div>
    </div>
  );
};

export default OverviewContent;
