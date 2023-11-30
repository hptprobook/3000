// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyBKjNaJmzSuMcvdQmIMJR607EALDvBCpe4",
//     authDomain: "iwebapp-a2c2d.firebaseapp.com",
//     projectId: "iwebapp-a2c2d",
//     storageBucket: "iwebapp-a2c2d.appspot.com",
//     messagingSenderId: "54515255103",
//     appId: "1:54515255103:web:0c3375d8ea130f880a758a",
//     measurementId: "G-2RBH06T4J3",
// };
// của tín
const firebaseConfig = {
    apiKey: "AIzaSyCdfi32ZpP2W9bp1q_scnmj2pJxx9kLNE0",
    authDomain: "project-6817180433835635924.firebaseapp.com",
    projectId: "project-6817180433835635924",
    storageBucket: "project-6817180433835635924.appspot.com",
    messagingSenderId: "632712837922",
    appId: "1:632712837922:web:0743ea488cdc920c47437b",
    measurementId: "G-EEF11XPW0H"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storageFirebase = getStorage(app);
