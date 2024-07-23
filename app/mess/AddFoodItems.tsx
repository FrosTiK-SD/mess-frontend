import { Typography } from "@/components/components";
import { CreateMenuItem, MenuItem } from "@/types/meal";
import { Mess, MessPopulated } from "@/types/mess";
import { Button, Input, NumberInput, TextInput } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import React, { useState } from "react";

function AddMenuItem({
  messId,
  close,
  editMenu,
}: {
  messId: string;
  close: () => void;
  editMenu?: MenuItem;
}) {
  const [menuItem, setMenuItem] = useState<CreateMenuItem>({
    cost: editMenu?.cost || NaN,
    label: editMenu?.label || "",
    mess: messId,
    description: editMenu?.description || "",
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="w-full">
      {!submitted && (
        <div>
          <div className="my-2">
            <Input.Label className="font-bold" required>
              Food item name
            </Input.Label>
            <Input.Description className="mt-[-1px] font-light">
              eg Paneer Butter masala etc..
            </Input.Description>
            <TextInput
              value={menuItem.label}
              onChange={(e) =>
                setMenuItem({ ...menuItem, label: e.target.value })
              }
            />
          </div>
          <div className="my-2">
            <Input.Label className="font-bold" required>
              Food item cost
            </Input.Label>
            <Input.Description className="mt-[-1px] font-light">
              This cost will only be applicable if the item is taken as an extra
              item. It will have no effect in the total meal price
            </Input.Description>
            <NumberInput
              value={menuItem.cost}
              min={0}
              onChange={(value) =>
                setMenuItem({ ...menuItem, cost: Number(value) })
              }
              leftSection={"₹"}
            />
          </div>
          <div className="my-2">
            <Input.Label className="font-bold">Description</Input.Label>
            <Input.Description className="mt-[-1px] font-light">
              eg. Ingredients, way of making etc
            </Input.Description>
            <TextInput
              value={menuItem.description}
              onChange={(e) =>
                setMenuItem({ ...menuItem, description: e.target.value })
              }
            />
          </div>
          <div className="my-1">
            <Button
              fullWidth
              size="xs"
              disabled={!(!Number.isNaN(menuItem.cost) && menuItem.label != "")}
              onClick={handleSubmit}
            >
              {editMenu ? "UPDATE" : "SUBMIT"}
            </Button>
          </div>
        </div>
      )}
      {submitted && (
        <div className="my-2 flex w-full flex-col items-center justify-center gap-3">
          <IconCircleCheck size={50} />
          <Typography variant="h6">Food Item Added !</Typography>
          <div className="my-1 w-full">
            <Button fullWidth size="xs" onClick={close}>
              OK
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddMenuItem;
