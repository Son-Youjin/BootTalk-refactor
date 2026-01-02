"use client";

import { useQuery } from "@tanstack/react-query";
import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import type { Review } from "@/types/response";

export const useGetMyReviews = () => {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery<Review[]>({
    queryKey: ["myReviews"],
    queryFn: async () => {
      const res = await axiosDefault.get(END_POINT.MY_REVIEWS);
      return res.data.data;
    },
  });

  return {
    myReviews: data,
    isMyReviewsLoading: isLoading,
    isMyReviewsError: isError,
    refetch,
  };
};
