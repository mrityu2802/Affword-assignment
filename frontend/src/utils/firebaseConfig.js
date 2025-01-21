// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANA0CYDOBn4tYbf0nuZyDXnhWrZQBRqCA",
  authDomain: "affword-assignment.firebaseapp.com",
  projectId: "affword-assignment",
  storageBucket: "affword-assignment.firebasestorage.app",
  messagingSenderId: "598963044258",
  appId: "1:598963044258:web:55a94dd96d2a30bcd03cfb",
  measurementId: "G-BZFZ9BYWWW",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
