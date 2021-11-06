import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyAipJVTpyEep6NL8WNElAf5b63-PeMVArE",
  authDomain: "stockbuddy-65b1e.firebaseapp.com",
  projectId: "stockbuddy-65b1e",
  storageBucket: "stockbuddy-65b1e.appspot.com",
  messagingSenderId: "738839348139",
  appId: "1:738839348139:web:719b5e64df765811ab88ee",
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);
export default firebase;
