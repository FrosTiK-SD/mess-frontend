import { useCreateHostelStaffAllotmentMutation } from "@/hooks/hostelStaffAllotments";
import { useBatchCreateHostelRoomsMutation } from "@/hooks/rooms";
import { useGetAllCaretakers } from "@/hooks/user";
import { Hostel } from "@/types/hostel";
import { RoomWithAllotments } from "@/types/room";
import { AppUser } from "@/types/user";
import { GetName } from "@/utils/student";
import {
  Button,
  Checkbox,
  Modal,
  ModalProps,
  NumberInput,
  Select,
} from "@mantine/core";
import { isNotEmpty, useField, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { RoomPopulatedGrid } from "../Room/RoomPopulatedGrid";
import { SelectedRoomsView } from "../Room/SelectedRoomView";

export interface HostelPopulatedParams {
  hostel: Hostel;
  hostelRooms: Array<RoomWithAllotments>;
  caretakers: Array<AppUser>;
  selectedRooms: Array<RoomWithAllotments>;
  onTilePress?: (room: RoomWithAllotments) => void;
}
export function HostelPopulatedViewer({
  hostel,
  hostelRooms,
  caretakers,
  selectedRooms,
  onTilePress,
}: HostelPopulatedParams) {
  const [
    addRoomsModalOpened,
    { open: openAddRoomsModal, close: closeAddRoomsModal },
  ] = useDisclosure(false);

  const allCaretakers = useGetAllCaretakers();
  const [addCaretakerMode, setAddCaretakerMode] = useState<boolean>(false);
  const addCaretakerField = useField<string>({
    mode: "controlled",
    initialValue: "",
    validate: isNotEmpty("Choose a caretaker"),
  });

  const createHostelStaffAllotment = useCreateHostelStaffAllotmentMutation();

  return (
    <div>
      <AddRoomsModal
        opened={addRoomsModalOpened}
        onClose={closeAddRoomsModal}
        hostelId={hostel._id}
      />
      <div>{hostel.name} Hostel</div>
      <div>
        <div>Caretakers</div>
        {caretakers.map((caretaker) => (
          <div key={caretaker._id}>{GetName(caretaker)}</div>
        ))}
        {addCaretakerMode ? (
          <div className="flex flex-row items-end">
            <Select
              label="Caretaker"
              searchable
              data={allCaretakers.data?.map((caretaker) => ({
                label: caretaker.email,
                value: caretaker._id,
              }))}
              {...addCaretakerField.getInputProps()}
            />
            <Button
              onClick={() => {
                if (addCaretakerField.getValue()) {
                  createHostelStaffAllotment.mutate({
                    _id: "",
                    hostel: hostel._id,
                    user: addCaretakerField.getValue(),
                  });
                  setAddCaretakerMode(false);
                }
              }}
            >
              Add Caretaker
            </Button>
          </div>
        ) : (
          <div onClick={() => setAddCaretakerMode(true)}>Add a Caretaker</div>
        )}
      </div>
      <div>
        <Button onClick={openAddRoomsModal}>Add Rooms</Button>
      </div>
      <div className="mt-10 px-[5%]">
        <RoomPopulatedGrid
          onTilePress={onTilePress}
          roomPopulatedList={hostelRooms}
          selectedRooms={selectedRooms}
        />
      </div>
      <SelectedRoomsView selectedRooms={selectedRooms} />
    </div>
  );
}

export interface CreateHostelRoomsForm {
  rangeStart: number;
  rangeEnd: number;
  floor: number;
  occupancy: number;
  available: boolean;
}

const defaultCreateHostelRoomsForm: CreateHostelRoomsForm = {
  rangeStart: 1,
  rangeEnd: 1,
  floor: 0,
  occupancy: 2,
  available: true,
};

export function AddRoomsModal(props: { hostelId: string } & ModalProps) {
  const createRoomsMutation = useBatchCreateHostelRoomsMutation(props.hostelId);
  const createHostelRoomsForm = useForm<CreateHostelRoomsForm>({
    initialValues: defaultCreateHostelRoomsForm,
  });
  return (
    <Modal {...props}>
      Create a range of Rooms
      <form
        onSubmit={createHostelRoomsForm.onSubmit((reqForm) => {
          createRoomsMutation.mutate(reqForm);
          props.onClose();
          createHostelRoomsForm.reset();
        })}
      >
        <div className="flex flex-row justify-between">
          <NumberInput
            withAsterisk
            label="Start Number"
            key={createHostelRoomsForm.key("rangeStart")}
            {...createHostelRoomsForm.getInputProps("rangeStart")}
          />
          <NumberInput
            withAsterisk
            label="End Number"
            key={createHostelRoomsForm.key("rangeEnd")}
            {...createHostelRoomsForm.getInputProps("rangeEnd")}
          />
        </div>
        <NumberInput
          withAsterisk
          label="Floor"
          key={createHostelRoomsForm.key("floor")}
          {...createHostelRoomsForm.getInputProps("floor")}
        />
        <NumberInput
          withAsterisk
          label="Occupancy"
          key={createHostelRoomsForm.key("occupancy")}
          {...createHostelRoomsForm.getInputProps("occupancy")}
        />
        <Checkbox
          required
          className="mt-2"
          label="Available"
          key={createHostelRoomsForm.key("available")}
          {...createHostelRoomsForm.getInputProps("available", {
            type: "checkbox",
          })}
        />
        <Button className="mt-2" type="submit">
          Create Rooms
        </Button>
      </form>
    </Modal>
  );
}
