// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBdcyoPmAg1sJdMueeqE_Sz_MPfNUF46LQ",
  authDomain: "sample-5aac7.firebaseapp.com",
  projectId: "sample-5aac7",
  storageBucket: "sample-5aac7.appspot.com",
  messagingSenderId: "1050311019563",
  appId: "1:1050311019563:web:bc0daa2a5a4b97f8fd6e6e",
  measurementId: "G-Q5ZGM2C5GT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export {db,auth};