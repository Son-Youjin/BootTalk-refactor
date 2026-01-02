"use client";

import React from "react";

import { useRouter } from "next/navigation";

const CoffeeChatHeader: React.FC = () => {
  const router = useRouter();

  const navigateToMyPage = () => {
    router.push("/mypage?tab=mentor");
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">커피챗</h1>
        <button
          className="btn btn-outline hover:text-amber-900 rounded-lg"
          onClick={navigateToMyPage}
        >
          멘토 프로필 관리
        </button>
      </div>
    </>
  );
};

export default CoffeeChatHeader;
