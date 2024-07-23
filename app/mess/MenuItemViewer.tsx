"use client";
import { MenuItem } from "@/types/meal";
import React, { useState } from "react";
import { Typography } from "@/components/components";
import { Tooltip, NavLink, Modal } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import AddMenuItem from "./AddFoodItems";
import { MessPopulated } from "@/types/mess";

function MenuItemViewer({
  mess,
  menu,
  edit,
}: {
  mess?: MessPopulated;
  menu: MenuItem[];
  edit?: boolean;
}) {
  const [editMenuItemModalState, editMenuItemModalAction] = useDisclosure();
  const [selectedEditMenuItem, setSelectedEditMenuItem] = useState<MenuItem>();

  return (
    <div>
      <Modal
        onClose={editMenuItemModalAction.close}
        opened={editMenuItemModalState}
        title="Edit Menu Item"
      >
        <AddMenuItem
          close={editMenuItemModalAction.close}
          messId={mess?._id || ""}
          editMenu={selectedEditMenuItem}
        />
      </Modal>
      <div className="my-2 flex items-center justify-between">
        <Typography variant="h6">Item Name</Typography>
        <div className="flex items-center gap-1">
          <Tooltip
            className="cursor-pointer"
            label="The cost here only is effective if it is taken as an extra item"
            variant="outlined"
          >
            <IconInfoCircle size={15} />
          </Tooltip>
          <Typography variant="h6">Extra Cost</Typography>
        </div>
      </div>
      <div className="no-scrollbar max-h-[200px] overflow-y-scroll">
        {menu?.map((menuItem: MenuItem) => (
          <div
            key={`Menu_Item_${menuItem._id}`}
            className="my-3 flex items-center justify-between"
          >
            <div>
              <Typography
                variant="h6"
                className={`text-sm font-medium ${edit && "cursor-pointer underline underline-offset-4"}`}
                onClick={() => {
                  setSelectedEditMenuItem(menuItem);
                  editMenuItemModalAction.open();
                }}
              >
                {menuItem.label}
              </Typography>
              {menuItem.description && (
                <p className="mt-[-2px] text-xs font-light">
                  {menuItem.description}
                </p>
              )}
            </div>
            <Typography variant="h6" className="text-sm font-medium">
              ₹ {menuItem.cost}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuItemViewer;
