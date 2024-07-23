"use client";
import MenuItemViewer from "@/app/mess/MenuItemViewer";
import { Spinner, Typography } from "@/components/components";
import { MessCalendar } from "@/components/Student/MessCalendar/MessCalendar";
import { dummyMealPopulated } from "@/temp/menu";
import { MealByStudent } from "@/types/meal";
import { Accordion } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Masonry from "react-layout-masonry";

export default function StudentMessPage() {
  const [selectedDates, setSelectedDates] = useState<number[]>([]);
  const mealsFetchCall = useQuery({
    queryKey: ["menusByStudent", selectedDates?.toString()],
    queryFn: () => {
      const resposne: MealByStudent[] = [];
      selectedDates?.forEach((date) => {
        resposne.push({
          date: date,
          // @ts-ignore
          meals: dummyMealPopulated,
        });
      });
      return resposne;
    },
  });

  return (
    <div className="m-2 flex flex-wrap gap-5 md:flex-nowrap">
      <div className="text-center">
        <Typography variant="h5" className="my-2">
          Select date to show meal details
        </Typography>
        <MessCalendar setSelectedDate={setSelectedDates} />
      </div>
      <div className="mx-3">
        <Typography variant="h4" className="my-2">
          Meal details
        </Typography>
        {mealsFetchCall.isLoading && (
          <div className="my-10">
            <Spinner />
          </div>
        )}
        {!mealsFetchCall?.isLoading && (
          <div
            className="overflow-y-scroll"
            style={{
              maxHeight: "calc(100dvh - 150px)",
            }}
          >
            <Masonry columns={{ 640: 1, 800: 2, 1200: 3 }}>
              {mealsFetchCall.data?.map((mealsByStudent) => (
                <div key={`MealByStudentDate_${mealsByStudent.date}`}>
                  <div
                    style={{
                      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    }}
                    className="m-2 min-w-[350px] rounded-md p-4"
                  >
                    <Typography variant="h6">
                      Date: {new Date(mealsByStudent.date).getDate()} /{" "}
                      {new Date(mealsByStudent.date).getMonth()} /{" "}
                      {new Date(mealsByStudent.date).getFullYear()}
                    </Typography>

                    <Accordion>
                      {mealsByStudent.meals?.map((meal) => (
                        <Accordion.Item
                          value={meal.type._id}
                          key={`MealByStudentDate_${mealsByStudent.date}_Meal_${meal._id}`}
                          className="my-2"
                        >
                          <Accordion.Control>
                            <Typography variant="h6">
                              {meal.type.name}
                            </Typography>
                          </Accordion.Control>
                          <Accordion.Panel>
                            <MenuItemViewer menu={meal.menu} />
                          </Accordion.Panel>
                        </Accordion.Item>
                      ))}
                    </Accordion>
                  </div>
                </div>
              ))}
            </Masonry>
          </div>
        )}
      </div>
    </div>
  );
}
