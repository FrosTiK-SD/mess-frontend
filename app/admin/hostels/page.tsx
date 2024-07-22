"use client";

import { hostelsQueryKey } from "@/constants/tanstackQuery";
import {
  deleteSampleHostel,
  hostelsSample,
  modifySampleHostel,
} from "@/temp/hostels";
import { Hostel } from "@/types/hostel";
import { Title } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  MRT_ColumnDef,
  MRT_EditActionButtons,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";

const hostelColumns: Array<MRT_ColumnDef<Hostel>> = [
  {
    accessorKey: "name",
    header: "Name",
  },
];

export default function HostelsPage() {
  const queryClient = useQueryClient();

  const hostelsQuery = useQuery({
    queryKey: [hostelsQueryKey],
    queryFn: () => hostelsSample,
  });

  const createHostel = useMutation<number, Error, Hostel, number>({
    mutationFn: (newHostel) =>
      new Promise((resolve, reject) => resolve(hostelsSample.push(newHostel))),
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
    onEditingRowSave: ({ row }) => createHostel.mutate(row.original),
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
  });

  return (
    <div className="flex w-full justify-center">
      <div className="mt-8 w-[90%] ">
        <MantineReactTable table={table} />
      </div>
    </div>
  );
}
