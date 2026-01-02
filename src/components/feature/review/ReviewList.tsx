"use client";

import { useEffect, useRef, useMemo, useState } from "react";
import { useGetReviews } from "@/hooks/reviews/useGetReviews";
import ReviewItem from "./ReviewItem";
import ReviewFilterButtons from "@/components/feature/review/ReviewFilterButtons";
import type { Review as ResponseReview } from "@/types/response";


export default function ReviewList() {
  const [filters, setFilters] = useState<{ category?: string; date?: string }>({});
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useGetReviews(filters);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef(false);

  useEffect(() => {
    const target = observerRef.current;
    if (!target || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingRef.current) {
          loadingRef.current = true;
          fetchNextPage();
        }
      },
      { rootMargin: "300px", threshold: 0.1 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allReviews = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) ?? [];
  }, [data]);

  const totalCount = useMemo(() => allReviews.length, [allReviews]);

  if (isError) {
    return <p className="text-center text-red-500">리뷰를 불러오지 못했습니다.</p>;
  }

  if (isLoading) {
    return <p className="text-center">불러오는 중...</p>;
  }

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center flex-wrap gap-2 mt-10">
        <span className="text-sm text-gray-500 whitespace-nowrap mt-2 sm:mt-0">
          총 {totalCount}개
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          <ReviewFilterButtons selectedFilters={filters}
            onFilterChange={(key, value) =>
              setFilters(prev => ({ ...prev, [key]: value }))
        } />
        </div>
      </div>

      {allReviews.length > 0 ? (
        (allReviews as ResponseReview[]).map((review, idx) => (
          <ReviewItem key={`${review.reviewId}-${idx}`} review={review} />
        ))
      ) : (
        <p className="text-center py-4">등록된 리뷰가 없습니다.</p>
      )}

      <div ref={observerRef} className="h-32" />
      {isFetchingNextPage && (
        <p className="text-center py-4">더 많은 리뷰를 불러오는 중...</p>
      )}
    </section>
  );
}
