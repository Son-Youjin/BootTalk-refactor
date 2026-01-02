"use client";

import { useEffect, useRef } from "react";
import { useGetBootcamps } from "@/hooks/main-page/useGetBootcamps";
import BootcampCard from "./BootcampCard";

interface BootcampListProps {
  filters: Record<string, string>;
}

const BootcampList = ({ filters }: BootcampListProps) => {
  const { bootcamps, fetchNextPage, hasNextPage, isLoading, isError } =
    useGetBootcamps(filters);

  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, bootcamps.length]);

  if (isLoading && bootcamps.length === 0)
    return <div className="text-center py-8">로딩 중...</div>;
  if (isError)
    return (
      <div className="text-center py-8 text-red-500">
        데이터를 불러오는데 실패했습니다.
      </div>
    );
  if (!bootcamps || bootcamps.length === 0)
    return <div className="text-center py-8">검색 결과가 없습니다.</div>;

  return (
    <section className="max-w-[1200px] mx-auto px-4 md:px-6">
      <div className="hidden lg:grid grid-cols-6 gap-4 px-4 py-2 font-semibold text-sm text-gray-600 border-b border-t border-slate-300 bg-slate-50">
        <span>교육과정 명</span>
        <span className="flex justify-start pl-4">학습기간</span>
        <span className="flex justify-start pl-10">프로그램 과정</span>
        <span className="flex justify-start pl-16">지역</span>
        <span className="flex justify-start pl-10">정원</span>
        <span>평점 및 리뷰</span>
      </div>

      {/* 모바일 전용 */}
      <div className="sm:hidden px-4 pt-4 pb-2 border-b border-gray-300 mb-4">
        <h1 className="text-gray-800 text-2xl font-bold">교육과정 리스트</h1>
        <p className="text-gray-600 text-sm mt-1">
          나에게 맞는 부트캠프를 비교하고 찾아보세요.
        </p>
      </div>

      <ul>
        {bootcamps.map((bootcamp, index) => (
          <li key={`${bootcamp.bootcampId}-${index}`}>
            <BootcampCard {...bootcamp} />
          </li>
        ))}
      </ul>

      {/* 무한 스크롤 감지 */}
      <div ref={observerRef} className="py-4 text-center">
        {hasNextPage && (
          <div className="w-8 h-8 mx-auto border-t-2 border-b-2 border-amber-950 rounded-full animate-spin"></div>
        )}
      </div>
    </section>
  );
};

export default BootcampList;
