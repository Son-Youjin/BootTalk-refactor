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

const ReceivedListTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoffeeChat, setSelectedCoffeeChat] =
    useState<CoffeeChat | null>(null);

  const {
    data: receivedList,
    isLoading,
    isError,
  } = useQuery<CoffeeChat[]>({
    queryKey: ["receivedList"],
    queryFn: async () => {
      const response = await axiosDefault.get(END_POINT.RECEIVED_COFFEE_CHATS);
      return response.data.data;
    },
    staleTime: 0,
  });

  const {
    handleApprove,
    handleReject,
    handleCancel,
    isApproving,
    isRejecting,
    isCanceling,
    modalState,
    closeModal,
    confirmAction,
  } = useCoffeeChatActions("MENTOR");

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

  const isNow = new Date();

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

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
      {receivedList && receivedList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {receivedList.map((received) => (
            <div
              key={received.coffeeChatAppId}
              className="p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer"
              onClick={() => handleCoffeeChatClick(received)}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm truncate max-w-xs">
                  {received.content.length > 30
                    ? received.content.substring(0, 30) + "..."
                    : received.content}
                </h4>
                {received.status !== "PENDING" &&
                  getStatusBadge(received.status)}
              </div>
              <div className="flex items-center text-xs text-gray-500 gap-4 mb-2">
                <p>신청자: {received.menteeName}</p>
                <p>신청일: {formatDate(received.coffeeChatStartTime)}</p>
              </div>

              {/* 승인/거절 버튼 (PENDING 상태일 때만 표시) */}
              <div className="flex mt-2 space-x-2">
                {received.status === "PENDING" && (
                  <>
                    <button
                      className="btn btn-sm btn-active bg-amber-900 text-white"
                      onClick={(e) =>
                        handleApprove(received.coffeeChatAppId, e)
                      }
                    >
                      승인하기
                    </button>
                    <button
                      className="btn btn-sm btn-active"
                      onClick={(e) => handleReject(received.coffeeChatAppId, e)}
                    >
                      거절하기
                    </button>
                  </>
                )}

                {received.status === "APPROVED" &&
                  isNow < new Date(received.coffeeChatStartTime) && (
                    <button
                      className="btn btn-sm btn-active"
                      onClick={(e) =>
                        handleCancel(
                          received.coffeeChatAppId,
                          received.coffeeChatStartTime,
                          e
                        )
                      }
                    >
                      취소하기
                    </button>
                  )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center py-8">
          <p className="text-gray-500">받은 커피챗 신청이 없습니다.</p>
        </div>
      )}

      {/* 커피챗 상세 정보 모달 */}
      <CoffeeChatDetailModal
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
        isLoading={isApproving || isRejecting || isCanceling}
        userRole="MENTOR"
      />
    </div>
  );
};

export default ReceivedListTab;
