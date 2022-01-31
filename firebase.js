// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpwwao72IGJ6vzjrMSsI483mdPbVRXGR4",
  authDomain: "id-system-e0885.firebaseapp.com",
  projectId: "id-system-e0885",
  storageBucket: "id-system-e0885.appspot.com",
  messagingSenderId: "205265554718",
  appId: "1:205265554718:web:027ab40fbff49cbfcc8d0f",
  measurementId: "G-ZKNJ8E7D4Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// analytics = getAnalytics(app);