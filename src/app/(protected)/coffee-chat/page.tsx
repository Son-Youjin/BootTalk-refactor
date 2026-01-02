"use client";

import React, { Suspense } from "react";
import FindMentors from "@/components/feature/coffee-chat/mentor/FindMentors";

const MentorPage = () => {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <FindMentors />
    </Suspense>
  );
};

export default MentorPage;
