import { create } from "zustand";

export interface UserInfo {
  email: string;
  name: string;
  desiredCareer: string;
  currentPoint: number;
  profileImage: string | null;
  certifications: Certification[];
  userId: number;
  bootcamps: Bootcamp[];
}

export interface Certification {
  categoryName: string;
  courseName: string;
}

export interface CoffeeChat {
  coffeeChatAppId: string;
  content: string;
  status: string;
  menteeName: string;
  mentorName: string;
  coffeeChatStartTime: string;
}

export interface Mentor {
  coffeeChatInfoId: number;
  mentorUserId: number;
  mentorName: string;
  mentorType: string;
  jobType: string;
  introduction: string;
}

export interface ChatRoom {
  roomUuid: string;
  chatRoomId: number;
  mentor: {
    userId: number;
    name: string;
    profileImage: string;
  };
  mentee: {
    userId: number;
    name: string;
    profileImage: string;
  };
  reservationAt: string;
  expiresAt: string;
  endAt: string;
  isActive: boolean;
}

export interface Course {
  courseId: number;
  courseName: string;
}

export interface Certification {
  courseName: string;
  categoryName: string;
  trainingProgramId?: string;
}

export interface Review {
  reviewId: number;
  courseName: string;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  trainingProgramId: string;
  userName: string;
}

export interface ReviewBootcamp {
  userName: string;
  courseName: string;
  categoryName: string;
  trainingProgramId: string;
}

export interface AuthUser {
  name: string;
  email: string;
  profileImage: string | null;
  currentPoint: number;
  userId: number;
}

export interface ReviewBootcamp {
  userName: string;
  courseName: string;
  categoryName: string;
  trainingProgramId: string;
}

export interface Bootcamp {
  bootcampId: number;
  bootcampName: string;
  bootcampRegion: string;
  bootcampCost: boolean;
  bootcampLink: string;
  bootcampCategory: string;
  bootcampDegree: number;
  bootcampCapacity: number;
  bootcampStartDate: string;
  bootcampEndDate: string;
  courseAverageRating: number;
  courseReviewCount: number;
  trainingCenterId: number;
  trainingCenterName: string;
  trainingCenterPhoneNumber: string;
  trainingCenterEmail: string;
  trainingCenterAddress: string;
  trainingCenterUrl: string;
}

export interface BootcampDetail extends Bootcamp {
  reviews: Review[];
}

export interface ReviewResponse {
  content: Review[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  last: boolean;
  updatedAt: string;
}

export interface CourseSuggestion {
  bootcampId: number;
  bootcampName: string;
}

export interface Certification {
  userId: number;
  certificationId: number;
  courseName: string;
  categoryName: string;
  trainingCenterName: string;
  fileUrl: string;
  userName: string;
  status: string;
}

export interface NotificationItem { 
  notificationId: number;
  message: string;
  createdAt: string;
  type: string;
  url: string;
  checked: boolean;
}

interface NotificationState {
  notifications: NotificationItem[];
  setNotifications: (list: NotificationItem[]) => void;
  markAsReadById: (id: number) => void;
  addNotification: (item: NotificationItem) => void;
  markAllAsReadBefore: (time: string) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  setNotifications: (list) => set({ notifications: list }),
  markAsReadById: (id) =>
    set((s) => ({
      notifications: s.notifications.map((n) =>
        n.notificationId === id ? { ...n, checked: true } : n
      ),
    })),
  addNotification: (item) =>
    set((s) => ({
      notifications: [item, ...s.notifications],
    })),
  markAllAsReadBefore: (time) =>
    set((s) => ({
      notifications: s.notifications.map((n) =>
        n.createdAt <= time ? { ...n, checked: true } : n
      ),
    })),
}));