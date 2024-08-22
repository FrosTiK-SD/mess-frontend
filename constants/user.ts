import { AppUser, UserFilter } from "@/types/user";
import { GetName } from "@/utils/student";
import { MRT_ColumnDef } from "mantine-react-table";
import { Course } from "./courses";
import { Department } from "./departments";
import { Role } from "./permissions";

export const defaultFilter: UserFilter = {
  courses: [],
  department: [],
  endYear: [],
  rollNos: [],
  startYear: [],
};

export const defaultUser: AppUser = {
  _id: "",
  role: Role.USER,

  email: "",
  mobile: "",
  firstName: "",
  middleName: "",
  lastName: "",
  course: Course.NONE,
  department: Department.NONE,
  endYear: 0,
  rollNo: 0,
  startYear: 0,
};

export const studentTableColumns: Array<MRT_ColumnDef<AppUser>> = [
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
    accessorKey: "instituteProfile.department",
    id: "department",
    header: "Department",
  },
  {
    accessorKey: "instituteProfile.course",
    id: "course",
    header: "Course",
  },
  {
    accessorFn: (user) => `${user.startYear} - ${user.endYear}`,
    id: "batch",
    header: "Batch",
  },
  // {
  //   accessorFn: (user) => user.allocationDetails.hostel || "N/A",
  //   id: "allocatedHostel",
  //   header: "Hostel",
  // },
  // {
  //   accessorFn: (user) => user.allocationDetails.mess || "N/A",
  //   id: "allocatedMess",
  //   header: "Mess",
  // },
  // {
  //   accessorFn: (user) => user.allocationDetails.room || "N/A",
  //   id: "allocatedRoom",
  //   header: "Room",
  // },
];

export const iitbhuEmailRegex = /@.itbhu.ac.in$/;
