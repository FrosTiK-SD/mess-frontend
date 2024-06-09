"use client";

import { Spinner, Typography } from "@/components/components";
import { MessPopulated } from "@/types/mess";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import MessComponent from "./MessComponent";
import Masonry from "react-layout-masonry";
import { dummyMessPopulated } from "@/temp/mess";

function Page() {
  const messFetchCall = useQuery({
    queryKey: ["messManager"],
    queryFn: () => {
      return dummyMessPopulated;
    },
  });

  return (
    <div className="m-5 h-full px-4 md:m-10 md:px-2">
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
                {/* <div className="mt-5 flex flex-wrap gap-5"> */}
                <Masonry columns={{ 640: 1, 1200: 2 }}>
                  {messFetchCall.data.map((mess: MessPopulated) => (
                    <div key={`Mess_${mess._id}`}>
                      <MessComponent mess={mess} />
                    </div>
                  ))}
                </Masonry>
                {/* </div> */}
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
