import Modal from "@/components/common/modal/CommonModal";
import { jobCategoryMapping } from "@/constants/jobCategory";
import { Mentor } from "@/types/response";
import { Briefcase, Coffee, Info, User } from "lucide-react";
import React from "react";

interface MentorProfileModalProps {
  mentorProfile: Mentor;
  isOpen: boolean;
  onClose: () => void;
}

const MentorProfileModal: React.FC<MentorProfileModalProps> = ({
  isOpen,
  onClose,
  mentorProfile,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" title="멘토 프로필">
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <User size={20} />
          <div>
            <p className="text-gray-500">이름</p>
            <p className="font-semibold text-gray-800">
              {mentorProfile.mentorName}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Briefcase size={20} />
          <div>
            <p className="text-gray-500">직군</p>
            <p className="font-medium text-gray-700">
              {jobCategoryMapping[mentorProfile.jobType] ||
                mentorProfile.jobType}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Coffee size={20} />
          <div>
            <p className="text-gray-500">커피챗 비용</p>
            <p className="font-medium text-gray-700">
              {mentorProfile.mentorType === "PROFESSIONAL"
                ? 3
                : mentorProfile.mentorType === "GRADUATE"
                ? 2
                : 1}{" "}
              포인트
            </p>
          </div>
        </div>

        {/* 소개 영역 */}
        <div className="border-t pt-4">
          <div className="flex items-start space-x-3">
            <Info size={20} />
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-2">소개</p>
              <textarea
                className="w-full min-h-[120px] bg-gray-50 border border-gray-300 rounded-md p-3 text-gray-800 text-sm resize-none leading-relaxed"
                value={mentorProfile.introduction}
                readOnly
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MentorProfileModal;
