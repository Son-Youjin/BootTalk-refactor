import NotificationCard from "./NotificationCard";
import { NotificationItem } from "@/types/response";

interface Props {
  notifications: NotificationItem[];
  onClose: () => void;
}

const NotificationList = ({ notifications, onClose }: Props) => {


  return (
    <div className="flex flex-col gap-2 p-4 bg-gray-100">
      {notifications.length === 0 ? (
        <div className="text-sm text-gray-500 text-center">알림이 없습니다.</div>
      ) : (
        notifications.map((notification) => (
          <NotificationCard
            key={notification.notificationId}
            notification={notification}
            onClose={onClose}
          />
        ))
      )}
    </div>
  );
};

export default NotificationList;