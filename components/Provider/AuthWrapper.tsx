"use client";

import { auth } from "@/firebase/auth";
import { User } from "@/types/user";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { LoadingPage } from "../LoadingPage";
import { LoginPage } from "../LoginPage";

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean>(true);

  //To trigger a rerender
  const [dummy, setDummy] = useState<boolean>(false);
  const currentUserQuery = useQuery({
    queryKey: ["currentUser"],
    enabled: auth.currentUser != null,
    queryFn: async () => {
      const response: AxiosResponse<{ user: User }> = await axios.get(
        `${process.env.NEXT_PUBLIC_AUTH_BACKEND}/user/token`,
      );

      return response.data.user;
    },
  });
  const queryClient = useQueryClient();

  console.log("Firebase Current User : ", auth.currentUser);

  useEffect(() => {
    console.log("Auth Use Effect");
    auth.authStateReady().then(() => {
      console.log("Initial Auth State Loaded");
      setLoading(false);
    });
    auth.onAuthStateChanged(() => {
      //Invalidate all caches
      queryClient.invalidateQueries();
      setDummy((prev) => !prev);
    });
    axios.interceptors.request.use(async (config) => {
      if (auth.currentUser != null) {
        config.headers["token"] = await auth.currentUser.getIdToken();
      }
      return config;
    });
  }, [queryClient]);

  return (
    <>
      {loading ? (
        <div className="h-[100dvh] w-full">
          <LoadingPage />
        </div>
      ) : auth.currentUser == null ? (
        <LoginPage />
      ) : (
        <>{children}</>
      )}
    </>
  );
}
