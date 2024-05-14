"use client";

import { useParams } from "next/navigation";

export default function HostelPage() {
  const { hostelId } = useParams();

  return <div>{hostelId}</div>;
}
