// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-story-builder.firebaseapp.com",
  projectId: "ai-story-builder",
  storageBucket: "ai-story-builder.appspot.com",
  messagingSenderId: "509671805421",
  appId: "1:509671805421:web:72fc8207b0c74d774a57e4",
  measurementId: "G-0BHYNZWD8L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
