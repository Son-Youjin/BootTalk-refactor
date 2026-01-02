import { useGetPointHistory } from "@/hooks/my-page/useGetPointHistory";
import React from "react";

const PointHistory = () => {
  const { pointHistory, isPointHistoryLoading, isPointHistoryError } =
    useGetPointHistory();

  if (isPointHistoryLoading) return <div>로딩 중...</div>;

  if (isPointHistoryError)
    return <div>포인트 내역을 불러오는데 실패했습니다.</div>;

  // 데이터가 없는 경우 처리
  if (!pointHistory || pointHistory.length === 0)
    return <div>포인트 내역이 없습니다.</div>;

  console.log(pointHistory);

  return (
    <div className="overflow-x-auto">
      {/* 요약 정보 */}
      <div className="bg-base-200 px-4 py-2 rounded-xl shadow mb-6">
        <p className="font-medium">
          현재 포인트: <span>{pointHistory[0].currentPoint}P</span>
        </p>
      </div>

      {/* 테이블 포인트 리스트 */}
      <table className="table w-full">
        <thead>
          <tr className="text-base-content">
            <th>이벤트</th>
            <th>날짜</th>
            <th className="text-right">변동</th>
            <th className="text-right">잔여 포인트</th>
          </tr>
        </thead>
        <tbody>
          {pointHistory.map((point) => (
            <tr key={point.pointHistoryId}>
              <td className="font-medium">{point.eventTypeName}</td>
              <td>{new Date(point.createdAt).toLocaleString()}</td>
              <td
                className={`text-right font-bold ${
                  point.pointTypeName.includes("적립") ||
                  point.pointTypeName.includes("환불")
                    ? "text-blue-600"
                    : "text-red-600"
                }`}
              >
                {point.pointTypeName.includes("적립") ||
                point.pointTypeName.includes("환불")
                  ? "+"
                  : "-"}
                {point.changedPoint}P
              </td>
              <td className="text-right text-sm text-gray-600">
                {point.currentPoint}P
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PointHistory;
