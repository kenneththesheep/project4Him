import firebase from "firebase/app"
import "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyBV2cAl_rfZogY25F64ph2D_dZywwv3t-M",
  authDomain: "sleepybird-3254a.firebaseapp.com",
  databaseURL: "https://sleepybird-3254a.firebaseio.com",
  projectId: "sleepybird-3254a",
  storageBucket: "sleepybird-3254a.appspot.com",
  messagingSenderId: "666768814442",
  appId: "1:666768814442:web:296ed234c7a361d2f63513",
  measurementId: "G-VD8RB8WB1P"
};


firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export {
    storage, firebase as default
}