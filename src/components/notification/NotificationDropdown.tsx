"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import NotificationBell from "./NotificationBell";
import NotificationList from "./NotificationList";
import { useNotificationStore } from "@/store/notificationStore";
import { useInitialNotifications } from "@/hooks/notification/useInitialNotifications";
import { useNotificationEffect } from "@/hooks/notification/useNotificationEffect";
import { usePatchNotifications } from "@/hooks/notification/usePatchNotifications";

interface NotificationDropdownProps {
  isInDrawer?: boolean;
}

const NotificationDropdown = ({ isInDrawer = false }: NotificationDropdownProps) => {
  const [isOpen, setIsOpen] = useState(isInDrawer);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { notifications, setHasOpened } = useNotificationStore();

  const patchNotifications = usePatchNotifications();

  useInitialNotifications();
  useNotificationEffect();

  const handleCloseDropdown = useCallback(() => {
    if (!isInDrawer) {
      setIsOpen(false);
    }

    if (notifications.length > 0) {
      patchNotifications.mutate();
    }
  }, [notifications, patchNotifications, isInDrawer]);

  useEffect(() => {
    if (isOpen) {
      setHasOpened(true);
    }
  }, [isOpen, setHasOpened]);

  useEffect(() => {
    if (isInDrawer) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        handleCloseDropdown();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleCloseDropdown, isInDrawer]);

  return (
    <div className={`relative z-[99] ${isInDrawer ? "w-full" : ""}`} ref={dropdownRef}>
      {!isInDrawer && (
        <div onClick={() => setIsOpen((prev) => !prev)}>
          <NotificationBell isActive={isOpen} />
        </div>
      )}

      {isOpen && (
        <div
          className={`${
            isInDrawer ? "static mt-0 w-full" : "absolute top-full right-0 mt-2 w-96"
          } max-h-[400px] bg-white rounded-2xl shadow-2xl z-[50] overflow-y-auto scrollbar-thin pr-1`}
        >
          <div className="sticky top-0 p-4 text-lg font-bold text-left bg-gray-100 text-gray-700 border-b border-gray-300 z-10">
            알림
          </div>

          <NotificationList
            notifications={notifications}
            onClose={handleCloseDropdown}
          />
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
