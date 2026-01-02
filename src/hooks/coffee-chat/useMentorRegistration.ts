import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { MentorInfoData } from "@/types/request";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// 멘토 정보 가져오기
const fetchMentorData = async () => {
  try {
    const response = await axiosDefault.get(END_POINT.MENTOR_REGISTER);
    return response.data;
  } catch (error) {
    // 404 에러인 경우 특별히 처리
    if (axios.isAxiosError(error)) {
      // 이제 error는 AxiosError 타입으로 추론됨
      if (error.response && error.response.status === 404) {
        return null;
      }
    }
    // 다른 에러는 그대로 throw
    throw error;
  }
};

// 멘토 정보 등록
const createMentorInfo = async (mentorInfo: MentorInfoData) => {
  const response = await axiosDefault.post(
    END_POINT.MENTOR_REGISTER,
    mentorInfo
  );
  return response.data;
};

// 멘토 정보 수정
const updateMentorInfo = async (mentorInfo: MentorInfoData) => {
  const response = await axiosDefault.put(
    END_POINT.MENTOR_REGISTER,
    mentorInfo
  );
  return response.data;
};

const deleteMentorInfo = async () => {
  const response = await axiosDefault.delete(END_POINT.MENTOR_REGISTER);
  return response.data;
};

export const useMentorRegistration = (options = { enabled: true }) => {
  const queryClient = useQueryClient();

  // 멘토 정보 조회 쿼리
  const mentorDataQuery = useQuery({
    queryKey: ["mentorData", "mentorList"],
    queryFn: fetchMentorData,
    enabled: options.enabled, // 조건부 실행을 위한 옵션
    retry: false,
  });

  // 멘토 기본 정보 등록 뮤테이션
  const createMentorMutation = useMutation({
    mutationFn: createMentorInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mentorData", "mentorList"] });
    },
    onError: (error) => {
      console.error("멘토 정보 등록 오류:", error);
    },
  });

  // 멘토 정보 수정 뮤테이션
  const updateMentorMutation = useMutation({
    mutationFn: updateMentorInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mentorData", "mentorList"] });
    },
    onError: (error) => {
      console.error("멘토 정보 수정 오류:", error);
    },
  });

  // 멘토 등록 삭제 뮤테이션
  const deleteMentorMutation = useMutation({
    mutationFn: deleteMentorInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mentorData", "mentorList"] });
    },
    onError: (error) => {
      console.error("멘토 등록 삭제 오류:", error);
    },
  });

  return {
    mentorData: mentorDataQuery.data,
    isError: mentorDataQuery.isError,
    isLoading: mentorDataQuery.isLoading,
    isMentorExists: mentorDataQuery.data !== null,
    createMentorMutation,
    updateMentorMutation,
    deleteMentorMutation,
    isPending:
      createMentorMutation.isPending ||
      updateMentorMutation.isPending ||
      deleteMentorMutation.isPending,
    isCreatePending: createMentorMutation.isPending,
    isUpdatePending: updateMentorMutation.isPending,
    isDeletePending: deleteMentorMutation.isPending,
  };
};

export default useMentorRegistration;
