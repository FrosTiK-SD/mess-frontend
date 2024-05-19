"use client";

import { navbarSchema } from "@/config/Navbar";
import { ASSETS } from "@/constants/assets";
import {
  AppShell,
  Avatar,
  ScrollArea,
  Text,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import classes from "./Navbar.module.css";

export function Navbar() {
  const router = useRouter();
  const image = "";
  return (
    <>
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
              <Avatar src={image || ASSETS.iitbhu_logo} radius="xl" />
              <div className="grow">
                <Text size="sm">User Name</Text>
                <Text c="dimmed" size="xs">
                  example.name@gmail.com
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
