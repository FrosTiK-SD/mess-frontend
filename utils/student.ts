import { UserMini } from "@/types/user";
import { DeepReadonlyArray } from "@/types/util";
import dayjs from "dayjs";

export function YearToDate(years: DeepReadonlyArray<number>): Array<Date> {
  return years.map((year) => dayjs().year(year).toDate());
}

export function DateToYear(dates: Array<Date>): Array<number> {
  return dates.map((date) => date.getFullYear());
}

export function GetName(user: UserMini) {
  let name = user.firstName;
  if (user.middleName !== "") {
    name += " " + user.middleName;
  }

  if (user.lastName !== "") {
    name += " " + user.lastName;
  }

  return name;
}
