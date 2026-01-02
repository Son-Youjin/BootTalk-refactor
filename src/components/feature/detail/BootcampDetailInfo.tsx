import { Phone, Mail, MapPin, LinkIcon } from "lucide-react";
import type { BootcampDetail } from "@/types/response";
import DetailSectionCard from "./DetailSectionCard";

type BootcampDetailInfoProps = Pick<
  BootcampDetail,
  | "trainingCenterName"
  | "trainingCenterAddress"
  | "trainingCenterPhoneNumber"
  | "trainingCenterEmail"
  | "trainingCenterUrl"
>;

export default function BootcampDetailInfo({
  trainingCenterName,
  trainingCenterAddress,
  trainingCenterPhoneNumber,
  trainingCenterEmail,
  trainingCenterUrl,
}: BootcampDetailInfoProps) {

  const iconClass = "w-5 h-5 text-gray-500";

  return (
    <DetailSectionCard title="교육기관 정보">
      <div className="relative flex flex-col sm:flex-row justify-between items-center sm:items-center gap-4 sm:gap-2">
        {/* 왼쪽 텍스트 영역 */}
        <div className="space-y-2 text-base sm:text-base text-gray-600 w-full sm:pr-6">
          {/* 모바일에선 링크, 데스크탑에선 일반 텍스트 */}
          <div className="flex items-center gap-2">
            <a
              href={trainingCenterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg sm:text-xl text-gray-800 font-bold hover:underline break-words"
            >
              {trainingCenterName}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className={iconClass} />
            <span>{trainingCenterAddress}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className={iconClass} />
            <span>{trainingCenterPhoneNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className={iconClass} />
            <span>{trainingCenterEmail}</span>
          </div>
        </div>

        <a
          href={trainingCenterUrl}
          title={`${trainingCenterName} 홈페이지 바로가기`}
          target="_blank"
          rel="noopener noreferrer"
          className="sm:mt-0 sm:ml-6 shrink-0"
        >
          <button className="btn btn-outline btn-base flex items-center gap-1 border-none bg-gray-100 hover:bg-gray-300 transition-colors rounded-full whitespace-nowrap">
            <LinkIcon className="w-4 h-4" />
            홈페이지 바로가기
          </button>
        </a>
      </div>
    </DetailSectionCard>
  );
}
