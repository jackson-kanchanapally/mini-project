import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAjwuHU97EMXOQpWbCo86T_Ip3S3MmToIQ",
  authDomain: "mi-pro-1d3dd.firebaseapp.com",
  projectId: "mi-pro-1d3dd",
  storageBucket: "mi-pro-1d3dd.appspot.com",
  messagingSenderId: "547826508240",
  appId: "1:547826508240:web:80f55fdd27c9f9669099d5",
  measurementId: "G-5B7QLFMZ85",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const st = getStorage(app);
// firebase.initializeApp(firebaseConfig);
