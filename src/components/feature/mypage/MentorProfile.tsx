import Modal from "@/components/common/modal/CommonModal";
import { dayMapping } from "@/constants/dayMapping";
import useMentorRegistration from "@/hooks/coffee-chat/useMentorRegistration";
import React, { useState } from "react";
import MentorFormModal from "../coffee-chat/MentorFormModal";
import { TimeSlot } from "@/types/request";
import { jobCategoryMapping } from "@/constants/jobCategory";
import { mentorCategory } from "@/constants/mentorCategory";

const MentorProfile = () => {
  const {
    mentorData,
    deleteMentorMutation,
    isDeletePending,
    isLoading,
    isMentorExists,
  } = useMentorRegistration();

  console.log("멘토 정보:", mentorData);

  // 삭제 모달 상태
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // 수정 모달 상태
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // 삭제 성공 상태
  const [isDeleted, setIsDeleted] = useState(false);

  const reverseDayMapping: Record<string, string> = Object.fromEntries(
    Object.entries(dayMapping).map(([ko, en]) => [en, ko])
  );

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    deleteMentorMutation.mutate(undefined, {
      onSuccess: () => {
        setIsDeleted(true);
        setIsDeleteModalOpen(false);
      },
    });
  };

  const handleCloseModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">멘토 정보를 불러오고 있습니다...</div>
    );
  }
  console.log("삭제:", isDeleted);
  console.log("멘토정보있어:", isMentorExists);

  // 멘토 정보가 없거나 삭제된 경우
  if (!isMentorExists || isDeleted) {
    return (
      <div className="text-center  bg-base-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 mt-6">
          멘토 정보가 없습니다
        </h2>
        <p className="text-gray-600 mb-6">
          아직 멘토로 등록하지 않았거나 정보가 삭제되었습니다.
        </p>
        <button
          className="btn bg-amber-900 hover:bg-amber-950 text-white font-medium transition-colors"
          onClick={handleEditClick}
        >
          멘토 등록
        </button>
        <MentorFormModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          mode="create"
        />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h3 className="font-medium text-gray-900 mb-2">기본 정보</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-base-200 p-4 rounded-lg">
            <p className="text-sm text-gray-500">멘토 유형</p>
            <p className="text-sm">
              {mentorCategory[mentorData.info.mentorType] ||
                mentorData.info.mentorType}
            </p>
          </div>
          <div className="bg-base-200 p-4 rounded-lg">
            <p className="text-sm text-gray-500">직무 분야</p>
            <p className="text-sm">
              {jobCategoryMapping[mentorData.info.jobType] ||
                mentorData.info.jobType}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium text-gray-900 mb-2">멘토 소개글</h3>
        <div className="bg-base-200 p-4 rounded-lg max-h-40 overflow-y-auto">
          <p className="whitespace-pre-line text-sm">
            {mentorData.info.introduction}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium text-gray-900 mb-2">상담 가능 시간</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(mentorData.time as TimeSlot).map(([day, times]) => (
            <div key={day} className="bg-base-200 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">
                {reverseDayMapping[day]}요일
              </p>

              <div className="flex flex-wrap gap-2">
                {times.map((time: string, index: string) => (
                  <span
                    key={index}
                    className="bg-white text-amber-800 text-xs px-3 py-1 rounded-full border border-gray-200"
                  >
                    {time}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end mt-6 space-x-3">
        <button
          className="btn btn-outline"
          disabled={isDeletePending}
          onClick={handleDeleteClick}
        >
          {isDeletePending ? "삭제 중..." : "멘토 삭제"}
        </button>
        <button
          className="btn bg-amber-900 hover:bg-amber-950 text-white font-medium transition-colors"
          onClick={handleEditClick}
        >
          프로필 수정
        </button>
      </div>

      {/* 삭제 확인 모달 */}
      {mentorData && (
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseModal}
          title="멘토 프로필 삭제"
        >
          <p>정말로 삭제하시겠습니까?</p>
          <div className="flex justify-end space-x-3">
            <button
              className="btn btn-outline"
              onClick={handleCloseModal}
              disabled={isDeletePending}
            >
              취소
            </button>
            <button
              className="btn"
              onClick={handleDeleteConfirm}
              disabled={isDeletePending}
            >
              삭제하기
            </button>
          </div>
        </Modal>
      )}

      {/* 수정 모달 */}
      {mentorData && (
        <MentorFormModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          initialData={mentorData}
          mode="edit"
        />
      )}
    </div>
  );
};

export default MentorProfile;
