
// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// IMPORTANT: Replace this with the actual config from your Firebase project
const firebaseConfig = {
  "projectId": "lingualeap-xapen",
  "appId": "1:118368504355:web:3610222112e58748453f96",
  "storageBucket": "lingualeap-xapen.firebasestorage.app",
  "apiKey": "AIzaSyD8xPdomDYX4eKg4bwWKp7ifybjRf28rME",
  "authDomain": "lingualeap-xapen.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "118368504355"
};


// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
}

const auth = getAuth(app);

export { app, auth };
