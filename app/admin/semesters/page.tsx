"use client";
import {
  useCreateSemesterMutation,
  useGetAllSemesters,
} from "@/hooks/semesters";
import { Semester } from "@/types/semester";
import { Button, LoadingOverlay, Modal, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import {
  MantineReactTable,
  MRT_ColumnDef,
  useMantineReactTable,
} from "mantine-react-table";
import { useState } from "react";

const dateFormatOptions: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "short",
  year: "numeric",
};

const semesterTableColumns: Array<MRT_ColumnDef<Semester>> = [
  {
    header: "Semester",
    accessorKey: "name",
  },
  {
    header: "Start Date",
    accessorFn: (row) => {
      return new Date(row.start).toLocaleDateString("en-IN", dateFormatOptions);
    },
  },
  {
    header: "End Date",
    accessorFn: (row) => {
      return new Date(row.end).toLocaleDateString("en-IN", dateFormatOptions);
    },
  },
];

export default function SemestersPage() {
  const semsters = useGetAllSemesters();
  const [modalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  const semestersTable = useMantineReactTable<Semester>({
    data: semsters.data ?? [],
    columns: semesterTableColumns,
    renderTopToolbarCustomActions: () => {
      return (
        <div>
          <Button onClick={openModal}>Create Semester</Button>
        </div>
      );
    },
  });

  return (
    <div>
      <Modal opened={modalOpened} onClose={closeModal}>
        <CreateSemesterForm onSubmit={closeModal} />
      </Modal>
      {semsters.isLoading ? (
        <LoadingOverlay />
      ) : (
        <MantineReactTable table={semestersTable} />
      )}
    </div>
  );
}

function CreateSemesterForm(props: { onSubmit: () => void }) {
  const [semester, setSemester] = useState<Semester>({
    _id: "",
    end: "",
    start: "",
    name: "",
  });
  const createSemesters = useCreateSemesterMutation();
  return (
    <div className="space-y-3">
      Create New Semester
      <TextInput
        label="Name"
        value={semester.name}
        onChange={(event) =>
          setSemester({ ...semester, name: event.currentTarget.value })
        }
      />
      <DatePickerInput
        label="Semester Start Date"
        value={new Date(semester.start || Date.now())}
        onChange={(date) =>
          setSemester({ ...semester, start: date?.toISOString() ?? "" })
        }
      />
      <DatePickerInput
        label="Semester End Date"
        value={new Date(semester.end || Date.now())}
        onChange={(date) =>
          setSemester({ ...semester, end: date?.toISOString() ?? "" })
        }
      />
      <Button
        onClick={() => {
          createSemesters.mutate(semester);
          props.onSubmit();
        }}
      >
        Create Semester
      </Button>
    </div>
  );
}
