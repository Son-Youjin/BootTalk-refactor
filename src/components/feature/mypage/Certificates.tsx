import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { useFileUpload } from "@/hooks/my-page/useFileUpload";
import { Course } from "@/types/response";
import { useMutation, useQuery } from "@tanstack/react-query";
import { BadgeInfo, Search } from "lucide-react";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

const fetchCourses = async (query: string): Promise<Course[]> => {
  const res = await axiosDefault.get(
    `${END_POINT.COURSES}?query=${encodeURIComponent(query)}`
  );
  return res.data;
};

const fetchCertificate = async (data: {
  courseId: number;
  fileUrl: string;
}) => {
  const res = await axiosDefault.post(END_POINT.CERTIFICATE, data);
  return res.data;
};

const Certificates = () => {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Course[]>([]);
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [certificateFile, setCertificateFile] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const { data: coursesData, isLoading } = useQuery<Course[]>({
    queryKey: ["courses", debouncedQuery],
    queryFn: () => fetchCourses(debouncedQuery),
    enabled: debouncedQuery.length > 0,
  });

  useEffect(() => {
    if (coursesData && coursesData.length > 0) {
      setSuggestions(coursesData);
    } else {
      setSuggestions([]);
    }
  }, [coursesData]);

  const handleSelect = (course: Course) => {
    setQuery(course.courseName);
    setSelectedCourse(course);
    setSuggestions([]);
  };

  // 수료증 업로드
  const { uploadFileAsync, isPending } = useFileUpload();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const upLoadedUrl = await uploadFileAsync(file);
      setCertificateFile(upLoadedUrl);
    }
  };

  // 폼 제출
  const certificateMutation = useMutation({
    mutationFn: fetchCertificate,
    onSuccess: () => {
      toast.success("수료증이 성공적으로 제출되었습니다.");

      // 폼 초기화
      setQuery("");
      setSelectedCourse(null);
      setCertificateFile(null);

      // 파일 입력 필드 초기화
      const fileInput = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    },
    onError: (error) => {
      console.log("수료증 제출 오류:", error);
      toast.error("수료증 제출 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedCourse) {
      toast.error("코스를 선택해주세요.");
      return;
    }

    if (!certificateFile) {
      toast.error("수료증 사진을 업로드해주세요.");
      return;
    }

    certificateMutation.mutate({
      courseId: selectedCourse.courseId,
      fileUrl: certificateFile,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6">
        <div className="relative">
          <h3 className="mb-3 text-base-content">코스명</h3>
          <label className="input flex items-center gap-2">
            <Search size={14} className="opacity-50" />
            <input
              type="search"
              required
              placeholder="코스명을 검색하세요."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
            />
          </label>

          {suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 bg-white border rounded shadow mt-1 z-10 max-h-60 overflow-y-auto">
              {suggestions.map((course) => (
                <li
                  key={course.courseId}
                  className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => handleSelect(course)}
                >
                  {course.courseName}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h3 className="mb-3 text-base-content">수료증 업로드</h3>
          <input
            type="file"
            accept="image/*"
            className="file-input"
            onChange={handleFileChange}
            disabled={isPending}
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="btn bg-amber-900 text-white hover:bg-amber-950"
            disabled={isLoading || isPending || certificateMutation.isPending}
          >
            제출
          </button>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4 text-sm text-gray-600 leading-relaxed flex items-start gap-2">
          <BadgeInfo className="text-gray-500 mt-[2px] min-w-[20px]" size={18} />
          <div className="flex flex-col">
            <span>제출한 수료증 이미지와 코스명은 <b>고용24</b>의 부트캠프 정보와 비교해 인증됩니다.</span>
            <span>일치하지 않을 경우 인증이 반려될 수 있습니다.</span>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Certificates;
