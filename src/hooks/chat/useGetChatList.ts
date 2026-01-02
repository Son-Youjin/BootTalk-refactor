import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { ChatRoom } from "@/types/response";
import { useQuery } from "@tanstack/react-query";

const fetchChatRoom = async () => {
  const response = await axiosDefault.get(END_POINT.CHAT_ROOM_LIST, {});
  return response.data;
};

export const useGetChatList = () => {
  const { data: chatRoomList } = useQuery<ChatRoom[]>({
    queryKey: ["chatRoomList"],
    queryFn: fetchChatRoom,
  });

  return { chatRoomList };
};
