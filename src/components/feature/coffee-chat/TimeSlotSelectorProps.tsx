import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AlertCircle, Clock, X } from "lucide-react";

export type DayOfWeek = "월" | "화" | "수" | "목" | "금" | "토" | "일";

export interface TimeSlot {
  day: DayOfWeek;
  times: string[];
}

interface TimeSlotSelectorProps {
  timeSlots: TimeSlot[];
  onChange: (timeSlots: TimeSlot[]) => void;
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  timeSlots,
  onChange,
}) => {
  const days: DayOfWeek[] = ["월", "화", "수", "목", "금", "토", "일"];

  // 현재 확장된 요일
  const [expandedDay, setExpandedDay] = useState<DayOfWeek>("월");
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    return date;
  });

  // 시간을 HH:mm 형식의 문자열로 변환
  const formatTimeToString = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // 문자열을 Date 객체로 변환 (비교용)
  const parseTimeString = (timeStr: string): Date => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  // DatePicker 값 변경 핸들러
  const handleTimeChange = (date: Date | null) => {
    if (!date) return;

    // 선택한 시간을 문자열로 변환
    const timeString = formatTimeToString(date);

    // 선택한 시간 저장
    setSelectedDate(date);

    // 시간 추가
    const updatedTimeSlots = [...timeSlots];
    const slotIndex = updatedTimeSlots.findIndex(
      (slot) => slot.day === expandedDay
    );

    if (slotIndex >= 0) {
      // 이미 존재하는 요일이면 시간 추가
      if (!updatedTimeSlots[slotIndex].times.includes(timeString)) {
        updatedTimeSlots[slotIndex] = {
          ...updatedTimeSlots[slotIndex],
          times: [...updatedTimeSlots[slotIndex].times, timeString].sort(),
        };
      }
    } else {
      // 요일이 없으면 새로 추가
      updatedTimeSlots.push({
        day: expandedDay,
        times: [timeString],
      });
    }

    onChange(updatedTimeSlots);
  };

  // 시간 삭제 핸들러
  const handleRemoveTime = (day: DayOfWeek, time: string) => {
    const updatedTimeSlots = timeSlots.map((slot) => {
      if (slot.day === day) {
        return { ...slot, times: slot.times.filter((t) => t !== time) };
      }
      return slot;
    });

    onChange(updatedTimeSlots);
  };

  // 해당 요일의 선택된 시간 수 가져오기
  const getSelectedTimesCount = (day: DayOfWeek): number => {
    const daySlot = timeSlots.find((slot) => slot.day === day);
    return daySlot ? daySlot.times.length : 0;
  };

  // 모든 시간 초기화
  const clearAll = () => {
    onChange(days.map((day) => ({ day, times: [] })));
  };

  // 현재 확장된 요일의 시간 슬롯
  const currentDayTimeSlot = timeSlots.find(
    (slot) => slot.day === expandedDay
  ) || { day: expandedDay, times: [] };

  // 총 선택된 시간 수
  const selectedCount = timeSlots.reduce(
    (count, slot) => count + slot.times.length,
    0
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* 날짜 선택기 */}
      <div className="w-full bg-white rounded-lg shadow-md p-4 mb-4">
        <div className="flex items-center mb-3">
          <Clock size={18} className="text-black mr-2" />
          <span className="font-bold">시간 선택</span>
          <button
            className="btn btn-neutral btn-outline btn-xs ml-4"
            onClick={clearAll}
          >
            전체 초기화
          </button>
        </div>
        <div className="flex">
          <DatePicker
            selected={selectedDate}
            onChange={handleTimeChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption="시간"
            dateFormat="HH:mm"
            timeFormat="HH:mm"
            className="input border rounded p-2"
            excludeTimes={currentDayTimeSlot.times.map(parseTimeString)}
            placeholderText="시간 선택"
            popperClassName="react-datepicker-right"
            popperPlacement="right-start"
            shouldCloseOnSelect={false}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2 flex items-center">
          <AlertCircle size={12} className="mr-1" />
          요일 선택 후 시간을 선택해주세요.
        </p>
      </div>

      {/* 요일 선택 */}
      <div className="w-full bg-white rounded-lg shadow-md p-4 mb-4">
        {days.map((day) => (
          <div key={day} className="mb-2 border rounded-lg overflow-hidden">
            <div
              className="p-3 bg-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() =>
                setExpandedDay(
                  expandedDay === day ? (null as unknown as DayOfWeek) : day
                )
              }
            >
              <div className="font-bold">{day}요일</div>
              <div className="flex items-center">
                <span className="mr-4 text-gray-600">
                  {getSelectedTimesCount(day)} 시간 선택됨
                </span>
                <span
                  className="transform transition-transform duration-200 inline-block"
                  style={{
                    transform:
                      expandedDay === day ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  ▼
                </span>
              </div>
            </div>

            {expandedDay === day && (
              <div className="p-3">
                {currentDayTimeSlot.times.length > 0 ? (
                  <div className="grid grid-cols-4 gap-2">
                    {currentDayTimeSlot.times.map((time) => (
                      <div
                        key={`${day}-${time}`}
                        className="bg-amber-800 text-white text-xs p-2 rounded border border-gray-200"
                      >
                        <div className="flex justify-between items-center">
                          <span>{time}</span>
                          <button
                            onClick={() => handleRemoveTime(day, time)}
                            className="ml-1 hover:text-red-200"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-16 text-gray-500 text-sm">
                    <AlertCircle size={16} className="mr-2" />
                    아직 선택된 시간이 없습니다
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 선택된 시간 요약 */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-2">
          선택된 시간: {selectedCount}개 시간대
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {days.map((day) => (
            <div key={day} className="mb-4">
              <div className="font-bold mb-1">{day}요일</div>
              <div>
                {getSelectedTimesCount(day) > 0 ? (
                  timeSlots
                    .find((slot) => slot.day === day)
                    ?.times.map((time) => (
                      <span
                        key={`selected-${day}-${time}`}
                        className="inline-block bg-white text-amber-800 rounded-full px-2 py-1 text-xs mr-1 mb-1 border-gray-200 border"
                      >
                        {time}
                      </span>
                    ))
                ) : (
                  <span className="text-gray-500 text-xs">
                    선택된 시간 없음
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeSlotSelector;
