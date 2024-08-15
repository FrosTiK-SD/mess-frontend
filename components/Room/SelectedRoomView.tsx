import { RoomPopulated } from "@/types/room";
import { GetName } from "@/utils/student";
import { RenderRoomGridTile } from "./RoomPopulatedGrid";

export function SelectedRoomView({ room }: { room: RoomPopulated }) {
  return (
    <div>
      {
        <RenderRoomGridTile
          isSelected={false}
          room={room}
          onTilePress={() => {}}
        />
      }
      <div>
        Occupants
        <div>
          {room.allottedTo.map((userMini) => {
            return (
              <div key={userMini._id} className="flex flex-row">
                <div>{GetName(userMini)}</div>
                <div>{userMini.email}</div>
                <div>{userMini.instituteProfile.rollNo}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
