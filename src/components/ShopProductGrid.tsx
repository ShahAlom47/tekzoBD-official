"use client";

import { ProductType } from "@/Interfaces/productInterfaces";


interface Props {
  products: ProductType[];
}

const ShopProductGrid: React.FC<Props> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-black">
      {products.map((product) => (
        <div key={String(product._id)} className="p-4 border rounded">
          <p>{product.title}</p>
          <p>${product.price}</p>
          {/* Add image, button, etc. */}
        </div>
      ))}
    </div>
  );
};

export default ShopProductGrid;
