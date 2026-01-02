"use client";

import Image from "next/image";
import AuthCard from "@/components/common/AuthCard";

import { END_POINT } from "@/constants/endPoint";
import toast from "react-hot-toast";

const SocialLogin = () => {
  const handleNaverLogin = () => {
    try {
      window.location.href = END_POINT.NAVER_REDIRECT;
    } catch {
      toast.error("로그인 실패. 관리자에게 문의하세요.");
    }
  };

  return (
    <AuthCard>
      <div className="flex flex-col items-center justify-center w-full gap-6 px-4 py-10">
        <Image
          src="/logo.PNG"
          alt="BootTalk 로고"
          width={300}
          height={90}
          className="object-contain mb-3"
        />
        <p className="text-center text-base leading-relaxed text-gray-600">
          부트톡,
          <br />
          <span className="text-gray-500 font-normal">
            부트캠퍼들의 내일을 연결하다
          </span>
        </p>
        <button
          onClick={handleNaverLogin}
          className="btn text-white text-base font-medium w-full max-w-[240px] h-[48px] rounded-lg shadow-md bg-[#03C75A] hover:bg-[#026B3A] transition-colors duration-200 ease-in-out"
        >
          네이버로 로그인
        </button>
      </div>
    </AuthCard>
  );
};

export default SocialLogin;
