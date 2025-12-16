
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCBoSZSuZ4O1sk2WRB8Rx1Jj1ejZRj1LV8",
  authDomain: "wed-todo-ceeg.firebaseapp.com",
  projectId: "wed-todo-ceeg",
  storageBucket: "wed-todo-ceeg.firebasestorage.app",
  messagingSenderId: "719355051154",
  appId: "1:719355051154:web:200a7f1963619f8bbb3a4b",
  measurementId: "G-NZ4T3WQ2C8"
};



const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export default app;