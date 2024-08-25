"use client";

import { navbarSchema } from "@/config/Navbar";
import { ASSETS } from "@/constants/assets";
import { auth } from "@/firebase/auth";
import { useGetAllSemesters } from "@/hooks/semesters";
import { AppUser } from "@/types/user";
import { GetName } from "@/utils/student";
import {
  AppShell,
  Avatar,
  LoadingOverlay,
  ScrollArea,
  Select,
  Text,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import classes from "./Navbar.module.css";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const userQuery = useQuery<AppUser>({ queryKey: ["currentUser"] });
  const imageURL: string = auth.currentUser?.photoURL ?? "";
  const name: string = userQuery.isSuccess ? GetName(userQuery.data) : "";
  const email: string = auth.currentUser?.email ?? "";
  const semestersQuery = useGetAllSemesters();
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.get("semester") != selectedSemester) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("semester", selectedSemester);
      router.push(pathname + "?" + params.toString());
    }
  }, [selectedSemester, searchParams, router, pathname]);

  useEffect(() => {
    if (semestersQuery.data) {
      setSelectedSemester(semestersQuery.data[0]?._id ?? "");
    }
  }, [semestersQuery.data]);

  return (
    <>
      {semestersQuery.data ? (
        <Select
          label="Semester"
          data={semestersQuery.data.map((semester) => ({
            label: semester.name,
            value: semester._id,
          }))}
          value={selectedSemester}
          onChange={(value) => setSelectedSemester(value ?? "")}
        />
      ) : (
        <LoadingOverlay />
      )}
      <AppShell.Section grow component={ScrollArea}>
        {navbarSchema.map(({ icon: Icon, label, path }) => (
          <div key={path} className={classes.navElement}>
            <Link
              className="flex h-full w-full flex-row items-center space-x-2 px-2 py-2"
              href={path}
            >
              <ThemeIcon variant="light" size={30}>
                <Icon />
              </ThemeIcon>
              <Text>{label}</Text>
            </Link>
          </div>
        ))}
      </AppShell.Section>
      <AppShell.Section className={classes.bottomSection}>
        <UnstyledButton
          className={classes.userButton}
          onClick={() => router.push("/user/profile")}
        >
          <div className="flex flex-row items-center justify-center space-x-2">
            <div className="flex flex-row space-x-2">
              <Avatar src={imageURL || ASSETS.iitbhu_logo} radius="xl" />
              <div className="grow">
                <Text size="sm">{name}</Text>
                <Text c="dimmed" size="xs">
                  {email}
                </Text>
              </div>
            </div>
            <IconChevronRight />
          </div>
        </UnstyledButton>
      </AppShell.Section>
    </>
  );
}
