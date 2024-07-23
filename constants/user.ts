import { User, UserFilter } from "@/types/user";
import { GetName } from "@/utils/student";
import { MRT_ColumnDef } from "mantine-react-table";
import { Course } from "./courses";
import { Department } from "./departments";

export const defaultFilter: UserFilter = {
  _id: [],
  allocationDetails: {
    hostel: [],
    mess: [],
    room: [],
  },
  email: [],
  firstName: [],
  groups: [],
  instituteProfile: {
    course: [],
    department: [],
    endYear: [],
    rollNo: [],
    startYear: [],
  },
  lastName: [],
  managingDetails: {
    hostel: [],
    mess: [],
  },
  middleName: [],
  mobile: [],
  permissions: [],
};

export const defaultUser: User = {
  _id: "",
  groups: [],
  permissions: [],

  allocationDetails: {
    hostel: "",
    mess: "",
    room: "",
  },
  email: "",
  mobile: "",
  firstName: "",
  middleName: "",
  lastName: "",
  instituteProfile: {
    course: Course.NONE,
    department: Department.NONE,
    endYear: 0,
    rollNo: 0,
    startYear: 0,
  },
  managingDetails: {
    hostel: "",
    mess: "",
  },
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
    accessorFn: (user) =>
      `${user.instituteProfile.startYear} - ${user.instituteProfile.endYear}`,
    id: "batch",
    header: "Batch",
  },
  {
    accessorFn: (user) => user.allocationDetails.hostel || "N/A",
    id: "allocatedHostel",
    header: "Hostel",
  },
  {
    accessorFn: (user) => user.allocationDetails.mess || "N/A",
    id: "allocatedMess",
    header: "Mess",
  },
  {
    accessorFn: (user) => user.allocationDetails.room || "N/A",
    id: "allocatedRoom",
    header: "Room",
  },
];

export const iitbhuEmailRegex = /@.itbhu.ac.in$/;
