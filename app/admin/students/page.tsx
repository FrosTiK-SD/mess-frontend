"use client";

import { LoadingComponent } from "@/components/LoadingOverlay";
import { StudentFilter } from "@/components/Student/StudentFilter";
import { StudentTable } from "@/components/Student/StudentTable";
import { defaultFilter } from "@/constants/user";
import { useGetFilteredUsers } from "@/hooks/user";
import { UserFilter } from "@/types/user";
import { DeepReadonly } from "@/types/util";
import { Button } from "@mantine/core";
import { useState } from "react";

export default function AssignHostel() {
  const [filter, setFilter] = useState<DeepReadonly<UserFilter>>(defaultFilter);
  const [showFilter, setShowFilter] = useState<boolean>(true);
  const [studentSelection, setStudentSelection] = useState<
    Record<string, boolean>
  >({});

  const userQuery = useGetFilteredUsers(filter);

  return (
    <div>
      <LoadingComponent visible={userQuery.isRefetching} />
      {showFilter && (
        <div>
          <StudentFilter filter={filter} setFilter={setFilter} />
          <Button
            color="grape"
            className="mt-8"
            onClick={() => {
              setShowFilter(false);
              userQuery.refetch();
            }}
          >
            Search
          </Button>
        </div>
      )}
      {!showFilter && (
        <div>
          <Button
            color="grape"
            className="mb-4"
            onClick={() => setShowFilter(true)}
          >
            Back to Filters
          </Button>
          <StudentTable
            students={userQuery.data ?? []}
            selectionState={studentSelection}
            setSelectionState={setStudentSelection}
          />
        </div>
      )}
    </div>
  );
}
