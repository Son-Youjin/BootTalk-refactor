"use client";

import { axiosDefault } from "@/api/axiosInstance";
import AuthCard from "@/components/common/AuthCard";
import { useRouter } from "next/navigation";
import { END_POINT } from "@/constants/endPoint";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";

const SocialRegister = () => {
  const [job, setJob] = useState("");
  const router = useRouter();

  // useEffect(() => {
  //   if (!token) {
  //     router.replace("/login");
  //   } else if (token && user) {
  //     router.replace("/");
  //   }
  // }, [token, user, router]);

  const { data: jobRoles = [] } = useQuery({
    queryKey: ["jobRoles"],
    queryFn: async () => {
      const res = await axiosDefault.get(END_POINT.BOOTCAMP_JOB_ROLES);
      if (Array.isArray(res.data)) {
        return res.data;
      }
      throw new Error("직무 데이터를 불러올 수 없습니다.");
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: async (jobRole: string) => {
      const res = await axiosDefault.put(END_POINT.MY_INFO, {
        profileImage: "",
        desiredCareer: jobRole,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("회원가입이 완료되었습니다!");
      router.replace("/");
    },
    onError: () => {
      toast.error("회원가입에 실패했습니다.");
    },
  });

  const handleSave = () => {
    if (!job) {
      toast.error("필수 정보가 누락되었습니다.");
      return;
    }

    updateUserMutation.mutate(job);
  };

  return (
    <AuthCard>
      <div className="flex flex-col items-center gap-4 w-full">
        <h1 className="text-xl font-bold mb-2">회원 정보</h1>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-medium text-black mb-1">
              관심 직무<span className="text-error ml-1">*</span>
            </span>
          </label>
          <select
            className="select select-bordered w-full focus:outline-none"
            value={job}
            onChange={(e) => setJob(e.target.value)}
          >
            <option value="" disabled hidden>
              직무를 선택하세요
            </option>
            {jobRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full flex justify-end">
          <button
            className="btn btn-neutral btn-outline"
            disabled={!job}
            onClick={handleSave}
          >
            저장
          </button>
        </div>
      </div>
    </AuthCard>
  );
};

export default SocialRegister;
