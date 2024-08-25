"use client";

import { API_ENDPOINT } from "@/constants/utils";
import { auth } from "@/firebase/auth";
import { AppUser } from "@/types/user";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
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
      try {
        const response: AxiosResponse<{ user: AppUser }> = await axios.get(
          `${API_ENDPOINT}/token/user`,
        );

        return response.data.user;
      } catch (ae) {
        if (!(ae instanceof AxiosError && ae.response?.status == 400)) {
          throw ae;
        }

        if (ae.response.data.error == "ERR_NO_DOCS") {
          return (
            await axios.post<{ user: AppUser }>(`${API_ENDPOINT}/token/user`)
          ).data.user;
        } else {
          throw ae;
        }
      }
    },
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    auth.authStateReady().then(() => {
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
