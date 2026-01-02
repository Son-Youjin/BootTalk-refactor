import { Bell } from "lucide-react";
import { useNotificationStore } from "@/store/notificationStore";

interface NotificationBellProps {
  isActive: boolean;
}

const NotificationBell = ({ isActive }: NotificationBellProps) => {
  const { unreadCount } = useNotificationStore();

  return (
    <div className={`relative p-2 rounded-full ${isActive ? "bg-gray-200" : "hover:bg-gray-100"}`}>
      <Bell size={18} />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {unreadCount}
        </span>
      )}
    </div>
  );
};

export default NotificationBell;
