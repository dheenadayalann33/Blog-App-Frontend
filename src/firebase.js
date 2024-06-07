// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-app-a6125.firebaseapp.com",
  projectId: "blog-app-a6125",
  storageBucket: "blog-app-a6125.appspot.com",
  messagingSenderId: "750245813860",
  appId: "1:750245813860:web:47fa43e873f36c468d4971"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);