import { DeepReadonlyArray } from "@/types/util";
import { User } from "@/types/user";
import dayjs from "dayjs";

export function YearToDate(years: DeepReadonlyArray<number>): Array<Date> {
  return years.map((year) => dayjs().year(year).toDate());
}

export function DateToYear(dates: Array<Date>): Array<number> {
  return dates.map((date) => date.getFullYear());
}

export function GetName(user: User) {
  return `${user.firstName + " "}${user.middleName + " "}${user.lastName}`;
}
