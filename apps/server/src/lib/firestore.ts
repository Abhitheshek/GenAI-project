import { Firestore, getFirestore } from "firebase-admin/firestore";
import { initFirebase } from "./firebase";

let db: Firestore | null = null;

export function getFirestoreDb(): Firestore {
  if (!db) {
    initFirebase();
    db = getFirestore();
  }
  return db;
}
