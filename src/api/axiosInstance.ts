import axios from "axios";

const getBaseURL = () => {
  const isDev = process.env.NODE_ENV === "development";
  const useMock = process.env.NEXT_PUBLIC_USE_MOCK === "true";

  if (isDev && useMock) return process.env.NEXT_PUBLIC_API_MOCKING;
  return process.env.NEXT_PUBLIC_API_URL;
};

// const handleAuthError = () => {
//   if (typeof window !== "undefined") {
//     toast.error("로그인이 필요한 서비스입니다.");
//   }
// };

export const axiosDefault = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});

axiosDefault.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      console.log("로그인이 필요한 서비스입니다.");
    } else if (status === 500) {
      console.error("서버 오류 발생");
    }

    return Promise.reject(error);
  }
);
