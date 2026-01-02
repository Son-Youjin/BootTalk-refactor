"use client";

import Link from "next/link";
import { useUserStore } from "@/store/useUserStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import Image from "next/image";
import { useGetMyInfo } from "@/hooks/my-page/useGetMyInfo";
import toast from "react-hot-toast";

interface NavItem {
  href: string;
  label: string;
}
interface MobileDrawerMenuProps {
  navItems: NavItem[];
  pathname: string;
}

const MobileDrawerMenu = ({ navItems, pathname }: MobileDrawerMenuProps) => {
  const { logout, isAuthenticated } = useUserStore();
  const queryClient = useQueryClient();

  const { myInfo, isMyInfoLoading, isMyInfoError } = useGetMyInfo();

  const closeDrawer = () => {
    const drawerCheckbox = document.getElementById(
      "mobile-drawer"
    ) as HTMLInputElement;
    if (drawerCheckbox) {
      drawerCheckbox.checked = false;
    }
  };

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await axiosDefault.post(END_POINT.LOGOUT);
    },
    onSuccess: () => {
      logout();
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
    },
    onError: (error) => {
      console.error("로그아웃 실패:", error);
      toast.error("로그아웃 중 오류가 발생했습니다. 다시 시도해주세요");
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="menu p-4 w-80 h-full bg-base-100 text-base-content overflow-y-auto">
      <div className="flex justify-center mb-6 mt-2">
        <Link href="/" className="flex items-center">
          <Image
            src="https://boottalk-bucket.s3.amazonaws.com/uploads/1745316038167_logo.PNG"
            alt="로고"
            width={160}
            height={20}
          />
        </Link>
      </div>

      {/* 네비게이션 메뉴 - 모바일 드로어에 추가 */}
      <ul className="my-6">
        {navItems.map((item) => (
          <li key={item.href} className="mb-2">
            <Link
              href={item.href}
              className={`block px-4 py-2 rounded-lg hover:bg-gray-100 ${
                pathname === item.href ? "font-semibold bg-gray-100" : ""
              }`}
              onClick={closeDrawer}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="divider"></div>

      {isAuthenticated && myInfo ? (
        <>
          <div className="flex flex-col gap-2 p-4">
            <div className="flex items-center justify-between">
              <Link
                href="/mypage"
                className="font-medium hover:underline"
                onClick={closeDrawer}
              >
                {`${myInfo?.name}님`}
              </Link>
              <span className="font-medium">{myInfo?.currentPoint}P</span>
            </div>
          </div>

          <div className="flex flex-col">
            <button
              className="btn btn-outline"
              onClick={() => {
                handleLogout();
                closeDrawer();
              }}
              disabled={isMyInfoLoading || isMyInfoError}
            >
              로그아웃
            </button>
          </div>
        </>
      ) : (
        <div className="px-4">
          <Link
            href="/login"
            className="btn btn-outline w-full"
            onClick={closeDrawer}
          >
            로그인 / 회원가입
          </Link>
        </div>
      )}
    </div>
  );
};

export default MobileDrawerMenu;
