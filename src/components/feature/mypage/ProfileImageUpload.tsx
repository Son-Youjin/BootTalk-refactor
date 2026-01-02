import { useFileUpload } from "@/hooks/my-page/useFileUpload";
import { Pencil } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface ProfileImageUploadProps {
  setImage: (imageUrl: string | null) => void;
  initialImageUrl?: string | null;
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  setImage,
  initialImageUrl,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialImageUrl || null
  );

  const { uploadFileAsync, isPending } = useFileUpload();

  useEffect(() => {
    setPreviewUrl(initialImageUrl || null);
  }, [initialImageUrl]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));

      try {
        const uploadedUrl = await uploadFileAsync(file);
        console.log("파일 url 가져오기:", uploadedUrl);
        setImage(uploadedUrl);
      } catch (error) {
        console.error("이미지 업로드 실패:", error);
      }
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center mb-3">
      <div className="relative mb-2">
        <div
          className={`w-32 h-32 rounded-full overflow-hidden shadow-lg${
            isPending ? "opacity-70" : ""
          }`}
        >
          <Image
            src={previewUrl || "/profile-default.png"}
            alt="프로필 이미지"
            width={128}
            height={128}
            className="w-full h-full object-cover"
          />
          {isPending && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
              <div className="loader w-8 h-8 rounded-full animate-spin border-4 border-t-amber-600"></div>
            </div>
          )}
        </div>
        <button
          className="absolute bottom-0 right-0 bg-amber-900 text-white p-2 rounded-full shadow-md cursor-pointer"
          type="button"
          onClick={handleImageClick}
          disabled={isPending}
        >
          <Pencil size={18} />
        </button>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
        disabled={isPending}
      />
      <p className="text-sm text-gray-500">
        {isPending ? "업로드 중..." : "클릭하여 프로필 사진 변경"}
      </p>
    </div>
  );
};

export default ProfileImageUpload;
