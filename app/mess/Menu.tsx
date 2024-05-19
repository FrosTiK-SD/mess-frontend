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
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import MenuTemplate from "./MenuTemplate";
import { MessPopulated } from "@/types/mess";

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
  const [menuTemplateModalState, menuTemplateModal] = useDisclosure();

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
        opened={menuTemplateModalState}
        onClose={menuTemplateModal.close}
        centered
        title="Modify Meal Plan"
      >
        <MenuTemplate messId={mess._id} close={menuTemplateModal.close} />
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
      <div className="mt-5 flex items-center justify-between">
        <div>
          <Typography variant="h6">Food Menu</Typography>
          {!mealFetchCall.isLoading && (
            <p className="text-xs font-light">
              Total{" "}
              <b className="text-green-500">{selectedMeal?.menu.length}</b>{" "}
              items
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <IconPlus className="cursor-pointer" />
        </div>
      </div>
      {mealFetchCall.isLoading && <Spinner className="m-auto my-5" />}
      {!mealFetchCall.isLoading && (
        <div className="my-5">
          {selectedMeal?.menu.length ? (
            <div className="">
              <div className="my-2 flex items-center justify-between">
                <Typography variant="h6">Item Name</Typography>
                <div className="flex items-center gap-1">
                  <Tooltip
                    className="cursor-pointer"
                    label="The cost here only is effective if it is taken as an extra item"
                    color="grape"
                  >
                    <IconInfoCircle size={15} />
                  </Tooltip>
                  <Typography variant="h6">Cost</Typography>
                </div>
              </div>
              <ScrollArea mah={150}>
                {selectedMeal.menu.map((menuItem: MenuItem) => (
                  <div
                    key={`Meal_${selectedMeal._id}_Item_${menuItem._id}`}
                    className="my-2 flex items-center justify-between"
                  >
                    <div>
                      <Typography variant="h6" className="text-sm font-medium">
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
              </ScrollArea>
              <Divider className="my-2" />
              <NavLink
                leftSection={<IconFridge size={20} />}
                rightSection={<IconChevronRight />}
                label="Modify Meal Plan"
                onClick={() => menuTemplateModal.open()}
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
