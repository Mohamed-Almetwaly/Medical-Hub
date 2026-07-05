// firebase-config.js
// Firebase init - shared by signup.html, login.html, services.html and profile.html
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCEMRrK9O0qH85qtI2JKMr632aphCyUnX8",
  authDomain: "medical-hub-77.firebaseapp.com",
  projectId: "medical-hub-77",
  storageBucket: "medical-hub-77.firebasestorage.app",
  messagingSenderId: "247859944996",
  appId: "1:247859944996:web:800aff8993b86ea78b82b1",
  measurementId: "G-4L7M1383SY"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);