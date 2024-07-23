import { StudentMini } from "./user";

export interface Room {
  _id: string;
  hostel: string;
  name: string;
  floor: number;
  available: boolean;
  remarks: string;
  capacity: number;
}

export interface RoomPopulated extends Room {
  allocatedTo: Array<StudentMini>;
}
