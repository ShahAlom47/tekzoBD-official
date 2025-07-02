
import { GetAllPortfolioParams, Project } from "@/Interfaces/portfolioInterfaces";
import { request } from "../apiRequests";
import { ObjectId } from "mongodb";



export const addPortfolio = async (data:Project) => {
  return request("POST", "/portfolio/addPortfolio", { ...data }, );
}

export const getAllPortfolio = async ({ currentPage, limit, searchTrim }: GetAllPortfolioParams) => {
  const url = `/portfolio/getAllPortfolio?currentPage=${currentPage}&pageSize=${limit}` +
              (searchTrim ? `&searchTrim=${encodeURIComponent(searchTrim)}` : "");

  return request("GET", url);
};

export const getSinglePortfolio = async (id:string|ObjectId,)=>{
  return request("GET",`/portfolio/getSinglePortfolio/${id}`)
}

export const updatePortfolio = async (id:string|ObjectId,data:Project)=>{
  return request("PATCH",`/portfolio/updatePortfolio/${id}`,{...data})
}

export const deletePortfolio= async (id: string|ObjectId ) => {
  return request("DELETE", `/portfolio/deletePortfolio/${id}`);
}
