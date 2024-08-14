import { Filter, IdObject } from "@/types/util";

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

export function GetIdList<Type extends IdObject>(
  idObjectList: Array<Type>,
): Array<string> {
  return idObjectList.map((idObject) => idObject._id);
}

export function FindDocument(idList: Array<IdObject>, id: string): number {
  return idList.findIndex((listObject) => listObject._id == id);
}

export function RemoveDocument<Type extends IdObject>(
  idList: Array<Type>,
  id: string,
): Array<Type> {
  return idList.filter((idObject) => idObject._id != id);
}
