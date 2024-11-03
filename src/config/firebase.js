import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain:process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId:process.env.REACT_APP_APP_ID,
  measurementId:process.env.REACT_APP_MEASUREMENT_ID
  // apiKey: "AIzaSyC54zG0jzP-nawxV9VcuzRbqbhNMsRE7gU",
  // authDomain: "ecommerence-dd64c.firebaseapp.com",
  // projectId: "ecommerence-dd64c",
  // storageBucket: "ecommerence-dd64c.appspot.com",
  // messagingSenderId: "311243127731",
  // appId: "1:311243127731:web:8cfcd1e517eb2b6ce269c6",
  // measurementId: "G-HFLDFW8G81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const fireStore = getFirestore(app);
const storage = getStorage(app);
export {app,analytics,auth,fireStore,storage}