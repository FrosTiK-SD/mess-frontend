import { RoomWithAllotments } from "@/types/room";
import { FindDocument } from "@/utils/utils";
import { Grid } from "@mantine/core";

export interface RoomPopulatedGridParams {
  roomPopulatedList: Array<RoomWithAllotments>;
  selectedRooms: Array<RoomWithAllotments>;
  onTilePress?: (room: RoomWithAllotments) => void;
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
  room: RoomWithAllotments;
  onTilePress?: (room: RoomWithAllotments) => void;
  isSelected: boolean;
}): React.ReactNode {
  let className = "";
  if (isSelected) {
    className = "bg-purple-400";
  } else if (!room.available || room.allotments == room.occupancy) {
    className = "bg-red-600";
  } else if (room.allotments === 0) {
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
