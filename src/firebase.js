import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const config = {
  apiKey: "AIzaSyAk-ANcufrwoTJjvBSNG8T7spiMxpvgGiY",
  authDomain: "fee-khawn.firebaseapp.com",
  projectId: "fee-khawn",
  storageBucket: "fee-khawn.appspot.com",
  messagingSenderId: "472457010871",
  appId: "1:472457010871:web:6f26a96b0f631a4e433732",
};
const app = initializeApp(config);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);

export { db, auth, storage };
