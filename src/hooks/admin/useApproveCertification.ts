"use client";

import { useMutation } from "@tanstack/react-query";
import { END_POINT } from "@/constants/endPoint";
import { axiosDefault } from "@/api/axiosInstance";

const approveCertification = async (data: {
  fileUrl: string;
  courseId: number;
  categoryName: string;
  status: string;
}) => {
  const res = await axiosDefault.put(END_POINT.ADMIN_CERTIFICATION, data);
  if (!res.status.toString().startsWith("2")) {
    throw new Error(`수료증 승인 실패 (상태 코드: ${res.status})`);
  }
  return res.data;
};

export const useApproveCertification = () => {
  return useMutation({
    mutationFn: approveCertification,
  });
};
