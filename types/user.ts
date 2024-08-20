import { Course } from "@/constants/courses";
import { Department } from "@/constants/departments";
import { Role } from "@/constants/permissions";

export interface AppUser {
  // IAM
  _id: string;
  role: Role;

  firstName: string;
  middleName: string;
  lastName: string;

  //Contact Details
  email: string;
  mobile: string;

  startYear?: number;
  endYear?: number;
  rollNo?: number;
  department?: Department;
  course?: Course;
}

export interface UserFilter {
  startYear: Array<number>;
  endYear: Array<number>;
  department: Array<Department>;
  courses: Array<Course>;
  rollNos: Array<number>;
}

export type UserMini = Pick<
  AppUser,
  "_id" | "firstName" | "middleName" | "lastName" | "email" | "mobile"
>;
