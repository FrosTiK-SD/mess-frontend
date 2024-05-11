import { Course } from "@/constants/courses";
import { Department } from "@/constants/departments";
import { DeepReadonly } from "@/types/Util";
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
    <div>
      <YearPickerInput
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
      <div>
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
          {Object.values(Department).map((department) => (
            <Chip key={department} value={department}>
              {department}
            </Chip>
          ))}
        </Chip.Group>
      </div>
      <div>
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
          {Object.values(Course).map((course) => (
            <Chip key={course} value={course}>
              {course}
            </Chip>
          ))}
        </Chip.Group>
        <TagsInput
          label="Roll Nos"
          placeholder="Press Enter to add a Roll No"
        />
      </div>
    </div>
  );
}
