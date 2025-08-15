"use client";
import { getAllTrafficInfo } from "@/lib/allApiRequest/dashOverviewRequest/dashOverviewRequest";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import TimeRangeSelector, { FilterType } from "./TimeRangeSelector";
import SummaryCard from "./SummaryCard";

export default function TrafficAnalytics() {
  const [filter, setFilter] = useState<FilterType>("week");
  const [showAll, setShowAll] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["traffic-data", filter],
    queryFn: async () => {
      const res = await getAllTrafficInfo({ filter });
      return res?.data;
    },
    staleTime: 5 * 1000,
    refetchOnWindowFocus: false,
  });

  // Prepare table data
  const tableRows = useMemo(() => {
    if (!data?.rows) return [];
    return data.rows.map((row: any) => {
      const [pagePath, pageTitle, eventName, linkText, rawDate] =
        row.dimensionValues.map((d: any) => d.value);
      const [eventCount, totalUsers, pageViews] = row.metricValues.map(
        (m: any) => m.value
      );
      const dateFormatted = `${rawDate.slice(6, 8)}/${rawDate.slice(
        4,
        6
      )}/${rawDate.slice(0, 4)}`;
      return {
        pagePath,
        pageTitle,
        eventName,
        linkText,
        date: dateFormatted,
        eventCount,
        totalUsers,
        pageViews,
      };
    });
  }, [data]);

  // Summary metrics
  const summary = useMemo(() => {
    let totalUsers = 0,
      pageViews = 0,
      events = 0;
    tableRows.forEach((row) => {
      totalUsers += parseInt(row.totalUsers);
      pageViews += parseInt(row.pageViews);
      events += parseInt(row.eventCount);
    });
    return { totalUsers, pageViews, events };
  }, [tableRows]);

  // Extract specific metrics
  const extraMetrics = useMemo(() => {
    if (!data?.rows) return {};

    let homeViews = 0;
    let shopViews = 0;
    let productViews = 0;
    let addToCart = 0;
    let checkout = 0;

    data.rows.forEach((row: any) => {
      const [pagePath, , eventName] = row.dimensionValues.map(
        (d: any) => d.value
      );
      const totalUsers = parseInt(row.metricValues[1].value);

      // Home
      if (pagePath === "/") {
        homeViews += totalUsers;
      }
      // Shop (but not product details)
      if (pagePath === "/shop") {
        shopViews += totalUsers;
      }
      // Product details (any subpage under /shop/)
      if (pagePath.startsWith("/shop/") || pagePath.startsWith("/product/")) {
        productViews += totalUsers;
      }
      // Add to cart
      if (eventName === "add_to_cart") {
        addToCart += totalUsers;
      }
      // Checkout
      if (eventName === "begin_checkout") {
        checkout += totalUsers;
      }
    });

    return { homeViews, shopViews, productViews, addToCart, checkout };
  }, [data]);

  const rowsToShow = showAll ? tableRows : tableRows.slice(0, 20);

  return (
    <div className="p-6 bg-white rounded shadow max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Traffic Analytics</h2>

      <TimeRangeSelector
        filter={filter}
        onFilterChange={setFilter}
        onRefresh={refetch}
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <SummaryCard title="Total Users" value={summary.totalUsers} />
        <SummaryCard title="Page Views" value={summary.pageViews} />
        <SummaryCard title="Event Count" value={summary.events} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
        <SummaryCard title="Home Page Views" value={extraMetrics.homeViews || 0} />
        <SummaryCard title="Shop Page Views" value={extraMetrics.shopViews || 0} />
        <SummaryCard title="Product Views" value={extraMetrics.productViews || 0} />
        <SummaryCard title="Add to Cart" value={extraMetrics.addToCart || 0} />
        <SummaryCard title="Checkout Clicks" value={extraMetrics.checkout || 0} />
      </div>

      {/* Table */}
      <div className="mt-6 overflow-x-auto border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2">Date</th>
              <th className="p-2">Page Path</th>
              <th className="p-2">Page Title</th>
              <th className="p-2">Event</th>
              <th className="p-2">Link Text</th>
              <th className="p-2 text-right">Event Count</th>
              <th className="p-2 text-right">Users</th>
              <th className="p-2 text-right">Page Views</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={8} className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            )}
            {isError && (
              <tr>
                <td colSpan={8} className="p-4 text-center text-red-500">
                  Failed to load data.
                </td>
              </tr>
            )}
            {!isLoading &&
              !isError &&
              rowsToShow.map((row, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">
                  <td className="p-2">{row.date}</td>
                  <td className="p-2">{row.pagePath}</td>
                  <td className="p-2">{row.pageTitle}</td>
                  <td className="p-2">{row.eventName}</td>
                  <td className="p-2">{row.linkText}</td>
                  <td className="p-2 text-right">{row.eventCount}</td>
                  <td className="p-2 text-right">{row.totalUsers}</td>
                  <td className="p-2 text-right">{row.pageViews}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Show More Button */}
      {!showAll && tableRows.length > 20 && (
        <div className="text-center mt-4">
          <button
            onClick={() => setShowAll(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
}
