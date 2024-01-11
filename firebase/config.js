// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRFW8KeY0STWCfzv8FpjuRlayCQjRbRc4",
  authDomain: "store-b5a7c.firebaseapp.com",
  projectId: "store-b5a7c",
  storageBucket: "gs://store-b5a7c.appspot.com",
  messagingSenderId: "204885677713",
  appId: "1:204885677713:web:e7d4f3a331d62a58f21130",
  measurementId: "G-GFHX87CDP4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

