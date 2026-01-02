"use client";

import { useMutation } from "@tanstack/react-query";
import { END_POINT } from "@/constants/endPoint";
import { axiosDefault } from "@/api/axiosInstance";

export const usePatchCertificationStatus = () => {
  return useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const res = await axiosDefault.patch(`${END_POINT.ADMIN_CERTIFICATION}/${id}`, null, {
        params: { status },
      });
      if (!res.status.toString().startsWith("2")) {
        throw new Error("수료증 상태 변경에 실패했습니다.");
      }
      return res.data;
    },
  });
};
