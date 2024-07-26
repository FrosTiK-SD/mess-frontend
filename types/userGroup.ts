import { Role } from "@/constants/permissions";

export interface UserGroup {
  _id: string;
  name: string;
  description?: string;
  roles: Array<Role>;
}
