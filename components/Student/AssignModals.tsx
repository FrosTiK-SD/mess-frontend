import { Hostel } from "@/types/hostel";
import { Mess } from "@/types/mess";
import { Button, Modal, ModalProps, Select } from "@mantine/core";

type AssignHostelModalProps = ModalProps & {
  hostels: Array<Hostel>;
  handleHostelAssign: () => void;
};
export function AssignHostelModal(modalProps: AssignHostelModalProps) {
  const { hostels, handleHostelAssign } = modalProps;
  return (
    <Modal {...modalProps} title="Assign Hostel">
      <Select
        data={hostels.map((hostel) => ({
          label: hostel.name,
          value: hostel._id,
        }))}
      />
      <Button onClick={handleHostelAssign}>Assign</Button>
    </Modal>
  );
}

type AssignMessModalProps = ModalProps & {
  messes: Array<Mess>;
  handleMessAssign: () => void;
};
export function AssignMessModal(modalProps: AssignMessModalProps) {
  const { messes, handleMessAssign } = modalProps;

  return (
    <Modal {...modalProps} title="Assign Mess">
      <Select
        data={messes.map((mess) => ({
          label: mess.name,
          value: mess._id,
        }))}
      />
      <Button onClick={handleMessAssign}>Assign</Button>
    </Modal>
  );
}
