
import { request } from "../apiRequests";
import { ObjectId } from "mongodb";
import { GetAllProductParams, ProductType } from "@/Interfaces/productInterfaces";



export const addProduct = async (data:ProductType) => {
  return request("POST", "/product/addProduct", { ...data }, );
}

export const getAllProduct = async ({ currentPage, limit, searchTrim }: GetAllProductParams) => {
  const url = `/product/getAllProducts?currentPage=${currentPage}&pageSize=${limit}` +
              (searchTrim ? `&searchTrim=${encodeURIComponent(searchTrim)}` : "");

  return request("GET", url);
};

export const getSingleProduct = async (id:string|ObjectId,)=>{
  return request("GET",`/product/${id}`)
}

export const updateProduct = async (id:string|ObjectId,data:ProductType)=>{
  return request("PATCH",`/product/updateProduct/${id}`,{...data})
}

export const deleteProduct= async (id: string|ObjectId ) => {
  return request("DELETE", `/product/deleteProduct/${id}`);
}
