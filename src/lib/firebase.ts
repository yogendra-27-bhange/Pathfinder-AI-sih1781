
// src/lib/firebase.ts
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

// TODO: Replace with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnYGEB5h0CY8ynqYbw__MsSlYJZ28aol0",
  authDomain: "pathfinder-ai-3e599.firebaseapp.com",
  projectId: "pathfinder-ai-3e599",
  storageBucket: "pathfinder-ai-3e599.firebasestorage.app",
  messagingSenderId: "333637923034",
  appId: "1:333637923034:web:95ff3b6eea5ed0965635e3",
  measurementId: "G-STM2L8PF1G"
};

let app: FirebaseApp;
let db: Firestore;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

db = getFirestore(app);

export { app, db };
