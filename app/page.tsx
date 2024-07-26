"use client";

import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const userQuery = useQuery({
    queryKey: ["currentUser"],
  });
  if (userQuery.isSuccess) {
    console.log(userQuery.data);
  }
  return <></>;
}
