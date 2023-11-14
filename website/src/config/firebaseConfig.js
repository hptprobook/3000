// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBKjNaJmzSuMcvdQmIMJR607EALDvBCpe4",
    authDomain: "iwebapp-a2c2d.firebaseapp.com",
    projectId: "iwebapp-a2c2d",
    storageBucket: "iwebapp-a2c2d.appspot.com",
    messagingSenderId: "54515255103",
    appId: "1:54515255103:web:0c3375d8ea130f880a758a",
    measurementId: "G-2RBH06T4J3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
