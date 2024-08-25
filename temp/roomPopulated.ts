import { RoomWithAllotments } from "@/types/room";

export function getSampleRoomPopulated(
  seed: number,
  hostel: string,
): RoomWithAllotments {
  return {
    _id: `room_poped_${seed}`,
    available: seed % 37 !== 0,
    // @ts-ignore
    allotments: seed % 29 === 0 ? [0] : [],
    occupancy: 2,
    floor: Math.floor(seed / 60),
    hostel: hostel,
    number: seed,
    remarks: "",
  };
}
