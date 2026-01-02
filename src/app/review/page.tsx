"use client";

import SearchSection from "@/components/common/SearchSection";
import ReviewList from "@/components/feature/review/ReviewList";

export default function ReviewPage() {
  return (
    <>
      <SearchSection />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-1">부트캠프 리뷰 모음</h1>
              <p className="text-gray-500">수강생들의 생생한 이야기를 확인해보세요</p>
            </div>
          </div>
        </div>

        <main>
          <ReviewList />
        </main>
      </section>
    </>
  );
}
