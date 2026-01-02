"use client";

import { useEffect, useState, useRef } from "react";
import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import clsx from "clsx";
import { RotateCcw } from "lucide-react";
import FilterButton from "@/components/common/FilterButton";

interface FilterType {
  category?: string;
  date?: string;
}

interface Props {
  selectedFilters: FilterType;
  onFilterChange: (key: "category" | "date", value?: string) => void;
}

export default function ReviewFilterButtons({
  selectedFilters,
  onFilterChange,
}: Props) {
  const [jobRoles, setJobRoles] = useState<string[]>([]);
  const [openDropdown, setOpenDropdown] = useState<"category" | "date" | null>(null);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    async function fetchJobRoles() {
      try {
        const res = await axiosDefault.get<string[]>(END_POINT.BOOTCAMP_JOB_ROLES);
        setJobRoles(res.data);
      } catch {
        setJobRoles([]);
      }
    }
    fetchJobRoles();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        openDropdown &&
        !dropdownRefs.current[openDropdown]?.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  const handleSelect = (key: "category" | "date", value: string) => {
    const newValue = selectedFilters[key] === value ? undefined : value;
    onFilterChange(key, newValue);
    setOpenDropdown(null);
  };

  const clearFilters = () => {
    onFilterChange("category", undefined);
    onFilterChange("date", undefined);
    setOpenDropdown(null);
  };

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {/* 직무 필터 */}
      <div
        className="relative"
        ref={(el: HTMLDivElement | null) => {
          dropdownRefs.current["category"] = el;
        }}
      >
        <FilterButton
          label="직무"
          selectedValue={selectedFilters.category}
          onClick={() =>
            setOpenDropdown(openDropdown === "category" ? null : "category")
          }
          onClear={() => onFilterChange("category", undefined)}
        />
        {openDropdown === "category" && (
          <div className="absolute top-full left-0 mt-1 shadow-lg bg-white rounded-lg z-50 max-h-60 w-44 sm:w-52 overflow-auto">
            <ul className="menu menu-compact p-2">
              {jobRoles.length === 0 ? (
                <li>
                  <span className="text-sm text-gray-400 px-4 py-2">
                    불러올 수 없습니다.
                  </span>
                </li>
              ) : (
                jobRoles.map((role) => (
                  <li key={role}>
                    <button
                      type="button"
                      onClick={() => handleSelect("category", role)}
                      className="w-full text-left text-sm py-2 px-4 hover:bg-gray-100 rounded"
                    >
                      {role}
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>

      {/* 정렬 필터 */}
      <div
        className="relative"
        ref={(el) => {
          dropdownRefs.current["date"] = el;
        }}
      >
        <FilterButton
          label="정렬"
          selectedValue={selectedFilters.date}
          onClick={() =>
            setOpenDropdown(openDropdown === "date" ? null : "date")
          }
          onClear={() => onFilterChange("date", undefined)}
        />
        {openDropdown === "date" && (
          <div className="absolute top-full left-0 mt-1 shadow-lg bg-white rounded-lg z-50 max-h-60 w-40 overflow-auto">
            <ul className="menu menu-compact p-2">
              {["최신순", "오래된순"].map((option) => (
                <li key={option}>
                  <button
                    type="button"
                    onClick={() => handleSelect("date", option)}
                    className={clsx(
                      "w-full text-left text-sm py-2 px-4 hover:bg-gray-100 rounded",
                      selectedFilters.date === option &&
                        "bg-amber-100 text-amber-900 font-semibold"
                    )}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 초기화 버튼 */}
      <button
        type="button"
        onClick={clearFilters}
        className="p-2 border border-gray-300 rounded-full hover:bg-gray-100"
        aria-label="전체 필터 초기화"
      >
        <RotateCcw className="w-4 h-4 text-black" />
      </button>
    </div>
  );
}