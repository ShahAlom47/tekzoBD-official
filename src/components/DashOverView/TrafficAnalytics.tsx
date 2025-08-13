"use client";

import { getAllTrafficInfo } from "@/lib/allApiRequest/dashOverviewRequest/dashOverviewRequest";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import TimeRangeSelector, { FilterType } from "./TimeRangeSelector";

export default function TrafficAnalytics() {
  const [filter, setFilter] = useState<FilterType>("week"); // default filter

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["traffic-data", filter],
    queryFn: async () => {
      const res = await getAllTrafficInfo({ filter });
      return res?.data;
    },
    staleTime: 5 * 1000, // 5 seconds → previous data kept briefly
  refetchOnWindowFocus: false,
  });

  return (
    <div className="p-6 bg-white rounded shadow max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Traffic Analytics</h2>

      {/* Time Range Selector */}
      <TimeRangeSelector filter={filter} onFilterChange={setFilter} onRefresh={refetch} />

      {/* Data Display */}
      <div className="bg-gray-100 p-4 rounded overflow-auto max-h-96 mt-4">
        {isLoading && <p>Loading traffic data...</p>}
        {isError && <p>Failed to load traffic data.</p>}
        {!isLoading && !isError && (
          <pre className="whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>
        )}
      </div>
    </div>
  );
}
