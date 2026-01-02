"use client";

import React from "react";
import { useGetExample } from "@/hooks/useGetExample";

export default function ExamplePage() {
  const { example } = useGetExample();

  return (
    <div className="container">
      <h1>Example Page</h1>
      {example ? (
        <div>
          <p>ID: {example.id}</p>
          <p>이름: {example.name}</p>
        </div>
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
}
