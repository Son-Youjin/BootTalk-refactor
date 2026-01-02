"use client";

import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { CoffeeChat } from "@/types/response";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import CoffeeChatDetailModal from "./CoffeeChatDetailModal";
import { getStatusBadge } from "./getStatusBadge";
import { useCoffeeChatActions } from "@/hooks/coffee-chat/useCoffeeChatActions";
import CoffeeChatActionModal from "./CoffeeChatActionModal";
import { format } from "date-fns";
import { ko } from "date-fns/locale/ko";

const SentListTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoffeeChat, setSelectedCoffeeChat] =
    useState<CoffeeChat | null>(null);

  const {
    data: sentList,
    isLoading,
    isError,
  } = useQuery<CoffeeChat[]>({
    queryKey: ["sentList"],
    queryFn: async () => {
      const response = await axiosDefault.get(END_POINT.SENT_COFFEE_CHATS);
      return response.data.data;
    },
    staleTime: 0,
  });

  const { handleCancel, isCanceling, modalState, closeModal, confirmAction } =
    useCoffeeChatActions("MENTEE");

  const handleCoffeeChatClick = (coffeechat: CoffeeChat) => {
    setSelectedCoffeeChat(coffeechat);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 날짜 포맷 헬퍼 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "yyyy-MM-dd HH:mm", { locale: ko });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const isNow = new Date();

  if (isError) {
    return (
      <div className="mt-4 p-4 bg-red-50 rounded-lg text-center">
        <p className="text-red-500">
          데이터를 불러오는 중 오류가 발생했습니다.
        </p>
        <button
          className="mt-2 text-sm text-blue-500 hover:underline"
          onClick={() => window.location.reload()}
        >
          새로고침
        </button>
      </div>
    );
  }

  return (
    <div className="mt-4">
      {sentList && sentList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {sentList.map((sent) => (
            <div
              key={sent.coffeeChatAppId}
              className="p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer"
              onClick={() => handleCoffeeChatClick(sent)}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm truncate max-w-xs">
                  {sent.content.length > 30
                    ? sent.content.substring(0, 30) + "..."
                    : sent.content}
                </h4>
                {getStatusBadge(sent.status)}
              </div>
              <div className="flex items-center text-xs text-gray-500 gap-4 mb-2">
                <p>멘토: {sent.mentorName}</p>
                <p>신청일: {formatDate(sent.coffeeChatStartTime)}</p>
              </div>
              {(sent.status === "APPROVED" ||
                (sent.status === "PENDING" &&
                  isNow < new Date(sent.coffeeChatStartTime))) && (
                <button
                  className="btn btn-soft btn-sm"
                  onClick={(e) =>
                    handleCancel(
                      sent.coffeeChatAppId,
                      sent.coffeeChatStartTime,
                      e
                    )
                  }
                >
                  {isCanceling ? "처리 중..." : "취소하기"}
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center py-8">
          <p className="text-gray-500">보낸 커피챗 신청이 없습니다.</p>
        </div>
      )}

      {/* 커피챗 상세 정보 모달 */}
      <CoffeeChatDetailModal
        isSent={true}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        coffeeChat={selectedCoffeeChat}
      />

      {/* 확인 모달 렌더링 */}
      <CoffeeChatActionModal
        isOpen={modalState.isOpen}
        actionType={modalState.actionType}
        isPenalty={modalState.isPenalty}
        onClose={closeModal}
        onConfirm={confirmAction}
        isLoading={isCanceling}
        userRole="MENTEE"
      />
    </div>
  );
};

export default SentListTab;
