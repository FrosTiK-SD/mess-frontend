import { defaultHostel } from "@/constants/hostel";
import { Hostel } from "@/types/hostel";
import { Button, Modal, ModalProps, Text, TextInput } from "@mantine/core";
import { useState } from "react";

export function CreateHostelModal(
  props: {
    onSave: (hostel: Hostel) => void;
  } & ModalProps,
) {
  const [hostel, setHostel] = useState<Hostel>(defaultHostel);
  return (
    <Modal {...props}>
      <div>
        <Text>Create Hostel</Text>
        <TextInput
          label="Hostel Name"
          value={hostel.name}
          onChange={(event) =>
            setHostel({ ...hostel, name: event.currentTarget.value })
          }
        />
        <Button
          onClick={async () => {
            await props.onSave(hostel);
            props.onClose();
          }}
        >
          Save
        </Button>
      </div>
    </Modal>
  );
}
