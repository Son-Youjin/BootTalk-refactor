import SocialRegister from "@/components/feature/auth/SocialRegister";
import { Suspense } from "react";

const SocialRegisterPage = () => {
  return (
    <>
      <Suspense fallback={<div>로딩 중...</div>}>
        <SocialRegister />
      </Suspense>
    </>
  );
};

export default SocialRegisterPage;
