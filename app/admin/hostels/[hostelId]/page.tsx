"use client";

import { HostelPopulatedViewer } from "@/components/Hostel/HostelPopulated";
import { getSampleHostelPopulated } from "@/temp/hostelPopulated";
import { useParams } from "next/navigation";

export default function HostelPage() {
  const { hostelId } = useParams();
  const sampleHostelPopulated = getSampleHostelPopulated(
    parseInt(hostelId.toString()),
  );
  return (
    <div>
      <HostelPopulatedViewer hostelPopulated={sampleHostelPopulated} />
    </div>
  );
}
