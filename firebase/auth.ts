import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { app } from "./app";

export const provider = new GoogleAuthProvider();
export const auth = getAuth(app)
auth.useDeviceLanguage();


