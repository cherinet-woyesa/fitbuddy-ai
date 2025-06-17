// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVR9k33qFC3PF7Y1JI1SKnIwKyJlf75as",
  authDomain: "fitbuddy-ai-705b7.firebaseapp.com",
  projectId: "fitbuddy-ai-705b7",
  storageBucket: "fitbuddy-ai-705b7.firebasestorage.app",
  messagingSenderId: "265709992206",
  appId: "1:265709992206:web:e57efdc6d13012fdbaff5f",
  measurementId: "G-CFD9DQDWMP"
};

let app: FirebaseApp | undefined;
let auth: Auth | undefined;

if (typeof window !== 'undefined') {
  app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  auth = getAuth(app);
}

// ✅ Export the auth object
export { auth };
