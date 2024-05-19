import { Filter, PopulatedWith, RedefineKeyTypes } from "./util";

export interface MealType {
  _id: string;
  startTime: string;
  endTime: string;
  name: string; // Only for representational purposes eg Breakfast lunch dinner
  cost: number;
  mess: string;
}

export interface StudentMini {
  _id: string;
  name: string;
  hostelName: string;
  room: string;
}

export enum Day {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
}

export interface Meal {
  _id: string;
  date: number;
  day: Day;
  menu: Array<string>; // Array of MenuItemID
  type: string; // MealType ID
  removedStudents: Array<string>; // Array of StudentId
  attendedStudents: Array<string>;
  mess: string; // MessID
}

export type MealPopulated = RedefineKeyTypes<
  Meal,
  {
    menu: Array<MenuItem>;
    type: MealType;
    removedStudents: Array<StudentMini>;
    attendedStudents: Array<StudentMini>;
  }
>;

export interface MenuItem {
  _id: string;
  label: string;
  cost: number; // Assumed to be Rupees and is number to make it machine readable
  mess: string;
  description?: string;
  imgUrl?: string;
}
