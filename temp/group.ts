import { UserGroup } from "@/types/userGroup";

export function getSampleGroup(seed: number): UserGroup {
  return {
    _id: `${seed}`,
    name: "Dummy Group",
    roles: [],
  };
}
