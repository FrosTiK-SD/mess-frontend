"use client";

import { ScrollArea } from "@mantine/core";
import { Header } from "./Header";
import { Navbar } from "./Navbar";

import { ThemeProvider } from "@material-tailwind/react";

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div className="flex h-[100dvh] flex-col">
        <div className="h-10">
          <Header />
        </div>
        <div className="flex flex-row">
          <Navbar />
          {/* Take into account Navbar and header width */}
          <ScrollArea
            className="h-[calc(100dvh-40px)] pt-10 md:pl-[rem(80px)]"
            type="auto"
          >
            {children}
          </ScrollArea>
        </div>
      </div>
    </ThemeProvider>
  );
}
