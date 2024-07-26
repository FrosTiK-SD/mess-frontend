import { Course } from "@/constants/courses";
import { Department } from "@/constants/departments";
import { Permission } from "@/constants/permissions";
import { UserGroup } from "./userGroup";
import { Filter, RedefineKeyTypes } from "./util";

export interface User {
  // IAM
  _id: string;
  permissions: Array<Permission>;
  groups: Array<string>;
  firstName: string;
  middleName: string;
  lastName: string;

  allocationDetails: AllocationDetails;

  instituteProfile: InstituteProfile;

  managingDetails: ManagingDetails;

  //Contact Details
  email: string;
  mobile: string;
}

export interface InstituteProfile {
  startYear: number;
  endYear: number;
  rollNo: number;
  department: Department;
  course: Course;
}

export interface AllocationDetails {
  hostel: string; // hostel id
  mess: string; // mess id
  room: string; // room id
}

export interface ManagingDetails {
  hostel: string; // managing hostel id
  mess: string; // managing mess id
}

export type UserPopulated = RedefineKeyTypes<
  User,
  {
    groups: Array<UserGroup>;
  }
>;
// export type UserPopulatedWith<PopulatedKeys extends keyof User> = PopulatedWith<
//   User,
//   UserPopulated,
//   PopulatedKeys
// >;

export type UserFilter = Filter<User>;

export type UserMini = Pick<
  User,
  "_id" | "firstName" | "middleName" | "lastName" | "email" | "mobile"
>;

export type StudentMini = UserMini & Pick<User, "instituteProfile">;
