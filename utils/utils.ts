import { Filter } from "@/types/util";

export function GetFilter<Type extends object>(instance: Type): Filter<Type> {
  //@ts-ignore
  let filter: Filter<Type> = {};
  for (let key in instance) {
    //@ts-ignore
    filter[key] =
      typeof instance[key] === "object" ? GetFilter(instance[key]!) : [];
  }
  return filter;
}

export function GetIdList<Type extends { _id: string }>(
  idObjectList: Array<Type>,
): Array<string> {
  return idObjectList.map((idObject) => idObject._id);
}
