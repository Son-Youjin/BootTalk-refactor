import { useQuery } from "@tanstack/react-query";
import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { Review } from "@/types/response";

const fetchBootcampReviews = async (bootcampId: string): Promise<Review[]> => {
  const res = await axiosDefault.get(
    `${END_POINT.BOOTCAMP_REVIEWS(bootcampId)}?page=0&size=10`
  );
  return res.data.data ?? [];
};

export const useGetBootcampReviews = (bootcampId: string) =>
  useQuery<Review[]>({
    queryKey: ["bootcampReviews", bootcampId],
    queryFn: () => fetchBootcampReviews(bootcampId),
    enabled: !!bootcampId,
  });