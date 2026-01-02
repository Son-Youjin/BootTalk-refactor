export const STATIC_FILTER_OPTIONS = [
  { key: "region", label: "지역", options: ["서울", "부산", "인천", "대전", "대구", "온라인"] },
  { 
    key: "duration", 
    label: "기간", 
    options: ["4주 미만", "4~12주", "12주 이상"],
    valueMap: {
      "4주 미만": "1",
      "4~12주": "2",
      "12주 이상": "3"
    }
  },
  { 
    key: "minRating",
    label: "평점",
    options: [
      { label: "2점 대", value: "2" },
      { label: "3점 대", value: "3" },
      { label: "4점 대", value: "4" },
    ],
  },
];
