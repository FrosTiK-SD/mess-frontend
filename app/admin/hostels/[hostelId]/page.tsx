"use client";

import { HostelPopulatedViewer } from "@/components/Hostel/HostelPopulated";
import { LoadingComponent } from "@/components/LoadingOverlay";
import { Role } from "@/constants/permissions";
import { useGetHostelById } from "@/hooks/hostel";
import { useGetHostelStaffAllotmentsWithUser } from "@/hooks/hostelStaffAllotments";
import { useGetHostelRooms } from "@/hooks/rooms";
import { useGetChosenSemester } from "@/hooks/semesters";
import { RoomWithAllotments } from "@/types/room";
import { FindDocument, RemoveDocument } from "@/utils/utils";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function HostelPage() {
  let { hostelId } = useParams();
  console.log(hostelId);
  hostelId =
    typeof hostelId == "string" ? hostelId : hostelId?.[hostelId.length - 1];

  const semester = useGetChosenSemester();
  const roomsQuery = useGetHostelRooms(
    hostelId,
    semester ?? "",
    semester != null,
  );
  const hostelQuery = useGetHostelById(hostelId);

  const [roomSelection, setRoomSelection] = useState<Array<RoomWithAllotments>>(
    [],
  );

  const staffAllotments = useGetHostelStaffAllotmentsWithUser(hostelId);
  const hostelStaff = (staffAllotments.data ?? []).map(
    (allotment) => allotment.user,
  );

  const caretakers = hostelStaff.filter(
    (staff) => staff.role == Role.CARETAKER,
  );

  return (
    <div>
      {roomsQuery.isSuccess && hostelQuery.isSuccess ? (
        <HostelPopulatedViewer
          hostelRooms={roomsQuery.data}
          hostel={hostelQuery.data}
          caretakers={caretakers}
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
  prevRooms: Array<RoomWithAllotments>,
  room: RoomWithAllotments,
) {
  if (FindDocument(prevRooms, room._id) == -1) {
    return [...prevRooms, room];
  } else {
    return RemoveDocument(prevRooms, room._id);
  }
}
