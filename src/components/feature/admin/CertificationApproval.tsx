"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetCertificationList } from "@/hooks/admin/useGetCertificationList";
import { usePatchCertificationStatus } from "@/hooks/admin/usePatchCertificationStatus";
import PaginationControls from "./PaginationControls";
import ImageModal from "./ImageModal";
import CertificationCard from "./CertificationCard";
import { Certification } from "@/types/response";

const CertificationApproval = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const {
    data: certifications = [],
    isLoading,
    isError,
  } = useGetCertificationList();
  const { mutate: patchStatus } = usePatchCertificationStatus();

  const ITEMS_PER_PAGE = 5;
  // const filtered = certifications.filter((cert: Certification) => cert.status === "PENDING");
  const filtered = certifications; // 필터링 제거(디버깅용)
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleStatusChange = (id: number, status: Certification["status"]) => {
    const previousCertifications = queryClient.getQueryData<Certification[]>([
      "admin-certifications",
    ]);

    queryClient.setQueryData<Certification[]>(
      ["admin-certifications"],
      (old) => old?.filter((cert) => cert.certificationId !== id) || []
    );

    patchStatus(
      { id, status },
      {
        onError: () => {
          queryClient.setQueryData(
            ["admin-certifications"],
            previousCertifications
          );
        },
      }
    );
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>불러오지 못했습니다.</div>;

  return (
    <div className="space-y-4 relative min-h-[500px]">
      {paginated.length === 0 ? (
        <p className="text-gray-500">수료증 인증 요청이 없습니다.</p>
      ) : (
        paginated.map((cert: Certification) => (
          <CertificationCard
            key={cert.certificationId}
            cert={cert}
            onApprove={(id) => handleStatusChange(id, "APPROVED")}
            onReject={(id) => handleStatusChange(id, "REJECTED")}
            onView={setSelectedImage}
          />
        ))
      )}

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

      <ImageModal
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </div>
  );
};

export default CertificationApproval;
