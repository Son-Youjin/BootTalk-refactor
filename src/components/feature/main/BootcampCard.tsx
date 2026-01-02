"use client";

import { useRouter } from "next/navigation";
import type { Bootcamp } from "@/types/response";
import BootcampMobile from "./BootcampMobile";
import clsx from "clsx";
import { Star } from "lucide-react";

const BootcampCard = ({
  bootcampId,
  trainingCenterName,
  bootcampName,
  bootcampRegion,
  bootcampStartDate,
  bootcampEndDate,
  bootcampCategory,
  bootcampCapacity,
  courseAverageRating,
  courseReviewCount,
  trainingCenterUrl,
}: Bootcamp) => {
  const router = useRouter();
  const primaryRegion = bootcampRegion.split(" ")[0];

  const wrapperClass = clsx(
    "relative bg-white text-sm transition-colors",
    "flex flex-col lg:grid lg:grid-cols-6 lg:items-center",
    "px-4 py-3 sm:pb-4 gap-2 lg:gap-4",
    "border border-base-200 rounded-xl shadow-sm",
    "hover:shadow-md hover:bg-white",
    "lg:rounded-none lg:shadow-none lg:border-0 lg:border-b lg:border-base-300",
    "lg:hover:shadow-none lg:hover:bg-gray-50",
    "cursor-pointer"
  );

  return (
    <div
      className={clsx(wrapperClass, "mb-3 md:mb-4 lg:mb-0")}
      onClick={() => router.push(`/bootcamps/${bootcampId}`)}
    >
      {/* 교육 기관명 + 교육 과정명 */}
      <div className="flex flex-col">
        <span className="text-xs text-gray-500">{trainingCenterName}</span>
        <span className="text-sm leading-snug font-semibold line-clamp-2 break-words text-ellipsis overflow-hidden">
          {bootcampName}
        </span>
      </div>

      {/* 학습 기간 */}
      <div>
        <p className="text-sm whitespace-nowrap sm:whitespace-normal break-words pl-4">
          {bootcampStartDate} <wbr />~ <wbr />
          {bootcampEndDate}
        </p>
      </div>

      {/* 프로그램 과정 */}
      <div className="hidden lg:flex justify-start pl-10">
        <span className="px-2 py-1 bg-gray-100 rounded whitespace-nowrap overflow-hidden text-ellipsis">
          {bootcampCategory}
        </span>
      </div>

      {/* 지역 */}
      <div className="hidden lg:flex justify-start pl-16">
        <span className="px-2 py-1 bg-gray-100 rounded whitespace-nowrap overflow-hidden text-ellipsis">
          {primaryRegion}
        </span>
      </div>

      {/* 정원 */}
      <div className="hidden lg:flex justify-start pl-10">
        {bootcampCapacity}명
      </div>

      <BootcampMobile
        category={bootcampCategory}
        region={primaryRegion}
        capacity={bootcampCapacity}
      />

      {/* 평점 및 리뷰 */}
      <div className="flex items-center gap-1 text-xs text-gray-600">
        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        {courseAverageRating.toFixed(1)} | {courseReviewCount}개의 리뷰
      </div>

      {/* 태블릿 전용 홈페이지 버튼 */}
      <a
        href={trainingCenterUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          "hidden md:inline-block lg:hidden absolute right-4 top-1/2 -translate-y-1/2 z-30",
          "text-sm px-4 py-2 rounded-full bg-gray-100 hover:bg-amber-900 hover:text-white border-none",
          "transition-colors duration-200"
        )}
      >
        홈페이지 바로 가기
      </a>
    </div>
  );
};

export default BootcampCard;
