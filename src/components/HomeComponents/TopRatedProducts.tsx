"use client";

import { ProductType } from "@/Interfaces/productInterfaces";
import SafeImage from "../SafeImage";

type Props = {
  products: ProductType[];
};

const TopRatedProducts = ({ products }: Props) => {
  // রেটিং অনুসারে টপ ৫ প্রোডাক্ট সিলেক্ট করা
  const topRated = products
    .filter(product => product.isPublished && product.ratings.avg >= 4)
    .sort((a, b) => b.ratings.avg - a.ratings.avg)
    .slice(0, 5);

  if (topRated.length === 0) {
    return (
      <section className="py-12 text-center text-gray-500">
        <p>No top rated products found.</p>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">
          Top Rated Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {topRated.map(product => (
            <div key={product._id.toString()} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
              <SafeImage
                src={product.media[0]?.url || "/placeholder.png"}
                alt={product.title}
                width={300}
                height={300}
                className="object-contain mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
              <p className="text-yellow-500 font-bold">
                ⭐ {product.ratings.avg.toFixed(1)} ({product.ratings.count})
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopRatedProducts;
