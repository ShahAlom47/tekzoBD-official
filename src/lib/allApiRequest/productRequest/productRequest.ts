
import { request } from "../apiRequests";
import { ObjectId } from "mongodb";
import { GetAllProductParams, ProductType } from "@/Interfaces/productInterfaces";



export const addProduct = async (data:ProductType) => {
  return request("POST", "/Product/addProduct", { ...data }, );
}

export const getAllProduct = async ({ currentPage, limit, searchTrim }: GetAllProductParams) => {
  const url = `/Product/getAllProduct?currentPage=${currentPage}&pageSize=${limit}` +
              (searchTrim ? `&searchTrim=${encodeURIComponent(searchTrim)}` : "");

  return request("GET", url);
};

export const getSingleProduct = async (id:string|ObjectId,)=>{
  return request("GET",`/Product/getSingleProduct/${id}`)
}

export const updateProduct = async (id:string|ObjectId,data:ProductType)=>{
  return request("PATCH",`/Product/updateProduct/${id}`,{...data})
}

export const deleteProduct= async (id: string|ObjectId ) => {
  return request("DELETE", `/Product/deleteProduct/${id}`);
}
