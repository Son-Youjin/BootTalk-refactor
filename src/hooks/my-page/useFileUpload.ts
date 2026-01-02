import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { useMutation } from "@tanstack/react-query";

const fetchFileUpload = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosDefault.post(END_POINT.FILE_UPLOAD, formData);
  return response.data.url;
};

export const useFileUpload = () => {
  const {
    mutateAsync: uploadFileAsync,
    mutate: uploadFile,
    isPending,
    isError,
  } = useMutation({
    mutationFn: fetchFileUpload,
  });

  return { uploadFile, uploadFileAsync, isPending, isError };
};
