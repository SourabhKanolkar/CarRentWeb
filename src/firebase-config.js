// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdyPt5vbcHg5BkfezZnX_5XPnTaT37T1g",
  authDomain: "car-rent2-c7d99.firebaseapp.com",
  projectId: "car-rent2-c7d99",
  storageBucket: "car-rent2-c7d99.firebasestorage.app",
  messagingSenderId: "664781254678",
  appId: "1:664781254678:web:6124f26f27e5cc2f870537",
  measurementId: "G-483PWFW2TS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth=getAuth(app)
export { app, db,auth };