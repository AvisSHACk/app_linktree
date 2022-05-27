// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import {getFirestore, doc, setDoc, getDoc, query, collection, onSnapshot, where, limit, addDoc, updateDoc} from "firebase/firestore";
import {getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged  } from 'firebase/auth';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth();

export {
  db,
  doc, 
  setDoc, 
  ref, 
  getDownloadURL, 
  storage, 
  query, 
  collection, 
  onSnapshot, 
  where, 
  limit, 
  auth, 
  onAuthStateChanged, 
  getDoc, 
  createUserWithEmailAndPassword, 
  signOut,
  signInWithEmailAndPassword,
  addDoc,
  updateDoc
};