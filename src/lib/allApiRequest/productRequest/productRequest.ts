
import { request } from "../apiRequests";
import { ObjectId } from "mongodb";
import { GetAllProductParams, ProductType } from "@/Interfaces/productInterfaces";



export const addProduct = async (data:ProductType) => {
  return request("POST", "/product/addProduct", { ...data }, );
}



export const getAllProduct = async (params: GetAllProductParams) => {
  const {
    currentPage,
    limit,
    searchTrim,
    sort,
    minPrice,
    maxPrice,
    category,
    brand,
    rating,
  } = params;

  const queryParams = new URLSearchParams();

  queryParams.set("currentPage", String(currentPage));
  queryParams.set("pageSize", String(limit));

  if (searchTrim) queryParams.set("searchTrim", searchTrim);
  if (sort) queryParams.set("sort", sort);
  if (minPrice) queryParams.set("minPrice", String(minPrice));
  if (maxPrice) queryParams.set("maxPrice", String(maxPrice));
  if (category) queryParams.set("category", category);
  if (brand) queryParams.set("brand", brand);
  if (rating) queryParams.set("rating", String(rating));

  const url = `/product/getAllProducts?${queryParams.toString()}`;

  return request("GET", url);
};


export const getSingleProduct = async (id:string|ObjectId,)=>{
  return request("GET",`/product/${id}`)
}

export const updateProduct = async (id:string|ObjectId,data:ProductType)=>{
  return request("PATCH",`/product/${id}`,{...data})
}

export const deleteProduct= async (id: string|ObjectId ) => {
  return request("DELETE", `/product/deleteProduct/${id}`);
}
