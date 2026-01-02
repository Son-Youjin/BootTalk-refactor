"use client";

import { useRouter } from "next/navigation";
import { NotificationItem } from "@/types/response";
import { useNotificationStore } from "@/store/notificationStore";
import { useMarkNotificationAsRead } from "@/hooks/notification/useMarkNotificationAsRead";

interface Props {
  notification: NotificationItem;
  onClose: () => void;
}

const NotificationCard = ({ notification, onClose }: Props) => {
  const router = useRouter();
  const { markAsReadById } = useNotificationStore();
  const { mutate: markAsReadOnServer } = useMarkNotificationAsRead();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!notification.checked) {
      markAsReadById(notification.notificationId);
      markAsReadOnServer(notification.notificationId);
    }

    onClose();

    if (notification.url) {
      setTimeout(() => {
        router.push(notification.url);
      }, 0);
    }
  };

  const formattedDate = (() => {
    const dateStr = notification.createdAt;
    const datePart = dateStr.substring(0, 10).replace(/-/g, ".");
    const timePart = dateStr.substring(11, 16);
    return `${datePart} ${timePart}`;
  })();

  return (
    <div
      onClick={handleClick}
      className="p-4 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 hover:shadow-sm transition relative cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-800 font-medium text-left whitespace-normal">
          {notification.message}
        </span>
        {!notification.checked && (
          <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full" />
        )}
      </div>
      <span className="text-xs text-gray-400 mt-2 block text-left">
        {formattedDate}
      </span>
    </div>
  );
};

export default NotificationCard;