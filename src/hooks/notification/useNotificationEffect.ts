"use client";

import { useEffect } from "react";
import { useNotificationStore } from "@/store/notificationStore";
import { END_POINT } from "@/constants/endPoint";

export function useNotificationEffect() {
  const addNotification = useNotificationStore((s) => s.addNotification);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      return;
    }

    const evtSource = new EventSource(END_POINT.SSE_CONNECT, {
      withCredentials: true,
    });

    const handleNotification = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        addNotification(data);
      } catch (err) {
        console.error("SSE 데이터 파싱 오류:", err);
      }
    };

    evtSource.addEventListener("notification", handleNotification);

    evtSource.onerror = (err) => {
      console.error("SSE 연결 에러:", err);
      evtSource.close();
    };

    return () => {
      evtSource.removeEventListener("notification", handleNotification);
      evtSource.close();
    };
  }, [addNotification]);
}
