"use client";
import { IconCalendar, IconChevronRight, IconPlus } from "@tabler/icons-react";
import React, { useState } from "react";
import { Spinner, Typography } from "@/components/components";
import { DatePicker } from "@mantine/dates";
import { ActionIcon, Input, NavLink } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { Day, MealPopulated } from "@/types/meal";
import { dummyMealPopulated } from "@/temp/menu";

function MenuDisplay({ date }: { date: Date }) {
  const menuFetchCall = useQuery({
    queryKey: [`menu_display_${date}`],
    queryFn: () => {
      return dummyMealPopulated;
    },
  });
  return (
    <div>
      <div className="mt-5 flex items-center justify-between">
        <div>
          <Typography variant="h6">Food Menu</Typography>
          {!menuFetchCall.isLoading && (
            <p className="text-xs font-light">
              Total{" "}
              <b className="text-green-500">{menuFetchCall.data?.length}</b>{" "}
              items
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <IconPlus className="cursor-pointer" />
        </div>
      </div>
      {menuFetchCall.isLoading && <Spinner className="m-auto my-5" />}
      {!menuFetchCall.isLoading && (
        <div className="my-5">
          {menuFetchCall.data?.length ? (
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
