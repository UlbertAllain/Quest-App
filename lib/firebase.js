import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDWK3fmhDBrAs-KsZxix63xYUGZj9-wc3E",
  authDomain: "ur-task-manager.firebaseapp.com",
  projectId: "ur-task-manager",
  storageBucket: "ur-task-manager.firebasestorage.app",
  messagingSenderId: "430425200668",
  appId: "1:430425200668:web:e3b0d54adb4506df63e7d9",
};

const app = initializeApp(firebaseConfig);

// ONLY FIRESTORE
export const db = getFirestore(app);
export const auth = getAuth(app);