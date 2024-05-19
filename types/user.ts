import { Course } from "@/constants/courses";
import { Department } from "@/constants/departments";
import { Permission } from "@/constants/permissions";
import { Filter, PopulatedWith, RedefineKeyTypes } from "./util";
import { HostelPopulated } from "./hostel";
import { Mess } from "./mess";
import { Room } from "./room";
import { UserGroup } from "./userGroup";

export interface User {
  // IAM
  _id: string;
  permissions: Array<Permission>;
  groups: Array<string>;
  firstName: string;
  middleName: string;
  lastName: string;

  //Allocation Details for students
  allocatedHostel: string;
  allocatedMess: string;
  allocatedRoom: string;

  //Academic Details
  startYear: number;
  endYear: number;
  rollNo: string;
  department: Department;
  course: Course;

  //Managing Details
  managingHostels: Array<string>;
  managingMesses: Array<string>;

  //Contact Details
  email: string;
  mobile: string;
}

// export interface UserPopulated extends RedefineKeyTypes<User,"groups"| "allocatedHostel" | "allocatedMess"|"allocatedRoom" | "managingHostels"|"managingMesses">{
//    groups :
// }
export type UserPopulated = RedefineKeyTypes<
  User,
  {
    groups: Array<UserGroup>;

    allocatedHostel: Pick<HostelPopulated, "_id" | "name" | "caretakers">;
    allocatedRoom: Room;
    allocatedMess: Pick<Mess, "_id" | "hostel" | "name">;
  }
>;
export type UserPopulatedWith<PopulatedKeys extends keyof User> = PopulatedWith<
  User,
  UserPopulated,
  PopulatedKeys
>;

export type UserFilter = Filter<User>;
