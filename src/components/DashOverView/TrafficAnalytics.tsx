"use client"
import { getAllTrafficInfo } from "@/lib/allApiRequest/dashOverviewRequest/dashOverviewRequest";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import DateRangePicker from "./DateRangePicker";

const formatDate = (date: Date) => date.toISOString().slice(0, 10);

export default function TrafficAnalytics() {
  const [startDate, setStartDate] = useState<string>(() => formatDate(new Date()));
  const [endDate, setEndDate] = useState<string>(() => formatDate(new Date()));
  const [preset, setPreset] = useState<string>("Today");

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["traffic-data", startDate, endDate],
    queryFn: async () => {
      const res = await getAllTrafficInfo({ startDate, endDate });
      return res?.data;
    },
    //   keepPreviousData: true,
  });

  useEffect(() => {
    if (startDate && endDate) {
      refetch();
    }
  }, [startDate, endDate, refetch]);

  if (isLoading) return <p>Loading traffic data...</p>;
  if (isError) return <p>Failed to load traffic data.</p>;

  console.log(data)

  return (
    <div className="p-6 bg-white rounded shadow max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Traffic Analytics</h2>

      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        preset={preset}
        onDateChange={(start, end) => {
          setStartDate(start);
          setEndDate(end);
        }}
        onPresetChange={setPreset}
      />

      {/* Data display */}
      <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
 Trafic data
      </pre>
    </div>
  );
}
