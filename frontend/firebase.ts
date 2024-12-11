// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-wrtX851ve4Y5RMFka9aRAc0gesEsAA4",
  authDomain: "desafio-graodireto.firebaseapp.com",
  projectId: "desafio-graodireto",
  storageBucket: "desafio-graodireto.firebasestorage.app",
  messagingSenderId: "389426935011",
  appId: "1:389426935011:web:c98c2c90ae987006a0c1d6",
  measurementId: "G-F69N4G2B93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

export { auth };