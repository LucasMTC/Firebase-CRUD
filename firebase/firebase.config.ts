// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNj9xVo2AprNrx7U9-DRS2m2E9uax0oPQ",
  authDomain: "crud-firebase-47685.firebaseapp.com",
  projectId: "crud-firebase-47685",
  storageBucket: "crud-firebase-47685.firebasestorage.app",
  messagingSenderId: "657149838601",
  appId: "1:657149838601:web:ad3443aad846e92e56ffd8",
  measurementId: "G-9EDVC8YNW1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);


export { db }