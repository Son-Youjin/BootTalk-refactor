"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
// import { END_POINT } from "@/constants/endPoint";
import { useSearchSuggestions, BootcampSuggestion } from "@/hooks/useSerchSuggestions";
import clsx from "clsx";

const SearchSection = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    query,
    setQuery,
    suggestions,
    isOpen,
    setIsOpen,
    isLoading,
    inputRef,
    dropdownRef,
  } = useSearchSuggestions();

  const handleSuggestionClick = (suggestion: BootcampSuggestion) => {
    router.push(`/bootcamps/${suggestion.bootcampId}`);
    setIsOpen(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && suggestions.length > 0) {
      router.push(`/bootcamps/${suggestions[0].bootcampId}`);
      setQuery("");
      setIsOpen(false);
    }
  };  

  if (!mounted) return null;

  return (
    <section
      className={clsx(
        "w-full flex justify-center relative transition-all duration-300",
        "pt-40 pb-20",
        "lg:pt-36 lg:pb-16",
        "md:pt-28 md:pb-14",
        "sm:pt-20 sm:pb-10",
        "pt-10 pb-8",
        "bg-[url('/main-search-bg.jpg')] bg-cover bg-center"
      )}
    >
      <div className="relative w-full max-w-sm px-4 sm:max-w-xl sm:px-0">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-700" size={20} />
        <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.trim().length > 0 && setIsOpen(true)}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="부트캠프명 또는 키워드를 검색해보세요"
            className={clsx(
              "w-full bg-white border border-gray-300 shadow-md focus:outline-none",
              "text-xs sm:text-sm md:text-base",
              "py-2 sm:py-3 md:py-4",
              "pl-11 pr-4",
              isOpen ? "rounded-t-2xl rounded-b-none" : "rounded-full"
            )}
        />

        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-full left-0 w-full bg-white border border-t-0 border-gray-300 rounded-b-xl shadow-md z-[100]"
          >
            {isLoading ? (
              <div className="px-4 py-2 text-center">
                <div className="w-5 h-5 mx-auto border-t-2 border-b-2 border-amber-950 rounded-full animate-spin"></div>
              </div>
            ) : suggestions.length > 0 ? (
              <ul>
                {suggestions.map((suggestion) => (
                  <li
                  key={suggestion.bootcampId}
                  onClick={() => handleSuggestionClick(suggestion)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-left truncate"
                  >
                    {suggestion.bootcampName}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-2 text-gray-500 text-center">
                검색 결과가 없습니다
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchSection;
