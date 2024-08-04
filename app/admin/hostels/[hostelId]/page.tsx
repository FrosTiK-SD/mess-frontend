"use client";

import { HostelPopulatedViewer } from "@/components/Hostel/HostelPopulated";
import { LoadingComponent } from "@/components/LoadingOverlay";
import { useGetHostelPopulatedById } from "@/hooks/hostel";
import { useParams } from "next/navigation";

export default function HostelPage() {
  const { hostelId } = useParams();
  const hostelPopulatedQuery = useGetHostelPopulatedById(hostelId.toString(), {
    withQueryFunction: true,
  });
  return (
    <div>
      {hostelPopulatedQuery.isSuccess ? (
        <HostelPopulatedViewer hostelPopulated={hostelPopulatedQuery.data} />
      ) : (
        <LoadingComponent visible={hostelPopulatedQuery.isLoading} />
      )}
    </div>
  );
}
