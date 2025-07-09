import React from 'react';
import ReviewForm from './ReviewForm';
import { ProductType } from '@/Interfaces/productInterfaces';
import ReviewList from './ReviewList';
type ReviewContentType ={
    product:ProductType
}

const ReviewContent =async ({product}:ReviewContentType) => {

   
    return (
        <div>
            <ReviewList productId={product?._id.toString()}></ReviewList>
            <ReviewForm productId={product?._id.toString()}></ReviewForm>
            
        </div>
    );
};

export default ReviewContent;