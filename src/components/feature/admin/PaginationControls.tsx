"use client";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const PaginationControls = ({
  currentPage,
  totalPages,
  setCurrentPage,
}: PaginationControlsProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-2 mt-6">
      {Array.from({ length: totalPages }, (_, idx) => (
        <button
          key={idx + 1}
          onClick={() => setCurrentPage(idx + 1)}
          className={`px-3 py-1 rounded ${
            currentPage === idx + 1
              ? "bg-amber-950 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {idx + 1}
        </button>
      ))}
    </div>
  );
};

export default PaginationControls;
