import { Star } from "lucide-react";

interface RatingSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export const RatingSelector = ({ value, onChange }: RatingSelectorProps) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => onChange(i + 1)}
        className="focus:outline-none"
        aria-label={`별점 ${i + 1}점 선택`}
      >
        <Star
          className={`w-5 h-5 ${
            i < value ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      </button>
    ))}
  </div>
);
