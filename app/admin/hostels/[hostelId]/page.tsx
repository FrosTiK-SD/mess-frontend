"use client";

import { HostelPopulatedViewer } from "@/components/Hostel/HostelPopulated";
import { LoadingComponent } from "@/components/LoadingOverlay";
import { useGetHostelById } from "@/hooks/hostel";
import { useGetHostelRooms } from "@/hooks/rooms";
import { RoomPopulated } from "@/types/room";
import { FindDocument, RemoveDocument } from "@/utils/utils";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function HostelPage() {
  let { hostelId } = useParams();
  console.log(hostelId);
  hostelId =
    typeof hostelId == "string" ? hostelId : hostelId?.[hostelId.length - 1];

  const roomsQuery = useGetHostelRooms(hostelId);
  const hostelQuery = useGetHostelById(hostelId);

  const [roomSelection, setRoomSelection] = useState<Array<RoomPopulated>>([]);

  return (
    <div>
      {roomsQuery.isSuccess && hostelQuery.isSuccess ? (
        <HostelPopulatedViewer
          hostelRooms={roomsQuery.data}
          hostel={hostelQuery.data}
          caretakers={[]}
          onTilePress={(room) =>
            setRoomSelection((rooms) => updateRoomSelection(rooms, room))
          }
          selectedRooms={roomSelection}
        />
      ) : (
        <LoadingComponent
          visible={roomsQuery.isLoading || hostelQuery.isLoading}
        />
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
