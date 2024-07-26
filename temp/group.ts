import { Role } from "@/constants/permissions";
import { UserGroup } from "@/types/userGroup";

export function getSampleGroup(seed: number): UserGroup {
  return {
    _id: `${seed}`,
    name: "Dummy Group",
    roles: [Role.READ_ALL, Role.WRITE_ALL],
  };
}
