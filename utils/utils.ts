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
