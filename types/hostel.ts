import { RoomPopulated } from "./room";
import { UserMini } from "./user";

export interface Hostel {
  _id: string;
  name: string;
}

export interface HostelPopulated extends Hostel {
  caretakers: Array<UserMini>;
  rooms: Array<RoomPopulated>;
}

// export type HostelPopulated = RedefineKeyTypes<
//   Hostel,
//   {
//     Rooms: Array<Room>;
//     Users: Array<Pick<User, "_id" | "firstName" | "lastName" | "middleName">>;
//     caretakers: Array<
//       Pick<User, "_id" | "firstName" | "middleName" | "lastName">
//     >;
//   }
// >;

// export type HostelPopulatedWith<PopulatedKeys extends keyof Hostel> =
//   PopulatedWith<Hostel, HostelPopulated, PopulatedKeys>;
