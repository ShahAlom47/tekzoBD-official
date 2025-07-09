"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getReviewByProductId } from "@/lib/allApiRequest/reviewRequest/reviewRequest";
import { ReviewsType } from "@/Interfaces/reviewInterfaces";

interface ReviewListProps {
  productId: string;
}

const ReviewList: React.FC<ReviewListProps> = ({ productId }) => {
  const {
    data: reviews = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reviews", productId],
    queryFn: async() => {
        const res =await getReviewByProductId(productId)
        return res?.data as ReviewsType[]
    },
    enabled: !!productId,
  });

  if (isLoading) return <p>Loading reviews...</p>;
  if (error) return <p>Failed to load reviews.</p>;

  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-xl font-semibold"> Reviews( {reviews?.length})</h2>
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
      ) : (
        <ul className="space-y-3">
          {reviews.map((review) => (
            <li
              key={review._id}
              className="border p-4 rounded shadow-sm bg-white"
            >
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium">{review.userName|| "User Name"}</p>
                <div className="text-yellow-500 text-sm">
                  {"★".repeat(review.rating ?? 0) + "☆".repeat(5 - (review.rating ?? 0))}
                </div>
              </div>
              <p className="text-sm text-gray-700">{review.comment}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(review.createdAt ?? "").toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewList;
