import { initializeApp } from "@firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"


const firebaseConfig = {
    apiKey: "{Your Firebase API Key}",
    authDomain: "{Your Firebase Project Name}",
    projectId: "signal-clone-a4ece",
    storageBucket: "{Your Firebase Project Name}",
    messagingSenderId: "305405373797895648353",
    appId: "1:305405373797:web:8d8b52eec58bx64f1fad058cecx1xcy"
};

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = firebase.auth();

export {db, auth};
