"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import clsx from "clsx";
import { STATIC_FILTER_OPTIONS } from "./bootcampFilters";
import FilterButton from "@/components/common/FilterButton";

interface FilterButtonsProps {
  selectedFilters: Record<string, string>;
  setSelectedFilters: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  categoryOptions: string[];
}

type Option = { label: string; value: string };

export default function FilterButtons({
  selectedFilters,
  setSelectedFilters,
  categoryOptions = [],
}: FilterButtonsProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        openDropdown &&
        !dropdownRefs.current[openDropdown]?.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [openDropdown]);

  const allFilters: { key: string; label: string; options: Option[] }[] = [
    ...STATIC_FILTER_OPTIONS.map((f) => ({
      key: f.key,
      label: f.label,
      options: f.options.map((opt) =>
        typeof opt === "string" ? { label: opt, value: opt } : opt
      ),
    })),
    {
      key: "category",
      label: "직무",
      options: categoryOptions.map((c) => ({ label: c, value: c })),
    },
  ];

  // 필터 선택/해제
  const handleSelect = (key: string, option: Option) => {
    const next = { ...selectedFilters };
    if (next[key] === option.value) {
      delete next[key];
    } else {
      next[key] = option.value;
    }
    setSelectedFilters(next);
    setOpenDropdown(null);
  };

  // 전체 초기화
  const clearAllFilters = () => {
    setSelectedFilters({});
    setOpenDropdown(null);
  };

  return (
    <div className="flex justify-center w-full relative z-50">
      <div className="flex flex-wrap gap-3 items-center justify-center px-4 py-6">
        {allFilters.map((filter) => (
          <div
            key={filter.key}
            ref={(el) => {
              dropdownRefs.current[filter.key] = el;
            }}
            className="relative flex items-center gap-1"
          >
            <FilterButton
              label={filter.label}
              selectedValue={
                filter.options.find((opt) => opt.value === selectedFilters[filter.key])?.label
              }
              onClick={() =>
                setOpenDropdown(openDropdown === filter.key ? null : filter.key)
              }
              onClear={() =>
                setSelectedFilters((prev) => {
                  const copy = { ...prev };
                  delete copy[filter.key];
                  return copy;
                })
              }
            />
            {openDropdown === filter.key && (
              <div
                className={clsx(
                  "absolute top-full left-1/2 -translate-x-1/2 mt-1 shadow bg-white rounded-lg z-50 max-h-60 overflow-y-auto scrollbar-thin",
                  filter.key === "category" ? "w-60 sm:w-48" : "w-28 sm:w-28"
                )}
              >
                <ul className="menu menu-compact p-2">
                  {filter.options.map((option) => (
                    <li key={option.value}>
                      <button
                        type="button"
                        onClick={() => handleSelect(filter.key, option)}
                        className="w-full text-left text-sm py-2 px-4 hover:bg-gray-100 rounded-md whitespace-normal break-words"
                      >
                        {option.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={clearAllFilters}
          className="p-2 border border-gray-300 rounded-full hover:bg-gray-100"
          aria-label="전체 필터 초기화"
        >
          <RotateCcw className="w-4 h-4 text-black" />
        </button>
      </div>
    </div>
  );
}
