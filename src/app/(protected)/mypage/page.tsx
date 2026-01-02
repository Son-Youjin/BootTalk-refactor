import { Suspense } from "react";
import MyPageContent from "@/components/feature/mypage/MyPageContent";

export default function Mypage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <MyPageContent />
    </Suspense>
  );
}
