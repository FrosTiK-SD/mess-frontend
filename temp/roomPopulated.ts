import { RoomPopulated } from "@/types/room";

export function getSampleRoomPopulated(
  seed: number,
  hostel: string,
): RoomPopulated {
  return {
    _id: `room_poped_${seed}`,
    available: seed % 37 !== 0,
    // @ts-ignore
    allocatedTo: seed % 29 === 0 ? [0] : [],
    capacity: 2,
    floor: Math.floor(seed / 60),
    hostel: hostel,
    name: seed.toString(),
    remarks: "",
  };
}
