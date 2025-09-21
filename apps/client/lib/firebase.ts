import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCpQKVxvHo49EcdIWBZPgDVevkwM084fLY",
  authDomain: "e-commerce-e84cb.firebaseapp.com",
  projectId: "e-commerce-e84cb",
  storageBucket: "e-commerce-e84cb.firebasestorage.app",
  messagingSenderId: "277880449172",
  appId: "1:277880449172:web:fcd7b1df6625c6e9dd2c81",
  measurementId: "G-GV4D425D6P"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);