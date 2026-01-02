import React, { useState } from "react";
import { Mentor } from "@/types/response";
import Modal from "@/components/common/modal/CommonModal";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale/ko";
import { CalendarDays, Clock, MessageCircle } from "lucide-react";
import { useMentorApplication } from "@/hooks/coffee-chat/useMentorApplication";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import styles from "@/components/feature/coffee-chat/mentor/ChatRequestModal.module.css";
import { MentorApplicationData } from "@/types/request";
import toast from "react-hot-toast";

interface ChatRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentor: Mentor | null;
}

const ChatRequestModal: React.FC<ChatRequestModalProps> = ({
  isOpen,
  onClose,
  mentor,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const { mentorApplicationTime, isLoading, requestCoffeeChat, isSubmitting } =
    useMentorApplication(String(mentor?.coffeeChatInfoId));

  // 날짜 문자열 배열 추출
  const availableDateStrings = Object.keys(mentorApplicationTime || {});

  // 날짜 필터링 함수 - 각 날짜에 대해 선택 가능 여부 boolean으로 반환
  const isDateAvailable = (date: Date): boolean => {
    const dateStr = format(date, "yyyy-MM-dd");
    return availableDateStrings.includes(dateStr);
  };

  // Date 타입을 키값으로 매핑
  const selectedDateKey = selectedDate
    ? format(selectedDate, "yyyy-MM-dd")
    : null;

  const availableTimes = selectedDateKey
    ? mentorApplicationTime?.[selectedDateKey] || []
    : [];

  console.log("날짜별 시간:", availableTimes);

  if (!isOpen || !mentor) return null;

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime) {
      toast.error("날짜와 시간을 모두 선택해주세요.");
      return;
    }

    if (!message.trim()) {
      toast.error("메시지를 입력해주세요.");
      return;
    }

    const [hour, minute] = selectedTime.split(":").map(Number);

    const startDateTime = new Date(selectedDate);
    startDateTime.setHours(hour, minute, 0);

    const endDateTime = new Date(startDateTime);
    endDateTime.setMinutes(startDateTime.getMinutes() + 30);

    const startTimeStr = format(startDateTime, "yyyy-MM-dd'T'HH:mm:ss");
    const endTimeStr = format(endDateTime, "yyyy-MM-dd'T'HH:mm:ss");

    const requestData: MentorApplicationData = {
      coffeeChatInfoId: mentor.coffeeChatInfoId,
      content: message,
      coffeeChatStartTime: startTimeStr,
      coffeeChatEndTime: endTimeStr,
    };

    console.log("시작시간:", startTimeStr);

    console.log("신청시간 데이터", requestData);

    requestCoffeeChat(requestData, {
      onSuccess: () => {
        toast.success("커피챗 신청이 완료되었습니다.");
        onClose(); // 모달 닫기
      },
      onError: (error) => {
        console.error("커피챗 신청 오류:", error);
        if (error.message.includes("409")) {
          toast.error("이미 신청한 커피챗입니다.");
        } else {
          toast.error("커피챗 신청 중 오류가 발생했습니다.");
        }
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" title="커피챗 신청">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 날짜 선택 */}
        <div className="form-control">
          <div className="flex items-center gap-2 mb-2 bg-white">
            <CalendarDays size={18} />
            날짜 선택
          </div>
          <div className={styles.datepickerWrapper}>
            <DatePicker
              filterDate={isDateAvailable}
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              inline
              locale={ko}
            />
          </div>
        </div>

        {/* 시간 선택 */}
        <div className="form-control">
          <div className="mb-2 flex items-center gap-2">
            <Clock size={18} />
            시간 선택
          </div>
          <div className="grid grid-cols-6 gap-2 h-24 overflow-y-auto">
            {selectedDate && availableTimes.length > 0 ? (
              availableTimes.map((time: string) => (
                <button
                  key={time}
                  type="button"
                  className={`btn transition-all ${
                    selectedTime === time
                      ? "bg-amber-900 text-white font-bold"
                      : "btn-outline hover:bg-blue-100"
                  }`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))
            ) : (
              <div className="col-span-6 flex items-center justify-center text-gray-500 bg-gray-100 h-24 rounded-lg">
                선택한 날짜에 가능한 시간이 없습니다.
              </div>
            )}
          </div>
        </div>

        {/* 메세지 작성 */}
        <div className="form-control flex flex-col">
          <label className="label text-black">
            <MessageCircle size={18} />
            <span>궁금한 점이나 이야기하고 싶은 주제를 적어주세요!</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24 w-full mt-1 rounded-lg"
            placeholder="예: 커리어 방향이 고민돼요"
            maxLength={500}
            required
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="text-sm text-right text-gray-500 mt-1">
            {message.length} / 500자
          </div>
        </div>

        {/* 제출 버튼 */}
        <div className="form-control text-right">
          <button
            className="btn bg-amber-900 text-white btn-md rounded-lg"
            type="submit"
            disabled={isLoading || isSubmitting}
          >
            신청하기
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ChatRequestModal;
