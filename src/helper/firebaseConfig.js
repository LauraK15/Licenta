// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore"; // Importăm Firestore
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5g6R0mXzZldQxq1lCvl3SLQRX7czs96k",
  authDomain: "hrm1-72bcc.firebaseapp.com",
  projectId: "hrm1-72bcc",
  storageBucket: "hrm1-72bcc.firebasestorage.app",
  messagingSenderId: "894926824929",
  appId: "1:894926824929:web:59baab7899f9cff1af9ea0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };