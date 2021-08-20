/** @format */

/** @format */
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCfmrCcGuWCFRZpOmI5Qq3XOhjtXZTi8Ek",
  authDomain: "docs-nextjs-fc777.firebaseapp.com",
  projectId: "docs-nextjs-fc777",
  storageBucket: "docs-nextjs-fc777.appspot.com",
  messagingSenderId: "911930632766",
  appId: "1:911930632766:web:e4005f012e1e65c09d3f6f",
  measurementId: "G-Q5FMW0Y9QL",
};
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const database = app.firestore();
export { database };
