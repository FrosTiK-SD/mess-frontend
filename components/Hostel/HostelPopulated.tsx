import type { HostelPopulated } from "@/types/hostel";
import { GetName } from "@/utils/student";
import { RoomPopulatedGrid } from "../Room/RoomPopulatedGrid";

export interface HostelPopulatedParams {
  hostelPopulated: HostelPopulated;
}
export function HostelPopulatedViewer({
  hostelPopulated,
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
        <RoomPopulatedGrid roomPopulatedList={hostelPopulated.rooms} />
      </div>
    </div>
  );
}
