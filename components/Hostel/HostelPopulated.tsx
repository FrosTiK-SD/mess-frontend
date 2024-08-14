import type { HostelPopulated } from "@/types/hostel";
import { RoomPopulated } from "@/types/room";
import { GetName } from "@/utils/student";
import {
  RoomPopulatedGrid,
  SelectedRoomsView,
} from "../Room/RoomPopulatedGrid";

export interface HostelPopulatedParams {
  hostelPopulated: HostelPopulated;
  selectedRooms: Array<RoomPopulated>;
  onTilePress?: (room: RoomPopulated) => void;
}
export function HostelPopulatedViewer({
  hostelPopulated,
  selectedRooms,
  onTilePress,
}: HostelPopulatedParams) {
  const { caretakers, name } = hostelPopulated;
  return (
    <div>
      <div>{name} Hostel</div>
      <div>
        <div>Caretakers</div>
        {caretakers.map((caretaker) => (
          <div key={caretaker._id}>{GetName(caretaker)}</div>
        ))}
      </div>
      <div className="mt-10 px-[5%]">
        <RoomPopulatedGrid
          onTilePress={onTilePress}
          roomPopulatedList={hostelPopulated.rooms}
          selectedRooms={selectedRooms}
        />
      </div>
      <SelectedRoomsView selectedRooms={selectedRooms} />
    </div>
  );
}
