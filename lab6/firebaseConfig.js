import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
    getAuth,
    getReactNativePersistence,
    initializeAuth
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Platform } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyDNFcqW6TGRu1ihr4ii2wCBFbzWQ-RKEq4",
  authDomain: "lab6-55b2d.firebaseapp.com",
  projectId: "lab6-55b2d",
  storageBucket: "lab6-55b2d.firebasestorage.app",
  messagingSenderId: "728476017863",
  appId: "1:728476017863:web:266a35f4d213f63fdc4ae2",
  measurementId: "G-XW34RZD81K"
};

const app = initializeApp(firebaseConfig);

let auth;
if (Platform.OS === 'web') {
  auth = getAuth(app);
} else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
}

const db = getFirestore(app);

export { auth, db };

