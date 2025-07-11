

import { request } from "../apiRequests";
import { AddRequestWistDataType } from "@/Interfaces/wishListInterfaces";



export const addWishList = async (data:AddRequestWistDataType) => {
  return request("POST", "/wishList/add", { ...data }, );
}
export const removeWishData = async (productId:string,userEmail:string) => {
  return request("DELETE", `/wishList/removeWishListData`,{productId,userEmail} );
}
export const syncWishlist = async (productIds:string[],userEmail:string) => {
  return request("POST", `/wishList/sync-wishlist`,{productIds,userEmail} );
}
export const getUserWishList = async (userEmail:string) => {
  return request("GET", `/wishList/sync-wishlist?userEmail=${userEmail}` );
}


// export const getAllCategories = async ({ currentPage, limit, searchTrim }: GetAllCategoryParams) => {
//   const url = `/category/getAllCategory?currentPage=${currentPage}&pageSize=${limit}` +
//               (searchTrim ? `&searchTrim=${encodeURIComponent(searchTrim)}` : "");

//   return request("GET", url);
// };

// export const getSingleCategory = async (id:string|ObjectId,)=>{
//   return request("GET",`/category/getSingleCategory/${id}`)
// }

// export const updateCategory = async (id:string|ObjectId,data:CategoryType)=>{
//   return request("PATCH",`/category/updateCategory/${id}`,{...data})
// }

// export const deleteCategory= async (id: string|ObjectId ) => {
//   return request("DELETE", `/category/deleteCategory/${id}`);
// }
