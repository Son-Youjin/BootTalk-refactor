import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { UserInfo } from "@/types/response";
import { useQuery } from "@tanstack/react-query";

const fetchMyInfo = async () => {
  try {
    const response = await axiosDefault.get<UserInfo>(END_POINT.MY_INFO);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch my info:", error);
    throw error;
  }
};

export const useGetMyInfo = () => {
  const {
    data: myInfo,
    isLoading: isMyInfoLoading,
    isError: isMyInfoError,
  } = useQuery({
    queryKey: ["myInfo"],
    queryFn: fetchMyInfo,
    retry: 1,
    staleTime: 300000,
  });

  console.log("myInfo", myInfo);

  return { myInfo, isMyInfoLoading, isMyInfoError };
};
