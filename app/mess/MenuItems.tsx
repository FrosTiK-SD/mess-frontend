import { Spinner } from "@/components/components";
import { dummyFoodItems } from "@/temp/menu";
import { MessPopulated } from "@/types/mess";
import { useQuery } from "@tanstack/react-query";
import React, { use } from "react";
import MenuItemViewer from "./MenuItemViewer";

function MenuItems({ mess }: { mess: MessPopulated }) {
  const menuItemsFetchCall = useQuery({
    queryKey: [`menu_items_${mess._id}`],
    queryFn: () => {
      return dummyFoodItems;
    },
  });
  return (
    <div className="my-4">
      {menuItemsFetchCall.isLoading && (
        <div className="my-5 flex items-center justify-center">
          <Spinner />
        </div>
      )}
      {!menuItemsFetchCall.isLoading && (
        <MenuItemViewer mess={mess} menu={menuItemsFetchCall.data ?? []} edit />
      )}
    </div>
  );
}

export default MenuItems;
