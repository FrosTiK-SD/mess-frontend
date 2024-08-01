"use client";

import { hostelsQueryKey } from "@/constants/tanstackQuery";
import {
  deleteSampleHostel,
  hostelsSample,
  modifySampleHostel,
} from "@/temp/hostels";
import { Hostel } from "@/types/hostel";
import { Button, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
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

  const hostelsQuery = useQuery({
    queryKey: [hostelsQueryKey],
    queryFn: () => hostelsSample,
  });

  const createHostelMutation = useMutation<number, Error, Hostel, number>({
    mutationFn: (newHostel) => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_AUTH_BACKEND}/admin/hostel`,
        newHostel,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [hostelsQueryKey] });
    },
  });
  const deleteHostel = useMutation<any, Error, string, any>({
    mutationFn: (hostelId) =>
      new Promise((resolve, _) => resolve(deleteSampleHostel(hostelId))),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [hostelsQueryKey] });
    },
  });

  const updateHostel = useMutation<
    void,
    Error,
    { hostelId: string; updatedHostel: Hostel },
    void
  >({
    mutationFn: ({ hostelId, updatedHostel }) =>
      new Promise((resolve) =>
        resolve(modifySampleHostel(hostelId, updatedHostel)),
      ),
  });

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
