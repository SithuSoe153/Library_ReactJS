import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAoA4ZEnb0gIl7DkzMQJelD6pasKzHGJD8",
    authDomain: "library-app-58a6e.firebaseapp.com",
    projectId: "library-app-58a6e",
    storageBucket: "library-app-58a6e.appspot.com",
    messagingSenderId: "780266226305",
    appId: "1:780266226305:web:ac5795e7b8e63044250380",
    measurementId: "G-44K64BHVM1"
};


const app = initializeApp(firebaseConfig);

let db = getFirestore(app);
let auth = getAuth(app);


export { db, auth };