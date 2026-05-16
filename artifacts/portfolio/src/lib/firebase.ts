import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAixmsIhHi6ccoiGxtERBJGUl71_G6kw8k",
  authDomain: "portfolio-websites-8aaef.firebaseapp.com",
  projectId: "portfolio-websites-8aaef",
  storageBucket: "portfolio-websites-8aaef.firebasestorage.app",
  messagingSenderId: "917542635062",
  appId: "1:917542635062:web:c1b7021447565598c5ba97",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
