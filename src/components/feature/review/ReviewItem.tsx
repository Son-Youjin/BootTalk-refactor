"use client";

import { Star } from "lucide-react";
import type { Review } from "@/types/response";

interface ReviewItemProps {
  review: Review;
}

export default function ReviewItem({ review }: ReviewItemProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="relative bg-white p-4 rounded-lg shadow border border-gray-200 hover:bg-gray-50 transition-colors">
      <button className="absolute top-3 right-4 text-xs text-gray-400 hover:text-gray-600">
        신고하기
      </button>

      <h2 className="text-sm font-semibold text-gray-800 leading-snug mb-1 pr-14 line-clamp-2 break-keep">
        {review.courseName}
      </h2>

      <p className="text-xs text-gray-500 mb-2">{review.userName}</p>

      <div className="flex items-center gap-1 mb-2">
        {renderStars(review.rating)}
      </div>

      <p className="text-sm text-gray-700 whitespace-pre-wrap break-keep">
        {review.content}
      </p>
    </div>
  );
}
