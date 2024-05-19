"use client";

import { Spinner, Typography } from "@/components/components";
import { MessPopulated } from "@/types/mess";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import MessComponent from "./MessComponent";

function Page() {
  const messFetchCall = useQuery({
    queryKey: ["messManager"],
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
    <div className="h-full w-full px-4 md:px-2">
      <Typography variant="h2">Mess Manager</Typography>
      <Typography variant="h6">
        Find the details of all the alloted messes in one place
      </Typography>
      <div className="mt-5">
        {messFetchCall.isLoading ? (
          <div>
            <Spinner />
          </div>
        ) : (
          <div>
            {messFetchCall.data?.length ? (
              <div>
                <Typography variant="h5">
                  Total{" "}
                  <b className="text-green-400">{messFetchCall.data.length}</b>{" "}
                  messes found alloted to you
                </Typography>
                <div className="mt-5 flex flex-wrap gap-5">
                  {messFetchCall.data.map((mess: MessPopulated) => (
                    <div key={`Mess_${mess._id}`}>
                      <MessComponent mess={mess} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center">No messes found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
