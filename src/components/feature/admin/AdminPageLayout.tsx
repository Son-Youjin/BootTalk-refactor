import Image from "next/image";
import React from "react";
import { useGetMyInfo } from "@/hooks/my-page/useGetMyInfo";

interface AdminPageLayoutProps {
  children: React.ReactNode;
}

const AdminPageLayout = ({ children }: AdminPageLayoutProps) => {
  const { myInfo, isMyInfoLoading, isMyInfoError } = useGetMyInfo();

  if (isMyInfoLoading) return <div>로딩 중...</div>;
  if (isMyInfoError) return <div>정보를 불러오는데 실패했습니다.</div>;

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8 text-amber-950 flex items-center">
        <span className="bg-warning w-2 h-8 inline-block mr-3 rounded"></span>
        관리자 페이지
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* 왼쪽 사이드바 */}
        <div className="md:w-80">
          <div className="bg-base-100 rounded-xl shadow-md overflow-hidden border border-base-300">
            <div className="p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-base-100 shadow-lg">
                  <Image
                    src={myInfo?.profileImage || "/profile-default.png"}
                    alt="프로필 사진"
                    width={150}
                    height={150}
                    className="object-cover"
                  />
                </div>
              </div>
              <h2 className="text-xl font-bold text-center text-amber-950">
                {myInfo?.name}
              </h2>
            </div>
          </div>
        </div>

        {/* 오른쪽 컨텐츠 영역 */}
        <div className="flex-1">
          <div className="bg-base-100 rounded-xl shadow-md p-6 border border-base-300 min-h-96">
            <h2 className="text-xl font-bold mb-6 pb-3 border-b border-gray-200 text-amber-950">
              수료증 인증 관리
            </h2>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPageLayout;
