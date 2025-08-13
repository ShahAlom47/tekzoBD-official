import { request } from "../apiRequests";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAllTrafficInfo = async ({ startDate, endDate }: any) => {
  const url = `/analytics/allData?startDate=${startDate}&endDate=${endDate}`;

  return request("GET", url);
};

export const getAllOverview = async ({ filter }:{filter:string}) => {
  const url = `/overview?filter=${filter}`;
  return request("GET", url);
};
