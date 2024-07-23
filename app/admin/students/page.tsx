"use client";

import { StudentFilter } from "@/components/Student/StudentFilter";
import { StudentTable } from "@/components/Student/StudentTable";
import { Course } from "@/constants/courses";
import { Department } from "@/constants/departments";
import { defaultFilter } from "@/constants/user";
import { User, UserFilter } from "@/types/user";
import { DeepReadonly } from "@/types/util";
import { Button } from "@mantine/core";
import { useState } from "react";

const students: Array<User> = [
  {
    _id: "0",
    allocationDetails: {
      hostel: "",
      mess: "",
      room: "",
    },
    instituteProfile: {
      course: Course.IDD,
      department: Department.MAT,
      endYear: 2025,
      startYear: 2020,
      rollNo: 20204040,
    },
    email: "fname.lname.mat20@itbhu.ac.in",
    firstName: "Fname",
    lastName: "Lname",
    groups: [],
    managingDetails: {
      hostel: "",
      mess: "",
    },
    middleName: "Mname",
    mobile: "0123456789",
    permissions: [],
  },
  // {
  //   _id: "1",
  //   allocatedHostel: "",
  //   allocatedMess: "",
  //   allocatedRoom: "",

  //   course: Course.IDD,
  //   department: Department.CSE,
  //   email: "curious.data.cse20@itbhu.ac.in",
  //   endYear: 2025,
  //   startYear: 2020,

  //   firstName: "Curious",
  //   lastName: "Data",
  //   groups: [],
  //   managingHostels: [],
  //   managingMesses: [],
  //   middleName: "",
  //   mobile: "9876543210",
  //   permissions: [],
  //   rollNo: "20204141",
  // },
];

export default function AssignHostel() {
  const [filter, setFilter] = useState<DeepReadonly<UserFilter>>(defaultFilter);
  const [showFilter, setShowFilter] = useState<boolean>(true);
  const [studentSelection, setStudentSelection] = useState<
    Record<string, boolean>
  >({});

  return (
    <div>
      {showFilter && (
        <div>
          <StudentFilter filter={filter} setFilter={setFilter} />
          <Button
            color="grape"
            className="mt-8"
            onClick={() => {
              setShowFilter(false);
            }}
          >
            Search
          </Button>
        </div>
      )}
      {!showFilter && (
        <div>
          <Button
            color="grape"
            className="mb-4"
            onClick={() => setShowFilter(true)}
          >
            Back to Filters
          </Button>
          <StudentTable
            students={students}
            selectionState={studentSelection}
            setSelectionState={setStudentSelection}
          />
        </div>
      )}
    </div>
  );
}
