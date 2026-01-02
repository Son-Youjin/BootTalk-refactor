import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { Mentor } from "@/types/response";
import { useQuery } from "@tanstack/react-query";

const fetchMentorList = async (jobType: string) => {
  try {
    let url = END_POINT.MENTOR_LIST;
    if (jobType && jobType !== "all") {
      url += `?jobType=${jobType}`;
    }
    const response = await axiosDefault.get(url, {});
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch mentor list:", error);
    throw error;
  }
};

export const useMentorList = (jobType: string) => {
  const {
    data: mentorList,
    isLoading,
    isError,
  } = useQuery<Mentor[]>({
    queryKey: ["mentorList", jobType],
    queryFn: () => fetchMentorList(jobType),
  });

  return { mentorList, isLoading, isError };
};
