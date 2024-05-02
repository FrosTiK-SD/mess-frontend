"use client"
import { Welcome } from "@/components/Welcome/Welcome";
import { useMantineColorScheme } from "@mantine/core";

export default function Home() {
  const {colorScheme,toggleColorScheme} = useMantineColorScheme();
  console.log(colorScheme);
  return (
   <>
   <Welcome/>
   </> 
  );
}
