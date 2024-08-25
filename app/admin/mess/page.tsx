"use client";

import { useGetHostelsQuery } from "@/hooks/hostel";
import { useCreateMessMutation, useGetAllMesses } from "@/hooks/mess";
import { Hostel } from "@/types/hostel";
import { Mess } from "@/types/mess";
import {
  Button,
  LoadingOverlay,
  Modal,
  Select,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import {
  MantineReactTable,
  MRT_ColumnDef,
  useMantineReactTable,
} from "mantine-react-table";
import { useMemo } from "react";

export default function AdminMessPage() {
  const messes = useGetAllMesses();
  const hostels = useGetHostelsQuery();
  const [addMessModalOpened, { open: openMessModal, close: closeMessModal }] =
    useDisclosure(false);

  const columnsDef: Array<MRT_ColumnDef<Mess>> = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Hostel",
        accessorFn: (row) =>
          hostels.data?.find((hostel) => hostel._id == row.hostel)?.name ??
          "No Hostel",
      },
    ],
    [hostels.data],
  );
  const table = useMantineReactTable({
    columns: columnsDef,
    data: messes.data ?? [],
    renderTopToolbarCustomActions: () => (
      <div>
        <Button onClick={openMessModal}>Add Mess</Button>
      </div>
    ),
  });

  return (
    <div>
      <Modal onClose={closeMessModal} opened={addMessModalOpened}>
        <AddMessForm hostels={hostels.data ?? []} onSubmit={closeMessModal} />
      </Modal>
      {hostels.isLoading || messes.isLoading ? (
        <LoadingOverlay />
      ) : (
        <MantineReactTable table={table} />
      )}
    </div>
  );
}

function AddMessForm(props: { hostels: Array<Hostel>; onSubmit: () => void }) {
  const createMess = useCreateMessMutation();
  const messForm = useForm<Mess>({
    initialValues: {
      _id: "",
      hostel: "",
      name: "",
    },
  });
  return (
    <div>
      <form>
        <TextInput
          label="Name"
          key={messForm.key("name")}
          {...messForm.getInputProps("name")}
        />
        <Select
          label="hostel"
          key={messForm.key("hostel")}
          data={props.hostels.map((hostel) => ({
            label: hostel.name,
            value: hostel._id,
          }))}
          {...messForm.getInputProps("hostel")}
        />
        <Button
          type="submit"
          onClick={() => {
            createMess.mutate(messForm.getValues());
            props.onSubmit();
          }}
        >
          Add Mess
        </Button>
      </form>
    </div>
  );
}
