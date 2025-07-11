

import { request } from "../apiRequests";
import { AddRequestWistDataType, WishlistType } from "@/Interfaces/wishListInterfaces";



export const addWishList = async (data:AddRequestWistDataType) => {
  return request("POST", "/wishList/add", { ...data }, );
}
export const removeWishData = async (productId:string,userEmail:string) => {
  return request("DELETE", `/wishList/removeWishListData`,{productId,userEmail} );
}
export const deleteReview = async (reviewId:string) => {
  return request("DELETE", `/review/delete?reviewId=${reviewId}` );
}
export const editReview = async (data:WishlistType) => {
  return request("PATCH", `/review/edit`,{ ...data } );
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
