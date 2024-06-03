// Import the functions you need from the SDKs you need
import { APIKEY } from "@/constants/apiKey";
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: APIKEY,
  authDomain: "demo1-670b8.firebaseapp.com",
  projectId: "demo1-670b8",
  storageBucket: "demo1-670b8.appspot.com",
  messagingSenderId: "589666131109",
  appId: "1:589666131109:web:4adfb3d831191fe2cf014c"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const auth = getAuth(FIREBASE_APP)
export const FIREBASE_DB = getFirestore(FIREBASE_APP)
