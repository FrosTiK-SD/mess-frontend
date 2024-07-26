"use client";
import { Typography } from "@/components/components";
import { LoadingComponent } from "@/components/LoadingOverlay";
import { getSampleGroup } from "@/temp/group";
import { UserGroup } from "@/types/userGroup";
import { Button, MultiSelect, TextInput } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useState } from "react";

export default function CreateUserPage() {
  const [email, setEmail] = useState<string>("");
  const [groups, setGroups] = useState<Array<string>>([]);
  const groupsQuery = useQuery<Array<UserGroup>>({
    queryKey: ["groups"],
    queryFn: async () => {
      return [getSampleGroup(42)];
      return (await axios.get(`${process.env.NEXT_PUBLIC_AUTH_BACKEND}/groups`))
        .data.groups;
    },
  });
  const handleCreateUser = useCallback(
    async (email: string, groups: Array<string>) => {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_AUTH_BACKEND}/admin/user`, {
          email,
          groups,
        });
        alert("User Created");
      } catch (_) {
        alert("Creation Failed");
      }
    },
    [],
  );
  return (
    <div>
      <LoadingComponent visible={groupsQuery.isLoading} />
      <Typography>Create User</Typography>
      <TextInput
        label={"Email"}
        value={email}
        onChange={(event) => setEmail(event.currentTarget.value)}
      />
      <MultiSelect
        label={"Groups"}
        value={groups}
        onChange={(newGroups) => setGroups(newGroups)}
        data={(groupsQuery.data ?? []).map((group) => ({
          value: group._id,
          label: group.name,
        }))}
      />
      <Button onClick={() => handleCreateUser(email, groups)}>
        Create User
      </Button>
    </div>
  );
}
