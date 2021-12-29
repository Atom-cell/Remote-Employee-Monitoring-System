// import { initializeApp } from "firebase/app";
// import firebase from "firebase";
// import "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAj0Gm8kvTBRh6w2ztyjro9niM6f_9kxZM",
  authDomain: "rems-573d1.firebaseapp.com",
  databaseURL: "https://rems-573d1-default-rtdb.firebaseio.com",
  projectId: "rems-573d1",
  storageBucket: "rems-573d1.appspot.com",
  messagingSenderId: "174312188676",
  appId: "1:174312188676:web:f7a93137aa09ec3debbe51",
  measurementId: "G-HZKW0N2SS3",
};
const app = firebase.initializeApp(firebaseConfig);
// firebase.firestore().settings({ experimentalForceLongPolling: true });
const db = firebase.firestore(app);

export const AssignedTasks = db.collection("AssignedTasks");

export const Attend = db.collection("Attendence");

export { firebase };
