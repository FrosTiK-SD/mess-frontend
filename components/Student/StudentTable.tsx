"use client";

import { studentTableColumns } from "@/constants/user";
import { User } from "@/types/user";
import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { Dispatch, SetStateAction } from "react";
import { AssignHostelModal, AssignMessModal } from "./AssignModals";

export interface StudentTableProps {
  students: Array<User>;
  selectionState: Record<string, boolean>;
  setSelectionState: Dispatch<SetStateAction<Record<string, boolean>>>;
}
export function StudentTable({
  students,
  selectionState,
  setSelectionState,
}: StudentTableProps) {
  const [
    hostelModalOpened,
    { open: openHostalModal, close: closeHostalModal },
  ] = useDisclosure(false);
  const [messModalOpened, { open: openMessModal, close: closeMessModal }] =
    useDisclosure(false);

  const table = useMantineReactTable<User>({
    columns: studentTableColumns,
    data: students,
    enableRowSelection: true,
    getRowId: (row) => row._id,
    onRowSelectionChange: setSelectionState,
    state: { rowSelection: selectionState },
    enableGrouping: true,
    groupedColumnMode: "remove",
    initialState: {
      grouping: ["department", "batch"],
    },
    renderTopToolbarCustomActions({ table }) {
      return (
        <div className="flex flex-row space-x-1">
          <Button onClick={openHostalModal} color="yellow">
            Assign Hostel
          </Button>
          <Button onClick={openMessModal} color="green">
            Assign Mess
          </Button>
        </div>
      );
    },
  });

  return (
    <div>
      <AssignHostelModal
        opened={hostelModalOpened}
        onClose={closeHostalModal}
        hostels={[{ _id: "66a356b78dfad0dc369865e9", name: "Sample Hostel" }]}
        handleHostelAssign={(hostel) => {
          axios.put(
            `${process.env.NEXT_PUBLIC_AUTH_BACKEND}/admin/user/assignHostel`,
            {
              hostel: hostel,
              users: Object.entries(selectionState)
                .filter(([_, selected]) => selected)
                .map(([student, _]) => student),
            },
          );
        }}
      />
      <AssignMessModal
        opened={messModalOpened}
        onClose={closeMessModal}
        messes={[
          {
            _id: "66a356b78dfad0dc369865e9",
            caretakers: [],
            hostel: "000000000000000000000000",
            name: "Sample Mess",
            users: [],
          },
        ]}
        handleMessAssign={(mess) => {
          axios
            .put(
              `${process.env.NEXT_PUBLIC_AUTH_BACKEND}/admin/user/assignMess`,
              {
                mess,
                users: Object.entries(selectionState)
                  .filter(([_, selected]) => selected)
                  .map(([student, _]) => student),
              },
            )
            .then(() => {
              alert("Mess assigned");
            });
        }}
      />
      <MantineReactTable table={table} />
    </div>
  );
}
