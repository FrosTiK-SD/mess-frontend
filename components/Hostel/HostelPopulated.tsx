import { Hostel } from "@/types/hostel";
import { RoomPopulated } from "@/types/room";
import { User } from "@/types/user";
import { GetName } from "@/utils/student";
import {
  RoomPopulatedGrid,
  SelectedRoomsView,
} from "../Room/RoomPopulatedGrid";

export interface HostelPopulatedParams {
  hostel: Hostel;
  hostelRooms: Array<RoomPopulated>;
  caretakers: Array<User>;
  selectedRooms: Array<RoomPopulated>;
  onTilePress?: (room: RoomPopulated) => void;
}
export function HostelPopulatedViewer({
  hostel,
  hostelRooms,
  caretakers,
  selectedRooms,
  onTilePress,
}: HostelPopulatedParams) {
  return (
    <div>
      <div>{hostel.name} Hostel</div>
      <div>
        <div>Caretakers</div>
        {caretakers.map((caretaker) => (
          <div key={caretaker._id}>{GetName(caretaker)}</div>
        ))}
      </div>
      <div className="mt-10 px-[5%]">
        <RoomPopulatedGrid
          onTilePress={onTilePress}
          roomPopulatedList={hostelRooms}
          selectedRooms={selectedRooms}
        />
      </div>
      <SelectedRoomsView selectedRooms={selectedRooms} />
    </div>
  );
}
