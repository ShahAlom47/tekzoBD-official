"use client"
import React from 'react';
import PageHeading from './PageHeading';
import { ProductType } from '@/Interfaces/productInterfaces';
import { CartItem } from '@/Interfaces/cartInterface';

interface CartContentProps {
  products: ProductType[] | null;
  contentType?: 'drawer' | 'page';
  cartItems:CartItem[]
}

const CartContent = ({ products, contentType = 'page' }: CartContentProps) => {
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
        <PageHeading title="Your Cart" subTitle="View and manage your favorite products" />
      )}

      <div
        className={`grid gap-4 ${
          contentType === 'drawer' ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
        }`}
      >
        {products.map((product) => (
            <div key={product?._id.toString()}> {product?.title}</div>
        ))}
      </div>
    </div>
  );
};

export default CartContent;
