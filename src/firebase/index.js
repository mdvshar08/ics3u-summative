import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Paste your firebaseConfig from Firebase Console here
const firebaseConfig = {
    apiKey: "AIzaSyBSTl6RMChU3nBYCGORNRTDt52xCSG11bg",
    authDomain: "summative-f1304.firebaseapp.com",
    projectId: "summative-f1304",
    storageBucket: "summative-f1304.firebasestorage.app",
    messagingSenderId: "578735246563",
    appId: "1:578735246563:web:41ad2a2bdc36d040f5c9d6"
  };

const config = initializeApp(firebaseConfig)
const auth = getAuth(config);
const firestore = getFirestore(config);

export { auth, firestore };