import { NotificationItem } from "@/types/response";
import { END_POINT } from "@/constants/endPoint";
import { axiosDefault } from "@/api/axiosInstance";

export const fetchNotifications = async (
  page: number,
  limit: number = 10
): Promise<NotificationItem[]> => {
  try {
    const res = await axiosDefault.get(`${END_POINT.NOTIFICATIONS}?page=${page}&limit=${limit}`);
    return res.data.notificationResponseDtoList;
  } catch (error) {
    throw error;
  }
};
