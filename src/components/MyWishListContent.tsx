"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/app/loading";
import Error from "@/app/error";
import WishListContent from "./WishListContent";
import { getUserWishList } from "@/lib/allApiRequest/wishListRequest/wishListRequest";
import { ProductType } from "@/Interfaces/productInterfaces";
import { WishlistType } from "@/Interfaces/wishListInterfaces";
import { useWishlist } from "@/hooks/useWishlist";



const MyWishListContent = () => {
    const { wishlistProducts, isProductsLoading } = useWishlist();


//   const { data, error, isLoading } = useQuery({
//     queryKey:["userWishlistProducts", userEmail],
//     queryFn:async () =>{
//       const res = await getUserWishList(userEmail)
//       console.log(res)
//       return res?.data  as WishlistType; 
//     },
//   } );
//   // If data?.products is already ProductType[], just use it as is; otherwise, map or adjust types accordingly.
//   const products = (data?.products ?? []) as unknown as ProductType[];

//   if (isLoading) {
//     return <Loading />;
//   }

//   if (error) {
//     return (<Error></Error> );
//   }
//   if (!products || products.length === 0) {
//     return (
//       <div className="text-center py-10">
//         <h2 className="text-2xl font-semibold text-gray-600">You have no products yet.</h2>
//       </div>
//     );
//   }
////////////////////////////





return(
    
  <div>
      <h1 className="text-xl font-bold mb-4">My Wishlist</h1>
      {isProductsLoading ? (
        <Loading />
      ) : wishlistProducts.length === 0 ? (
        <p>No products in wishlist.</p>
      ) : (
        <WishListContent products={wishlistProducts} contentType="page" />
      )}
    </div>
)
};

export default MyWishListContent;
