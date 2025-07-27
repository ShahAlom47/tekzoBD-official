"use client";

import { ProductType } from "@/Interfaces/productInterfaces";
import SafeImage from "../SafeImage";
type Props = {
  products: ProductType[];
};

const ActiveOfferProducts = ({ products }: Props) => {
  // Active offer ও discount > 0 প্রোডাক্ট ফিল্টার করা
  const offerProducts = products.filter(
    (product) =>
      product.isPublished &&
      product.offer?.isActive === true &&
      (product.discount ?? 0) > 0
  );

  if (offerProducts.length === 0) {
    return (
      <section className="py-12 text-center text-gray-500">
        <p>No active offers available right now.</p>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-red-700 mb-8 text-center">
          Special Offers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {offerProducts.map((product) => (
            <div
              key={product._id.toString()}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <SafeImage
                src={product.media[0]?.url || "/placeholder.png"}
                alt={product.title}
                width={300}
                height={300}
                className="object-contain mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
              <p className="text-green-600 font-semibold mb-1">
                Discount: {product.discount}%
              </p>
              <p className="line-through text-gray-400">
                ৳{product.price.toFixed(2)}
              </p>
              <p className="text-xl font-bold">
                ৳{(product.price * (1 - product.discount / 100)).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActiveOfferProducts;
