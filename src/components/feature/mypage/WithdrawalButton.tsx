import { axiosDefault } from "@/api/axiosInstance";
import Modal from "@/components/common/modal/CommonModal";
import { END_POINT } from "@/constants/endPoint";
import { useUserStore } from "@/store/useUserStore";
import { useMutation } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const WithdrawalButton = () => {
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
  const router = useRouter();
  const logout = useUserStore((state) => state.logout);

  const withdrawalMutation = useMutation({
    mutationFn: async () => {
      return await axiosDefault.delete(END_POINT.MY_INFO);
    },
    onSuccess: () => {
      logout();
      router.push("/");
    },
    onError: (error) => {
      console.error("회원탈퇴 실패:", error);
      toast.error("회원탈퇴에 실패했습니다. 다시 시도해주세요.");
    },
  });

  const handleWithdrawal = () => {
    withdrawalMutation.mutate();
  };

  return (
    <>
      <button
        className="flex items-center gap-2 px-4 py-2 w-full text-gray-500 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 border border-transparent hover:border-red-100"
        onClick={() => setIsWithdrawalModalOpen(true)}
      >
        <LogOut size={18} />
        <span>회원탈퇴</span>
      </button>

      {/* 회원탈퇴 확인 모달 */}
      <Modal
        isOpen={isWithdrawalModalOpen}
        onClose={() => setIsWithdrawalModalOpen(false)}
        title="회원탈퇴"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            정말 탈퇴하시겠습니까? 탈퇴 시 모든 데이터가 삭제되며 이 작업은
            되돌릴 수 없습니다.
          </p>
          <div className="flex justify-end gap-3 mt-6">
            <button
              className="btn btn-outline"
              onClick={() => setIsWithdrawalModalOpen(false)}
            >
              취소
            </button>
            <button
              className="btn btn-neutral"
              onClick={handleWithdrawal}
              disabled={withdrawalMutation.isPending}
            >
              {withdrawalMutation.isPending ? "처리 중..." : "탈퇴하기"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default WithdrawalButton;
