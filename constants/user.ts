import { User, UserFilter } from "@/types/user";
import { GetName } from "@/utils/student";
import { MRT_ColumnDef } from "mantine-react-table";

export const defaultFilter: UserFilter = {
  _id: [],
  allocatedHostel: [],
  allocatedMess: [],
  allocatedRoom: [],
  course: [],
  department: [],
  email: [],
  endYear: [],
  firstName: [],
  groups: [],
  lastName: [],
  managingHostels: [],
  managingMesses: [],
  middleName: [],
  mobile: [],
  permissions: [],
  rollNo: [],
  startYear: [],
};

export const studentTableColumns: Array<MRT_ColumnDef<User>> = [
  {
    accessorKey: "rollNo",
    header: "Roll No",
  },
  {
    accessorFn: (user) => GetName(user),
    id: "name",
    header: "Name",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "course",
    header: "Course",
  },
  {
    accessorFn: (user) => `${user.startYear} - ${user.endYear}`,
    id: "batch",
    header: "Batch",
  },
  {
    accessorFn: (user) => user.allocatedHostel || "N/A",
    id: "allocatedHostel",
    header: "Allocated Hostel",
  },
  {
    accessorFn: (user) => user.allocatedMess || "N/A",
    id: "allocatedMess",
    header: "Allocated Mess",
  },
  {
    accessorFn: (user) => user.allocatedRoom || "N/A",
    id: "allocatedRoom",
    header: "Allocated Room",
  },
];
