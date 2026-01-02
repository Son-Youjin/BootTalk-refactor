"use client";

import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { useGetMyInfo } from "@/hooks/my-page/useGetMyInfo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FormSelect from "../../common/select/FormSelect";
import ProfileImageUpload from "./ProfileImageUpload";
import { ProfileFormData } from "@/types/request";
import { careerCategory } from "@/constants/careerCategory";

const ProfileEdit = () => {
  const { myInfo, isMyInfoLoading, isMyInfoError } = useGetMyInfo();
  const queryClient = useQueryClient();

  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [desiredCareer, setDesiredCareer] = useState("");

  useEffect(() => {
    if (myInfo) {
      setDesiredCareer(myInfo.desiredCareer);
      if (myInfo.profileImage) {
        setProfileImageUrl(myInfo.profileImage);
      }
    }
  }, [myInfo]);

  const updateProfileMutation = useMutation({
    mutationFn: async (formData: ProfileFormData) => {
      console.log("서버로 전송되는 데이터:", formData);
      const response = await axiosDefault.put(END_POINT.MY_INFO, formData);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("서버 응답 데이터:", data);

      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
      toast.success("프로필이 성공적으로 업데이트되었습니다.");
    },
    onError: (error) => {
      console.error("프로필 업데이트 중 오류 발생:", error);
      toast.error("프로필 업데이트에 실패했습니다. 다시 시도해주세요.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData: ProfileFormData = {
      desiredCareer: desiredCareer,
      profileImage: profileImageUrl || "",
    };

    console.log("제출되는 폼 데이터:", formData);
    updateProfileMutation.mutate(formData);
  };

  const handleCareerChange = (value: string) => {
    setDesiredCareer(value);
  };

  if (isMyInfoLoading) return <div>로딩 중...</div>;
  if (isMyInfoError) return <div>정보를 불러오는데 실패했습니다.</div>;

  return (
    <form onSubmit={handleSubmit}>
      {/* 프로필 이미지 섹션 */}
      <ProfileImageUpload
        setImage={setProfileImageUrl}
        initialImageUrl={profileImageUrl}
      />

      {/* 관심 직무 섹션 */}
      <div className="mb-6">
        <h3 className="mb-3 font-semibold text-base-content">관심 직무</h3>
        <FormSelect
          options={careerCategory}
          value={desiredCareer}
          onChange={handleCareerChange}
          placeholder="관심 직무를 선택해주세요"
          className="select w-full"
          helpText="관심 있는 직무를 선택하시면 맞춤형 추천을 받으실 수 있습니다."
        />
      </div>

      {/* 네이버 계정 정보 섹션 */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3 text-base-content">계정 정보</h3>
        <div className="p-3 rounded-md shadow-sm">
          <div className="flex items-center">
            <div>
              <p className="text-sm text-base-content">{myInfo?.name}</p>
              <p className="text-sm text-gray-500">{myInfo?.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 수료한 부트캠프 */}
      <div className="mb-6">
        <h3 className="mb-3 text-base-content">수료한 부트캠프</h3>
        <div className="rounded-md space-y-3">
          {myInfo?.certifications && myInfo?.certifications.length > 0 ? (
            myInfo?.certifications.map((camp, idx) => (
              <div key={idx} className="card bg-white shadow-sm">
                <div className="card-body p-3 flex-row items-center justify-between">
                  <div>
                    <h2 className="card-title text-sm text-base-content">
                      {camp.courseName}
                    </h2>
                    <p className="text-sm text-gray-500">{camp.categoryName}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-3 text-sm text-gray-500 shadow-sm">
              수료한 부트캠프가 없습니다.
            </div>
          )}
        </div>
      </div>

      {/* 저장 버튼 */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="btn bg-amber-900 hover:bg-amber-950 text-white"
          disabled={updateProfileMutation.isPending}
        >
          {updateProfileMutation.isPending ? "저장 중..." : "저장"}
        </button>
      </div>
    </form>
  );
};

export default ProfileEdit;
