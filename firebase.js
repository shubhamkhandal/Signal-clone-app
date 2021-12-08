import { initializeApp } from "@firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"


const firebaseConfig = {
    apiKey: "{your api key}",
    authDomain: "signal-clone-a4ece.firebaseapp.com",
    projectId: "signal-clone-a4ece",
    storageBucket: "signal-clone-a4ece.appspot.com",
    messagingSenderId: "3054053737456797",
    appId: "1:305405373797:web:8d8b52ec58bft7ygfgy864f1fad058c"
};

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = firebase.auth();

export {db, auth};
