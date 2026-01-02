import {
  CalendarDays,
  Users,
  Repeat,
  DollarSign,
} from "lucide-react";
import type { BootcampDetail } from "@/types/response";
import DetailSectionCard from "./DetailSectionCard";

type BootcampScheduleProps = Pick<
  BootcampDetail,
  | "bootcampStartDate"
  | "bootcampEndDate"
  | "bootcampCapacity"
  | "bootcampDegree"
  | "bootcampCost"
>;

export default function BootcampSchedule({
  bootcampStartDate,
  bootcampEndDate,
  bootcampCapacity,
  bootcampDegree,
  bootcampCost,
}: BootcampScheduleProps) {

  const iconClass = "w-5 h-5 text-gray-500";
  const textClass = "text-base text-gray-800 font-medium"
  const valueClass = "text-gray-600";

  return (
    <DetailSectionCard title="일정 & 훈련 정보">
      <div className="space-y-4 text-sm sm:text-base">
        <div className="flex items-center gap-3">
          <CalendarDays className={iconClass} />
          <span className={textClass}>훈련 기간:</span>
          <span className={valueClass}>{bootcampStartDate} ~ {bootcampEndDate}</span>
        </div>

        <div className="flex items-center gap-3">
          <Users className={iconClass} />
          <span className={textClass}>총 정원:</span>
          <span className={valueClass}>{bootcampCapacity}명</span>
        </div>

        <div className="flex items-center gap-3">
          <Repeat className={iconClass} />
          <span className={textClass}>개설 회차:</span> 
          <span className={valueClass}>{bootcampDegree}회차</span>
        </div>

        <div className="flex items-center gap-3">
          <DollarSign className={iconClass} />
          <span className={textClass}>교육비:</span>
          <span className={valueClass}>{bootcampCost ? "유료" : "무료"}</span>
        </div>
      </div>
    </DetailSectionCard>

  );
}