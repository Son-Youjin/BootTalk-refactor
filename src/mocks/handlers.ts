import {
  CertificationData,
  MentorApplicationData,
  MentorInfoData,
} from "./../types/request";
import { END_POINT } from "@/constants/endPoint";
import { http, HttpResponse } from "msw";
import { DB } from "./db/db";
import { ProfileFormData } from "@/types/request";

export const handlers = [
  http.get(END_POINT.EXAMPLE, () => {
    return HttpResponse.json(DB.example, {});
  }),

  http.get(END_POINT.MY_INFO, () => {
    return HttpResponse.json(DB.myInfo, {});
  }),

  http.get(END_POINT.BOOTCAMPS, () => {
    return HttpResponse.json({
      data: DB.bootcamps.data,
      pagination: DB.bootcamps.pagination,
    });
  }),

  // 마이페이지 핸들러 ------------------------------------------------------------
  http.get(END_POINT.COURSES, ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get("query");

    if (!query) {
      return HttpResponse.json();
    }

    const filteredCourses = DB.courses.filter((course) =>
      course.courseName.toLowerCase().includes(query.toLowerCase())
    );

    return HttpResponse.json(filteredCourses);
  }),

  http.post(END_POINT.CERTIFICATE, async ({ request }) => {
    const { courseId, fileUrl } = (await request.json()) as CertificationData;
    if (!courseId || !fileUrl) {
      return HttpResponse.json(
        { message: "코스 ID와 파일 URL은 필수입니다." },
        { status: 400 }
      );
    }

    return HttpResponse.json(
      {
        courseId,
        fileUrl,
      },
      { status: 200 }
    );
  }),

  http.get(END_POINT.MY_REVIEWS, () => {
    return HttpResponse.json(DB.myReviews, {});
  }),

  http.get(END_POINT.POINT_HISTORY, () => {
    return HttpResponse.json(DB.pointHistory, {});
  }),

  http.put(END_POINT.MY_INFO, async ({ request }) => {
    try {
      const body = await request.json();
      console.log("받은 요청 데이터:", body);
      const { profileImage, desiredCareer } = body as ProfileFormData;

      if (!profileImage || !desiredCareer) {
        return HttpResponse.json(
          { error: "필수 입력값이 누락되었습니다." },
          { status: 400 }
        );
      }

      if (!DB.myInfo) {
        return HttpResponse.json(
          { error: "사용자를 찾을 수 없습니다." },
          {
            status: 404,
          }
        );
      }

      DB.myInfo = {
        ...DB.myInfo,
        profileImage,
        desiredCareer,
      };

      return HttpResponse.json({
        message: "사용자 정보가 정상적으로 수정되었습니다.",
        data: DB.myInfo,
      });
    } catch (error) {
      console.log(error);
      return HttpResponse.json(
        { error: "서버 오류가 발생했습니다." },
        { status: 500 }
      );
    }
  }),

  http.post(END_POINT.FILE_UPLOAD, async ({ request }) => {
    try {
      const formData = await request.formData();
      const file = formData.get("file");

      if (!(file instanceof File)) {
        return HttpResponse.json(
          { error: "유효한 파일이 제공되지 않았습니다." },
          { status: 400 }
        );
      }

      // 목 서버에서는 실제 파일 저장 없이 URL만 생성
      const fileName = `${Date.now()}-${
        file instanceof File ? file.name : "image.jpg"
      }`;
      const fileUrl = `/upload/${fileName}`;

      return HttpResponse.json(
        {
          fileUrl: fileUrl,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("파일 업로드 오류:", error);
      return HttpResponse.json(
        { error: "서버 오류가 발생했습니다." },
        { status: 500 }
      );
    }
  }),

  http.post(END_POINT.MENTOR_REGISTER, async ({ request }) => {
    const body = await request.json();
    const { info, time } = body as MentorInfoData;

    // 필수 입력 항목 검증
    if (!info.mentorType || !info.jobType || !info.introduction) {
      return HttpResponse.json(
        {
          message: "필수 입력 항목이 누락되었습니다.",
        },
        { status: 400 }
      );
    }

    // 시간 항목 검증
    if (!time || typeof time !== "object" || Object.keys(time).length === 0) {
      return HttpResponse.json(
        {
          message: "가능한 시간대를 하나 이상 입력해주세요.",
        },
        { status: 400 }
      );
    }

    return HttpResponse.json(
      {
        info,
        time,
      },
      { status: 200 }
    );
  }),

  http.get(END_POINT.MENTOR_REGISTER, () => {
    return HttpResponse.json(DB.mentorInfo, {});
  }),

  http.delete(END_POINT.MENTOR_REGISTER, () => {
    DB.mentorInfo = {
      info: {
        coffeeChatInfoId: 0,
        mentorUserId: 0,
        mentorName: "",
        mentorType: "",
        jobType: "",
        introduction: "",
      },
      time: {
        MONDAY: [],
        WEDNESDAY: [],
        FRIDAY: [],
        SATURDAY: [],
      },
    };
    return new HttpResponse(null, { status: 200 });
  }),

  http.put(END_POINT.MENTOR_REGISTER, async ({ request }) => {
    // 요청 바디에서 업데이트할 멘토 정보 가져오기
    const requestBody = (await request.json()) as MentorInfoData;

    // DB에 멘토 정보 업데이트
    DB.mentorInfo = {
      info: {
        coffeeChatInfoId: DB.mentorInfo.info.coffeeChatInfoId,
        mentorUserId: DB.mentorInfo.info.mentorUserId,
        mentorName: DB.mentorInfo.info.mentorName,
        mentorType:
          requestBody.info.mentorType || DB.mentorInfo.info.mentorType,
        jobType: requestBody.info.jobType || DB.mentorInfo.info.jobType,
        introduction:
          requestBody.info.introduction || DB.mentorInfo.info.introduction,
      },
      time: {
        MONDAY: requestBody.time?.MONDAY || DB.mentorInfo.time.MONDAY,
        WEDNESDAY: requestBody.time?.WEDNESDAY || DB.mentorInfo.time.WEDNESDAY,
        SATURDAY: requestBody.time?.THURSDAY || DB.mentorInfo.time.SATURDAY,
        FRIDAY: requestBody.time?.FRIDAY || DB.mentorInfo.time.FRIDAY,
      },
    };

    // 업데이트된 정보 반환
    return HttpResponse.json(DB.mentorInfo, { status: 200 });
  }),

  // 커피챗페이지 핸들러 ------------------------------------------------------------
  http.get(END_POINT.MENTOR_LIST, ({ request }) => {
    const url = new URL(request.url);
    const jobType = url.searchParams.get("jobType");

    let filteredMentors = DB.mentorList.data;
    if (jobType && jobType !== "all") {
      filteredMentors = filteredMentors.filter(
        (mentor) => mentor.jobType === jobType
      );
    }

    return HttpResponse.json(
      {
        data: filteredMentors,
      },
      { status: 200 }
    );
  }),

  http.get(
    END_POINT.MENTOR_APPLICATION_TIME(":coffeeChatInfoId"),
    ({ params }) => {
      const { coffeeChatInfoId } = params;
      console.log(coffeeChatInfoId);

      return HttpResponse.json(DB.mentorApplicationTime, {});
    }
  ),

  http.get(END_POINT.APPROVED_COFFEE_CHATS, () => {
    return HttpResponse.json(DB.approvedCoffeeChats, {});
  }),

  http.get(END_POINT.SENT_COFFEE_CHATS, () => {
    return HttpResponse.json(DB.sentCoffeeChats, {});
  }),

  http.post(END_POINT.SENT_COFFEE_CHATS, async ({ request }) => {
    const body = await request.json();
    const {
      coffeeChatEndTime,
      coffeeChatInfoId,
      coffeeChatStartTime,
      content,
    } = body as MentorApplicationData;

    return HttpResponse.json(
      {
        coffeeChatEndTime,
        coffeeChatInfoId,
        coffeeChatStartTime,
        content,
      },
      { status: 200 }
    );
  }),

  http.get(END_POINT.RECEIVED_COFFEE_CHATS, () => {
    return HttpResponse.json(DB.receivedCoffeeChats, {});
  }),

  http.put(END_POINT.STATUS_CHATS(":coffeeChatAppId"), async ({ request }) => {
    const body = (await request.json()) as { changeStatus: string };
    const { changeStatus } = body;
    return HttpResponse.json(
      {
        changeStatus: changeStatus,
      },
      { status: 200 }
    );
  }),

  // 부트캠프 페이지 핸들러 ------------------------------------------------------------
  http.get(END_POINT.BOOTCAMP_DETAIL(":id"), ({ params }) => {
    const bootcampId = Number(params.id);
    const bootcamp = DB.bootcamps.data.find((b) => b.bootcampId === bootcampId);

    if (!bootcamp) {
      return HttpResponse.json(
        { error: "부트캠프를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const center = DB.trainingCenters.find(
      (c) => c.trainingCenterName === bootcamp.trainingCenterName
    );
    const reviews = DB.reviews.filter(
      (r) => r.trainingCenterName === bootcamp.trainingCenterName
    );

    return HttpResponse.json({
      ...bootcamp,
      ...center,
      reviews,
    });
  }),

  http.get(END_POINT.BOOTCAMP_JOB_ROLES, () => {
    return HttpResponse.json(DB.bootcampJobRoles, {});
  }),

  http.get(END_POINT.BOOTCAMPS_AUTOCOMPLETE, ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get("query")?.toLowerCase() ?? "";

    const results = DB.bootcamps.data
      .filter((bootcamp) => bootcamp.bootcampName.toLowerCase().includes(query))
      .map(({ bootcampId, bootcampName }) => ({
        bootcampId,
        bootcampName,
      }));

    return HttpResponse.json(results);
  }),

  // 리뷰 페이지 핸들러 ------------------------------------------------------------
  http.get(END_POINT.REVIEWS, ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") || "0");
    const size = Number(url.searchParams.get("size") || "10");

    const start = page * size;
    const end = start + size;

    const totalItems = DB.reviews.length;
    const totalPages = Math.ceil(totalItems / size);
    const pagedData = DB.reviews.slice(start, end);

    return HttpResponse.json({
      content: pagedData,
      number: page,
      totalPages: totalPages,
      totalElements: totalItems,
      last: page + 1 >= totalPages,
      size: size,
      pageable: {
        pageNumber: page,
      },
    });
  }),

  http.get(END_POINT.NOTIFICATIONS, ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") || "1");
    const limit = Number(url.searchParams.get("limit") || "10");
    const start = (page - 1) * limit;
    const end = start + limit;

    if (!DB.notifications || DB.notifications.length === 0) {
      return HttpResponse.json({
        notificationResponseDtoList: [],
        uncheckedCount: 0,
      });
    }

    const slice = DB.notifications.slice(start, end);
    const uncheckedCount = DB.notifications.filter((n) => !n.checked).length;

    return HttpResponse.json({
      notificationResponseDtoList: slice,
      uncheckedCount,
    });
  }),

  // 알림 읽음 처리
  http.patch(END_POINT.NOTIFICATIONS, async ({ request }) => {
    const url = new URL(request.url);
    const timeParam = url.searchParams.get("time");

    if (!timeParam) {
      return HttpResponse.json(
        { message: "time 파라미터가 필요합니다." },
        { status: 400 }
      );
    }

    DB.notifications.forEach((n) => {
      if (new Date(n.createdAt) <= new Date(timeParam)) {
        n.checked = true;
      }
    });

    return HttpResponse.json(
      { message: "알림을 확인하였습니다." },
      { status: 200 }
    );
  }),

  // 1:1 채팅 페이지 핸들러 ------------------------------------------------------------
  http.get(END_POINT.CHAT_ROOM_LIST, () => {
    return HttpResponse.json(DB.chatRoomList, {});
  }),

  http.get(END_POINT.CHAT_ROOM(":roomUuid"), ({ params }) => {
    const roomUuid = params.roomUuid;
    const chatRoom = DB.chatRoomList.find((c) => c.roomUuid === roomUuid);

    if (!chatRoom) {
      return HttpResponse.json(
        { error: "채팅방을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return HttpResponse.json(chatRoom, {});
  }),

  // 관리자 페이지 핸들러 ------------------------------------------------------------
  http.get(END_POINT.ADMIN_CERTIFICATION, () => {
    return HttpResponse.json({
      certifications: DB.certifications,
    });
  }),

  http.patch("/api/admin/certifications/:id", ({ request, params }) => {
    const { id } = params;
    const url = new URL(request.url);
    const status = url.searchParams.get("status");

    const target = DB.certifications.find(
      (cert) => cert.certificationId === Number(id)
    );
    if (target && status) {
      target.status = status;
      return HttpResponse.json({ success: true });
    }

    return new HttpResponse("Not Found", { status: 404 });
  }),

  // 로그인 페이지 핸들러 ------------------------------------------------------------

  http.post("/api/test/users/signup", async ({ request }) => {
    const formData = await request.formData();

    const job = formData.get("desired_career")?.toString() || "";
    const file = formData.get("profile_image") as File | null;

    if (!job) {
      return HttpResponse.json(
        { message: "직무 선택은 필수입니다" },
        { status: 400 }
      );
    }

    const newUser = {
      ...DB.myInfo,
      desired_career: job,
      profile_image: file?.name || null,
    };

    // DB.myInfo = newUser; // mock db에 반영

    return HttpResponse.json(
      {
        message: "회원가입 완료",
        data: newUser,
      },
      { status: 200 }
    );
  }),

  http.get(END_POINT.NAVER_REDIRECT, () => {
    return new HttpResponse(null, {
      status: 302,
      headers: {
        Location: "/",
        "Set-Cookie":
          "Authorization=Bearer mock_access_token; Path=/; HttpOnly; Max-Age=3600, refreshToken=mock_refresh_token; Path=/; HttpOnly; Max-Age=86400",
      },
    });
  }),

  http.post(END_POINT.LOGOUT, () => {
    return new HttpResponse(null, {
      status: 200,
      headers: {
        "Set-Cookie":
          "Authorization=; Path=/; HttpOnly; Max-Age=0, refreshToken=; Path=/; HttpOnly; Max-Age=0",
      },
    });
  }),
];
