"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getReviews } from "@/hooks/reviews/getReviews";

export const useGetReviews = (filters: Record<string, string>) => {
  return useInfiniteQuery({
    queryKey: ["reviews", filters.category ?? "", filters.date ?? ""],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      return await getReviews({
        page: pageParam,
        category: filters.category,
        sort: filters.date === "오래된순" ? "oldest" : "latest",
      });
    },
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.pagination;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });
};
