import { ProductType } from '@/Interfaces/productInterfaces';
import React from 'react';
import SafeImage from './SafeImage';
import RatingDisplay from './ui/RatingDisplay';
type ProductCardProps ={
    item:ProductType
}
const ProductCard = ({item}:ProductCardProps) => {

    return (
        <div>
            <div className="">
                <SafeImage src={item?.media[0]?.url} alt='ProductImage' width={200} height={200} ></SafeImage>
            </div>

            <h1>{item?.title}</h1>
            <p>{item?.price}</p>
            <RatingDisplay avgRating={item?.ratings?.avg} starSize={15}></RatingDisplay>
            
        </div>
    );
};

export default ProductCard;