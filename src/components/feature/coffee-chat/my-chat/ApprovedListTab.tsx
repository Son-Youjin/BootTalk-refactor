"use client";

import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { CoffeeChat } from "@/types/response";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import CoffeeChatDetailModal from "./CoffeeChatDetailModal";
import { format } from "date-fns";
import { ko } from "date-fns/locale/ko";

const ApprovedListTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoffeeChat, setSelectedCoffeeChat] =
    useState<CoffeeChat | null>(null);

  const {
    data: approvedList,
    isLoading,
    isError,
  } = useQuery<CoffeeChat[]>({
    queryKey: ["approvedList"],
    queryFn: async () => {
      const response = await axiosDefault.get(END_POINT.APPROVED_COFFEE_CHATS);
      return response.data.data;
    },
    staleTime: 0,
  });

  const handleCoffeeChatClick = (coffeechat: CoffeeChat) => {
    setSelectedCoffeeChat(coffeechat);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
      {approvedList && approvedList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {approvedList.map((approved) => (
            <div
              key={approved.coffeeChatAppId}
              className="p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer"
              onClick={() => handleCoffeeChatClick(approved)}
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-sm">{approved.content}</h4>
                <span className="px-2 py-0.5 text-xs font-medium rounded whitespace-nowrap bg-amber-50 text-amber-800">
                  승인됨
                </span>
              </div>
              <div className="flex items-center text-xs text-gray-500 gap-4">
                <p className="text-xs text-gray-600">
                  멘토: {approved.mentorName}
                </p>
                <p className="text-xs text-gray-500">
                  신청일: {formatDate(approved.coffeeChatStartTime)}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center py-8">
          <p className="text-gray-500">승인된 커피챗이 없습니다.</p>
        </div>
      )}

      {/* 커피챗 상세 정보 모달 */}
      <CoffeeChatDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        coffeeChat={selectedCoffeeChat}
      />
    </div>
  );
};

export default ApprovedListTab;
