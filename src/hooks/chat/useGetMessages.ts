import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { useQuery } from "@tanstack/react-query";

const fetchPreviousMessages = async (roomUuid: string) => {
  const response = await axiosDefault.get(END_POINT.CHAT_MESSAGE(roomUuid), {});
  return response.data;
};

export const useGetMessages = (roomUuid: string) => {
  const { data: previousMessages, isLoading } = useQuery({
    queryKey: ["previousMessages", roomUuid],
    queryFn: () => fetchPreviousMessages(roomUuid),
    enabled: !!roomUuid,
  });
  return { previousMessages, isLoading };
};
