import { Department } from "@/constants/departments";
import { StudentMini, StudentStatsByMessIdResponse } from "@/types/user";

export const fakeStudentMini: StudentMini[] = [
  {
    _id: "1243",
    allocatedHostel: "Limbdi",
    allocatedRoom: "144",
    department: Department.MAT,
    firstName: "Shubhrajyoti",
    middleName: "",
    lastName: "Dey",
    rollNo: "20124046",
  },
  {
    _id: "1243",
    allocatedHostel: "Limbdi",
    allocatedRoom: "144",
    department: Department.MAT,
    firstName: "Dev",
    middleName: "",
    lastName: "Raj",
    rollNo: "20124046",
  },
];

export const studentStatsByMessIdDemoResponse: StudentStatsByMessIdResponse = {
  attended: fakeStudentMini,
  notAttended: fakeStudentMini,
  notEnrolled: fakeStudentMini,
};
