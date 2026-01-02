import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { useQuery } from "@tanstack/react-query";
import type { BootcampDetail } from "@/types/response";


const fetchBootcampDetail = async (id: string): Promise<BootcampDetail> => {
  const res = await axiosDefault.get(END_POINT.BOOTCAMP_DETAIL(id));
  return res.data;
};

export const useGetBootcampDetail = (id: string) => {
  return useQuery<BootcampDetail>({
    queryKey: ["bootcampDetail", id],
    queryFn: () => fetchBootcampDetail(id),
    enabled: !!id,
  });
};