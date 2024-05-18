import { Course } from "@/constants/courses";
import { Department } from "@/constants/departments";
import { DeepReadonly } from "@/types/util";
import { UserFilter } from "@/types/user";
import { DateToYear, YearToDate } from "@/utils/student";
import { Chip, TagsInput } from "@mantine/core";
import { YearPickerInput } from "@mantine/dates";
import { Dispatch, SetStateAction } from "react";

export interface StudentFilterProps {
  filter: DeepReadonly<UserFilter>;
  setFilter: Dispatch<SetStateAction<DeepReadonly<UserFilter>>>;
}
export function StudentFilter({ filter, setFilter }: StudentFilterProps) {
  return (
    <div className="flex flex-col">
      <YearPickerInput
        color="grape"
        label="Start Year"
        type="multiple"
        placeholder="Pick Start Year"
        value={YearToDate(filter.startYear)}
        onChange={(newDates) =>
          setFilter((prevFilter) => ({
            ...prevFilter,
            startYear: DateToYear(newDates),
          }))
        }
      />
      <YearPickerInput
        color="grape"
        label="End Year"
        type="multiple"
        placeholder="Pick End Year"
        value={YearToDate(filter.endYear)}
        onChange={(newDates) =>
          setFilter((prevFilter) => ({
            ...prevFilter,
            endYear: DateToYear(newDates),
          }))
        }
      />
      <div className="mt-4">
        Department
        <Chip.Group
          multiple
          value={[...filter.department]}
          onChange={(newDepartments) =>
            setFilter((prevFilter) => ({
              ...prevFilter,
              department: newDepartments as Array<Department>,
            }))
          }
        >
          <div className="flex flex-row">
            {Object.values(Department).map((department) => (
              <Chip
                color="grape"
                className="m-1"
                key={department}
                value={department}
              >
                {department}
              </Chip>
            ))}
          </div>
        </Chip.Group>
      </div>
      <div className="mt-4">
        Courses
        <Chip.Group
          multiple
          value={[...filter.course]}
          onChange={(newCourses) =>
            setFilter((prevFilter) => ({
              ...prevFilter,
              course: newCourses as Array<Course>,
            }))
          }
        >
          <div className="mt-1 flex flex-row">
            {Object.values(Course).map((course) => (
              <Chip color="grape" className="m-1" key={course} value={course}>
                {course}
              </Chip>
            ))}
          </div>
        </Chip.Group>
        <TagsInput
          label="Roll Nos"
          placeholder="Press Enter to add a Roll No"
          className="mt-4"
        />
      </div>
    </div>
  );
}
