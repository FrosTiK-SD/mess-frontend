import { ScrollArea } from "@mantine/core";
import { Header } from "./Header";
import { Navbar } from "./Navbar";

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[100dvh]">
      <div className="absolute flex h-[100dvh] flex-col">
        <div className="h-10">
          <Header />
        </div>
        <div className="hidden max-w-14 grow bg-black md:block">
          <Navbar />
        </div>
      </div>
      {/* Take into account Navbar and header width */}
      <ScrollArea className="h-[calc(100dvh-40px)] pt-10 md:pl-14" type="auto">
        {children}
      </ScrollArea>
    </div>
  );
}
