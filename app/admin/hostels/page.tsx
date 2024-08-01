"use client";

import { useCreateHostelMutation, useGetHostelsQuery } from "@/hooks/hostel";
import { Hostel } from "@/types/hostel";
import { Button, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import {
  MRT_ColumnDef,
  MRT_EditActionButtons,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { CreateHostelModal } from "./CreateHostelModal";

const hostelColumns: Array<MRT_ColumnDef<Hostel>> = [
  {
    accessorKey: "name",
    header: "Name",
  },
];

export default function HostelsPage() {
  const [
    createHostelModalIsOpen,
    { open: openCreateHostelModal, close: closeCreateHostelModal },
  ] = useDisclosure(false);
  const queryClient = useQueryClient();

  const hostelsQuery = useGetHostelsQuery({ withQueryFunction: true });

  const createHostelMutation = useCreateHostelMutation();

  const table = useMantineReactTable({
    columns: hostelColumns,
    data: hostelsQuery.data ?? [],
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableEditing: true,
    enableFullScreenToggle: false,
    getRowId: (row) => row._id,
    renderCreateRowModalContent: ({ table, row, internalEditComponents }) => {
      return (
        <div className="flex flex-col">
          <Title order={3}>Create New Hostel</Title>
          {internalEditComponents}
          <div className="mt-16 flex flex-row justify-end">
            <MRT_EditActionButtons variant="text" table={table} row={row} />
          </div>
        </div>
      );
    },
    initialState: {
      density: "xs",
    },
    renderTopToolbarCustomActions: () => {
      return (
        <div>
          <Button onClick={openCreateHostelModal}>Create Hostel</Button>
        </div>
      );
    },
  });

  return (
    <div className="flex w-full justify-center">
      <CreateHostelModal
        opened={createHostelModalIsOpen}
        onClose={closeCreateHostelModal}
        onSave={(hostel) => {
          createHostelMutation.mutate(hostel);
        }}
      />
      <div className="mt-8 w-[90%] ">
        <MantineReactTable table={table} />
      </div>
    </div>
  );
}
