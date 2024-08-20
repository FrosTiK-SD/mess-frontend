import { FetchUserByRollNo } from "@/hooks/user";
import { RoomPopulated } from "@/types/room";
import { AppUser } from "@/types/user";
import { GetName } from "@/utils/student";
import { FindDocument } from "@/utils/utils";
import { Accordion, Button, Grid, NumberInput } from "@mantine/core";
import { useField } from "@mantine/form";
import { useState } from "react";

export interface RoomPopulatedGridParams {
  roomPopulatedList: Array<RoomPopulated>;
  selectedRooms: Array<RoomPopulated>;
  onTilePress?: (room: RoomPopulated) => void;
}
export function RoomPopulatedGrid({
  roomPopulatedList,
  selectedRooms,
  onTilePress,
}: RoomPopulatedGridParams) {
  return (
    <Grid columns={20} gutter="xs">
      {roomPopulatedList.map((room) => (
        <RenderRoomGridTile
          key={room._id}
          room={room}
          onTilePress={onTilePress}
          isSelected={FindDocument(selectedRooms, room._id) != -1}
        />
      ))}
    </Grid>
  );
}

export function RenderRoomGridTile({
  room,
  onTilePress,
  isSelected,
}: {
  room: RoomPopulated;
  onTilePress?: (room: RoomPopulated) => void;
  isSelected: boolean;
}): React.ReactNode {
  let className = "";
  if (isSelected) {
    className = "bg-purple-400";
  } else if (!room.available || room.allottedTo.length == room.occupancy) {
    className = "bg-red-600";
  } else if (room.allottedTo.length === 0) {
    className = "bg-green-600";
  } else {
    className = "bg-orange-600";
  }

  return (
    <Grid.Col
      span={1}
      key={room._id}
      className={`${className} border border-white text-center text-white`}
      onClick={() => onTilePress?.(room)}
    >
      {room.number}
    </Grid.Col>
  );
}

export function SelectedRoomsView(props: {
  selectedRooms: Array<RoomPopulated>;
}) {
  return (
    <Accordion multiple>
      {props.selectedRooms.map((room) => (
        <SelectedRoom key={room._id} room={room} />
      ))}
    </Accordion>
  );
}
function SelectedRoom(props: { room: RoomPopulated }) {
  const [addStudentMode, setAddStudentMode] = useState<boolean>(false);
  const rollNo = useField<number>({
    initialValue: 0,
  });
  const [fetchedStudent, setFetchedStudent] = useState<AppUser>();
  return (
    <Accordion.Item key={props.room._id} value={props.room._id}>
      <Accordion.Control>Room {props.room.number}</Accordion.Control>
      <Accordion.Panel>
        <div>
          Allocated To
          <div>
            {props.room.allottedTo.map((student) => (
              <div key={student._id}>Hello</div>
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
              <Button>Allot</Button>
            </div>
          )}
        </div>
      </Accordion.Panel>
      {/* <Button> Allocate Student</Button> */}
    </Accordion.Item>
  );
}
