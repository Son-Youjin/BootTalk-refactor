import { useGetMessages } from "@/hooks/chat/useGetMessages";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useUserStore } from "@/store/useUserStore";
import { ChatRoom } from "@/types/response";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

interface ChatRoomPageProps {
  selectedChat: ChatRoom;
}

export interface ChatMessage {
  id?: number;
  roomUuid: string;
  senderId: number;
  senderName: string;
  receiverId: number;
  content: string;
  type: string;
}

const ChatRoomContainer = ({ selectedChat }: ChatRoomPageProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isPartnerTyping, setIsPartnerTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const userId = useUserStore((state) => state.user?.userId) || 0;
  const amIMentee = selectedChat.mentee.userId === userId;
  const mentorName = selectedChat.mentor.name;
  const menteeName = selectedChat.mentee.name;

  const TYPING_TIMEOUT = 3000;

  const { previousMessages, isLoading } = useGetMessages(selectedChat.roomUuid);

  const { sendMessage, sendTypingStatus, connected } = useWebSocket({
    roomUuid: selectedChat.roomUuid,
    userId: userId.toString(),
    onMessage: (receivedData: ChatMessage | ChatMessage[]) => {
      // 서버에서 단일 메시지 또는 메시지 배열을 받을 수 있도록 처리
      if (Array.isArray(receivedData)) {
        // 메시지 배열을 받았을 경우 (초기 로드 시 전체 메시지 히스토리)
        console.log("받은 메시지 히스토리:", receivedData);
        setMessages(receivedData);
        setIsInitialized(true);
      } else {
        console.log("받은 새 메시지:", receivedData);
        // 타이핑 상태 메세지인 경우 처리
        if (receivedData.hasOwnProperty("typing")) {
          const typingData = receivedData as unknown as {
            roomUuid: string;
            typing: boolean;
            receiverId: number;
          };
          console.log("타이핑 상태 메시지:", typingData);
          if (typingData.receiverId === userId) {
            console.log(
              `상대방 타이핑 상태 변경: ${
                typingData.typing ? "입력 중" : "입력 중지"
              }`
            );
            setIsPartnerTyping(typingData.typing);
          }
          return;
        }
        // 단일 메시지를 받았을 경우 (새 메시지)
        setMessages((prev) => [...prev, receivedData]);
      }
    },
    isActive: selectedChat.isActive,
  });

  useEffect(() => {
    if (
      !selectedChat.isActive &&
      previousMessages &&
      previousMessages.length > 0
    ) {
      console.log("종료된 채팅방에서 이전 메시지 사용:", previousMessages);
      setMessages(previousMessages);
      setIsInitialized(true);
    }
  }, [selectedChat.roomUuid, selectedChat.isActive, previousMessages]);

  // 새 메시지가 추가될 때마다 스크롤을 아래로 이동
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isInitialized, isPartnerTyping]);

  useEffect(() => {
    const timeoutId = typingTimeoutRef.current;
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const getRemainingMinutes = (endStr: string) => {
    const now = new Date();
    const end = new Date(endStr);
    const diff = end.getTime() - now.getTime();
    return Math.floor(diff / (1000 * 60));
  };

  // 메세지 입력 처리 함수
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMessage = e.target.value;
    setMessage(newMessage);

    if (!selectedChat.isActive) return;
    // 상대방 ID 계산
    const receiverId = amIMentee
      ? selectedChat.mentor.userId
      : selectedChat.mentee.userId;

    // 입력값이 있을 때만 타이핑 상태 전송
    if (newMessage.trim()) {
      console.log("타이핑 중 상태 전송 -> 상대방 ID:", receiverId);
      // 타이핑 중이라고 알림
      sendTypingStatus(receiverId, true);

      // 이전 타이머가 있으면 취소
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // 일정 시간 동안 타이핑이 없으면 타이핑 중지 상태로 변경
      typingTimeoutRef.current = setTimeout(() => {
        console.log("타이핑 타임아웃: 타이핑 중지 상태 전송");
        sendTypingStatus(receiverId, false);
      }, TYPING_TIMEOUT);
    } else {
      // 입력값이 없으면 타이핑 상태 해제
      console.log("입력값이 없음: 타이핑 중지 상태 전송");
      sendTypingStatus(receiverId, false);

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    }
  };

  // 메시지 전송 함수
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === "" || !selectedChat) return;

    const receiverId = amIMentee
      ? selectedChat.mentor.userId
      : selectedChat.mentee.userId;

    const msg = {
      roomUuid: selectedChat.roomUuid,
      senderId: userId,
      senderName: amIMentee
        ? selectedChat.mentee.name
        : selectedChat.mentor.name,
      receiverId: receiverId,
      content: message,
      type: "TEXT",
    };

    if (!selectedChat.isActive) {
      toast.error("종료된 채팅방에서는 메시지를 보낼 수 없습니다.");
      return;
    }

    if (connected) {
      sendMessage(msg);
      console.log("보낸 메세지:", msg);
    } else {
      toast.error("메세지 전송 실패");
      console.error("WebSocket 연결이 끊어졌습니다.");
    }
    // 화면 내 메시지 표시
    setMessages((prev) => [...prev, msg]);

    // 입력창 초기화
    setMessage("");

    // 메시지를 보냈으니 타이핑 상태 해제
    sendTypingStatus(receiverId, false);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-lg border border-gray-100 shadow-sm">
      {/* 채팅방 헤더 */}
      <div className="p-3 border-b flex justify-between items-center">
        <div>
          <h3 className="font-medium">{amIMentee ? mentorName : menteeName}</h3>
        </div>
        <div className="text-xs text-gray-500">
          {getRemainingMinutes(selectedChat.endAt) > 0
            ? `${getRemainingMinutes(selectedChat.endAt)}분 남음`
            : "종료"}
        </div>
      </div>

      {/* 채팅 메시지 영역 */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {!isInitialized && !messages.length && isLoading ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">메시지를 불러오는 중...</p>
          </div>
        ) : (
          <>
            {messages.map((msg, index) => {
              if (msg.type === "SYSTEM") {
                return (
                  <div
                    key={msg.id || `msg-${index}`}
                    className="flex justify-center my-4"
                  >
                    <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">
                      {msg.content}
                    </div>
                  </div>
                );
              }
              return (
                <div
                  key={msg.id || `msg-${index}`}
                  className={`mb-3 ${
                    msg.senderId === Number(userId) ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block max-w-xs sm:max-w-sm rounded-lg p-2 ${
                      msg.senderId === Number(userId)
                        ? "bg-blue-500 text-white"
                        : "bg-white border border-gray-200"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              );
            })}

            {/* 스크롤 위치를 위한 빈 div 요소 */}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* 메시지 입력 영역 */}
      <form onSubmit={handleSendMessage} className="px-3 pt-4 border-t flex">
        <input
          type="text"
          className="flex-1 border rounded-l-lg px-3 py-2 disabled:opacity-40"
          placeholder="메시지를 입력"
          value={message}
          onChange={handleInputChange}
          disabled={
            !selectedChat.isActive || (selectedChat.isActive && !connected)
          }
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300"
          disabled={
            !selectedChat.isActive || (selectedChat.isActive && !connected)
          }
        >
          전송
        </button>
      </form>

      {/* 상대방이 타이핑 중일 때 표시 */}

      <div className="text-left text-xs pl-3 h-4">
        {isPartnerTyping ? (
          <div className="text-gray-500">
            <span className="loading loading-dots loading-xs"></span>
            <span className="ml-1">
              {amIMentee ? mentorName : menteeName} 님이 입력하고 있어요...
            </span>
          </div>
        ) : (
          <div className="h-full"></div>
        )}
      </div>
    </div>
  );
};

export default ChatRoomContainer;
