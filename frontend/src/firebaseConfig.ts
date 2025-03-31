// Import the functions you need from the SDKs you needimport { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyChYZ-b9a_anDsoJtC26mjPm1lJrVjBUAs",
  authDomain: "mini-social-app-f2ef5.firebaseapp.com",
  projectId: "mini-social-app-f2ef5",
  storageBucket: "mini-social-app-f2ef5.firebasestorage.app",
  messagingSenderId: "980623378812",
  appId: "1:980623378812:web:019cbb700c06276ec1fcf9",
  measurementId: "G-ZM5S63C2QH"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);