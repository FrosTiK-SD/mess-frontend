"use client";
import { Spinner, Typography } from "@/components/components";
import { dummyMealPopulated } from "@/temp/menu";
import { MealPopulated, MenuItem } from "@/types/meal";
import {
  ComboboxData,
  Divider,
  Input,
  Modal,
  NavLink,
  ScrollArea,
  Select,
  Tooltip,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCalendar,
  IconChevronRight,
  IconClock,
  IconFridge,
  IconInfoCircle,
  IconPlus,
  IconToolsKitchen2,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import MenuTemplate from "./MenuTemplate";
import { MessPopulated } from "@/types/mess";
import AddMenuItem from "./AddFoodItems";
import MenuItemViewer from "./MenuItemViewer";

export interface MealMap {
  [key: string]: MealPopulated;
}

function MenuDisplay({ date, mess }: { date: Date; mess: MessPopulated }) {
  const mealFetchCall = useQuery({
    queryKey: [`menu_display_${date}`],
    queryFn: () => {
      return mealPopulatedListToMealTypeMapper(dummyMealPopulated);
    },
  });

  const [selectedMeal, setSelectedMeal] = useState<MealPopulated>();
  const [mealTypeOptions, setMealTypeOptions] = useState<ComboboxData>([]);
  const [modifyMenuModalState, modifyMenuModal] = useDisclosure();
  const [addMenuItemsModalState, addMenuItemsModal] = useDisclosure();

  const mealPopulatedListToMealTypeMapper = (
    mealPopulatedList: Array<MealPopulated>,
  ): MealMap => {
    const mealMap: MealMap = {};

    mealPopulatedList.forEach((meal) => (mealMap[meal.type._id] = meal));

    return mealMap;
  };

  const mealMapToMealTypeOptions = (mealMap?: MealMap): ComboboxData => {
    if (!mealMap) return [];

    const options: ComboboxData = [];

    Object.entries(mealMap).forEach(([_, meal]) =>
      // @ts-ignore
      options.push({
        value: meal.type._id,
        label: meal.type.name,
      }),
    );

    return options;
  };

  useEffect(() => {
    if (!mealFetchCall.data) return;
    const mealTypeOptions = mealMapToMealTypeOptions(mealFetchCall.data);
    setMealTypeOptions(mealTypeOptions);

    if (mealTypeOptions.length) {
      // @ts-ignore
      setSelectedMeal(mealFetchCall.data[mealTypeOptions[0].value]);
    }
  }, [mealFetchCall.data]);

  return (
    <div>
      <Modal
        opened={modifyMenuModalState}
        onClose={modifyMenuModal.close}
        centered
        title="Modify Meal Plan"
      >
        <MenuTemplate messId={mess._id} close={modifyMenuModal.close} />
      </Modal>
      <Modal
        opened={addMenuItemsModalState}
        onClose={addMenuItemsModal.close}
        centered
        title="Add Food Items"
      >
        <AddMenuItem messId={mess._id} close={addMenuItemsModal.close} />
      </Modal>
      <div className="my-2">
        <Select
          data={mealTypeOptions}
          value={selectedMeal?.type._id}
          onChange={(value) =>
            value &&
            mealFetchCall.data &&
            setSelectedMeal(mealFetchCall.data[value])
          }
        />
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <IconClock size={15} />
          <p>
            {selectedMeal?.type.startTime} - {selectedMeal?.type.endTime}
          </p>
        </div>
        <p>₹ {selectedMeal?.type.cost}</p>
      </div>
      {mealFetchCall.isLoading && <Spinner className="m-auto my-5" />}
      {!mealFetchCall.isLoading && (
        <div className="my-5">
          {selectedMeal?.menu.length ? (
            <div className="">
              <MenuItemViewer mess={mess} menu={selectedMeal.menu} />
              <Divider className="my-2" />
              <NavLink
                leftSection={<IconToolsKitchen2 size={20} />}
                rightSection={<IconChevronRight />}
                label="Add Food Items"
                onClick={() => addMenuItemsModal.open()}
              />
              <NavLink
                leftSection={<IconFridge size={20} />}
                rightSection={<IconChevronRight />}
                label="Modify Meal Plan"
                onClick={() => modifyMenuModal.open()}
              />
            </div>
          ) : (
            <div className="m-auto text-center text-sm">Nothing to display</div>
          )}
        </div>
      )}
    </div>
  );
}

function Menu({ mess }: { mess: MessPopulated }) {
  const [chosenDate, setChosenDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  return (
    <div>
      {showDatePicker && (
        <div className="mt-5 flex flex-col items-center justify-center">
          <Input.Label className="my-2 font-bold">
            Choose the date to see the menu
          </Input.Label>
          <DatePicker
            value={chosenDate}
            onChange={(date) => {
              setChosenDate(date as Date);
              setShowDatePicker(false);
            }}
          />
        </div>
      )}

      {!showDatePicker && (
        <div className="mt-3">
          <NavLink
            leftSection={<IconCalendar size={20} />}
            rightSection={<IconChevronRight />}
            label={`${chosenDate.getDate()} / ${chosenDate.getMonth()} /
            ${chosenDate.getFullYear()}`}
            active
            onClick={() => setShowDatePicker(true)}
          />

          <div>
            <MenuDisplay date={chosenDate} mess={mess} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;
