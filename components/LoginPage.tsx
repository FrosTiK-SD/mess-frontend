import { auth, provider } from "@/firebase/auth";
import { Button } from "@mantine/core";
import { signInWithPopup } from "firebase/auth";

export function LoginPage() {
  async function handleGoogleLogin() {
    await signInWithPopup(auth, provider);
  }
  return (
    <div>
      <Button onClick={handleGoogleLogin}>Login</Button>
    </div>
  );
}
