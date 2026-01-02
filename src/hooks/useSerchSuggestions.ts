import { useEffect, useState, useRef } from "react";
import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";

export interface BootcampSuggestion {
  bootcampId: number;
  bootcampName: string;
}

export const useSearchSuggestions = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<BootcampSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length === 0) {
        setSuggestions([]);
        setIsOpen(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await axiosDefault.get(
          `${END_POINT.BOOTCAMPS_AUTOCOMPLETE}?query=${encodeURIComponent(query)}`
        );
        setSuggestions(response.data || []);
        setIsOpen(true);
      } catch {
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return {
    query,
    setQuery,
    suggestions,
    isOpen,
    setIsOpen,
    isLoading,
    inputRef,
    dropdownRef,
  };
};
