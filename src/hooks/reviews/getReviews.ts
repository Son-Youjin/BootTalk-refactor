import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import type { Review } from "@/types/response";

interface ReviewResponse {
  data: Review[];
  pagination: {
    currentPage: number;
    totalPages: number;
  };
}

interface ReviewParams {
  page?: number;
  size?: number;
  category?: string;
  sort?: "latest" | "oldest";
}

export const getReviews = async ({
  page = 1,
  size = 20,
  category,
  sort = "latest",
}: ReviewParams): Promise<ReviewResponse> => {
  const queryParams = new URLSearchParams({
    page: String(page),
    size: String(size),
    sort,
  });

  if (category) queryParams.append("category", category);

  const res = await axiosDefault.get(`${END_POINT.REVIEWS}?${queryParams}`);
  return {
    data: res.data.data ?? [],
    pagination: res.data.pagination ?? { currentPage: page, totalPages: 1 },
  };
};