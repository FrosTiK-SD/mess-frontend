"use client"
import { Welcome } from "@/components/Welcome/Welcome";

export default function Home() {
  console.log("hello");
  console.log(process.env.NODE_ENV);
  return (
   <>
   <Welcome/>
   </> 
  );
}
