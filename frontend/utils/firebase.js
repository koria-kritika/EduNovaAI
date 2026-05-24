// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "edunovaai-d2392.firebaseapp.com",
  projectId: "edunovaai-d2392",
  storageBucket: "edunovaai-d2392.firebasestorage.app",
  messagingSenderId: "766192458197",
  appId: "1:766192458197:web:6e34e505942b97e287055c",
  measurementId: "G-702X2EJPNG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth,provider}