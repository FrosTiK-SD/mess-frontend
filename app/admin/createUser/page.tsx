"use client";
import { Typography } from "@/components/components";
import { Role, roleDisplayNames, rolesArray } from "@/constants/permissions";
import { useCreateUserMutation } from "@/hooks/user";
import { Button, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

export default function CreateUserPage() {
  const createUserForm = useForm<{ email: string; role: Role }>({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      role: Role.USER,
    },
  });
  const createUserMutation = useCreateUserMutation();

  return (
    <div>
      <Typography>Create User</Typography>
      <TextInput
        label={"Email"}
        key={createUserForm.key("email")}
        {...createUserForm.getInputProps("email")}
      />
      <Select
        label={"Role"}
        key={createUserForm.key("role")}
        data={rolesArray.map((role) => ({
          value: role,
          label: roleDisplayNames[role],
        }))}
        {...createUserForm.getInputProps("role")}
      />
      <Button
        onClick={() => createUserMutation.mutate(createUserForm.getValues())}
      >
        Create User
      </Button>
    </div>
  );
}
