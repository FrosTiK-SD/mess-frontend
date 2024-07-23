"use client";

import { Box, Select } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { useState } from "react";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrBefore);

export function MessCalendar({
  setSelectedDate,
}: {
  setSelectedDate: (date: number[]) => void;
}) {
  const [mode, setMode] = useState<"multiple" | "range">("multiple");

  const getDatesBetweenRange = (startDate: Date, endDate: Date): Date[] => {
    let start = dayjs(startDate);
    const newDates: Date[] = [];
    const end = dayjs(endDate);

    while (start.isSameOrBefore(end)) {
      newDates.push(start.toDate());
      start = start.add(1, "day");
    }

    return newDates;
  };

  const getDatesInt = (dates: Date[]): number[] => {
    const datesInt: number[] = [];
    dates.forEach((date: Date) => datesInt.push(date.getTime()));
    return datesInt;
  };

  return (
    <div className="mx-2 text-left">
      <Select
        defaultValue={"multiple"}
        label="Select Mode"
        className="my-2"
        allowDeselect={false}
        data={[
          { label: "Free Select", value: "multiple" },
          { label: "Ramge Select", value: "range" },
        ]}
        onChange={(newMode) => {
          // @ts-ignore
          setMode(newMode);
        }}
      />
      <DatePicker
        size="xl"
        type={mode}
        maxLevel="year"
        withCellSpacing={false}
        onChange={(selectedDates) => {
          console.log(selectedDates);
          const dates: Date[] = [];
          selectedDates.forEach((date) => {
            if (date) dates.push(date);
          });

          setSelectedDate(
            mode == "range" && dates.length == 2
              ? getDatesInt(getDatesBetweenRange(dates[0], dates[1]))
              : getDatesInt(dates),
          );
        }}
        styles={{
          month: {
            borderCollapse: "separate",
          },
          monthCell: {
            // borderWidth: "0.5px",
            borderColor: "gray",
            borderRadius: "var(--mantine-radius-default)",
          },
        }}
        renderDay={(date) => (
          <div className="flex flex-col items-center">
            {date.getDate()}
            <div className="flex w-[21.28px] flex-row justify-between">
              <Box className="h-1 w-1 rounded-full bg-red-600" />
              <Box className="h-1 w-1 rounded-full bg-green-500" />
              <Box className="h-1 w-1 rounded-full bg-green-500" />
            </div>
          </div>
        )}
      />
    </div>
  );
}
