"use client";
import { Typography } from "@/components/components";
import { MessPopulated } from "@/types/mess";
import { Button, rem, Tabs } from "@mantine/core";
import {
  IconBowl,
  IconBuilding,
  IconEdit,
  IconMenu,
  IconPlus,
  IconToolsKitchen3,
  IconUser,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import tabClass from "./Tab.module.css";
import Menu from "./Menu";
import { useViewportSize } from "@mantine/hooks";

function MessComponent({ mess }: { mess: MessPopulated }) {
  const [showDetails, setShowDetails] = useState<Boolean>(false);
  const { width } = useViewportSize();

  const messFetchCall = useQuery({
    queryKey: [`mess_${mess._id}`],
    queryFn: () => {
      const demoMess: MessPopulated[] = [
        {
          _id: "1243",
          caretakers: ["erg13", "wrg31r"],
          hostel: {
            _id: "1`",
            name: "Limbdi",
          },
          name: "Limbdi Mess 1",
          users: [
            {
              _id: "1244",
              email: "dev.raj.op",
              firstName: "Dev",
              lastName: "RAJJ",
              rollNo: "OPRollNO",
            },
          ],
        },
        {
          _id: "1243",
          caretakers: ["erg13", "wrg31r"],
          hostel: {
            _id: "1`",
            name: "Limbdi",
          },
          name: "Limbdi Mess 2",
          users: [
            {
              _id: "1244",
              email: "dev.raj.op",
              firstName: "Dev",
              lastName: "RAJJ",
              rollNo: "OPRollNO",
            },
          ],
        },
      ];

      return demoMess;
    },
  });

  return (
    <div
      className="my-2 min-w-[90vw] max-w-[700px] rounded-md px-10 py-4 md:min-w-[500px]"
      style={{
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      }}
    >
      <div className=" flex items-center justify-between rounded-md ">
        <div>
          <Typography variant="h5">{mess.name}</Typography>
          <div className="flex items-center gap-1">
            <IconBuilding size={15} />
            <p className="text-light"> {mess.hostel.name}</p>
            <IconUser size={15} className="ml-2" />
            <p className="text-light"> {mess.users.length}</p>
          </div>
        </div>
        <Button onClick={() => setShowDetails((show) => !show)}>
          {showDetails ? "HIDE" : "VIEW"}
        </Button>
      </div>
      {showDetails && (
        <div className="mt-5">
          <Tabs variant="unstyled" defaultValue="menu" classNames={tabClass}>
            <Tabs.List grow>
              <Tabs.Tab
                value="menu"
                leftSection={
                  <IconToolsKitchen3
                    style={{ width: rem(16), height: rem(16) }}
                  />
                }
              >
                {width > 700 && "Menu"}
              </Tabs.Tab>
              <Tabs.Tab
                value="students"
                leftSection={
                  <IconUser style={{ width: rem(16), height: rem(16) }} />
                }
              >
                {width > 700 && "Students"}
              </Tabs.Tab>

              <Tabs.Tab
                value="foodItems"
                leftSection={
                  <IconBowl style={{ width: rem(16), height: rem(16) }} />
                }
              >
                {width > 700 && "Food Menu"}
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="menu">
              <Menu />
            </Tabs.Panel>

            <Tabs.Panel value="students">Messages tab content</Tabs.Panel>

            <Tabs.Panel value="foodItems">Settings tab content</Tabs.Panel>
          </Tabs>
        </div>
      )}
    </div>
  );
}

export default MessComponent;
