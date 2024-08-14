"use client";

import { HostelPopulatedViewer } from "@/components/Hostel/HostelPopulated";
import { LoadingComponent } from "@/components/LoadingOverlay";
import { useGetHostelPopulatedById } from "@/hooks/hostel";
import { RoomPopulated } from "@/types/room";
import { FindDocument, RemoveDocument } from "@/utils/utils";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function HostelPage() {
  const { hostelId } = useParams();
  const hostelPopulatedQuery = useGetHostelPopulatedById(hostelId.toString(), {
    withQueryFunction: true,
  });
  const [roomSelection, setRoomSelection] = useState<Array<RoomPopulated>>([]);

  return (
    <div>
      {hostelPopulatedQuery.isSuccess ? (
        <HostelPopulatedViewer
          hostelPopulated={hostelPopulatedQuery.data}
          onTilePress={(room) =>
            setRoomSelection((rooms) => updateRoomSelection(rooms, room))
          }
          selectedRooms={roomSelection}
        />
      ) : (
        <LoadingComponent visible={hostelPopulatedQuery.isLoading} />
      )}
    </div>
  );
}

function updateRoomSelection(
  prevRooms: Array<RoomPopulated>,
  room: RoomPopulated,
) {
  if (FindDocument(prevRooms, room._id) == -1) {
    return [...prevRooms, room];
  } else {
    return RemoveDocument(prevRooms, room._id);
  }
}
