import { StudentMini } from "./user";

export interface Room {
  _id: string;
  hostel: string;
  number: number;
  floor: number;
  available: boolean;
  remarks: string;
  occupancy: number;
}

export interface RoomPopulated extends Room {
  allottedTo: Array<StudentMini>;
}
