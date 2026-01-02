"use client";

import { useParams } from "next/navigation";
import BootcampDetailClient from "@/components/feature/detail/BootcampDetailClient";

export default function BootcampDetailPage() {
  const params = useParams();
  const id = params.id as string;

  if (!id) {
    return <div>Invalid Bootcamp ID</div>;
  }

  return <BootcampDetailClient id={id} />;
}
