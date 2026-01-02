import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId: number) => {
      const url = `${END_POINT.NOTIFICATIONS}/${notificationId}`;
      const response = await axiosDefault.patch(url, { checked: true });
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};