"use client";

import React from "react";
import { Certification } from "@/types/response";

interface Props {
  cert: Certification;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
  onView: (fileUrl: string) => void;
}

const CertificationCard = ({ cert, onApprove, onReject, onView }: Props) => {
  return (
    <div className="p-4 border border-gray-200 rounded-lg shadow-sm flex justify-between items-center">
      <div>
        <p className="text-lg font-medium">{cert.userName}</p>
        <p className="text-sm text-gray-500">직무 : {cert.categoryName}</p>
      </div>
      <div className="space-x-2 flex items-center">
        <button
          onClick={() => onApprove(cert.certificationId)}
          className="px-3 py-1.5 text-sm bg-emerald-600 text-white rounded hover:bg-emerald-700"
        >
          승인
        </button>
        <button
          onClick={() => onReject(cert.certificationId)}
          className="px-3 py-1.5 text-sm bg-red-500 text-white rounded hover:bg-red-600"
        >
          거절
        </button>
        <button
          onClick={() => onView(cert.fileUrl)}
          className="px-3 py-1.5 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          수료증 보기
        </button>
      </div>
    </div>
  );
};

export default CertificationCard;
