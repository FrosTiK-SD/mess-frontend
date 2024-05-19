import { Hostel } from "./hostel";
import { User } from "./user";
import { PopulatedWith, RedefineKeyTypes } from "./util";

export interface Mess {
  _id: string;
  name: string;
  hostel: string;
  users: Array<string>;
  caretakers: Array<string>;
}

export type MessPopulated = RedefineKeyTypes<
  Mess,
  {
    hostel: Pick<Hostel, "_id" | "name">;
    users: Array<
      Pick<User, "_id" | "email" | "firstName" | "lastName" | "rollNo">
    >;
  }
>;

export type MessPopulatedWith<PopulatedKeys extends keyof Mess> = PopulatedWith<
  Mess,
  MessPopulated,
  PopulatedKeys
>;
