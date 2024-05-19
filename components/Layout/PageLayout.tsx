"use client";

import { ASSETS } from "@/constants/assets";
import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ThemeProvider } from "@material-tailwind/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Typography } from "../components";
import { Navbar } from "./Navbar";

import classes from "./PageLayout.module.css";

// load ThemeToggle without SSR due to hydration error
const ThemeToggle = dynamic(() => import("../Theme/ThemeToggle"), {
  ssr: false,
});

export function PageLayout({ children }: { children: React.ReactNode }) {
  const [navbarOpened, { toggle: toggleNavbar }] = useDisclosure();

  return (
    <ThemeProvider>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 250,
          breakpoint: "sm",
          collapsed: { mobile: !navbarOpened },
        }}
      >
        <AppShell.Header className={classes.topNav}>
          <div className="flex h-full flex-row justify-between px-4 py-2">
            <div className="flex flex-row">
              <Burger
                opened={navbarOpened}
                onClick={toggleNavbar}
                hiddenFrom="sm"
                size="md"
              />
              <Link href="/" className="flex flex-row items-center space-x-2">
                <Image
                  src={ASSETS.iitbhu_logo}
                  alt="IIT BHU LOGO"
                  width={40}
                  height={40}
                />
                <Typography variant="h3">IIT BHU</Typography>
              </Link>
            </div>
            <ThemeToggle />
          </div>
        </AppShell.Header>
        <AppShell.Navbar p="md" className={classes.navbar}>
          <Navbar />
        </AppShell.Navbar>
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </ThemeProvider>
  );
}
