"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getReviewByProductId } from "@/lib/allApiRequest/reviewRequest/reviewRequest";
import { ReviewsType } from "@/Interfaces/reviewInterfaces";
import { formatDistanceToNow } from "date-fns";
import { useUser } from "@/hooks/useUser";

interface ReviewListProps {
  productId: string;
}

const ReviewList: React.FC<ReviewListProps> = ({ productId }) => {
  const { user } = useUser();
  const currentEmail = user?.email;
  const currentRole = user?.role;

  const [showAll, setShowAll] = useState(false);

  const {
    data: reviews = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reviews", productId],
    queryFn: async () => {
      const res = await getReviewByProductId(productId);
      return res?.data as ReviewsType[];
    },
    enabled: !!productId,
  });

  const handleDelete = async (reviewId: string) => {
    const confirm = window.confirm("Are you sure you want to delete this review?");
    if (!confirm) return;
    try {
      // await deleteReview(reviewId);
      console.log("Deleting review ID:", reviewId);
    } catch (err) {
      console.error("Failed to delete review:", err);
    }
  };

  const handleEdit = (review: ReviewsType) => {
    console.log("Editing review:", review);
  };

  if (isLoading) return <p>Loading reviews...</p>;
  if (error) return <p>Failed to load reviews.</p>;

  const visibleReviews = showAll ? reviews : reviews.slice(0, 4);

  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-xl font-semibold">Reviews ({reviews.length})</h2>

      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
      ) : (
        <>
          <ul className="space-y-3">
            {visibleReviews.map((review) => {
              const isOwner = review.userEmail === currentEmail;
              const isAdmin = currentRole === "admin";

              return (
                <li
                  key={review._id}
                  className="border p-4 rounded shadow-sm bg-white"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-medium">
                        {review.userName || "User Name"}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatDistanceToNow(new Date(review.createdAt ?? ""), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                    <div className="text-yellow-500 text-sm">
                      {"★".repeat(review.rating ?? 0) +
                        "☆".repeat(5 - (review.rating ?? 0))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mt-2">{review.comment}</p>

                  {(isOwner || isAdmin) && (
                    <div className="mt-2 flex gap-3 text-xs">
                      {isOwner && (
                        <button
                          onClick={() => handleEdit(review)}
                          className="text-blue-500 hover:underline"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => {
                          if (review._id) handleDelete(review._id.toString());
                        }}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {reviews.length > 4 && !showAll && (
            <div className="pt-2 text-center">
              <button
                onClick={() => setShowAll(true)}
                className="text-sm text-blue-600 hover:underline"
              >
                See More Reviews
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ReviewList;
