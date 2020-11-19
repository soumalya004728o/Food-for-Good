// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
import 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyDHF49uvbpTjJZ7aDEIVg42LTfdR9dq4Nw",
  authDomain: "food-for-good-9eb2d.firebaseapp.com",
  databaseURL: "https://food-for-good-9eb2d.firebaseio.com",
  projectId: "food-for-good-9eb2d",
  storageBucket: "food-for-good-9eb2d.appspot.com",
  messagingSenderId: "900655998398",
  appId: "1:900655998398:web:18a0927eaae448da5f85ef",
  measurementId: "G-1MD37W1YVC",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
