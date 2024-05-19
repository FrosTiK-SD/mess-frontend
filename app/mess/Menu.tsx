"use client";
import { IconCalendar, IconChevronRight, IconPlus } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { Spinner, Typography } from "@/components/components";
import { DatePicker } from "@mantine/dates";
import {
  ActionIcon,
  ComboboxData,
  Input,
  NavLink,
  Select,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { Day, MealPopulated } from "@/types/meal";
import { dummyMealPopulated } from "@/temp/menu";

export interface MealMap {
  [key: string]: MealPopulated;
}

function MenuDisplay({ date }: { date: Date }) {
  const mealFetchCall = useQuery({
    queryKey: [`menu_display_${date}`],
    queryFn: () => {
      return mealPopulatedListToMealTypeMapper(dummyMealPopulated);
    },
  });

  const [selectedMeal, setSelectedMeal] = useState<MealPopulated>();
  const [mealTypeOptions, setMealTypeOptions] = useState<ComboboxData>([]);

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
      <div>
        <div className=""></div>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <div>
          <Typography variant="h6">Food Menu</Typography>
          {!mealFetchCall.isLoading && (
            <p className="text-xs font-light">
              Total{" "}
              <b className="text-green-500">
                {Object.keys(mealFetchCall.data || {}).length}
              </b>{" "}
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
          {mealFetchCall.data?.length ? (
            <div className=""></div>
          ) : (
            <div className="m-auto text-center text-sm">Nothing to display</div>
          )}
        </div>
      )}
    </div>
  );
}

function Menu() {
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
            <MenuDisplay date={chosenDate} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;
