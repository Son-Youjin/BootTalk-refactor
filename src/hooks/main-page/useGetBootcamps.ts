"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { Bootcamp } from "@/types/response";

interface BootcampResponse {
  data: Bootcamp[];
  pagination: {
    currentPage: number;
    totalPages: number;
  };
}

const transformFilterValue = (key: string, value: string): string => {
  if (key === "duration") {
    const valueMap: Record<string, string> = {
      "4주 미만": "1",
      "4~12주": "2",
      "12주 이상": "3",
    };
    return valueMap[value] || value;
  }

  if (key === "minRating") {
    const valueMap: Record<string, string> = {
      "2점 대": "2",
      "3점 대": "3",
      "4점 대": "4",
    };
    return valueMap[value] || value;
  }

  return value;
};

const getTransformedFilters = (filters: Record<string, string>) => {
  const result: Record<string, string> = {};
  Object.entries(filters).forEach(([key, value]) => {
    result[key] = transformFilterValue(key, value);
  });
  return result;
};

const applyFilters = (data: Bootcamp[], filters: Record<string, string>) => {
  const getWeeksBetween = (start: string, end: string) => {
    const diff = new Date(end).getTime() - new Date(start).getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24 * 7));
  };

  return data.filter((bootcamp) => {
    const { region, duration, minRating, category } = filters;

    if (region && !bootcamp.bootcampRegion.includes(region)) return false;
    if (category && bootcamp.bootcampCategory !== category) return false;

    if (minRating) {
      const rating = Number(minRating);
      const nextRating = rating + 1;
      if (
        bootcamp.courseAverageRating < rating ||
        bootcamp.courseAverageRating >= nextRating
      ) {
        return false;
      }
    }

    if (duration) {
      const weeks = getWeeksBetween(
        bootcamp.bootcampStartDate,
        bootcamp.bootcampEndDate
      );

      if (duration === "1" && weeks >= 4) return false;
      if (duration === "2" && (weeks < 4 || weeks > 12)) return false;
      if (duration === "3" && weeks <= 12) return false;
    }

    return true;
  });
};

export const useGetBootcamps = (filters: Record<string, string>) => {
  const PAGE_SIZE = 10;

  const result = useInfiniteQuery<BootcampResponse>({
    queryKey: ["bootcamps", filters],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const page = pageParam as number;
      const queryParams = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (!value) return;
        queryParams.set(key, transformFilterValue(key, value));
      });

      queryParams.set("page", page.toString());
      queryParams.set("size", PAGE_SIZE.toString());
      queryParams.set("sort", JSON.stringify(["string"]));

      const res = await axiosDefault.get(
        `${END_POINT.BOOTCAMPS}?${queryParams.toString()}`
      );

      const data = res.data?.data || [];

      const isMock = process.env.NEXT_PUBLIC_USE_MOCK === "true";
      const filtered = isMock
        ? applyFilters(data, getTransformedFilters(filters))
        : data;

      return {
        data: filtered,
        pagination: res.data.pagination || {
          currentPage: page,
          totalPages: Math.ceil(filtered.length / PAGE_SIZE),
        },
      };
    },
    getNextPageParam: (lastPage) =>
      lastPage.pagination.currentPage < lastPage.pagination.totalPages
        ? lastPage.pagination.currentPage + 1
        : undefined,
  });

  return {
    bootcamps: result.data?.pages.flatMap((page) => page.data) || [],
    fetchNextPage: result.fetchNextPage,
    hasNextPage: result.hasNextPage,
    isLoading: result.isLoading,
    isError: result.isError,
  };
};