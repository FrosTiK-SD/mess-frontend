"use client";
import { Spinner, Typography } from "@/components/components";
import { sessionLastDate, weekMap } from "@/constants/session";
import { dummyFoodItems, dummyMealTypes } from "@/temp/menu";
import { Day, MealType, MenuItem } from "@/types/meal";
import {
  Button,
  Checkbox,
  ComboboxData,
  Input,
  MultiSelect,
  Radio,
  Select,
  Stepper,
  Switch,
} from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { SyntheticEvent, useState } from "react";
import { useUniqueArrayState } from "react-use-object-state";
import weekday from "dayjs/plugin/weekday";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { IconCircleCheck } from "@tabler/icons-react";

dayjs.extend(weekday);
dayjs.extend(isSameOrBefore);

function MenuTemplate({
  messId,
  close,
}: {
  messId: string;
  close: () => void;
}) {
  const [step, setStep] = useState<number>(1);
  const menuItemListFetchCall = useQuery({
    queryKey: [`menu_items_${messId}`],
    queryFn: () => {
      return dummyFoodItems;
    },
  });
  const mealTypeListFetchCall = useQuery({
    queryKey: [`menu_type_${messId}`],
    queryFn: () => {
      return mealTypeListToOptionsMapper(dummyMealTypes);
    },
  });
  const selectedMenuItems = useUniqueArrayState<string>([]);
  const [highestStepVisited] = useState(step);
  const [selectedMealType, setSelectedMealType] = useState<string | null>();
  const selectedDates = useUniqueArrayState<Date>([]);
  const [dateSelectionMode, setDateSelectionMode] = useState<string>("custom");
  const selectedWeekDays = useUniqueArrayState<Day>([]);
  const [applyMode, setApplyMode] = useState<"append" | "overwrite">();

  const getWeekDaysOptions = (): ComboboxData => {
    const days: ComboboxData = [];

    // @ts-ignore
    Object.keys(Day).forEach((day) => days.push({ value: day, label: day }));

    return days;
  };

  const mealTypeListToOptionsMapper = (
    mealTypeList: MealType[],
  ): ComboboxData => {
    const options: ComboboxData = [];

    mealTypeList.forEach((mealType) =>
      // @ts-ignore
      options.push({
        label: mealType.name,
        value: mealType._id,
      }),
    );

    return options;
  };

  // Allow the user to freely go back and forth between visited steps.
  const shouldAllowSelectStep = (stepNo: number) =>
    highestStepVisited >= stepNo && step !== stepNo;

  const markWeeklyCalendar = (days: Day[]) => {
    const sessionEnd = dayjs(sessionLastDate);
    const newDates: Date[] = [];
    days.forEach((day) => {
      let now = dayjs(new Date());
      let weekdayChosen = weekMap[day];
      while (now.isSameOrBefore(sessionEnd, "day")) {
        const nowDay = now.weekday();
        if (nowDay != weekdayChosen) {
          now = now.add(
            nowDay > weekdayChosen
              ? 6 - weekdayChosen + nowDay
              : weekdayChosen - nowDay,
            "day",
          );
        }

        newDates.push(now.toDate());
        now = now.add(7, "day");
      }
    });

    selectedDates.setState(newDates);
  };

  return (
    <div>
      <Stepper
        active={step}
        orientation="vertical"
        styles={{
          step: {
            minHeight: "0px",
            height: "60px",
          },
        }}
        onStepClick={(step) => setStep(step + 1)}
      >
        <Stepper.Step
          loading={step == 1}
          allowStepSelect={shouldAllowSelectStep(0)}
          label="Choose Food Items"
          description="Select the food items you want to have in the menu"
        />
        <Stepper.Step
          loading={step == 2}
          allowStepSelect={shouldAllowSelectStep(1)}
          label="Select dates"
          description="Selct the dates you want to apply this menu to"
        />
        <Stepper.Step
          allowStepSelect={shouldAllowSelectStep(2)}
          label="Done"
          description="The menu is updated!"
        />
      </Stepper>
      {step == 1 &&
        (mealTypeListFetchCall.isLoading ? (
          <Spinner />
        ) : (
          <div className="my-1">
            <div className="my-1">
              <Input.Label className="font-bold" required>
                Meal Type
              </Input.Label>
              <Input.Description className="font-light">
                Choose the meal type you are trying to create.
              </Input.Description>
            </div>
            <Select
              size="xs"
              value={selectedMealType}
              onChange={(value) => setSelectedMealType(value)}
              data={mealTypeListFetchCall.data || []}
            />
          </div>
        ))}

      {step == 1 &&
        (menuItemListFetchCall.isLoading ? (
          <Spinner />
        ) : (
          <div>
            <div className="my-1">
              <Input.Label className="font-bold">Select Menu</Input.Label>
              <Input.Description className="font-light">
                Choose the food items you want to apply to the menu
              </Input.Description>
            </div>
            <div className=" max-h-[300px] overflow-y-scroll">
              {menuItemListFetchCall.data?.map((menuItem: MenuItem) => (
                <div
                  key={`MenuItem_${menuItem._id}`}
                  className={`my-1 rounded-md px-2 ${selectedMenuItems.state.includes(menuItem._id) && "border border-purple-500"} cursor-pointer`}
                >
                  <Checkbox
                    styles={{
                      body: {
                        display: "flex",
                        alignItems: "center",
                      },
                    }}
                    checked={selectedMenuItems.state.includes(menuItem._id)}
                    className="my-2"
                    onClick={() => {
                      selectedMenuItems.toggle(menuItem._id);
                    }}
                    label={
                      <div>
                        <Typography className="text-sm" variant="h6">
                          {menuItem.label}
                        </Typography>
                        <p className="font-light">₹ {menuItem.cost}</p>
                      </div>
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

      {step == 2 && (
        <div>
          <div className="my-2">
            <Input.Label className="font-bold" required>
              Choose dates
            </Input.Label>
            <Input.Description className="font-light">
              Choose the dates you want to apply this menu to
            </Input.Description>
          </div>
          <div>
            <Radio.Group
              value={dateSelectionMode}
              onChange={setDateSelectionMode}
            >
              <Radio
                className="cursor-pointer"
                value="weekly"
                label="Select all the days of"
              />
              {dateSelectionMode === "weekly" && (
                <div className="my-1 ml-8">
                  <MultiSelect
                    value={selectedWeekDays.state}
                    size="xs"
                    onChange={(values: string[]) => {
                      selectedWeekDays.setState(values as Day[]);
                      markWeeklyCalendar(values as Day[]);
                    }}
                    data={getWeekDaysOptions()}
                  />
                  <p className="my-1 text-xs">till {sessionLastDate}</p>
                </div>
              )}
              <Radio className="cursor-pointer" value="custom" label="Custom" />
            </Radio.Group>
          </div>
          <div className="my-2 flex justify-center">
            <Calendar
              getDayProps={(date: Date) => ({
                selected: selectedDates.state.some((s) =>
                  dayjs(date).isSame(s, "date"),
                ),
                onClick: () => {
                  selectedDates.toggle(date);
                },
              })}
            />
          </div>

          <div className="my-2">
            <Input.Label className="my-1 font-bold" required>
              Select Apply Mode
            </Input.Label>
            <Radio.Group
              value={applyMode}
              // @ts-ignore
              onChange={setApplyMode}
            >
              <Radio
                className="cursor-pointer"
                value="overwrite"
                label="Overwrite"
                description="This menu will be the applied as the full menu for the selected days"
              />
              <Radio
                className="cursor-pointer"
                value="append"
                label="Append"
                description="This menu items selected will be added to the already present menu of the selected dates"
              />
            </Radio.Group>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="my-5 flex flex-col items-center justify-center gap-3">
          <IconCircleCheck size={50} />
          <Typography variant="h6">Meal Plan Updated !</Typography>
        </div>
      )}

      <div className="my-2">
        {step == 1 && (
          <Button
            fullWidth
            size="xs"
            disabled={selectedMealType ? false : true}
            onClick={() => setStep((step) => step + 1)}
          >
            Next
          </Button>
        )}

        {step == 2 && (
          <Button
            fullWidth
            size="xs"
            disabled={selectedDates.state.length && applyMode ? false : true}
            onClick={() => setStep((step) => step + 1)}
          >
            Next
          </Button>
        )}
        {step == 3 && (
          <Button
            fullWidth
            size="xs"
            disabled={selectedDates.state.length && applyMode ? false : true}
            onClick={() => close()}
          >
            DONE
          </Button>
        )}
      </div>
    </div>
  );
}

export default MenuTemplate;
