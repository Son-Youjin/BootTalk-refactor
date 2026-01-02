"use client";

import { useState } from "react";
import { useGetChatList } from "@/hooks/chat/useGetChatList";
import { ChatRoom } from "@/types/response";
import Image from "next/image";
import { format } from "date-fns";
import { ko } from "date-fns/locale/ko";
import ChatRoomContainer from "@/components/feature/chat/ChatRoomContainer";
import { useUserStore } from "@/store/useUserStore";

// 상수 정의
const CHAT_STATUS = {
  ENDED: "종료",
  ONGOING: "진행 중",
  UPCOMING: "예정",
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return format(date, "yyyy-MM-dd HH:mm", { locale: ko });
};

const getStatusText = (chatRoom: ChatRoom) => {
  const now = new Date();
  const endAt = new Date(chatRoom.endAt);
  const reservationAt = new Date(chatRoom.reservationAt);

  if (endAt < now) return `종료일: ${formatDate(chatRoom.endAt)}`;
  if (reservationAt > now)
    return `예약일: ${formatDate(chatRoom.reservationAt)}`;
  return "현재 진행 중입니다.";
};

const ChatPage = () => {
  const { chatRoomList = [] } = useGetChatList();
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const userId = useUserStore((state) => state.user?.userId);

  const selectedChat = chatRoomList.find(
    (chat) => chat.roomUuid === selectedChatId
  );

  const handleChatSelect = (roomUuid: string) => {
    setSelectedChatId(roomUuid);
  };

  return (
    <div className="container mx-auto my-8 px-4">
      <h2 className="text-2xl font-bold mb-6">채팅</h2>
      <div className="flex flex-col md:flex-row h-[600px] gap-4">
        {/* 왼쪽: 채팅 목록 */}
        <div className="w-full h-[200px] md:h-full md:w-1/3 overflow-hidden border border-gray-100 rounded-lg shadow-sm">
          <div className="h-full overflow-y-auto">
            <h3 className="text-lg font-semibold mb-3 px-3 pt-3">채팅 목록</h3>
            {chatRoomList.length > 0 ? (
              <div className="space-y-2 px-2">
                {chatRoomList.map((chatRoom) => (
                  <div
                    key={chatRoom.roomUuid}
                    className={`p-3 rounded-lg shadow-sm border border-gray-300 hover:shadow-md  transition-all cursor-pointer ${
                      chatRoom.isActive
                        ? "bg-white"
                        : "bg-gray-50 text-gray-400"
                    } 
                    )}`}
                    onClick={() => handleChatSelect(chatRoom.roomUuid)}
                  >
                    <div className="flex items-between">
                      {/* 프로필 이미지 */}
                      <div className="w-10 h-10 mr-3 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={
                            chatRoom.mentee.userId === userId
                              ? chatRoom.mentor.profileImage ||
                                "/profile-default.png"
                              : chatRoom.mentee.profileImage ||
                                "/profile-default.png"
                          }
                          alt="프로필 이미지"
                          width={40}
                          height={40}
                          className="object-cover w-full h-full"
                          onClick={(e) => e.stopPropagation()}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/profile-default.png";
                          }}
                        />
                      </div>

                      {/* 텍스트 컨텐츠 */}
                      <div className="flex-1 min-w-0 w-full">
                        <div className="flex justify-between items-center w-full">
                          <h4 className="font-medium text-sm truncate">
                            {chatRoom.mentor.userId === userId
                              ? chatRoom.mentee.name
                              : chatRoom.mentor.name}
                          </h4>
                          <span
                            className={`text-xs flex-shrink-0 ml-auto ${
                              chatRoom.isActive
                                ? "text-blue-500"
                                : "text-gray-500"
                            }`}
                          >
                            {chatRoom.isActive
                              ? CHAT_STATUS.ONGOING
                              : new Date(chatRoom.endAt) < new Date()
                              ? CHAT_STATUS.ENDED
                              : CHAT_STATUS.UPCOMING}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1 truncate">
                          {getStatusText(chatRoom)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center py-8">
                <p className="text-gray-500">채팅 목록이 없습니다.</p>
              </div>
            )}
          </div>
        </div>

        {/* 오른쪽: 채팅방 */}
        <div className="w-full h-[400px] md:h-full md:w-2/3 overflow-hidden border border-gray-100 rounded-lg shadow-sm">
          {selectedChat ? (
            <ChatRoomContainer
              selectedChat={selectedChat}
              key={selectedChatId}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              채팅방을 선택해주세요.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
