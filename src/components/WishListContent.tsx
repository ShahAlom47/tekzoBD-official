"use client"
import { ProductType } from '@/Interfaces/productInterfaces';
import React from 'react';
import PageHeading from './PageHeading';
import ProductCard from './ProductCard';

interface WishContentProps {
  products: ProductType[] | null;
  contentType?: 'drawer' | 'page';
}

const WishListContent = ({ products, contentType = 'page' }: WishContentProps) => {
  if (!products || products.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p>No products in your wishlist.</p>
      </div>
    );
  }

  return (
    <div className={`w-full ${contentType === 'page' ? 'p-6' : 'p-2'}`}>
      {contentType === 'page' && (
        <PageHeading title="Your Wishlist" subTitle="View and manage your favorite products" />
      )}

      <div
        className={`grid gap-4  ${
          contentType === 'drawer' ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
        }`}
      >
        {products.map((product) => (
          <ProductCard key={product._id.toString()} item={product} isWishList={true} layout={contentType==="drawer"?"list":"grid-3"} />
        ))}
      </div>
    </div>
  );
};

export default WishListContent;
