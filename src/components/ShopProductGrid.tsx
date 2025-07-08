"use client";

import { ProductType } from "@/Interfaces/productInterfaces";
import ProductCard from "./ProductCard";


interface Props {
  products: ProductType[];
}

const ShopProductGrid: React.FC<Props> = ({ products }) => {
  console.log(products)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-black">
      {products?.map((product) => (
        <div key={String(product._id)} className="">
          <ProductCard item={product} ></ProductCard>
        </div>
      ))}
    </div>
  );
};

export default ShopProductGrid;
