import { getAllTrafficInfo } from "@/lib/allApiRequest/dashOverviewRequest/dashOverviewRequest";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function TrafficAnalytics() {
    const [startDate ,setStartDate]= useState<string>('')
    const [endDate ,setEndDate]= useState<string>('')
  const { data, isLoading, isError } = useQuery({
    queryKey: ["traffic-data"],
    queryFn: async ()=>{
        const res = await getAllTrafficInfo({startDate,endDate}) 
        return res?.data
    },
  });
  console.log(data)

  if (isLoading) return <p>Loading traffic data...</p>;
  if (isError) return <p>Failed to load traffic data.</p>;

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Traffic Analytics</h2>
      {/* <TrafficChart data={data} />
      <TrafficTable data={data} /> */}
    </div>
  );
}
