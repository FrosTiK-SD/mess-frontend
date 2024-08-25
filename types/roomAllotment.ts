import { AppUser } from "./user";

export interface RoomAllotment {
  _id: string;
  room: string;
  user: string;
  semester: string;
}
export interface RoomAllotmentWithUser {
  _id: string;
  room: string;
  user: AppUser;
  semester: string;
}
