import Image from "next/image";
import React from "react";
import {
  User,
  Edit,
  Award,
  CreditCard,
  AwardIcon,
  GraduationCap,
} from "lucide-react";
import { useGetMyInfo } from "@/hooks/my-page/useGetMyInfo";
import WithdrawalButton from "./WithdrawalButton";

interface MyPageLayoutProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  children: React.ReactNode;
}

const MyPageLayout = ({
  activeTab,
  onTabChange,
  children,
}: MyPageLayoutProps) => {
  const { myInfo, isMyInfoLoading, isMyInfoError } = useGetMyInfo();

  if (isMyInfoLoading) return <div>로딩 중...</div>;
  if (isMyInfoError) return <div>정보를 불러오는데 실패했습니다.</div>;

  const tabs = [
    { id: "profile", label: "프로필 수정", icon: <User size={18} /> },
    { id: "reviews", label: "내가 쓴 리뷰", icon: <Edit size={18} /> },
    { id: "certificates", label: "수료증 인증", icon: <Award size={18} /> },
    { id: "points", label: "포인트 사용내역", icon: <CreditCard size={18} /> },
    {
      id: "mentor",
      label: "멘토 프로필 관리",
      icon: <GraduationCap size={18} />,
    },
  ];
  console.log("레이아웃 이미지", myInfo?.profileImage);

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      {/* 페이지 제목 */}
      <h1 className="text-2xl font-bold mb-6 flex items-center">마이페이지</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* 왼쪽 사이드바 */}
        <div className="md:w-80">
          <div className="bg-base-100 rounded-xl shadow-md overflow-hidden border border-base-300">
            {/* 프로필 정보 */}
            <div className="p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="w-28 h-28 rounded-full overflow-hidden shadow-lg">
                  <Image
                    src={myInfo?.profileImage || "/profile-default.png"}
                    alt="프로필 사진"
                    width={150}
                    height={150}
                    className="object-cover"
                  />
                </div>
              </div>
              <h2 className="text-xl font-bold text-center">{myInfo?.name}</h2>
              <div className="flex justify-center mt-2">
                <div className="px-4 py-1  rounded-full font-medium flex items-center gap-1 shadow-lg">
                  <AwardIcon size={14} className="fill-current" />
                  <span>{myInfo?.currentPoint} P</span>
                </div>
              </div>
            </div>

            {/* 탭 네비게이션 */}
            <div className="divider m-0"></div>
            <div className="p-4">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                      activeTab === tab.id
                        ? "font-medium"
                        : "text-gray-600 hover:bg-neutral-100 hover:text-amber-900"
                    }`}
                    onClick={() => onTabChange(tab.id)}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* 회원탈퇴 버튼 */}
            <div className="p-4 border-t border-gray-100">
              <WithdrawalButton />
            </div>
          </div>
        </div>

        {/* 오른쪽 컨텐츠 영역 */}
        <div className="flex-1">
          <div className="bg-base-100 rounded-xl shadow-md p-6 border border-base-300 min-h-156">
            <h2 className="text-xl font-bold mb-6 pb-3 border-b border-gray-200">
              {tabs.find((tab) => tab.id === activeTab)?.label || ""}
            </h2>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageLayout;
