import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAL7tJPpB8kcgzH7mlwX6KvE3_SQFr1-2w",
  authDomain: "school-23928.firebaseapp.com",
  projectId: "school-23928",
  storageBucket: "school-23928.firebasestorage.app",
  messagingSenderId: "135136789745",
  appId: "1:135136789745:web:a8b540e173c430d04a5550",
  measurementId: "G-MBEJ7MZY7Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;


