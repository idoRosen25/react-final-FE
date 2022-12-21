// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOmpgTRn99mCo6vPKqli8ZC3RMvZFmcmE",
  authDomain: "reactcart-6a413.firebaseapp.com",
  projectId: "reactcart-6a413",
  storageBucket: "reactcart-6a413.appspot.com",
  messagingSenderId: "968132145855",
  appId: "1:968132145855:web:4bbf2e8fbb0f4abe0b4c0a",
  measurementId: "G-6X7VHDHXKL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);