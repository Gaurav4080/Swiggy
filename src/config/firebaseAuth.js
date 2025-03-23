import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBpJOPQ3fURC4zHDiWS6sJ7_I-FBJquTdw",
  authDomain: "swiggy-project-cf55a.firebaseapp.com",
  projectId: "swiggy-project-cf55a",
  storageBucket: "swiggy-project-cf55a.firebasestorage.app",
  messagingSenderId: "797644609350",
  appId: "1:797644609350:web:eca32aa30e9f52cbf6b747"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()