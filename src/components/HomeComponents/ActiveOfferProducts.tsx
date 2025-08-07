"use client";

import { ProductType } from "@/Interfaces/productInterfaces";
import HomeSecHeading from "../HomeSecHeading";
import OfferProductCard from "./OfferProductCard";
type Props = {
  products: ProductType[];
};

const ActiveOfferProducts = ({ products }: Props) => {
  // Active offer ও discount > 0 প্রোডাক্ট ফিল্টার করা
const currentDate = new Date();

const offerProducts = products.filter((product) => {
  if (
    product.isPublished &&
    product.offer?.isActive === true &&
    product.offer.startDate &&
    product.offer.endDate
  ) {
    const start = new Date(product.offer.startDate);
    const end = new Date(product.offer.endDate);
    return currentDate >= start && currentDate <= end;
  }
  return false;
});


 

  if (offerProducts.length === 0) {
    return (
      <section className="py-12 text-center text-gray-500">
        <p>No active offers available right now.</p>
      </section>
    );
  }

  return (
    <section className="py-12 ">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <HomeSecHeading>Special Offers </HomeSecHeading>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 my-5">
          {offerProducts.map((product) => (
           <OfferProductCard key={product?._id.toString()} product={product}></OfferProductCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActiveOfferProducts;
