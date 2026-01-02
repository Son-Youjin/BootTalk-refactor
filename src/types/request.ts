export interface ProfileFormData {
  profileImage?: string | null;
  desiredCareer: string;
}

export interface MentorInfoData {
  info: {
    mentorType: string;
    jobType: string;
    introduction: string;
  };
  time: Record<string, string[]>;
}

export interface TimeSlot {
  day: string;
  times: string[];
}

export interface MentorApplicationData {
  coffeeChatInfoId: number;
  content: string;
  coffeeChatStartTime: string;
  coffeeChatEndTime: string;
}

export interface CertificationData {
  courseId: number;
  fileUrl: string;
}
