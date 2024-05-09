import { FirebaseOptions } from "firebase/app";

export const firebaseConfig:FirebaseOptions = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    appId:process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    authDomain:process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
    measurementId:process.env.NEXT_PUBLIC_MEASUREMENT_ID,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET
}