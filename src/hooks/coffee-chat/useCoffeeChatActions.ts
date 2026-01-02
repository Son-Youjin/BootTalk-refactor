import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

export type ActionType = "APPROVE" | "REJECT" | "CANCEL";
export type UserRole = "MENTOR" | "MENTEE";
interface ModalState {
  isOpen: boolean;
  actionType: ActionType;
  coffeeChatAppId: string;
  isPenalty: boolean;
}

export const useCoffeeChatActions = (userRole: UserRole = "MENTOR") => {
  const queryClient = useQueryClient();

  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    actionType: "APPROVE",
    coffeeChatAppId: "",
    isPenalty: false,
  });

  // 승인 mutation
  const approveMutation = useMutation({
    mutationFn: async (coffeeChatAppId: string) => {
      const url = END_POINT.STATUS_CHATS(coffeeChatAppId);
      return await axiosDefault.put(url, {
        changeStatus: "APPROVED",
      });
    },
    onSuccess: () => {
      // 성공 시 목록 갱신
      queryClient.invalidateQueries({
        queryKey: ["receivedList"],
      });
      queryClient.invalidateQueries({
        queryKey: ["approvedList"],
      });
      queryClient.invalidateQueries({
        queryKey: ["sentList"],
      });
      queryClient.invalidateQueries({
        queryKey: ["chatRoomList"],
      });
      toast.success("커피챗이 승인되었습니다.");
    },
    onError: (error) => {
      console.error("승인 처리 중 오류 발생:", error);
      toast.error("승인 처리 중 오류가 발생했습니다.");
    },
  });

  // 거절 mutation
  const rejectMutation = useMutation({
    mutationFn: async (coffeeChatAppId: string) => {
      const url = END_POINT.STATUS_CHATS(coffeeChatAppId);
      return await axiosDefault.put(url, {
        changeStatus: "REJECTED",
      });
    },
    onSuccess: () => {
      // 성공 시 목록 갱신
      queryClient.invalidateQueries({ queryKey: ["receivedList"] });
      queryClient.invalidateQueries({ queryKey: ["sentList"] });
      toast.success("커피챗이 거절되었습니다.");
    },
    onError: (error) => {
      console.error("거절 처리 중 오류 발생:", error);
      toast.error("거절 처리 중 오류가 발생했습니다.");
    },
  });

  // 취소 mutation
  const cancelMutation = useMutation({
    mutationFn: async (coffeeChatAppId: string) => {
      let url;

      if (userRole === "MENTEE") {
        url = END_POINT.RECEIVED_CANCEL(coffeeChatAppId);
        return await axiosDefault.put(url);
      } else {
        const url = END_POINT.STATUS_CHATS(coffeeChatAppId);
        return await axiosDefault.put(url, {
          changeStatus: "CANCELED",
        });
      }
    },
    onSuccess: () => {
      // 성공 시 목록 갱신
      queryClient.invalidateQueries({ queryKey: ["receivedList"] });
      queryClient.invalidateQueries({ queryKey: ["sentList"] });
      queryClient.invalidateQueries({
        queryKey: ["approvedList"],
      });
      queryClient.invalidateQueries({
        queryKey: ["chatRoomList"],
      });
      toast.success("커피챗이 취소되었습니다.");
    },
    onError: (error) => {
      console.error("취소 처리 중 오류 발생:", error);
      toast.error("취소 처리 중 오류가 발생했습니다.");
    },
  });

  const closeModal = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  const confirmAction = () => {
    const { actionType, coffeeChatAppId } = modalState;

    switch (actionType) {
      case "APPROVE":
        approveMutation.mutate(coffeeChatAppId);
        break;
      case "REJECT":
        rejectMutation.mutate(coffeeChatAppId);
        break;
      case "CANCEL":
        cancelMutation.mutate(coffeeChatAppId);
        break;
    }
    closeModal();
  };

  // 승인 처리 핸들러
  const handleApprove = (coffeeChatAppId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setModalState({
      isOpen: true,
      actionType: "APPROVE",
      coffeeChatAppId,
      isPenalty: false,
    });
  };

  // 거절 처리 핸들러
  const handleReject = (coffeeChatAppId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setModalState({
      isOpen: true,
      actionType: "REJECT",
      coffeeChatAppId,
      isPenalty: false,
    });
  };

  // 취소 처리 핸들러
  const handleCancel = (
    coffeeChatAppId: string,
    coffeeChatStartTime: string,
    e?: React.MouseEvent
  ) => {
    e?.stopPropagation();

    const today = new Date();
    const timeDiff = new Date(coffeeChatStartTime).getTime() - today.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    const isPenalty = dayDiff <= 1;

    setModalState({
      isOpen: true,
      actionType: "CANCEL",
      coffeeChatAppId,
      isPenalty,
    });
  };

  return {
    handleApprove,
    handleReject,
    handleCancel,
    isApproving: approveMutation.isPending,
    isRejecting: rejectMutation.isPending,
    isCanceling: cancelMutation.isPending,
    modalState,
    closeModal,
    confirmAction,
  };
};
