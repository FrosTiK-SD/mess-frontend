import { RoomPopulated } from "@/types/room";
import { Grid } from "@mantine/core";

export interface RoomPopulatedGridParams {
  roomPopulatedList: Array<RoomPopulated>;
}
export function RoomPopulatedGrid({
  roomPopulatedList,
}: RoomPopulatedGridParams) {
  return (
    <Grid columns={20} gutter="xs">
      {roomPopulatedList.map(renderRoomGridTile)}
    </Grid>
  );
}

export function renderRoomGridTile(room: RoomPopulated): React.ReactNode {
  let className = "";
  if (!room.available || room.allocatedTo.length == room.capacity) {
    className = "bg-red-600";
  } else if (room.allocatedTo.length === 0) {
    className = "bg-green-600";
  } else {
    className = "bg-orange-600";
  }
  return (
    <Grid.Col
      span={1}
      key={room._id}
      className={`${className} border border-white text-center text-white`}
    >
      {room.name}
    </Grid.Col>
  );
}
