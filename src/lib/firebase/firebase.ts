// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzlVOgvPPnxfLpwhXUk3xQE5y5DI-rHLY",
  authDomain: "sukoon-b95a5.firebaseapp.com",
  projectId: "sukoon-b95a5",
  storageBucket: "sukoon-b95a5.firebasestorage.app", // Corrected this line
  messagingSenderId: "213327698330",
  appId: "1:213327698330:web:d83b4c66ec03eaf11e4223",
  measurementId: "G-890N5WZ739"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // We will set up analytics later if needed

// Initialize Firebase for SSR and SSG
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db }; 