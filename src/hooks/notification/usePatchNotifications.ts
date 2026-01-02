"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { END_POINT } from "@/constants/endPoint";
import { axiosDefault } from "@/api/axiosInstance";
import type { NotificationItem } from "@/types/response";

export const usePatchNotifications = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const now = new Date()
        .toLocaleString("sv-SE", { timeZone: "Asia/Seoul" })
        .replace(" ", "T");

      const url = END_POINT.MARK_ALL_AS_READ(now);
      await axiosDefault.patch(url);
      return now;
    },

    onSuccess: (now) => {
      queryClient.setQueryData<NotificationItem[]>(["notifications"], (old) => {
        if (!old) return [];
        return old.map((n) =>
          new Date(n.createdAt) <= new Date(now)
            ? { ...n, checked: true }
            : n
        );
      });
    },
  });
};