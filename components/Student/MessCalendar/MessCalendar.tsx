"use client";

import { Box } from "@mantine/core";
import { DatePicker } from "@mantine/dates";

export function MessCalendar() {
  return (
    <DatePicker
      size="lg"
      maxLevel="year"
      withCellSpacing={false}
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
  );
}
