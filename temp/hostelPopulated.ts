// let hostelPopulatedList: Array<HostelPopulated> = [
//   {
//     _id: "hostel_poped_1",
//     caretakers: [],
//   },

import { HostelPopulated } from "@/types/hostel";
import { RoomPopulated } from "@/types/room";
import { UserMini } from "@/types/user";
import { getSampleCaretaker } from "./caretaker";
import { getSampleRoomPopulated } from "./roomPopulated";

// ];
export function getSampleHostelPopulated(seed: number): HostelPopulated {
  let sampleCaretakers: Array<UserMini> = [...new Array(2)].map((_, index) =>
    getSampleCaretaker(index),
  );
  let sampleRooms: Array<RoomPopulated> = [...new Array(200)].map((_, index) =>
    getSampleRoomPopulated(index, `hostel_poped_${seed}`),
  );
  return {
    _id: `hostel_poped_${seed}`,
    name: `No. ${seed} Palace`,
    caretakers: sampleCaretakers,
    rooms: sampleRooms,
  };
}
