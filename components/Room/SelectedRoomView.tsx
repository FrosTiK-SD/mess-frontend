import {
  useCreateRoomAllotmentMutation,
  useGetSemesterRoomAllotmentsWithUser,
} from "@/hooks/roomAllotments";
import { useGetChosenSemester } from "@/hooks/semesters";
import { FetchUserByRollNo, useGetCachedCurrentUser } from "@/hooks/user";
import { RoomWithAllotments } from "@/types/room";
import { AppUser } from "@/types/user";
import { GetName } from "@/utils/student";
import { Accordion, Button, NumberInput } from "@mantine/core";
import { useField } from "@mantine/form";
import { useState } from "react";

export function SelectedRoomsView(props: {
  selectedRooms: Array<RoomWithAllotments>;
}) {
  return (
    <Accordion multiple>
      {props.selectedRooms.map((room) => (
        <SelectedRoom key={room._id} room={room} />
      ))}
    </Accordion>
  );
}
function SelectedRoom(props: { room: RoomWithAllotments }) {
  const [addStudentMode, setAddStudentMode] = useState<boolean>(false);
  const rollNo = useField<number>({
    initialValue: 0,
  });
  const [fetchedStudent, setFetchedStudent] = useState<AppUser>();
  const createRoomAllotment = useCreateRoomAllotmentMutation();
  const chosenSemester = useGetChosenSemester();
  const currentUser = useGetCachedCurrentUser();
  const roomAllotments = useGetSemesterRoomAllotmentsWithUser(
    chosenSemester ?? "",
    props.room._id,
    chosenSemester != null,
  );
  return (
    <Accordion.Item key={props.room._id} value={props.room._id}>
      <Accordion.Control>Room {props.room.number}</Accordion.Control>
      <Accordion.Panel>
        <div>
          Allocated To
          <div>
            {roomAllotments.data?.map((roomAllotment) => (
              <div key={roomAllotment.user._id}>
                {GetName(roomAllotment.user)}
              </div>
            ))}
          </div>
          {!addStudentMode ? (
            <div onClick={() => setAddStudentMode(true)}>Allocate Student</div>
          ) : fetchedStudent == undefined ? (
            <div className="flex flex-row items-end space-x-3">
              <NumberInput label="Roll No" {...rollNo.getInputProps()} />
              <Button
                onClick={async () => {
                  setFetchedStudent(await FetchUserByRollNo(rollNo.getValue()));
                }}
              >
                {" "}
                Fetch Student{" "}
              </Button>
            </div>
          ) : (
            <div className="flex flex-row">
              <div>{GetName(fetchedStudent)}</div>
              <Button
                onClick={() => {
                  createRoomAllotment.mutate({
                    _id: "",
                    room: props.room._id,
                    semester: chosenSemester ?? "",
                    user: currentUser.data?._id ?? "",
                  });
                  setAddStudentMode(false);
                }}
              >
                Allot
              </Button>
            </div>
          )}
        </div>
      </Accordion.Panel>
      {/* <Button> Allocate Student</Button> */}
    </Accordion.Item>
  );
}
