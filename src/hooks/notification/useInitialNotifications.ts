"use client";

import { useEffect } from "react";
import { useNotificationStore } from "@/store/notificationStore";
import { END_POINT } from "@/constants/endPoint";

export function useInitialNotifications() {
  const setNotifications = useNotificationStore((s) => s.setNotifications);
  const setUnreadCount  = useNotificationStore((s) => s.setUnreadCount);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      return;
    }

    fetch(END_POINT.NOTIFICATIONS, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then((body) => {
        setNotifications(body.notificationResponseDtoList);
        setUnreadCount(body.uncheckedCount);
      })
      .catch((err) => {
        console.error("초기 알림 불러오기 실패:", err);
      });
  }, [setNotifications, setUnreadCount]);
}