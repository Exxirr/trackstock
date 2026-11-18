// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuWiYSA4pfVoowZlaq472u8YiZohUQJo0",
  authDomain: "trackstock-1d68e.firebaseapp.com",
  projectId: "trackstock-1d68e",
  storageBucket: "trackstock-1d68e.firebasestorage.app",
  messagingSenderId: "1022561962458",
  appId: "1:1022561962458:web:abfffe99747f95371b58e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);