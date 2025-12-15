
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOJwO-P7zOgSFmThm7TXGCUNvxg0RhdOM",
  authDomain: "to-do-list-92ac1.firebaseapp.com",
  projectId: "to-do-list-92ac1",
  storageBucket: "to-do-list-92ac1.firebasestorage.app",
  messagingSenderId: "423210590092",
  appId: "1:423210590092:web:4a80c0646210d8601600a9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export default app;