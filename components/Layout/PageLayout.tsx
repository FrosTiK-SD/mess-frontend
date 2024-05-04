"use client"
import { ScrollArea } from "@mantine/core";
import { Header } from "./Header";
import { Navbar } from "./Navbar";

export function PageLayout({children}:{children:React.ReactNode}){
    return (
        <div className="h-[100dvh]">
            <div className="h-[100dvh] absolute flex flex-col">

                <div className="h-10">
                    <Header/>
                </div>
                <div className="grow max-w-14 bg-black">
                <Navbar/>
                </div>
            </div>
                {/* Take into account Navbar and header width */}
                <ScrollArea h={window.innerHeight-40} className="pt-10 pl-14" type="auto">
                    {children}
                </ScrollArea>
        </div>
    )
}