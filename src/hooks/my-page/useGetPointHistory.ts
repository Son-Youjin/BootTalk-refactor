import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { useQuery } from "@tanstack/react-query";

interface Point {
  pointHistoryId: number;
  eventTypeName: string;
  createdAt: string;
  pointTypeName: string;
  changedPoint: number;
  currentPoint: number;
}

const fetchPointHistory = async () => {
  try {
    const response = await axiosDefault.get(END_POINT.POINT_HISTORY);
    return response.data.data;
  } catch (error) {
    console.log("Failed to fetch my point's history:", error);
    throw error;
  }
};

export const useGetPointHistory = () => {
  const {
    data: pointHistory,
    isLoading: isPointHistoryLoading,
    isError: isPointHistoryError,
  } = useQuery<Point[]>({
    queryKey: ["pointHistory"],
    queryFn: fetchPointHistory,
  });

  return { pointHistory, isPointHistoryLoading, isPointHistoryError };
};
