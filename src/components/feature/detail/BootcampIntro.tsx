import React from "react";
import DetailSectionCard from "./DetailSectionCard";

const BootcampIntro = () => {
  return (
    <DetailSectionCard title="부트캠프 소개">
      <div className="text-sm sm:text-base text-neutral-700 leading-relaxed">
        <p className="block sm:hidden">
            부트캠프의 설명이 제공되지 않습니다.
            <br />
            참여한 유저들의 리뷰를 참고하여 주세요!
          </p>
          <p className="hidden sm:block">
            부트캠프의 설명이 제공되지 않습니다. 참여한 유저들의 리뷰를 참고하여 주세요!
          </p>
      </div>
    </DetailSectionCard>
  );
};

export default BootcampIntro;
