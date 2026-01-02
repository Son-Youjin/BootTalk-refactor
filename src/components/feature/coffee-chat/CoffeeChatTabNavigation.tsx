"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";
import clsx from "clsx";

const CoffeeChatTabNavigation = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => {
    if (path === "/coffee-chat") {
      return pathname === "/coffee-chat";
    } else {
      return pathname.startsWith("/coffee-chat/my");
    }
  };

  return (
    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
      <button
        className={clsx(
          "flex-1 py-2 px-4 rounded-md transition-all",
          isActive("/coffee-chat")
            ? "bg-white shadow-sm font-medium"
            : "text-gray-600 hover:bg-gray-200"
        )}
        onClick={() => router.push("/coffee-chat")}
      >
        멘토 찾기
      </button>

      <button
        className={clsx(
          "flex-1 py-2 px-4 rounded-md transition-all",
          isActive("/coffee-chat/my")
            ? "bg-white shadow-sm font-medium"
            : "text-gray-600 hover:bg-gray-200"
        )}
        onClick={() => router.push("/coffee-chat/my")}
      >
        내 커피챗
      </button>
    </div>
  );
};

export default CoffeeChatTabNavigation;
