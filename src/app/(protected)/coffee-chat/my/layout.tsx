"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ReactNode } from "react";

const MyChatLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  const tabs = [
    { id: "approved", label: "커피챗 확정", path: "/coffee-chat/my" },
    { id: "sent", label: "보낸 신청", path: "/coffee-chat/my/sent" },
    { id: "received", label: "받은 신청", path: "/coffee-chat/my/received" },
    {
      id: "conversations",
      label: "채팅",
      path: "/chat",
    },
  ];

  return (
    <div>
      <div className="flex gap-2 mt-4 border-b">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={tab.path}
            className={`px-4 py-2 whitespace-nowrap ${
              pathname === tab.path
                ? "border-b-2 border-black text-black font-medium"
                : "text-gray-500"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
};

export default MyChatLayout;
