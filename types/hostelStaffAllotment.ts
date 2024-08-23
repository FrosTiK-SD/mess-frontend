import { AppUser } from "./user";

export interface HostelStaffAllotment {
  _id: string;
  hostel: string;
  user: string;
}

export interface HostelStaffAllotmentWithUser {
  _id: string;
  hostel: string;
  user: AppUser;
}
