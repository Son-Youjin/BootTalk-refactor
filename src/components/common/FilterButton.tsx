import { X } from "lucide-react";
import clsx from "clsx";

interface FilterButtonProps {
  label: string;
  selectedValue?: string;
  onClick: () => void;
  onClear: () => void;
}

export default function FilterButton({
  label,
  selectedValue,
  onClick,
  onClear,
}: FilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "h-[36px] min-w-[90px] px-4 rounded-full text-sm font-medium transition-all duration-200 border",
        "flex justify-center items-center relative",
        selectedValue
          ? "bg-amber-800 text-white shadow-md hover:bg-amber-700 border-transparent"
          : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
      )}
    >
      <span className={clsx(
        "truncate",
        selectedValue ? "pr-5" : ""
      )}>
        {selectedValue ?? label}
      </span>

      <span className={clsx(
        "absolute right-3 flex items-center justify-center",
        selectedValue ? "opacity-100" : "opacity-0 pointer-events-none"
      )}>
        <X
          className="w-4 h-4 text-white/80 hover:text-white"
          onClick={(e) => {
            e.stopPropagation();
            onClear();
          }}
        />
      </span>
    </button>
  );
}