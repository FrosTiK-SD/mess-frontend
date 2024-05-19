"use client";

import { PUBLIC_ROUTES } from "@/config/router";
import { firebaseConfig } from "@/constants/firebase";
import { updateRoles } from "@/store/states/idStore";
import { selectUser, setCurrentUser } from "@/store/states/userSlice";
import axios from "axios";
import { Auth, getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingPage } from "../LoadingPage";

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathName: string = usePathname() || "";
  const dispatch = useDispatch();
  const UserState = useSelector(selectUser);
  const [loggedIn, setLoggedIn] = useState<Boolean>(false);
  const [loginChecked, setLoginChecked] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(true);
  const auth: Auth = getAuth(firebase.initializeApp(firebaseConfig));

  const checkAuthState = () => {
    const currentUser = auth.currentUser;
    dispatch(setCurrentUser({ user: currentUser }));

    // If user is not logged in
    if (!currentUser) {
      setLoggedIn(false);
      setLoginChecked(true);
    }
  };

  auth.onAuthStateChanged(async function (user) {
    if (!(pathName in PUBLIC_ROUTES)) {
      // if (!user)  setLoginChecked(false);
      checkAuthState();
    }
  });

  const getIDToken = async () => {
    const idToken = await UserState.currentUser.getIdToken(true);

    axios.defaults.headers.common["token"] = idToken;

    let loginState: boolean = false;

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_AUTH_BACKEND}/api/token/student/verify`,
      {
        validateStatus: (_) => true,
      },
    );

    if (!response.data.error && response.data.data) {
      dispatch(
        updateRoles({
          ...response.data.data,
        }),
      );

      setLoggedIn(true);
    } else setLoggedIn(false);
    setLoginChecked(true);
  };

  // Trigger whenever there is a change in the UserState.currentUser
  useEffect(() => {
    if (UserState.currentUser) {
      getIDToken();
    }
  }, [UserState.currentUser]);

  useEffect(() => {
    if (loggedIn && pathName in PUBLIC_ROUTES) router.push("/");
  }, [loggedIn]);

  // Trigger when the full login cycle is completed . Kick out if not logged in
  useEffect(() => {
    if (loginChecked) {
      // Check if the route is public or not
      if (!loggedIn && !(pathName in PUBLIC_ROUTES)) {
        router.push(`/login?redirect=${pathName}`);
      } else if (loggedIn && pathName in PUBLIC_ROUTES) {
        router.push("/");
      } else {
        setLoading(false);
      }
    }
  }, [loginChecked]);

  // Trigger whenever path gets changed
  useEffect(() => {
    if (pathName in PUBLIC_ROUTES) {
      setLoading(false);
    }
  }, [pathName]);

  return (
    <>
      {loading ? (
        <div className="h-[100dvh] w-full">
          <LoadingPage />
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
