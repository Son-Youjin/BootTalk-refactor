"use client";

interface BootcampTagsMobileProps {
  category: string;
  region: string;
  capacity: number;
}

const BootcampTagsMobile = ({ category, region, capacity }: BootcampTagsMobileProps) => {
  return (
    <div className="flex gap-2 flex-wrap lg:hidden text-xs mt-2">
      <span className="badge bg-gray-100 px-3 py-1 rounded-full max-w-[200px] truncate">
        {category}
      </span>
      <span className="badge bg-gray-100 px-3 py-1 rounded-full">{region}</span>
      <span className="badge bg-gray-100 px-3 py-1 rounded-full">{capacity}명</span>
    </div>
  );
};

export default BootcampTagsMobile;
