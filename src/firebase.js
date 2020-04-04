import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyCZ2pteCvKxRej5l7CScBBCOHszGkjWLpw",
  authDomain: "todoist-tut-36fce.firebaseapp.com",
  databaseURL: "https://todoist-tut-36fce.firebaseio.com",
  projectId: "todoist-tut-36fce",
  storageBucket: "todoist-tut-36fce.appspot.com",
  messagingSenderId: "56134537242",
  appId: "1:56134537242:web:97287007cc5ff76fb901a3"
});

export { firebaseConfig as firebase };
