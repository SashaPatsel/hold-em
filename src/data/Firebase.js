import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBy7D4RFOAG2BpTiQxCaUedgk6JkkVVmEc",
  authDomain: "hold-em-29fdb.firebaseapp.com",
  databaseURL: "https://hold-em-29fdb.firebaseio.com",
  projectId: "hold-em-29fdb",
  storageBucket: "",
  messagingSenderId: "1083048984960"
};

firebase.initializeApp(config);

const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);

export default firebase;