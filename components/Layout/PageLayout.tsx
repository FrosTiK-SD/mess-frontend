"use client";

import { ScrollArea } from "@mantine/core";
import { Header } from "./Header";
import { Navbar } from "./Navbar";

import { ThemeProvider } from "@material-tailwind/react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="flex h-[100dvh] flex-col">
          <div className="h-10">
            <Header />
          </div>
          <div className="flex flex-row">
            <Navbar />
            {/* Take into account Navbar and header width */}
            <ScrollArea
              className="h-[calc(100dvh-40px)] w-full pt-10 md:px-[rem(80px)]"
              type="auto"
            >
              {children}
            </ScrollArea>
          </div>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
