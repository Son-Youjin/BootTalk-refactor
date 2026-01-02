"use client";

import Certificates from "@/components/feature/mypage/Certificates";
import MentorProfile from "@/components/feature/mypage/MentorProfile";
import MyPageLayout from "@/components/feature/mypage/MyPageLayout";
import MyReviews from "@/components/feature/mypage/MyReviews";
import PointHistory from "@/components/feature/mypage/PointHistory";
import ProfileEdit from "@/components/feature/mypage/ProfileEdit";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function MyPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tab = (searchParams.get("tab") as string) ?? "profile";

  const handleTabChange = (newTab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", newTab);

    router.push(`/mypage?${params.toString()}`);
  };
  const renderTabContent = () => {
    switch (tab) {
      case "profile":
        return <ProfileEdit />;
      case "reviews":
        return <MyReviews />;
      case "certificates":
        return <Certificates />;
      case "points":
        return <PointHistory />;
      case "mentor":
        return <MentorProfile />;
      default:
        return <ProfileEdit />;
    }
  };

  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <MyPageLayout activeTab={tab} onTabChange={handleTabChange}>
        {renderTabContent()}
      </MyPageLayout>
    </Suspense>
  );
}
