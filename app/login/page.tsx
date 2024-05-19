"use client";

import { Typography } from "@/components/components";
import { auth, provider } from "@/firebase/auth";
import {
  Box,
  Button,
  PasswordInput,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { IconBrandGoogle, IconEyeCheck, IconEyeOff } from "@tabler/icons-react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [googleLoginError, setGoogleLoginError] = useState(false);

  const redirectURL = useSearchParams().get("redirect") ?? "/";
  const router = useRouter();

  async function handleGoogleLogin() {
    try {
      const result = await signInWithPopup(auth, provider);
      router.push(redirectURL);
    } catch (e: any) {
      alert(e);
    }
  }

  async function handleEmailPasswordLogin() {
    try {
      const result = signInWithEmailAndPassword(auth, email, password);
      router.replace(redirectURL);
    } catch (e: any) {
      alert(e);
    }
  }

  useMemo(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        router.replace(redirectURL);
      }
    });
  }, []);

  return (
    <Box mx="auto" className="mt-10 flex max-w-[300px] flex-col justify-center">
      <Typography variant="h2">Student Login</Typography>
      <Typography variant="h6">
        Welcome to Training and Placement Cell
      </Typography>
      <form className="mt-2">
        <TextInput
          withAsterisk
          label="Email"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          error={
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
              ? null
              : "invalid email"
          }
        />
        <PasswordInput
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          placeholder="Enter your password"
          visibilityToggleIcon={({ reveal }) =>
            reveal ? <IconEyeOff /> : <IconEyeCheck />
          }
        />

        <div className="mt-2 flex flex-row">
          <div className="flex w-full grow">
            <Button className="w-full grow" onClick={handleEmailPasswordLogin}>
              Login
            </Button>
          </div>
        </div>
        {error && (
          <Typography
            className="m-10 m-auto text-center font-light"
            variant="h6"
            color="red"
          >
            Invalid Credentials
          </Typography>
        )}
        <div className="flex flex-row justify-center p-4">
          <Typography variant="h3">OR</Typography>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row justify-center">
            <UnstyledButton
              className="flex w-full cursor-pointer flex-row flex-nowrap justify-center gap-2 border border-red-500 p-2"
              onClick={handleGoogleLogin}
            >
              <IconBrandGoogle />
              <Typography variant="h6">Login/Register with Google</Typography>
            </UnstyledButton>
          </div>
          {googleLoginError && (
            <Typography
              className="m-10 m-auto text-center font-light"
              variant="h6"
              color="red"
            >
              No account with this google account exists
            </Typography>
          )}
        </div>
      </form>
    </Box>
  );
}
