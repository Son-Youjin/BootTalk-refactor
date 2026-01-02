import React from "react";

import {
  Calendar,
  Clock,
  MessageCircle,
  User,
  AlertCircle,
} from "lucide-react";
import { CoffeeChat } from "@/types/response";
import Modal from "@/components/common/modal/CommonModal";
import { getStatusBadge } from "./getStatusBadge";
import { format } from "date-fns";
import { ko } from "date-fns/locale/ko";

interface CoffeeChatDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  coffeeChat: CoffeeChat | null;
  isSent?: boolean; // 보낸 커피챗인지 여부 (기본값: false)
}

/**
 * 커피챗 상세 정보 모달 컴포넌트
 * 확정 커피챗, 받은 커피챗 및 보낸 커피챗 모두 사용 가능
 */
const CoffeeChatDetailModal: React.FC<CoffeeChatDetailModalProps> = ({
  isOpen,
  onClose,
  coffeeChat,
  isSent = false, // 기본값: false
}) => {
  if (!coffeeChat) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "yyyy-MM-dd", { locale: ko });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "HH:mm", { locale: ko });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" title="커피챗 상세 정보">
      <div className="space-y-4">
        {/* 상태 뱃지 */}
        <div className="flex items-center">
          <AlertCircle size={18} className="mr-2 " />
          <span className="mr-2 font-medium">상태:</span>
          {getStatusBadge(coffeeChat.status)}
        </div>

        {/* 신청자/주최자 정보 */}
        <div className="flex items-center">
          <User size={18} className="mr-2 " />
          <span className="mr-2 font-medium">
            {isSent ? "멘토" : "신청자"}:
          </span>
          <span>{isSent ? coffeeChat.mentorName : coffeeChat.menteeName}</span>
        </div>

        {/* 날짜 및 시간 정보 */}
        <div className="flex items-center">
          <Calendar size={18} className="mr-2 " />
          <span className="mr-2 font-medium">신청 일시:</span>
          <span>{formatDate(coffeeChat.coffeeChatStartTime)}</span>
        </div>

        <div className="flex items-center">
          <Clock size={18} className="mr-2 " />
          <span className="mr-2 font-medium">신청 시간:</span>
          <span>{formatTime(coffeeChat.coffeeChatStartTime)}</span>
        </div>

        {/* 메시지 */}
        <div className="mt-4">
          <div className="flex items-center mb-2">
            <MessageCircle size={18} className="mr-2 self-start" />
            <span className="mr-2 font-medium whitespace-nowrap self-start">
              메시지:
            </span>
            <textarea
              className="bg-gray-50 border border-gray-400 w-full h-24 rounded-sm px-2 overflow-auto "
              value={coffeeChat.content}
              readOnly
            ></textarea>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CoffeeChatDetailModal;
