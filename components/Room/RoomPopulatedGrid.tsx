import { RoomPopulated } from "@/types/room";
import { FindDocument } from "@/utils/utils";
import { Accordion, Grid } from "@mantine/core";

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
        </div>
      </Accordion.Panel>
    </Accordion.Item>
  );
}
