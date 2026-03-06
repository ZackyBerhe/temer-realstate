import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2X9_-ErSZd0xu2KH4wkQSqS0BBsmrKj0",
  authDomain: "temerpropertymanagement.firebaseapp.com",
  projectId: "temerpropertymanagement",
  storageBucket: "temerpropertymanagement.firebasestorage.app",
  messagingSenderId: "981377158791",
  appId: "1:981377158791:web:2d1b02db5e87b26353f222",
  measurementId: "G-G20VT1H13S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
