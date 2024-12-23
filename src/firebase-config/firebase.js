import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//     apiKey: import.meta.env.FIREBASE_API_KEY,
//     authDomain: import.meta.env.FIREBASE_AUTH_DOMAIN,
//     projectId: import.meta.env.FIREBASE_PROJECT_ID,
//     storageBucket: import.meta.env.FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: import.meta.env.FIREBASE_MESSAGING_SENDER_ID,
//     appId: import.meta.env.FIREBASE_APP_ID
//   };

const firebaseConfig = {
    apiKey: "AIzaSyDacpuOFUC2y9li4PlmEgyzSUsPMi9889I",
    authDomain: "gadget-shop-5509b.firebaseapp.com",
    projectId: "gadget-shop-5509b",
    storageBucket: "gadget-shop-5509b.firebasestorage.app",
    messagingSenderId: "701081797023",
    appId: "1:701081797023:web:47549ca2dafbd99dd5fdaa"
  };
// Initialize Firebase
export const app = initializeApp(firebaseConfig);


