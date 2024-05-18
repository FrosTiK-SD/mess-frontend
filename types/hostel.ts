import { Room } from "./room";
import { User } from "./user";
import { PopulatedWith, RedefineKeyTypes } from "./util";

export interface Hostel {
  _id: string;
  name: string;
  Rooms: Array<string>;
  Users: Array<string>;
  caretakers: Array<string>;
}

export type HostelPopulated = RedefineKeyTypes<
  Hostel,
  {
    Rooms: Array<Room>;
    Users: Array<Pick<User, "_id" | "firstName" | "lastName" | "middleName">>;
    caretakers: Array<
      Pick<User, "_id" | "firstName" | "middleName" | "lastName">
    >;
  }
>;

export type HostelPopulatedWith<PopulatedKeys extends keyof Hostel> =
  PopulatedWith<Hostel, HostelPopulated, PopulatedKeys>;
