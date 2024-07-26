"use client";

import { auth } from "@/firebase/auth";
import { Button } from "@mantine/core";
import { signOut } from "firebase/auth";

export default function ProfilePage() {
  return (
    <div>
      <Button
        onClick={async () => {
          signOut(auth);
        }}
      >
        Logout
      </Button>
    </div>
  );
}
