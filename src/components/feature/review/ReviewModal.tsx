"use client";

import { useState, useEffect } from "react";
import Modal from "@/components/common/modal/CommonModal";
import { RatingSelector } from "@/components/feature/review/RatingSelector";
import { END_POINT } from "@/constants/endPoint";
import { axiosDefault } from "@/api/axiosInstance";
import type { ReviewBootcamp } from "@/types/response";
import toast from "react-hot-toast";

interface ReviewModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
  bootcamp: ReviewBootcamp;
  mode?: "create" | "edit";
  reviewId?: number;
  defaultRating?: number;
  defaultContent?: string;
  refetch?: () => Promise<unknown>;
}

export default function ReviewModal({
  isOpen,
  onCloseAction,
  bootcamp,
  mode = "create",
  reviewId,
  defaultRating = 0,
  defaultContent = "",
  refetch,
}: ReviewModalProps) {
  const [rating, setRating] = useState(defaultRating);
  const [content, setContent] = useState(defaultContent);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setRating(defaultRating);
      setContent(defaultContent);
    } else {
      setRating(0);
      setContent("");
    }
  }, [isOpen, defaultRating, defaultContent]);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (!bootcamp.trainingProgramId) {
      toast.error("부트캠프 정보를 불러오지 못했습니다.");
      setIsSubmitting(false);
      return;
    }
    if (rating === 0 || content.trim() === "") {
      toast.error("별점과 후기를 모두 작성해주세요!");
      setIsSubmitting(false);
      return;
    }

    const payload = { rating, content };

    try {
      if (mode === "edit" && reviewId != null) {
        await axiosDefault.put(END_POINT.UPDATE_REVIEW(reviewId), payload);
        toast.success("리뷰가 수정되었습니다!");
      } else {
        await axiosDefault.post(END_POINT.REVIEWS, {
          trainingProgramId: bootcamp.trainingProgramId,
          rating,
          content,
        });
        toast.success("리뷰가 등록되었습니다!");
      }

      if (refetch) {
        await refetch();
      }

      onCloseAction();
    } catch (err) {
      console.error("리뷰 저장 에러:", err);
      toast.error("리뷰 저장 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCloseAction}
      title={mode === "edit" ? "리뷰 수정" : "리뷰 작성"}
      size="lg"
    >
      <div className="space-y-4 text-gray-700">
        <div className="grid grid-cols-2 gap-4">
          <input
            className="input input-bordered w-full"
            disabled
            value={bootcamp.courseName}
          />
          <input
            className="input input-bordered w-full"
            disabled
            value={bootcamp.userName}
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">별점</span>
          <RatingSelector value={rating} onChange={setRating} />
        </div>

        <div>
          <textarea
            placeholder="후기를 작성해주세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={500}
            className="textarea textarea-bordered w-full h-28 resize-none focus:outline-none"
          />
          <div className="text-right text-sm text-gray-400">
            {content.length}/500
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            className="btn btn-outline border-gray-400 rounded-lg"
            onClick={onCloseAction}
          >
            취소
          </button>
          <button
            className="btn bg-amber-900 text-white rounded-lg"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {mode === "edit" ? "수정" : "작성"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
