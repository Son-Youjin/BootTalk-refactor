import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { useQuery } from "@tanstack/react-query";

export interface ExampleData {
  id: number;
  name: string;
}

export const fetchExample = async () => {
  const response = await axiosDefault.get(END_POINT.EXAMPLE);

  console.log("API 응답:", response.data);

  return response.data;
};

export const useGetExample = () => {
  const { data: example } = useQuery<ExampleData>({
    queryKey: ["example"],
    queryFn: fetchExample,
  });

  return { example };
};
