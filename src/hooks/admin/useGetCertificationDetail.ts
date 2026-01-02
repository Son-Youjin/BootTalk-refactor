"use client";

import { useQuery } from "@tanstack/react-query";
import { END_POINT } from "@/constants/endPoint";
import { axiosDefault } from "@/api/axiosInstance";

const fetchCertificationDetail = async (certificationId: number) => {
  const res = await axiosDefault.get(`${END_POINT.ADMIN_CERTIFICATION}/${certificationId}`);
  if (!res.status.toString().startsWith("2")) {
    throw new Error("수료증 상세 정보를 불러오는 데 실패했습니다.");
  }
  return res.data;
};

export const useGetCertificationDetail = (certificationId: number) => {
  return useQuery({
    queryKey: ["certificationDetail", certificationId],
    queryFn: () => fetchCertificationDetail(certificationId),
    enabled: !!certificationId,
  });
};
