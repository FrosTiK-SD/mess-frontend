import { Permission } from "@/constants/permissions";

export interface UserGroup {
    _id : string;
    name : string;
    description?:string;
    permissions: Array<Permission>
}