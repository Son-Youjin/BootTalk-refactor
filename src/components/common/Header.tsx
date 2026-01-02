"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, MessageCircleCode } from "lucide-react";
import MobileDrawerMenu from "@/components/common/MobileDrawerMenu";
import { useDrawerScrollLock } from "@/hooks/useDrawerScrollLock";
import NotificationDropdown from "../notification/NotificationDropdown";
import { useUserStore } from "@/store/useUserStore";
import { useGetMyInfo } from "@/hooks/my-page/useGetMyInfo";
import { END_POINT } from "@/constants/endPoint";
import { axiosDefault } from "@/api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "부트캠프", href: "/" },
  { label: "리뷰", href: "/review" },
  { label: "커피챗", href: "/coffee-chat" },
];

const Header = () => {
  const { user, logout, isAuthenticated, setUser } = useUserStore();
  const queryClient = useQueryClient();
  const pathname = usePathname();

  useDrawerScrollLock();

  const { myInfo, isMyInfoLoading, isMyInfoError } = useGetMyInfo();

  useEffect(() => {
    if (myInfo && !isMyInfoLoading && !isMyInfoError) {
      setUser(myInfo);
    }
  }, [myInfo, isMyInfoLoading, isMyInfoError, setUser]);

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await axiosDefault.post(END_POINT.LOGOUT);
    },
    onSuccess: () => {
      logout();
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });

      document.cookie =
        "Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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
    <>
      <input
        id="mobile-drawer"
        type="checkbox"
        className="drawer-toggle hidden"
      />
      <header className="sticky top-0 z-60 shadow-m bg-base-100 shadow-md">
        <div className="navbar max-w-[1200px] mx-auto px-4 md:px-6 relative justify-between">
          <div className="flex md:hidden items-center">
            <label htmlFor="mobile-drawer" className="btn btn-ghost">
              <Menu size={24} />
            </label>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            <Link href="/">
              <Image
                src="https://boottalk-bucket.s3.amazonaws.com/uploads/1745316038167_logo.PNG"
                alt="로고"
                width={160}
                height={20}
              />
            </Link>
          </div>

          <nav className="hidden md:block text-md">
            <div className="max-w-screen-xl mx-auto px-4">
              <ul className="flex justify-around gap-12 py-3">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={pathname === item.href ? "font-semibold" : ""}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="items-center gap-4">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <div className="flex">
                  <div className="relative">
                    <button
                      className="btn btn-ghost btn-circle"
                      aria-label="알림"
                    >
                      <NotificationDropdown />
                    </button>
                  </div>
                  <Link
                    href="/chat"
                    className="btn btn-ghost btn-circle"
                    aria-label="채팅"
                  >
                    <MessageCircleCode size={18} />
                  </Link>
                </div>

                <div className="hidden md:block">
                  <Link
                    href="/mypage"
                    className="text-sm font-medium hover:underline"
                  >
                    {`${myInfo?.name}님`}
                  </Link>

                  <span className="text-sm font-medium ml-3">
                    {myInfo?.currentPoint}P
                  </span>

                  <button
                    className="btn bg-base-100 border-none text-sm hover:text-amber-950 transition-colors"
                    onClick={handleLogout}
                    disabled={isMyInfoLoading || isMyInfoError}
                  >
                    로그아웃
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="btn bg-base-100 border-none text-sm hover:text-amber-950 transition-colors"
                >
                  로그인 / 회원가입
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="drawer-side z-100 md:hidden fixed">
        <label htmlFor="mobile-drawer" className="drawer-overlay"></label>
        <MobileDrawerMenu navItems={navItems} pathname={pathname} />
      </div>
    </>
  );
};

export default Header;
