import React, { useState } from "react";
import MentorProfileModal from "./MentorProfileModal";
import { useMentorList } from "@/hooks/coffee-chat/useMentorList";
import { Mentor } from "@/types/response";
import ChatRequestModal from "./ChatRequestModal";
import { mentorCategory } from "@/constants/mentorCategory";
import { jobCategoryMapping } from "@/constants/jobCategory";
import { useUserStore } from "@/store/useUserStore";
import { useRouter, useSearchParams } from "next/navigation";

const FindMentors = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [isChatModalOpen, setIsChatModalOpen] = useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const jobTypeFilter = searchParams.get("jobType") || "all";

  const { mentorList, isLoading, isError } = useMentorList(jobTypeFilter);

  const userId = useUserStore((state) => state.user?.userId) || 0;

  const handleMentorClick = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChatRequest = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setIsChatModalOpen(true);
  };

  const closeChatModal = () => {
    setIsChatModalOpen(false);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (value === "all") {
      router.push(window.location.pathname);
    } else {
      router.push(`?jobType=${value}`);
    }
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>에러가 발생했습니다.</div>;
  }

  return (
    <>
      <div className="mt-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
          <h3 className="text-lg font-semibold">멘토 리스트</h3>
          <div className="flex flex-warp gap-2">
            {/* 기타 옵션은 필요 시 추가 예정 */}
            <select
              value={jobTypeFilter}
              onChange={handleFilterChange}
              className="select rounded-lg"
            >
              <option value="all">모든 분야</option>
              <option value="FRONTEND">프론트엔드</option>
              <option value="BACKEND">백엔드</option>
              <option value="PM">PM</option>
              <option value="UIUX">UI/UX</option>
              <option value="DATA_ANALYSIS">데이터분석</option>
              <option value="ETC">기타</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mentorList?.map((mentor) => (
            <div
              key={mentor.mentorUserId}
              className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow h-full flex flex-col"
            >
              <div className="flex justify-between">
                <h4 className="font-semibold text-lg">{mentor.mentorName}</h4>
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    mentor.mentorType === "PROFESSIONAL"
                      ? "bg-gray-100 text-gray-800"
                      : "bg-gray-50 text-gray-700"
                  }`}
                >
                  {mentorCategory[mentor.mentorType] || mentor.mentorType}
                </span>
              </div>

              <div className="my-3">
                <span className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-lg">
                  {jobCategoryMapping[mentor.jobType] || mentor.jobType}
                </span>
              </div>

              <div className="space-y-2 mt-2 text-sm text-gray-600 flex-grow">
                <p className="flex justify-between">
                  <span>커피챗 비용:</span>
                  <span className="font-medium text-gray-800">
                    {mentor.mentorType === "PROFESSIONAL"
                      ? 3
                      : mentor.mentorType === "GRADUATE"
                      ? 2
                      : 1}{" "}
                    포인트
                  </span>
                </p>
              </div>

              <div className="flex space-x-2 mt-4">
                <button
                  className="btn flex-1 btn-soft rounded-lg"
                  onClick={() => handleMentorClick(mentor)}
                >
                  프로필 보기
                </button>
                <button
                  className="btn flex-1 btn-outline hover:text-amber-900 rounded-lg"
                  onClick={() => handleChatRequest(mentor)}
                  disabled={mentor.mentorUserId === userId}
                >
                  신청하기
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 프로필 상세보기 모달 */}
      {selectedMentor && (
        <MentorProfileModal
          isOpen={isModalOpen}
          onClose={closeModal}
          mentorProfile={selectedMentor}
        />
      )}

      {/* 커피챗 신청 모달 */}
      {isChatModalOpen && (
        <ChatRequestModal
          isOpen={true}
          onClose={closeChatModal}
          mentor={selectedMentor}
        />
      )}
    </>
  );
};

export default FindMentors;
