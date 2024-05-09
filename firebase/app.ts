import { firebaseConfig } from "@/constants/firebase";
import { initializeApp } from "firebase/app";

export const app = initializeApp(firebaseConfig);