import { Star } from "lucide-react";
import type { Review } from "@/types/response";

interface ReviewItemProps {
  review: Review;
}

export default function ReviewItem({ review }: ReviewItemProps) {
  const renderStars = () => (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-2 p-4 sm:p-5 bg-white text-amber-950 border border-gray-100 rounded-xl shadow-md text-sm sm:text-base">
      <div className="flex-1 space-y-2">
        {/* 모바일 - 이름, 별점 한 줄 */}
        <div className="flex items-center gap-2 sm:hidden">
          <p className="font-semibold text-sm">{review.userName}</p>
          {renderStars()}
          <span className="text-[11px] text-gray-400">{review.createdAt}</span>
        </div>

        {/* 데스크탑 별점 */}
        <div className="hidden sm:block">
          <p className="font-semibold text-base">{review.userName}</p>
          <div className="mt-1 flex items-center gap-1">
            {renderStars()}
            <span className="text-xs text-gray-400 ml-1">{review.createdAt}</span>
          </div>
        </div>

        <p className="whitespace-pre-wrap text-gray-700">{review.content}</p>
      </div>

      <button
        onClick={() => alert("신고 접수 기능은 준비 중입니다.")}
        className="self-end sm:self-start text-xs sm:text-sm text-gray-400 hover:text-red-400 mt-2 sm:mt-0 whitespace-nowrap"
      >
        신고하기
      </button>
    </div>
  );
}
