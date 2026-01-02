"use client";

import { useState } from "react";
import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import ReviewModal from "./ReviewModal";
import type { ReviewBootcamp, Certification, Review } from "@/types/response";
import toast from "react-hot-toast";

interface WriteReviewButtonProps {
  refetch?: () => Promise<unknown>;
}

export default function WriteReviewButton({ refetch }: WriteReviewButtonProps) {
  const [selectedBootcamp, setSelectedBootcamp] =
    useState<ReviewBootcamp | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReviewClick = async () => {
    try {
      const userRes = await axiosDefault.get(END_POINT.MY_INFO);
      const { name, certifications } = userRes.data as {
        name: string;
        certifications: Certification[];
      };

      const reviewRes = await axiosDefault.get(END_POINT.MY_REVIEWS);
      const reviewedIds = (reviewRes.data.data as Review[]).map(
        (review) => review.trainingProgramId
      );

      const unreviewed = certifications.find(
        (cert) =>
          cert.trainingProgramId !== undefined &&
          !reviewedIds.includes(cert.trainingProgramId)
      );

      if (!unreviewed || !unreviewed.trainingProgramId) {
        toast.error("작성 가능한 리뷰가 없습니다.");
        return;
      }

      setSelectedBootcamp({
        userName: name,
        courseName: unreviewed.courseName,
        categoryName: unreviewed.categoryName,
        trainingProgramId: unreviewed.trainingProgramId!,
      });

      setIsModalOpen(true);
    } catch {
      toast.error("리뷰 작성 정보를 불러오지 못했습니다.");
    }
  };

  return (
    <>
      <button
        className="btn px-5 py-2 bg-amber-900 text-white rounded-lg hover:bg-amber-950 transition-colors"
        onClick={handleReviewClick}
      >
        리뷰 작성
      </button>

      {selectedBootcamp && isModalOpen && (
        <ReviewModal
          isOpen={isModalOpen}
          onCloseAction={async () => {
            setIsModalOpen(false);
            if (refetch) await refetch();
          }}
          bootcamp={selectedBootcamp}
          mode="create"
          refetch={refetch}
        />
      )}
    </>
  );
}
