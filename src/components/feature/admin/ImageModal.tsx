"use client";

import { X } from "lucide-react";
import Image from "next/image";

interface ImageModalProps {
  selectedImage: string | null;
  setSelectedImage: (url: string | null) => void;
}

const ImageModal = ({ selectedImage, setSelectedImage }: ImageModalProps) => {
  if (!selectedImage) return null;

  return (
    <div
      onClick={() => setSelectedImage(null)}
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
    >
      <div
        className="relative bg-white p-4 rounded shadow-lg max-w-md max-h-[60vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={() => setSelectedImage(null)}
        >
          <X size={20} />
        </button>
        <Image
          src={selectedImage}
          alt="수료증 미리보기"
          className="max-w-full max-h-[50vh] object-contain"
          width={500}
          height={300}
        />
      </div>
    </div>
  );
};

export default ImageModal;
