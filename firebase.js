import { initializeApp } from "@firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyBjHevSy_ZkhW-xXrsrKSalOIpzAJSihgY",
    authDomain: "signal-clone-a4ece.firebaseapp.com",
    projectId: "signal-clone-a4ece",
    storageBucket: "signal-clone-a4ece.appspot.com",
    messagingSenderId: "305405373797",
    appId: "1:305405373797:web:8d8b52ec58b64f1fad058c"
};

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = firebase.auth();

export {db, auth};
