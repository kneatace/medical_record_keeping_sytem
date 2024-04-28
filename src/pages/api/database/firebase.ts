import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDoUlzAs875-5O9HnnTZNwrh9JyTM-Skr4",
  authDomain: "ums-system-88c21.firebaseapp.com",
  projectId: "ums-system-88c21",
  storageBucket: "ums-system-88c21.appspot.com",
  messagingSenderId: "846591692812",
  appId: "1:846591692812:web:ae6d6965467c65af70de29",
  measurementId: "G-LLDJ663E6J"
};

//console.log(firebaseConfig); 

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}



const auth = getAuth(app);
const db = getFirestore(app);

//console.log(auth); // Log the Firebase auth instance to check if it's initialized correctly
//console.log(db); // Log the Firebase db instance to check if it's initialized correctly

export { auth, db };