export const getStatusBadge = (status: string) => {
  const statusInfo: Record<
    string,
    { bgColor: string; textColor: string; text: string }
  > = {
    APPROVED: {
      bgColor: "bg-amber-50",
      textColor: "text-amber-800",
      text: "승인됨",
    },
    PENDING: {
      bgColor: "bg-blue-50",
      textColor: "text-blue-800",
      text: "대기중",
    },
    REJECTED: {
      bgColor: "bg-gray-50",
      textColor: "text-gray-500",
      text: "거절됨",
    },
    CANCELED: {
      bgColor: "bg-gray-50",
      textColor: "text-gray-500",
      text: "취소됨",
    },
    default: {
      bgColor: "bg-gray-50",
      textColor: "text-gray-500",
      text: "종료됨",
    },
  };

  const { bgColor, textColor, text } = statusInfo[status] || statusInfo.default;

  return (
    <div
      className={`px-2 py-0.5 text-xs font-medium rounded whitespace-nowrap ${bgColor} ${textColor}`}
    >
      {text}
    </div>
  );
};
