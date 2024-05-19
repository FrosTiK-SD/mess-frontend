"use client";

import { Switch, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

export default function ThemeToggle() {
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <Switch
      size="lg"
      checked={colorScheme == "dark"}
      color={colorScheme === "dark" ? "gray" : "dark"}
      onChange={toggleColorScheme}
      onLabel={
        <IconSun size={20} stroke={2.5} color={theme.colors.yellow[4]} />
      }
      offLabel={
        <IconMoonStars size={20} stroke={2.5} color={theme.colors.blue[6]} />
      }
    />
  );
}
